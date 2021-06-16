import React from 'react';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// Custom Components
import Head from 'next/head';
import Link from 'next/link';
import PublicationCard from '../../components/PublicationCard';
import { device } from '../../styles/Media';

const Publications = ({ publications }) => {
    // Hook that allows me to use nexti18next translations
    const { t } = useTranslation('commons');

    // Sorting list of publications to display at the top the ones that were marked as DisplayTop = true in Strapi CMS
    // filtering the ones that have value set to true
    const DisplayAtTopPublications = publications.filter((publication) => publication.DisplayTop === true);
    // filtering the ones that have value set to false
    const DisplayAtBottomPublications = publications.filter((publication) => publication.DisplayTop === false);
    // combining both arrays with the ones that have DisplayTop value set to true at begginning of the new array
    const SortedPublications = DisplayAtTopPublications.concat(DisplayAtBottomPublications);

    return (
        <StyledPublications>
            <Head>
                <title>{t('Publications Title')}</title>
                <meta name="description" content={t('Publications Description')} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>{t('Publications')}</h1>
            <Link href="/publications/publications-list">{t('Click here to see full list of publications')}</Link>
            {SortedPublications.length > 0 ? (
                SortedPublications.map((publication) => (
                    <PublicationCard publication={publication} key={publication.id} />
                ))
            ) : (
                <h3>There is not a single Publication to display yet!</h3>
            )}
        </StyledPublications>
    );
};

export default Publications;

// getStaticProps async function, pulls in Publications data from Strapi CMS based on current locale.
export async function getStaticProps({ locale }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    // GraphQL query
    const { data } = await client.query({
        query: gql`
            query {
                publications(locale: "${locale}") {
                    id
                    Title
                    Slug
                    DisplayTop
                    FeaturedImage {
                        AltText
                        Image {
                            url
                            width
                            height
                        }
                    }
                    SmallText1
                    SmallText2
                    Location
                    Date
                }
            }
        `,
    });

    return {
        props: {
            publications: data.publications,
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
`;
