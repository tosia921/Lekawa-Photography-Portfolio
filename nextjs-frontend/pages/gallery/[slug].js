import React from 'react';
import Image from 'next/image';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// Gallery Component
const Gallery = ({ galleryTypes }) => {
    console.log(galleryTypes);
    const { t } = useTranslation('commons');
    return (
        <div>
            <h1>
                {t('Gallery')} {galleryTypes[0].Name}
            </h1>
            <div>
                {galleryTypes[0].GalleryPageImages.map((pageImage) => (
                    <Image
                        src={`http://localhost:1337${pageImage.Image.url}`}
                        alt={pageImage.Alt}
                        width={pageImage.Image.width}
                        height={pageImage.Image.height}
                        quality="100"
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;

export async function getStaticProps({ locale, params }) {
    console.log(params.slug);
    console.log(locale);
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
            query {
                galleryTypes(locale: "${locale}", where: { Slug: "${params.slug}" }) {
                    Name
                    Slug
                    GalleryPageImages {
                        Alt
                        Featured
                        Image {
                            width
                            height
                            url
                        }
                    }
                }
            }
        `,
    });

    return {
        props: {
            galleryTypes: data.galleryTypes,

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

    const paths = [];

    locales.forEach((local) => {
        data.galleryTypes.forEach((galleryType) => {
            paths.push({ params: { slug: galleryType.Slug }, locale: local });
        });
    });

    return {
        paths,
        fallback: false,
    };
}

/// /////////////////////

// const { data } = await client.query({
//     query: gql`
//         query {
//             galleryTypes(locale: "all") {
//                 Slug
//             }
//         }
//     `,
// });

// const paths = [];

// locales.forEach((local) => {
//     data.galleryTypes.forEach((galleryType) => {
//         paths.push(`${local === 'pl' ? '/pl' : ''}/gallery/${galleryType.Slug}`);
//     });
// });

// return { paths, fallback: false };
