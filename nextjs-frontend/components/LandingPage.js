import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// i18n
import { useTranslation } from 'next-i18next';
// Media Queries
import { device } from '../styles/Media';

const StyledSection = styled.section`
    .bg-wrap {
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .image-hero-mobile {
        z-index: -1;
        @media ${device.tablet} {
            display: none !important;
        }
    }
    .image-hero-tablet {
        z-index: -1;
        display: none !important;
        @media ${device.tablet} {
            display: block !important;
        }
        @media ${device.laptopL} {
            display: none !important;
        }
    }
    .image-hero-desktop {
        z-index: -1;
        display: none !important;
        @media ${device.laptopL} {
            display: block !important;
        }
    }
    @media (orientation: landscape) {
        .image-hero-tablet,
        .image-hero-mobile {
            display: none !important;
        }
        .image-hero-desktop {
            display: block !important;
        }
    }
    .landingPage-text {
        height: calc(100vh - 50px);
        padding-top: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        z-index: 2;
        position: relative;

        h1 {
            span {
                display: block;
            }
        }
        h2 {
            font-size: 2.2rem;
            span {
                font-size: inherit;
                margin-right: 0.3rem;
            }
        }
        @media ${device.tablet} {
            padding: 4% 0 20% 0;

            h1 {
                font-size: 6rem;
                line-height: 5.5rem;
                margin-bottom: 1rem;
            }
            h2 {
                font-size: 3rem;
            }
        }
        @media ${device.laptop} {
            padding: 3% 0 6% 0;
            h1 {
                font-size: 8rem;
                line-height: 8rem;
                span {
                    margin-top: -1.7rem;
                }
            }
            h2 {
                font-size: 3rem;
            }
        }
        @media ${device.laptopL} {
            padding: 2rem;
            h1 {
                font-size: 8rem;
                line-height: 8rem;
            }
            h2 {
                font-size: 3rem;
            }
        }
        @media ${device.desktop} {
            h1 {
                font-size: 10rem;
                line-height: 10rem;
            }
            h2 {
                font-size: 5rem;
            }
        }
    }
`;

const LandingPage = () => {
    const { t } = useTranslation('homepage');
    return (
        <StyledSection>
            <div className="bg-wrap">
                <Image
                    className="image-hero-mobile"
                    src="/images/LandingPagePhone.jpg"
                    alt="Women with red hair"
                    layout="fill"
                    objectFit="cover"
                    quality="50"
                    priority
                />
                <Image
                    className="image-hero-tablet"
                    src="/images/LandingPageTabletVertical.jpg"
                    alt="Women with red hair"
                    layout="fill"
                    objectFit="cover"
                    quality="70"
                    priority
                />
                <Image
                    className="image-hero-desktop"
                    src="/images/LandingPageDesktop.jpg"
                    alt="Women with red hair"
                    layout="fill"
                    objectFit="cover"
                    quality="80"
                    priority
                />
            </div>
            <div className="landingPage-text">
                <h1>
                    {t('h1line1')}
                    <span>{t('h1line2')}</span>
                </h1>
                <h2>Tomasz Lekawa</h2>
            </div>
        </StyledSection>
    );
};

export default LandingPage;
