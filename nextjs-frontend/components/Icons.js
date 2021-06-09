import React from 'react';
import styled from 'styled-components';
// i18n
import { useTranslation } from 'next-i18next';
// Icons
import { AiFillCamera } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import { MdHighQuality } from 'react-icons/md';
// Media Queries
import { device } from '../styles/Media';

const Quote = () => {
    // i18n hook that allows to use translations
    const { t } = useTranslation('commons');
    return (
        <StyledIconsSection>
            <div className="icon-container">
                <AiFillCamera />
            </div>
            <p className="text1">{t('Top End Equipment')}</p>
            <div className="icon-container">
                <BsImages />
            </div>
            <p className="text2">{t('Huge Work Experience')}</p>
            <div className="icon-container">
                <MdHighQuality />
            </div>
            <p className="text3">{t('High Quality Photos')}</p>
        </StyledIconsSection>
    );
};

export default Quote;

const StyledIconsSection = styled.section`
    margin: 1rem 0 1rem 0;
    height: fit-content;
    padding: 5rem 0;
    width: 100%;
    background-image: url('/images/concrete-wall.png'),
        linear-gradient(to top, #4d4d4d, #464647, #404040, #3a393a, #343333);
    background-repeat: repeat;
    background-position: center bottom;
    background-size: contain;
    border-radius: 15px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
    justify-items: center;
    align-items: center;
    @media ${device.tablet} {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
    @media ${device.laptop} {
    }
    .icon-container {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        svg {
            font-size: 5rem;
        }
    }
    p {
        text-align: center;
        font-family: Kanit, sans-serif;
        font-style: regular;
        font-weight: 400;
        font-size: 2rem;
        margin-bottom: 5rem;

        @media ${device.tablet} {
            font-size: 2rem;
        }
        @media ${device.laptop} {
            font-size: 2.5rem;
        }
    }
    .text1 {
        @media ${device.laptop} {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
        }
    }
    .text2 {
        @media ${device.laptop} {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
        }
    }
    .text3 {
        @media ${device.laptop} {
            grid-column: 3 / 4;
            grid-row: 2 / 3;
        }
    }
`;
