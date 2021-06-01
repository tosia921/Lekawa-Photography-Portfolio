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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        z-index: 2;
        position: relative;
        padding: 5% 0 10% 0;
        h1 {
            span {
                display: block;
            }
        }
        @media ${device.tablet} {
            padding: 4% 0 20% 0;
            h1 {
                font-size: 6rem;
                line-height: 5.5rem;
            }
            h2 {
                font-size: 5rem;
            }
        }
        @media ${device.laptop} {
            padding: 3% 0 6% 0;
            h1 {
                font-size: 10rem;
                line-height: 10rem;
            }
            h2 {
                font-size: 8rem;
            }
        }
        @media ${device.laptopL} {
            padding: 3% 0 6% 0;
            h1 {
                font-size: 8rem;
                line-height: 8rem;
            }
            h2 {
                font-size: 6.5rem;
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
                    src="/images/HomepageMobile.jpg"
                    alt="Women with red hair"
                    layout="fill"
                    objectFit="cover"
                    quality="75"
                    priority
                />
                <Image
                    className="image-hero-tablet"
                    src="/images/HomepageTablet.png"
                    alt="Women with red hair"
                    layout="fill"
                    objectFit="cover"
                    quality="75"
                    priority
                />
                <Image
                    className="image-hero-desktop"
                    src="/images/HomepageDesktop.jpg"
                    alt="Women with red hair"
                    layout="fill"
                    objectFit="cover"
                    quality="75"
                    priority
                />
            </div>
            <div className="landingPage-text">
                <h1>
                    {t('h1line1')}
                    <span>{t('h1line2')}</span>
                </h1>
                <h2>
                    <span className="highlighted-text">T</span>omasz <span className="highlighted-text">L</span>ekawa
                </h2>
            </div>
        </StyledSection>
    );
};

export default LandingPage;
