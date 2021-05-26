import React from 'react';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const Publications = ({ publications }) => {
    console.log(publications);
    // Hook that allows me to use nexti18next translations
    const { t } = useTranslation('commons');

    return (
        <div>
            <h1>{t('Publications')}</h1>
        </div>
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
