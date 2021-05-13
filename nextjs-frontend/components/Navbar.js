import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Navbar = () => (
    <StyledHeader>
        <Logo>
            <p>ATL Photoraphy</p>
        </Logo>
        <nav>
            <Link href="about">About Me</Link>
        </nav>
        <div>
            <p>Lang</p>
        </div>
    </StyledHeader>
);

export default Navbar;

const StyledHeader = styled.header`
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    font-size: 2.5rem;
`;
