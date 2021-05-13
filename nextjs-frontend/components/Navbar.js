import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import MobileMenu from './MobileMenu';
import BurgerButton from './BurgerButton';

const Navbar = () => {
    const [burgerMenu, setBurgerMenu] = useState(false);
    return (
        <StyledHeader>
            <Logo>
                <p>ATL Photoraphy</p>
            </Logo>
            <BurgerButton burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
            <Nav>
                <Link href="about">About Me</Link>
            </Nav>
            <LangPicker>
                <p>Lang</p>
            </LangPicker>
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
    justify-content: space-between;
    z-index: 10;
`;

const Logo = styled.div`
    position: relative;
    z-index: 10;
    p {
        font-size: 2rem;
    }
`;

const LangPicker = styled.div`
    display: none;
`;
const Nav = styled.nav`
    display: none;
    @media only screen and (min-width: 768px) {
        display: block;
    }
`;
