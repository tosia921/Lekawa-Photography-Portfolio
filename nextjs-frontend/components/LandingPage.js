import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// i18n
import { useTranslation } from 'next-i18next';
// Media Queries
import { device } from '../styles/Media';

const StyledSection = styled.section`
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @media ${device.tablet} {
        padding: 0 1rem;
    }
    @media ${device.laptop} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-height: calc(100vh - 6rem);
        padding: 0 calc((100vw - 1100px) / 2);
    }

    @media ${device.laptopL} {
        padding: 0 calc((100vw - 1200px) / 2);
    }
    @media ${device.desktop} {
        padding: 0 calc((100vw - 1400px) / 2);
    }

    .yellow-bar {
        width: 100vw;
        margin-left: -1rem;
        padding: 1.5rem 1rem;
        background-color: var(--SecondaryTextColor);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;

        @media ${device.mobileM} {
            padding: 2rem 1rem;
        }
        @media ${device.tablet} {
            padding: 5rem 1rem;
        }
        @media ${device.laptop} {
            width: fit-content;
            align-self: stretch;
            margin-top: -8rem;
            margin-bottom: 0rem;
            padding: 0rem 3rem;
            margin-left: 0;
            align-items: flex-end;
            padding-bottom: 30%;
        }

        .landingPage-text {
            h1 {
                font-size: 3rem;
                line-height: 2.5rem;
                text-shadow: none;
                color: hsl(0, 0%, 18%);
                text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
                span {
                    display: block;
                }
                @media ${device.mobileM} {
                    font-size: 4rem;
                    line-height: 3.5rem;
                }
                @media ${device.tablet} {
                    font-size: 6rem;
                    line-height: 5rem;
                }
                @media ${device.laptop} {
                    font-size: 3rem;
                    line-height: 3rem;
                }
                @media ${device.laptopL} {
                    font-size: 4rem;
                    line-height: 4rem;
                }
                @media ${device.desktop} {
                    font-size: 6rem;
                    line-height: 6rem;
                }
            }
            h2 {
                text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
                font-size: 2rem;
                font-weight: 500;
                line-height: 2rem;
                margin-top: 1rem;
                font-style: medium italic;
                color: hsl(65, 5%, 98%);
                @media ${device.mobileM} {
                    font-size: 2.5rem;
                }
                @media ${device.tablet} {
                    font-size: 3.5rem;
                    margin-top: 1rem;
                }
                @media ${device.laptop} {
                    font-size: 2.5rem;
                    margin-top: 1rem;
                }
                @media ${device.desktop} {
                    font-size: 3.5rem;
                    margin-top: 1rem;
                }
            }
        }
    }
    .landingPage-photos {
        width: 100%;
        height: 60vh;
        display: grid;
        align-self: center;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1.7fr 1fr;
        gap: 0.5rem 0.5rem;
        grid-template-areas:
            'grid-item-1 grid-item-1 grid-item-1'
            'grid-item-2 grid-item-3 grid-item-4';

        @media ${device.tablet} {
            width: 100%;
            height: 90rem;
        }
        @media only screen and (min-width: 800px) {
            width: 95%;
        }
        @media only screen and (min-width: 850px) {
            width: 92%;
        }
        @media only screen and (min-width: 900px) {
            width: 90%;
        }
        @media only screen and (min-width: 950px) {
            width: 87%;
        }
        @media only screen and (min-width: 980px) {
            width: 85%;
        }
        @media ${device.laptop} {
            width: 60%;
            height: 90vh;
        }
        @media ${device.laptopL} {
            width: 50%;
        }
        @media ${device.desktop} {
            width: 53%;
        }

        .image-1 {
            position: relative;
            height: 100%;
            width: 100%;
            grid-area: grid-item-1;
            border: 1px solid hsl(65, 5%, 98%);
        }
        .image-2 {
            position: relative;
            height: 100%;
            width: 100%;
            grid-area: grid-item-2;
            border: 1px solid hsl(65, 5%, 98%);
        }
        .image-3 {
            position: relative;
            height: 100%;
            width: 100%;
            grid-area: grid-item-3;
            border: 1px solid hsl(65, 5%, 98%);
        }
        .image-4 {
            position: relative;
            height: 100%;
            width: 100%;
            grid-area: grid-item-4;
            border: 1px solid hsl(65, 5%, 98%);
        }
    }
`;

const LandingPage = () => {
    const { t } = useTranslation('homepage');
    return (
        <StyledSection>
            <div className="yellow-bar">
                <div className="landingPage-text">
                    <h1>
                        {t('h1line1')}
                        <span>{t('h1line2')}</span>
                    </h1>
                    <h2>Tomasz Lekawa</h2>
                </div>
            </div>

            <div className="landingPage-photos">
                <div className="image-1">
                    <Image
                        src="/images/alicjaHome.jpg"
                        alt="Men wearing a suit and glasses"
                        layout="fill"
                        objectFit="cover"
                        quality={75}
                        priority
                    />
                </div>
                <div className="image-2">
                    <Image
                        src="/images/image2-min.jpg"
                        alt="Men wearing a suit and glasses"
                        layout="fill"
                        objectFit="cover"
                        quality={75}
                        priority
                    />
                </div>
                <div className="image-3">
                    <Image
                        src="/images/image1-min.jpg"
                        alt="Men wearing a suit and glasses"
                        layout="fill"
                        objectFit="cover"
                        quality={75}
                        priority
                    />
                </div>
                <div className="image-4">
                    <Image
                        src="/images/image3-min.jpg"
                        alt="Men wearing a suit and glasses"
                        layout="fill"
                        objectFit="cover"
                        quality={75}
                        priority
                    />
                </div>
            </div>
        </StyledSection>
    );
};

export default LandingPage;
