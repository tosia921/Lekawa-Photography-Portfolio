import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
// Apollo client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// Media Queries
import { device } from '../styles/Media';
//sanity
import { getClient } from '../sanity/sanity.server';
import groq from 'groq';
import { urlFor } from '../sanity/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from '../sanity/sanity.server';


const About = ({ pageData, currLocale }) => {
    const { t } = useTranslation('about-page');

    console.log(pageData, currLocale)

    const imageProps = useNextSanityImage(
		sanityClient,
		pageData[0].aboutImage1
	);

    console.log(urlFor(imageProps))

    return (
        <AboutPage>
            <Head>
                <title>{t('About Title')}</title>
                <meta name="description" content={t('About Description')} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link
                    rel="alternate"
                    hrefLang={currLocale === 'en' ? 'pl' : 'en-gb'}
                    href={
                        currLocale === 'en'
                            ? 'https://lekawa-photography.co.uk/pl/about/'
                            : 'https://lekawa-photography.co.uk/about/'
                    }
                />
            </Head>
            <h1>{t('About Us')}</h1>
            <div className="about-content">
                <div className="person-1">
                    <div className="image-container">
                        {pageData[0].aboutImage1 === null ? (
                            'Add image to your CMS'
                        ) : (
                            <Image
                                className="gallery-preview-background"
                                {...imageProps}
                                alt={pageData[0].aboutImage1.altText}
                                layout="responsive"
                                quality="50"
                                priority
                            />
                        )}
                    </div>
                    {/* <p className="page-content">
                        {pageData.aboutUsPage.PageContent === null
                            ? 'Update text to your CMS'
                            : pageData.aboutUsPage.PageContent}
                    </p> */}
                </div>
                {/* <div className="person-2">
                    <div className="image-container">
                        {pageData.aboutUsPage === null ? (
                            'Add image to your CMS'
                        ) : (
                            <Image
                                className="gallery-preview-background"
                                src={`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}${pageData.aboutUsPage.AboutImage2.Image.url}`}
                                alt={pageData.aboutUsPage.AboutImage2.Alt}
                                layout="responsive"
                                width={pageData.aboutUsPage.AboutImage2.Image.width}
                                height={pageData.aboutUsPage.AboutImage2.Image.height}
                                quality="50"
                                priority
                            />
                        )}
                    </div>
                    <p className="page-content">
                        {pageData.aboutUsPage.PageContent2 === null
                            ? 'Update text to your CMS'
                            : pageData.aboutUsPage.PageContent2}
                    </p>
                </div> */}
            </div>
        </AboutPage>
    );
};

// getStaticProps Async function, that pulls in data from Sanity CMS based on current locale and slug passed in params object from getStaticPaths.
export async function getStaticProps({ locale, preview = false }) {
    // const client = new ApolloClient({
    //     uri: process.env.STRAPI_GRAPHQL_API,
    //     cache: new InMemoryCache(),
    // });

    // // GraphQL query
    // const { data } = await client.query({
    //     query: gql`
    //         query {
    //             aboutUsPage(locale: "${locale}") {
    //                 PageContent
    //                 PageContent2
    //                 AboutImage {
    //                     Alt
    //                     Image {
    //                         width
    //                         height
    //                         url
    //                     }
    //                 }
    //                 AboutImage2 {
    //                     Alt
    //                     Image {
    //                         width
    //                         height
    //                         url
    //                     }
    //                 }
    //             }
    //         }
    //     `,
    // });

    //sanity code
    const aboutPageData = await getClient(preview).fetch(groq`
    *[_type == "aboutPage"] {
        _id,
        "pageContent1": pageContent1["${locale}"],
        "pageContent2": pageContent2["${locale}"],
        aboutImage1 {
           "altText": altText["${locale}"],
           asset
        },
        aboutImage2 {
          "altText": altText["${locale}"],
           asset
        }
      }
    `)
    // end sanity code

    return {
        props: {
            // pageData: data,
            pageData: aboutPageData,
            currLocale: locale,
            ...(await serverSideTranslations(locale, ['commons', 'commons', 'navigation', 'about-page', 'footer'])),

            // Will be passed to the page component as props
        },
    };
}

export default About;

// Styles

const AboutPage = styled.section`
    min-height: calc(100vh - 50px);
    @media ${device.laptop} {
        padding: 0 calc((100vw - 1100px) / 2);
    }
    @media ${device.laptopL} {
        padding: 0 calc((100vw - 1200px) / 2);
    }
    @media ${device.desktop} {
        padding: 0 calc((100vw - 1400px) / 2);
    }
    h1 {
        margin: 4rem 0 3rem 0;
    }
    .about-content {
        min-height: calc(100vh - 17rem);
        width: 100%;
        background-image: linear-gradient(to bottom, #4d4d4d, #464647, #404040, #3a393a, #343333);
        border-radius: 15px;
        margin-bottom: 1rem;
        padding: 3rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .person-1 {
            margin-bottom: 5rem;
        }
        .person-1,
        .person-2 {
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            @media ${device.tablet} {
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 2rem;
            }
            .image-container {
                position: relative;
                height: fit-content;
                width: 80%;
                border-radius: 15px;
                @media ${device.mobileL} {
                    width: 40%;
                }
                @media ${device.laptop} {
                    width: 30%;
                }
            }
            .page-content {
                margin: 2rem 0;
                font-weight: 300;
                text-align: center;
                @media ${device.tablet} {
                    width: 50%;
                }
            }
        }
    }
`;
