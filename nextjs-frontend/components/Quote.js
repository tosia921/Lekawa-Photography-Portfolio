import React from 'react';
import styled from 'styled-components';

const Quote = () => {
    const a = 3;
    return (
        <StyledQuoteSection>
            <p>
                "A <span>picture</span> is worth a <span>thousand</span> words."
            </p>
        </StyledQuoteSection>
    );
};

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
    p {
        font-family: Caveat, sans-serif;
        font-size: 2rem;
        span {
            color: var(--SecondaryTextColor);
            font-family: inherit;
        }
    }
`;
