import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// i18n
import { useTranslation } from 'next-i18next';

const StyledSection = styled.section`
    .bg-wrap {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .image-hero {
        z-index: -1;
    }
    .landingPage-text {
        height: calc(100vh - 50px);
        padding-top: 5%;
        padding-bottom: 27%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        z-index: 2;
        position: relative;
    }
`;

const LandingPage = () => {
    const { t } = useTranslation('homepage');
    return (
        <StyledSection>
            <div className="bg-wrap">
                <Image
                    className="image-hero"
                    src="/images/HeroImage.jpg"
                    alt="Women laying"
                    layout="fill"
                    objectFit="cover"
                    quality="100"
                />
            </div>
            <div className="landingPage-text">
                <h1>{t('h1')}</h1>
                <h2>
                    <span className="highlighted-text">T</span>omasz <span className="highlighted-text">L</span>ekawa
                </h2>
            </div>
        </StyledSection>
    );
};

export default LandingPage;
