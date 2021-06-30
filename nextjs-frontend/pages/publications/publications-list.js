import React from 'react';
import styled from 'styled-components';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Media Queries
import Head from 'next/head';
import { device } from '../../styles/Media';

// GalleryPageTemplate Component
const PublicationsList = ({ publicationsList }) => {
    // i18n hook that allows to use translations
    const { t } = useTranslation('publicationsListPage');
    return (
        <StyledPublicationsList>
            <Head>
                <title>{t('Publications List - Tomasz Lekawa')}</title>
                <meta
                    name="description"
                    content={t('List of all publications in various fashion, clothing magazines by Tomasz Lekawa')}
                />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>{t('Publications List')}</h1>
            <ul className="publications-list">
                {publicationsList === null
                    ? 'No publications added to your CMS'
                    : publicationsList.PublicationsListItems.map((publication) => (
                          <li className="publication-item">{publication.ListItem}</li>
                      ))}
                <li className="publication-item">magazyn 2</li>
            </ul>
        </StyledPublicationsList>
    );
};

export default PublicationsList;

// getStaticProps Async function, that pulls in data from Sanity CMS based on current locale and slug passed in params object from getStaticPaths.
export async function getStaticProps({ locale }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    // GraphQL query
    const { data } = await client.query({
        query: gql`
            query {
                publicationsListPage(locale: "${locale}") {
                    PublicationsListItems {
                        id
                        ListItem
                    }
                }
            }
        `,
    });

    return {
        props: {
            publicationsList: data.publicationsListPage,

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
    h1 {
        margin: 2rem 0;
        @media ${device.tablet} {
            margin: 3rem 0;
        }
        @media ${device.laptop} {
            margin: 4rem 0;
        }
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
        padding: 2rem 2rem;
        background-image: url('/images/concrete-wall.png'),
            linear-gradient(to top, #4d4d4d, #464647, #404040, #3a393a, #343333);
        background-repeat: repeat;
        background-position: center bottom;
        background-size: contain;
        border-radius: 15px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        list-style-position: inside;
    }
    .publication-item {
        margin-bottom: 1.2rem;
        font-size: 1rem;

        @media ${device.tablet} {
            font-size: 1.4rem;
        }
        @media ${device.laptop} {
            font-size: 1.6rem;
        }

        &:first-child {
            margin-top: 0.5rem;
        }
        p {
        }
    }
`;
