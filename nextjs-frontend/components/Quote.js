import React from 'react';
import styled from 'styled-components';
// Media Queries
import { useTranslation } from 'next-i18next';
import { device } from '../styles/Media';
// i18n

const Quote = () => {
    // i18n hook that allows to use translations
    const { t } = useTranslation('commons');
    return (
        <StyledQuoteSection>
            <p>
                "{t('A')} <span>{t('picture')}</span>
                {t('is worth a')}
                <span>{t('thousand')}</span>
                {t('words')}"
            </p>
        </StyledQuoteSection>
    );
};

export default Quote;

const StyledQuoteSection = styled.section`
    margin: 1rem 0 1rem 0;
    height: 12rem;
    width: 100%;
    background-image: linear-gradient(to bottom, #4d4d4d, #464647, #404040, #3a393a, #343333);
    border-radius: 15px;

    display: flex;
    justify-content: center;
    align-items: center;
    @media ${device.tablet} {
        height: 16rem;
    }
    @media ${device.laptop} {
        height: 20rem;
    }
    p {
        font-family: Caveat, sans-serif;
        font-size: 2rem;
        @media ${device.tablet} {
            font-size: 3rem;
        }
        @media ${device.laptop} {
            font-size: 4rem;
        }
        span {
            color: var(--SecondaryTextColor);
            font-family: inherit;
            margin: 0 1rem;
        }
        span:first-child {
            margin-left: 0rem;
        }
    }
`;
