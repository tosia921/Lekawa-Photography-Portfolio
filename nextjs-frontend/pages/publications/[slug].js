import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
// React Markdown
import ReactMarkdown from 'react-markdown';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Media Queries
import Head from 'next/head';
import { device } from '../../styles/Media';

// GalleryPageTemplate Component
const Publication = ({ publication, currLocale, slug }) => (
    <StyledPublicationPage>
        <Head>
            <title>{publication[0].SeoTitle === undefined ? '' : publication[0].SeoTitle}</title>
            <meta
                name="description"
                content={publication[0].SeoDescription === undefined ? '' : publication[0].SeoDescription}
            />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link
                rel="alternate"
                hrefLang={currLocale === 'en' ? 'pl' : 'en-gb'}
                href={
                    currLocale === 'en'
                        ? `https://lekawa-photography.co.uk/pl/publications/${slug}/`
                        : `https://lekawa-photography.co.uk/publications/${slug}/`
                }
            />
        </Head>
        <h1 className="title">{publication[0].Title}</h1>
        <div className="markdown-background">
            <ReactMarkdown
                transformImageUri={(src) => `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}${src}`}
                components={{
                    // Map `h1` (`# heading`) to use `h2`s.
                    h1: 'h2',
                    a: ({ href, children }) => (
                        <Link href={href}>
                            <a>{children}</a>
                        </Link>
                    ), // All other links
                }}
            >
                {publication[0].PublicationContent}
            </ReactMarkdown>
        </div>
    </StyledPublicationPage>
);

export default Publication;

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
            publications(locale: "${locale}", where: { Slug: "${params.slug}" }) {
              Title
              SeoTitle
              SeoDescription
              PublicationContent  
            }
          }
        `,
    });

    return {
        props: {
            publication: data.publications,
            currLocale: locale,
            slug: params.slug,
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
                publications(locale: "en") {
                    Slug
                }
            }
        `,
    });

    // empty array for future paths
    const paths = [];

    // adding generated path for each available local, each Publication gets its own page URL.
    locales.forEach((local) => {
        data.publications.forEach((publication) => {
            paths.push({ params: { slug: publication.Slug }, locale: local });
        });
    });

    return {
        paths,
        fallback: false,
    };
}

// Styles
const StyledPublicationPage = styled.section`
    min-height: calc(100vh - 11rem);
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
    img {
        display: block;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2rem;
        @media ${device.tablet} {
            width: 80%;
        }
        @media ${device.laptop} {
            width: 50%;
        }
        @media ${device.laptopL} {
            width: 50%;
        }
        @media ${device.desktop} {
            width: 50%;
        }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 2rem 0;
    }
    p {
        text-align: center;
    }
    .title {
        margin-top: 3rem;
        margin-bottom: 5rem;
    }
    .markdown-background {
        border-radius: 15px;
        padding: 1rem;
        width: 100%;
        height: 100%;
        background-color: var(--BoxBackground);
    }
`;
