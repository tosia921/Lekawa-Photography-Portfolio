import React from 'react';
import Image from 'next/image';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// Gallery Component
const Gallery = ({ galleryImages }) => {
    // Hook that allows me to use nexti18next translations
    const { t } = useTranslation('commons');

    return (
        <div>
            <h1>
                {t('Gallery')} {galleryImages[0].Name}
            </h1>
            <div>
                {galleryImages[0].GalleryImages.map((galleryImage) => (
                    <Image
                        src={`http://localhost:1337${galleryImage.Image.url}`}
                        alt={galleryImage.Alt}
                        width={galleryImage.Image.width}
                        height={galleryImage.Image.height}
                        quality="100"
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;

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

            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage'])),
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
