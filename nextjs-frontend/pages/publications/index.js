import React from 'react';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// Custom Components
import PublicationCard from '../../components/PublicationCard';
import { device } from '../../styles/Media';

const Publications = ({ publications }) => {
    // Hook that allows me to use nexti18next translations
    console.log(publications);
    const { t } = useTranslation('commons');

    return (
        <StyledPublications>
            <h1>{t('Publications')}</h1>
            {publications.map((publication) => (
                <PublicationCard publication={publication} key={publication.id} />
            ))}
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
            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage'])),
            // Will be passed to the page component as props
        },
    };
}

// Styles

const StyledPublications = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    }
`;
