import React from 'react';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// Gallery Component
const Gallery = ({ galleryTypes }) => {
    const { t } = useTranslation('commons');
    return (
        <div>
            <h1>
                {t('Gallery')} {galleryTypes.Slug}
            </h1>
        </div>
    );
};

export default Gallery;

export async function getStaticProps({ locale }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
            query {
                galleryTypes(locale: "${locale}") {
                    Slug
                }
            }
        `,
    });

    return {
        props: {
            galleryTypes: {
                ...data?.galleryTypes[0],
            },
            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage'])),
            // Will be passed to the page component as props
        },
    };
}

export async function getStaticPaths({ locales }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
            query {
                galleryTypes(locale: "all") {
                    Slug
                }
            }
        `,
    });
    /// /
    const paths = [];

    locales.forEach((local) => {
        data.galleryTypes.forEach((galleryType) => {
            paths.push(`${local === 'pl' ? '/pl' : ''}/gallery/${galleryType.Slug}`);
        });
    });

    return { paths, fallback: false };
}
