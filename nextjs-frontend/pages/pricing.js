import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Media Queries
import { device } from '../styles/Media';

// GalleryPageTemplate Component
const ModelingPage = ({ pageData }) => {
    // Hook that allows me to use nexti18next translations
    const { t } = useTranslation('pricingpage');
    console.log(pageData);
    // RETURNING JSX
    return (
        <StyledPricingPage>
            <Head>
                <title>{t('ATL Photography Pricing')}</title>
                <meta
                    name="description"
                    content={t('Pricing and type of every photoshoot offered by ATL Photography')}
                />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>{t('Pricing')}</h1>
            <section className="pricing-container">
                <p className="side-info">{t('Booking photo session date and time costs 30£ (non-refundable)  fee')}</p>
                {pageData.pricingCategories.map((pricingCategory) => (
                    <div className="pricing-categories">
                        <h2 key={pricingCategory.id}>{pricingCategory.Category}</h2>
                        {pricingCategory.pricing_types.map((type) => (
                            <div className="pricing-types">
                                <h3 className="underline">{type.Name}</h3>
                                <p className="type-description">{type.Description}</p>
                                <div className="type-images">
                                    {type.PreviewImages.map((image) => (
                                        <div className="image-container">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}${image.Image.url}`}
                                                alt={image.Alt}
                                                layout="responsive"
                                                width={image.Image.width}
                                                height={image.Image.height}
                                                quality={100}
                                                key={image.id}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="packages-container">
                                    <div className="package">
                                        <p className="package-name underline">{t('Package 1')}</p>
                                        <div className="package-features">
                                            {type.PricingPackage[0].PricingFeature.map((feature) => (
                                                <p>{feature.FeatureName}</p>
                                            ))}
                                        </div>
                                        <p className="package-price">
                                            {type.PricingPackage[0].PackagePrice.toFixed(2)}£
                                        </p>
                                    </div>
                                    <div className="line-throught" />
                                    <div className="package">
                                        <p className="package-name underline">{t('Package 2')}</p>
                                        <div className="package-features">
                                            {type.PricingPackage[1].PricingFeature.map((feature) => (
                                                <p>{feature.FeatureName}</p>
                                            ))}
                                        </div>
                                        <p className="package-price">
                                            {type.PricingPackage[1].PackagePrice.toFixed(2)}£
                                        </p>
                                    </div>
                                    <div className="line-throught" />
                                    <div className="package">
                                        <p className="package-name underline">{t('Package 3')}</p>
                                        <div className="package-features">
                                            {type.PricingPackage[2].PricingFeature.map((feature) => (
                                                <p>{feature.FeatureName}</p>
                                            ))}
                                        </div>
                                        <p className="package-price">
                                            {type.PricingPackage[2].PackagePrice.toFixed(2)}£
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <p className="side-info">
                    {t('All images are in digital version but prints are also available on request')}
                </p>
                <p className="side-info">
                    {t(
                        'Travel expenses will be charged if the photoshoot is more than 50 miles from Nottingham (NG5).Cost of travel expenses will be agreed with client in advance'
                    )}
                </p>
            </section>
        </StyledPricingPage>
    );
};

export default ModelingPage;

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
                pricingCategories(locale: "${locale}") {
                    id
                    Category
                    pricing_types {
                        Name
                        Description
                        PreviewImages {
                            id
                            Alt
                            Image {
                                width
                                height
                                url
                                alternativeText
                            }
                        }
                        PricingPackage {
                            PackagePrice
                            PricingFeature {
                                FeatureName
                                id
                            }
                        }
                    }
                }
            }
        `,
    });

    return {
        props: {
            pageData: data,

            ...(await serverSideTranslations(locale, [
                'common',
                'commons',
                'navigation',
                'homepage',
                'footer',
                'contact',
                'pricingpage',
            ])),
            // Will be passed to the page component as props
        },
    };
}

// Styles

const StyledPricingPage = styled.div`
    min-height: calc(100vh - 5rem);
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
        margin: 4rem 0;
    }
    h2 {
        font-size: 3.5rem;
        margin-bottom: 2rem;
        color: var(--SecondaryTextColor);
        @media ${device.laptop} {
            font-size: 4.5rem;
            margin-bottom: 5rem;
            margin-top: 3rem;
        }
    }
    h3 {
        font-size: 2.8rem;
        line-height: 2.8rem;
        margin-bottom: 1.5rem;
        text-shadow: var(--TextShadowSmall);
        @media ${device.laptop} {
            font-size: 3.5rem;
            margin-bottom: 3rem;
            margin-top: 3rem;
        }
    }

    .underline {
        text-decoration: underline;
        text-decoration-color: var(--SecondaryTextColor);
    }
    .line-throught {
        height: 1px;
        width: 100%;
        background-color: grey;
        margin-bottom: 1rem;
        @media ${device.laptopL} {
            display: none;
        }
    }
    .pricing-container {
        padding: 2rem;
        margin-bottom: 2rem;
        height: fit-content;
        width: 100%;
        background-image: url('/images/concrete-wall.png'),
            linear-gradient(to top, #4d4d4d, #464647, #404040, #3a393a, #343333);
        background-repeat: repeat;
        background-position: center bottom;
        background-size: contain;
        border-radius: 15px;
        .side-info {
            text-align: center;
            margin: 3rem 0;
            color: lightgrey;
        }
        .pricing-categories {
            .pricing-types {
                background-color: var(--PricingCardBackground);
                border-radius: 15px;
                padding: 1rem;
                box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
                &:not(:last-child) {
                    margin-bottom: 2rem;
                }
                .type-description {
                    font-size: 1.4rem;
                    text-align: center;
                    margin-bottom: 1rem;
                    @media ${device.tablet} {
                        padding: 0 4rem;
                        font-size: 1.6rem;
                    }
                }
                .type-images {
                    display: flex;
                    flex-flow: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                    @media ${device.tablet} {
                        margin-bottom: 3rem;
                        margin-top: 3rem;
                    }
                    .image-container {
                        width: 23.5%;
                        height: 100%;
                        position: relative;
                        @media ${device.laptopL} {
                            width: 12.1%;
                        }
                    }
                }
                .packages-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    @media ${device.laptopL} {
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: space-evenly;
                        margin: 4rem 0;
                    }
                    .package {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        &:not(:last-child) {
                            margin-bottom: 1rem;
                        }

                        .package-name {
                            font-size: 2.2rem;
                            font-weight: 500;
                            @media ${device.tablet} {
                                font-size: 3.5rem;
                            }
                        }
                        .package-features {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            height: 100%;
                            p {
                                font-size: 1.4rem;
                                @media ${device.tablet} {
                                    font-size: 1.6rem;
                                }
                            }
                        }
                        .package-price {
                            font-size: 2.4rem;
                            font-weight: 600;
                            color: var(--SecondaryTextColor);
                            @media ${device.tablet} {
                                font-size: 3rem;
                            }
                        }
                    }
                }
            }
        }
    }
`;
