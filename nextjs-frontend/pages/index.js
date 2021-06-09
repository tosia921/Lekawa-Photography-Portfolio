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
import PublicationsPreview from '../components/PublicationsPreview';
import BookingSection from '../components/BookingSection';
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
    .homepage-images {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        @media ${device.tablet} {
            flex-direction: row;
        }
        .image-home-container {
            position: relative;
            width: 100%;
            height: 50rem;
            &:not(:last-child) {
                margin-bottom: 1rem;
            }
            @media screen and (min-width: 450px) {
                height: 60rem;
            }
            @media screen and (min-width: 500px) {
                height: 70rem;
            }
            @media screen and (min-width: 600px) {
                height: 80rem;
            }
            @media screen and (min-width: 700px) {
                height: 90rem;
            }
            @media ${device.tablet} {
                width: 49.5%;
                height: 50rem;
            }
            @media ${device.laptop} {
                width: 49.5%;
                height: 70rem;
            }
            @media ${device.laptopL} {
                width: 49.5%;
                height: 80rem;
            }
        }
    }
`;

const Homepage = ({ imageGalleries, currLocale, publications }) => (
    <>
        <Head>
            <title>Lekawa Portfolio</title>
            <meta name="description" content="Tomasz Lekawa Photography Portfolio Website" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preload" href="/fonts/Caveat/Caveat-Regular.ttf" as="font" type="font/ttf" crossOrigin="" />
            <link rel="preload" href="/fonts/Kanit/Kanit-BoldItalic.ttf" as="font" type="font/ttf" crossOrigin="" />
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
                    width={2550}
                    height={1650}
                    quality={75}
                    priority
                />
                <Galleries imageGalleries={imageGalleries} currLocale={currLocale} />
                <Icons />
                <div className="homepage-images">
                    <div className="image-home-container">
                        <Image
                            src="/images/ManInSuitHome.jpg"
                            alt="Men wearing a suit and glasses"
                            layout="fill"
                            objectFit="cover"
                            quality={75}
                            priority
                        />
                    </div>
                    <div className="image-home-container">
                        <Image
                            src="/images/WomenYellowTopHome.jpg"
                            alt="Women in yellow top"
                            layout="fill"
                            objectFit="cover"
                            quality={75}
                            priority
                        />
                    </div>
                </div>
            </div>
            <PublicationsPreview publications={publications} />
            <BookingSection />
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
                publications(locale: "${locale}") {
                    id
                    Title
                    Slug
                    HomePage
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
            currLocale: locale,
            imageGalleries: data.imageGalleries,
            publications: data.publications,
            ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage', 'footer'])),
            // Will be passed to the page component as props
        },
    };
}

export default Homepage;
