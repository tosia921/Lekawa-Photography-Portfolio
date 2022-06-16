import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
//sanity
import { getClient } from '../../sanity/sanity.server';
import groq from 'groq';
import { nextSanityImage } from '../../sanity/sanity.server';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// React Gallery Lib
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
// Media Queries
import Head from 'next/head';
import { device } from '../../styles/Media';

// GalleryPageTemplate Component
const GalleryPageTemplate = ({ galleryPageData, currLocale }) => {

    // Hook that allows me to use nexti18next translations
    const { t } = useTranslation('commons');

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const photos = [];

    // Populating photos Array with Images from CMS with correct url's and other neccessery data.
    if (galleryPageData === null) {
        console.log('missing image data');
    } else {
        galleryPageData[0].imageGallery.images.forEach((pageGalleryImage) => {
            const imgData = nextSanityImage(pageGalleryImage)
            photos.push({
                src: imgData.src,
                width: imgData.width,
                height: imgData.height,
                alt: pageGalleryImage.alt,
            });
        });
    }

    return (
        <StyledGalleryPage>
            <Head>
                <title>{galleryPageData[0].seoTitle}</title>
                <meta name="description" content={galleryPageData[0].seoDescription} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link
                    rel="alternate"
                    hrefLang={currLocale === 'en' ? 'pl' : 'en-gb'}
                    href={
                        currLocale === 'en'
                            ? `https://lekawa-photography.co.uk/pl/gallery/${galleryPageData[0].slug.current}/`
                            : `https://lekawa-photography.co.uk/gallery/${galleryPageData[0].slug.current}/`
                    }
                />
            </Head>
            <h1>{galleryPageData[0].title}</h1>
            <div className="images-container">
                <Gallery photos={photos} targetRowHeight={400} onClick={openLightbox} />
                <ModalGateway>
                    {viewerIsOpen ? (
                        <Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={photos.map((x) => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title,
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        </StyledGalleryPage>
    );
};

export default GalleryPageTemplate;

// getStaticProps Async function, that pulls in data from Sanity CMS based on current locale and slug passed in params object from getStaticPaths.
export async function getStaticProps({ locale, params, preview = false }) {

    //sanity code
    const galleryPageData = await getClient(preview).fetch(groq`
    *[_type == "imageGalleries" && slug.current == "${params.slug}"] {
        "title": title["${locale}"],
        slug,
        "seoTitle": seoTitle["${locale}"],
        "seoDescription": seoDescription["${locale}"],
        featuredImage {
         _type,
         "altText": altText["${locale}"],
         asset,
       },
       imageGallery {
                  images[] {
                    _type,
                    _key,
                    asset,
                    "alt": alt["${locale}"]
                  }
               }
       }
    `)
    // end sanity code

    return {
        props: {
            galleryPageData: galleryPageData,
            currLocale: locale,
            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage', 'footer'])),
            // Will be passed to the page component as props
        },
    };
}

// getStaticPaths async function that generates url for each static gallery page.
export async function getStaticPaths({ locales, preview = false }) {

    //sanity code
    const slugs = await getClient(preview).fetch(groq`
    *[_type == "imageGalleries"] {
        slug
       }
    `)
    // end sanity code

    // empty array for future paths
    const paths = [];

    // adding generated path for each available local, each imageGallery gets its own page URL.
    locales.forEach((local) => {
        slugs.forEach((slug) => {
            paths.push({ params: { slug: slug.slug.current }, locale: local });
        });
    });

    return {
        paths,
        fallback: false,
    };
}

// Styles

const StyledGalleryPage = styled.div`
    h1 {
        margin: 5rem 0;
    }
    .images-container {
        margin-bottom: 1rem;
        @media ${device.tablet} {
            padding: 0 1rem;
        }
        @media ${device.laptop} {
            padding: 0 calc((100vw - 1100px) / 2);
        }
        @media ${device.laptopL} {
            padding: 0 calc((100vw - 1200px) / 2);
        }
        @media ${device.desktop} {
            padding: 0 calc((100vw - 1400px) / 2);
        }
    }
`;
