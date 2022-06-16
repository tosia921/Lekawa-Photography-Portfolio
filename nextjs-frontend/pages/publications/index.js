import React from 'react';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Custom Components
import Head from 'next/head';
import Link from 'next/link';
import PublicationCard from '../../components/PublicationCard';
import { device } from '../../styles/Media';
//sanity
import { getClient } from '../../sanity/sanity.server';
import groq from 'groq';

const Publications = ({ publications, currLocale }) => {
    // Hook that allows me to use nexti18next translations
    const { t } = useTranslation('commons');

    return (
        <StyledPublications>
            <Head>
                <title>{t('Publications Title')}</title>
                <meta name="description" content={t('Publications Description')} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link
                    rel="alternate"
                    hrefLang={currLocale === 'en' ? 'pl' : 'en-gb'}
                    href={
                        currLocale === 'en'
                            ? 'https://lekawa-photography.co.uk/pl/publications'
                            : 'https://lekawa-photography.co.uk/publications'
                    }
                />
            </Head>
            <h1>{t('Publications')}</h1>
            <Link href="/publications/publications-list">{t('Click here to see full list of publications')}</Link>
            <div className='publications-container'>
                {publications.length > 0 ? (
                    publications.map((publication) => (
                        <PublicationCard publication={publication} key={publication._id} />
                    ))
                ) : (
                    <h3>There is not a single Publication to display yet!</h3>
                )}
            </div>
        </StyledPublications>
    );
};

export default Publications;

// getStaticProps async function, pulls in Publications data from Strapi CMS based on current locale.
export async function getStaticProps({ locale, preview = false }) {
    
    //sanity code
    const publicationsPageData = await getClient(preview).fetch(groq`
    *[_type == "publication"] | order(order asc) {
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

    return {
        props: {
            publications: publicationsPageData,
            currLocale: locale,
            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage', 'footer'])),
            // Will be passed to the page component as props
        },
    };
}

// Styles

const StyledPublications = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 452px);
    @media ${device.tablet} {
        padding: 0 1rem;
        min-height: calc(100vh - 219px);
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
    h1 {
        margin: 4rem 0 2rem 0;
    }
    h3 {
        font-size: 1.6rem;
    }
    a {
        font-size: 1.4rem;
        @media ${device.tablet} {
            font-size: 1.5rem;
        }
        @media ${device.laptop} {
            font-size: 1.6rem;
        }
        font-weight: 500;
        text-decoration: underline;
        margin-bottom: 3rem;
        &:hover {
            text-decoration-color: var(--SecondaryTextColor);
        }
    }
    .publications-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
    }
`;
