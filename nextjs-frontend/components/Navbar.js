import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import MobileMenu from './MobileMenu';

const Navbar = () => (
    <StyledHeader>
        <Logo>
            <p>ATL Photoraphy</p>
        </Logo>
        <MobileMenu />
        <Nav>
            <Link href="about">About Me</Link>
        </Nav>
        <LangPicker>
            <p>Lang</p>
        </LangPicker>
    </StyledHeader>
);

export default Navbar;

const StyledHeader = styled.header`
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
`;

const Logo = styled.div`
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
