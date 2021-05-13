import React from 'react';
import styled from 'styled-components';

const BurgerButton = ({ burgerMenu, setBurgerMenu }) => (
    <StyledBurgerButton burgerMenu={burgerMenu} onClick={() => setBurgerMenu(!burgerMenu)}>
        <li />
        <li />
        <li />
    </StyledBurgerButton>
);

export default BurgerButton;

const StyledBurgerButton = styled.ul`
    width: 35px;
    height: 35px;
    cursor: pointer;
    position: relative;
    z-index: 10;
    li {
        list-style: none;
        position: absolute;
        left: 0;
        background: var(--MainTextColor);
        width: 100%;
        height: 2px;
        transform: translateY(-50%);
        transition: all 0.6s ease;
    }
    li:nth-of-type(1) {
        top: 20%;
    }
    li:nth-of-type(2) {
        top: 50%;
    }
    li:nth-of-type(3) {
        top: 80%;
    }

    li:nth-of-type(1) {
        transform: ${(props) => (props.burgerMenu ? `translateY(-50%) rotate(45deg)` : `translateY(0%) rotate(0deg)`)};
        top: ${(props) => (props.burgerMenu ? `50%` : `20%`)};
    }
    li:nth-of-type(2) {
        transform: ${(props) => (props.burgerMenu ? `translateY(-50%) rotate(-45deg)` : `translateY(0%) rotate(0deg)`)};
    }
    li:nth-of-type(3) {
        left: ${(props) => (props.burgerMenu ? `100%` : `0`)};
        opacity: ${(props) => (props.burgerMenu ? `0` : `1`)};
    }
`;
