import React from 'react';
import styled from 'styled-components';
// Media Queries
import { device } from '../styles/Media';

const Quote = () => (
    <StyledQuoteSection>
        <p>
            "A <span>picture</span> is worth a <span>thousand</span> words."
        </p>
    </StyledQuoteSection>
);

export default Quote;

const StyledQuoteSection = styled.section`
    margin: 1rem 0 1rem 0;
    height: 12rem;
    width: 100%;
    background-image: url('/images/concrete-wall.png'),
        linear-gradient(to top, #4d4d4d, #464647, #404040, #3a393a, #343333);
    background-repeat: repeat;
    background-position: center bottom;
    background-size: contain;
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
        }
    }
`;
