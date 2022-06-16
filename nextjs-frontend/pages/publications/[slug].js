import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Img from 'next/image';
//sanity
import { getClient } from '../../sanity/sanity.server';
import groq from 'groq';
import { nextSanityImage } from '../../sanity/sanity.server';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Media Queries
import Head from 'next/head';
import { device } from '../../styles/Media';
// portable text
import {PortableText} from '@portabletext/react'




// GalleryPageTemplate Component
const Publication = ({ publication, currLocale, slug }) => {
    
    const PublicationComponents = {
        types: {
            image: ({value}) => {
                return (
                    
                        <img
                            className="publication-image"
                            src={nextSanityImage(value).src}
                            alt={value.alt || ' '}
                         
                        />
                    
                )
            }
        }
    }

    return (
        <StyledPublicationPage>
            <Head>
                <title>{publication[0].seoTitle === undefined ? '' : publication[0].seoTitle}</title>
                <meta
                    name="description"
                    content={publication[0].seoDescription === undefined ? '' : publication[0].seoDescription}
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
            <h1 className="title">{publication[0].title}</h1>
            <div className="markdown-background">
                {
                    currLocale === 'en' ?
                    <PortableText value={publication[0].bodyEnglish} components={PublicationComponents} />
                    :
                    <PortableText value={publication[0].bodyPolish} components={PublicationComponents} />
                }
                
            </div>
        </StyledPublicationPage>
    )
}


export default Publication;

// getStaticProps Async function, that pulls in data from Sanity CMS based on current locale and slug passed in params object from getStaticPaths.
export async function getStaticProps({ locale, params, preview = false }) {
    console.log(params.slug)
    //sanity code
    const singlePublicationData = await getClient(preview).fetch(groq`
    *[_type == "publication" && slug.current == "${params.slug}"] {
        "title": title["${locale}"],
        _id,
        slug,
        previewImage {
              _type,
              "altText": altText["${locale}"],
              asset,
            },
        "smallText1": smallText1["${locale}"],
        "smallText2": smallText2["${locale}"],
        "location": location["${locale}"],
        Date,
        "seoTitle": seoTitle["${locale}"],
        "seoDescription": seoDescription["${locale}"],
        isHomepage,
        bodyEnglish,
        bodyPolish
       }
    `)
    // end sanity code
       console.log(singlePublicationData)
    return {
        props: {
            publication: singlePublicationData,
            currLocale: locale,
            slug: params.slug,
            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage'])),
            // Will be passed to the page component as props
        },
    };
}

// getStaticPaths async function that generates url for each static gallery page.
export async function getStaticPaths({ locales, preview=false }) {
    //sanity code
    const singlePublicationSlugs = await getClient(preview).fetch(groq`
    *[_type == "publication"] {
        slug
       }
    `)
    // end sanity code

    // empty array for future paths
    const paths = [];

    // adding generated path for each available local, each Publication gets its own page URL.
    locales.forEach((local) => {
        singlePublicationSlugs.forEach((singlePublication) => {
            paths.push({ params: { slug: singlePublication.slug.current}, locale: local });
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
    .publication-image {
        display: block;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2rem;
        @media ${device.tablet} {
            width: 70%;
        }
        @media ${device.laptop} {
            width: 50%;
        }
        @media ${device.laptopL} {
            width: 40%;
        }
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 2rem 0 0.5rem 0;
    }
    h4 {
        font-size: 2.5rem;
        font-weight: 500;
    }
    ul {
        font-size: 16px;
        margin: 1rem 0;
    }
    p {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        min-height: 20px;
    }
    strong {
        font-weight: 700;
    }
    a {
        text-decoration: underline;
        &:hover {
            color: var(--SecondaryTextColor);
        }
    }
    .title {
        margin-top: 3rem;
        margin-bottom: 5rem;
    }
    .markdown-background {
        border-radius: 15px;
        padding: 1rem;
        padding-bottom: 4rem;
        width: 100%;
        height: 100%;
        background-color: var(--BoxBackground);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
