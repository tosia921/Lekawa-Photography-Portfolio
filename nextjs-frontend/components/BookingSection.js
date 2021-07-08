import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
// i18n
import { useTranslation } from 'next-i18next';
// Media Queries
import { device } from '../styles/Media';

const BookingSection = () => {
    // i18n hook that allows to use translations
    const { t } = useTranslation('commons');
    return (
        <StyledBookingSection>
            <p>
                {t("Don't wait,")}
                <span>{t('book')}</span>
                {t('your session today!')}
            </p>
            <Link href="/contact">
                <button type="button">{t('Contact Us!')}</button>
            </Link>
        </StyledBookingSection>
    );
};

export default BookingSection;

const StyledBookingSection = styled.section`
    margin: 1rem 0;
    @media ${device.tablet} {
        margin: 1rem 1rem;
    }
    @media ${device.laptop} {
        margin: 1rem calc((100vw - 1100px) / 2);
    }
    @media ${device.laptopL} {
        margin: 1rem calc((100vw - 1200px) / 2);
    }
    @media ${device.desktop} {
        margin: 1rem calc((100vw - 1400px) / 2);
    }
    height: 12rem;
    background-image: linear-gradient(to bottom, #4d4d4d, #464647, #404040, #3a393a, #343333);
    border-radius: 15px;

    display: flex;
    flex-direction: column;
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
        margin-bottom: 2rem;
        @media ${device.tablet} {
            font-size: 3rem;
        }
        @media ${device.laptop} {
            font-size: 4rem;
        }
        span {
            margin: 0 1rem;
            color: var(--SecondaryTextColor);
            font-family: inherit;
        }
    }
    button {
        font-size: 1.8rem;
        font-weight: 500;
        padding: 1rem 2rem;
        border-radius: 50px;
        border: none;
        box-shadow: var(--TextShadowSmall);
        transition: all 0.2s ease-in;
        cursor: pointer;
        &:hover {
            transform: translateY(-2px);
            background-color: var(--SecondaryTextColor);
            box-shadow: var(--TextShadowMedium);
        }
        &:active,
        &:focus {
            transform: translateY(0);
            box-shadow: var(--TextShadowSmall);
        }
    }
`;
