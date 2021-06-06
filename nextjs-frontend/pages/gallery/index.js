import React from 'react';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// Components
import styled from 'styled-components';
import Galleries from '../../components/Galleries';
import { device } from '../../styles/Media';

// Gallery Page component
const GalleryPage = ({ imageGalleries, currLocale }) => (
    <StyledGalleryPage>
        <Galleries imageGalleries={imageGalleries} currLocale={currLocale} />
    </StyledGalleryPage>
);

export default GalleryPage;

// async get staic props function
export async function getStaticProps({ locale }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
            query {
                imageGalleries(locale: "${locale}") {
                    id
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
            currLocale: locale,
            imageGalleries: data.imageGalleries,
            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage', 'footer'])),
            // Will be passed to the page component as props
        },
    };
}

// Styles

const StyledGalleryPage = styled.section`
    min-height: calc(100vh - 11rem);
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
`;
