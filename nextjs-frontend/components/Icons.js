import React from 'react';
import styled from 'styled-components';
// Icons
import { AiFillCamera } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import { MdHighQuality } from 'react-icons/md';
// Media Queries
import { device } from '../styles/Media';

const Quote = () => (
    <StyledIconsSection>
        <div className="icon-container">
            <AiFillCamera />
            <p>Using only top end equipment.</p>
        </div>
        <div className="icon-container">
            <BsImages />
            <p>Huge work experience.</p>
        </div>
        <div className="icon-container">
            <MdHighQuality />
            <p>High Quality</p>
        </div>
    </StyledIconsSection>
);

export default Quote;

const StyledIconsSection = styled.section`
    margin: 1rem 0 1rem 0;
    height: 20rem;
    width: 100%;
    background-image: url('/images/concrete-wall.png'),
        linear-gradient(to top, #4d4d4d, #464647, #404040, #3a393a, #343333);
    background-repeat: repeat;
    background-position: center bottom;
    background-size: contain;
    border-radius: 15px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    @media ${device.tablet} {
        height: 25rem;
    }
    @media ${device.laptop} {
        height: 30rem;
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
        p {
            text-align: center;
            font-family: Kanit, sans-serif;
            font-style: regular;
            font-weight: 400;
            font-size: 1.6rem;
            @media ${device.tablet} {
                font-size: 2rem;
            }
            @media ${device.laptop} {
                font-size: 2.5rem;
            }
        }

        span {
            color: var(--SecondaryTextColor);
            font-family: inherit;
        }
    }
`;
