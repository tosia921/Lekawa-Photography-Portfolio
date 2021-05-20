import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import MobileMenu from './MobileMenu';
import BurgerButton from './BurgerButton';
import LangSelect from './LangSelect';

const Navbar = () => {
    const [burgerMenu, setBurgerMenu] = useState(false);
    return (
        <StyledHeader>
            <Logo>
                <p>ATL Photoraphy</p>
            </Logo>
            <Nav>
                <Link href="about">About Me</Link>
            </Nav>
            <div className="right-side">
                <LangSelect />
                <BurgerButton burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
            </div>
            <MobileMenu burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
        </StyledHeader>
    );
};

export default Navbar;

const StyledHeader = styled.header`
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;

    button {
        position: relative;
        z-index: 20;
    }
    .right-side {
        margin-left: auto;
        display: flex;
    }
`;

const Logo = styled.div`
    position: relative;
    z-index: 10;
    p {
        font-size: 2rem;
    }
`;

const Nav = styled.nav`
    display: none;
    @media only screen and (min-width: 768px) {
        display: block;
    }
`;
