import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// Components
import LandingPage from '../components/LandingPage';
import Quote from '../components/Quote';
import Galleries from '../components/Galleries';
import Icons from '../components/Icons';
// Media Queries
import { device } from '../styles/Media';

const StyledMain = styled.main`
    .ImageAlicja {
        border-radius: 15px;
    }
    .page-padding {
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
    }
`;

const Homepage = ({ imageGalleries, currLocale }) => (
    <>
        <Head>
            <title>Lekawa Portfolio</title>
            <meta name="description" content="Tomasz Lekawa Photography Portfolio Website" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <StyledMain>
            <LandingPage />
            <div className="page-padding">
                <Quote />
                <Image
                    className="ImageAlicja"
                    src="/images/alicjaHome.jpg"
                    alt="Women in Hat"
                    layout="responsive"
                    width={5100}
                    height={3300}
                />
                <Galleries imageGalleries={imageGalleries} currLocale={currLocale} />
                <Icons />
            </div>
        </StyledMain>
    </>
);

export async function getStaticProps({ locale }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
            query {
                imageGalleries(locale: "${locale}") {
                    id
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
            currLocale: locale,
            imageGalleries: data.imageGalleries,
            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage'])),
            // Will be passed to the page component as props
        },
    };
}

export default Homepage;
