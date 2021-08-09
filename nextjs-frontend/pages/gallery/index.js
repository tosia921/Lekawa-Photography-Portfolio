import React from 'react';
// i18n
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

// Components
import styled from 'styled-components';
import Head from 'next/head';
import Galleries from '../../components/Galleries';
import { device } from '../../styles/Media';

// Gallery Page component
const GalleryPage = ({ imageGalleries, currLocale }) => {
    // Hook that allows me to use nexti18next translations
    const { t } = useTranslation('commons');
    return (
        <StyledGalleryPage>
            <Head>
                <title>{t('Gallery Title')}</title>
                <meta name="description" content={t('Gallery Description')} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link
                    rel="alternate"
                    hrefLang={currLocale === 'en' ? 'pl' : 'en-gb'}
                    href={
                        currLocale === 'en'
                            ? 'https://lekawa-photography.co.uk/pl/gallery'
                            : 'https://lekawa-photography.co.uk/gallery'
                    }
                />
            </Head>
            <Galleries imageGalleries={imageGalleries} currLocale={currLocale} />
        </StyledGalleryPage>
    );
};

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
                imageGalleries(locale: "${locale}" sort: "id:asc") {
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
    min-height: calc(100vh - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media ${device.tablet} {
        padding: 1rem 1rem;
    }
    @media ${device.laptop} {
        padding: 1rem calc((100vw - 1100px) / 2);
    }
    @media ${device.laptopL} {
        padding: 1rem calc((100vw - 1200px) / 2);
    }
    @media ${device.desktop} {
        padding: 1rem calc((100vw - 1400px) / 2);
    }
`;
