import React from 'react';
import styled from 'styled-components';
//sanity
import { getClient } from '../../sanity/sanity.server';
import groq from 'groq';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Media Queries
import Head from 'next/head';
import { device } from '../../styles/Media';

// GalleryPageTemplate Component
const PublicationsList = ({ publicationsList }) => {
    console.log(publicationsList)
    // i18n hook that allows to use translations
    const { t } = useTranslation('publicationsListPage');
    return (
        <>
            <Head>
                <title>{t('Publications List - Tomasz Lekawa')}</title>
                <meta
                    name="description"
                    content={t('List of all publications in various fashion, clothing magazines by Tomasz Lekawa')}
                />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <StyledPublicationsList>
                <h1>{t('Publications List')}</h1>
                <div className='publications-list'>
                {   publicationsList === null
                        ? 'No publications added to your CMS'
                        : publicationsList.map(list => (
                        <div key={list._id}>
                            <h2>{list.title}</h2>
                            <ul>
                                { list.publicationsList.list.map((publication) => (
                                        <li className="publication-item" key={publication.id}>
                                            {publication.name}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))
                }
                </div>
                
            </StyledPublicationsList>
        </>
    );
};

export default PublicationsList;

// getStaticProps Async function, that pulls in data from Sanity CMS based on current locale and slug passed in params object from getStaticPaths.
export async function getStaticProps({ locale, preview=false }) {

    //sanity code
    const publicationsListData = await getClient(preview).fetch(groq`
    *[_type == "publicationList"] {
        "title": title["${locale}"],
         _id,
        publicationsList {
         list[] {
         _key,
         "name": name["${locale}"]
        }
       }
       
       }
    `)
    // end sanity code

    return {
        props: {
            publicationsList: publicationsListData,

            ...(await serverSideTranslations(locale, [
                'common',
                'commons',
                'navigation',
                'homepage',
                'publicationsListPage',
            ])),
            // Will be passed to the page component as props
        },
    };
}

// Styles
const StyledPublicationsList = styled.section`
    min-height: calc(100vh - 8rem);
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
    h1 {
        margin: 2rem 0;
        @media ${device.tablet} {
            margin: 3rem 0;
        }
        @media ${device.laptop} {
            margin: 4rem 0;
        }
    }
    h2 {
        text-align: start;
        font-size: 3rem;
        padding-top: 20px;
        padding-bottom: 10px;
    }
    ul {
        list-style-type: none;
    }
    .num-of-pub {
        font-size: 1.4rem;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            margin-left: 0.5rem;
            font-size: 1.6rem;
            color: var(--SecondaryTextColor);
        }
    }
    .publications-list {
        padding: 2rem 0 2rem 4rem;
        background-image: linear-gradient(to bottom, #4d4d4d, #464647, #404040, #3a393a, #343333);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        overflow-wrap: break-word;
        
    }
    .publication-item {
        margin-bottom: 1.2rem;
        font-size: 1.4rem;
        width: 80%;
        height: fit-content;

        @media ${device.tablet} {
            font-size: 1.6rem;
        }
        @media ${device.laptop} {
            font-size: 1.8rem;
        }

        &:first-child {
            margin-top: 0.5rem;
        }
        p {
        }
    }
    .publication-item::after {
        content: '';
        display: block;
        margin-top: 5px;
        height: 1px;
        opacity: 0.5;
        background-color: lightgrey;
    }
`;
