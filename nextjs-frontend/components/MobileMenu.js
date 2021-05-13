import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const MobileMenu = () => {
    const [burgerMenu, setBurgerMenu] = useState(false);
    return (
        <>
            <StyledBurger burgerMenu={burgerMenu} onClick={() => setBurgerMenu(!burgerMenu)}>
                <div className="hamburger" />
            </StyledBurger>
            <StyledMobileMenu>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </StyledMobileMenu>
        </>
    );
};

export default MobileMenu;

const StyledBurger = styled.button`
    outline: none;
    height: 30px;
    width: 30px;
    border: 0px;
    padding: 0px;
    background: transparent;

    .hamburger {
        display: flex;
        outline: none;
        height: 30px;
        width: 30px;
        border: 0px;
        padding: 0px;
        background: transparent;
        transition: all 250ms ease-out;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }
    .hamburger:before,
    .hamburger:after {
        content: '';
        width: 30px;
        height: 1.5px;
        position: absolute;
        background: var(--MainTextColor);
        transition: all 250ms ease-out;
        will-change: transform;
    }
    .hamburger:before {
        transform: ${(props) => (props.burgerMenu ? `translateY(12px) rotate(45deg)` : `translateY(12px)`)};
    }
    .hamburger:after {
        transform: ${(props) => (props.burgerMenu ? `translateY(12px) rotate(-45deg)` : `translateY(6px)`)};
    }
`;

const StyledMobileMenu = styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 0;
    background-color: grey;
`;
