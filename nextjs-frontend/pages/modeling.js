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
import { device } from '../styles/Media';

// GalleryPageTemplate Component
const ModelingPage = ({ pageData }) => {
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
    pageData.PageGallery.forEach((pageGalleryImage) => {
        photos.push({
            src: `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}${pageGalleryImage.Image.url}`,
            width: pageGalleryImage.Image.width,
            height: pageGalleryImage.Image.height,
            alt: pageGalleryImage.Alt,
        });
    });

    return (
        <StyledModelingPage>
            <section className="page-content">
                <h1>Modeling</h1>
                <p>{pageData.PageText}</p>
                <div className="images-container">
                    <Gallery photos={photos} targetRowHeight={250} onClick={openLightbox} />
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
            </section>
        </StyledModelingPage>
    );
};

export default ModelingPage;

// getStaticProps Async function, that pulls in data from Sanity CMS based on current locale and slug passed in params object from getStaticPaths.
export async function getStaticProps({ locale }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    // GraphQL query
    const { data } = await client.query({
        query: gql`
        query {
            modelingPage(locale: "${locale}")  {
              PageText
              PageGallery {
                Image {
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
            pageData: data.modelingPage,

            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage', 'footer'])),
            // Will be passed to the page component as props
        },
    };
}

// Styles

const StyledModelingPage = styled.div`
    height: fit-content;
    margin: 1rem 0;

    .page-content {
        padding: 1rem 2rem 2rem 2rem;
        margin: 0rem 1rem;
        background-image: url('/images/concrete-wall.png'),
            linear-gradient(to bottom, #4d4d4d, #464647, #404040, #3a393a, #343333);
        background-repeat: repeat;
        background-position: center bottom;
        background-size: contain;
        border-radius: 15px;

        @media ${device.tablet} {
            margin: 0 1rem;
        }
        @media ${device.laptop} {
            margin: 0 calc((100vw - 1100px) / 2);
        }
        @media ${device.laptopL} {
            margin: 0 calc((100vw - 1200px) / 2);
        }
        @media ${device.desktop} {
            margin: 0 calc((100vw - 1400px) / 2);
        }
    }

    h1 {
        margin: 5rem 0;
    }

    p {
        font-size: 1.6rem;
        font-weight: 400;
        margin-bottom: 2rem;

        @media ${device.tablet} {
            font-size: 1.7rem;
        }
        @media ${device.laptop} {
            font-size: 1.8rem;
            padding: 0 2rem;
        }
        @media ${device.laptopL} {
            padding: 0 2.5rem;
        }
        @media ${device.desktop} {
            padding: 0 3rem;
        }
    }
`;
