import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// React Gallery Lib
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
// Media Queries
import { device } from '../../styles/Media';

// GalleryPageTemplate Component
const GalleryPageTemplate = ({ galleryImages }) => {
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
    galleryImages[0].GalleryImages.forEach((galleryImage) => {
        photos.push({
            src: `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}${galleryImage.Image.url}`,
            width: galleryImage.Image.width,
            height: galleryImage.Image.height,
            alt: galleryImage.Alt,
        });
    });

    return (
        <StyledGalleryPage>
            <h1>
                {t('Gallery')} {galleryImages[0].Name}
            </h1>
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
export async function getStaticProps({ locale, params }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    // GraphQL query
    const { data } = await client.query({
        query: gql`
        query {
            imageGalleries(locale: "${locale}", where: { slug: "${params.slug}" }) {
              Name
              slug
              FeaturedImage {
                AltText
                Image {
                  alternativeText
                  url
                  width
                  height
                }
              }
              GalleryImages {
                Alt
                  Image {
                  id
                  url
                  width
                  height
                }
              }
            }
          }
        `,
    });

    return {
        props: {
            galleryImages: data.imageGalleries,

            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage', 'footer'])),
            // Will be passed to the page component as props
        },
    };
}

// getStaticPaths async function that generates url for each static gallery page.
export async function getStaticPaths({ locales }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    // GraphQL query
    const { data } = await client.query({
        query: gql`
            query {
                imageGalleries(locale: "en") {
                    slug
                }
            }
        `,
    });

    // empty array for future paths
    const paths = [];

    // adding generated path for each available local, each imageGallery gets its own page URL.
    locales.forEach((local) => {
        data.imageGalleries.forEach((imageGallery) => {
            paths.push({ params: { slug: imageGallery.slug }, locale: local });
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
