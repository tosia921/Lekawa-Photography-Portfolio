import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Navbar = () => (
    <StyledHeader>
        <Link href="about">About Me</Link>
    </StyledHeader>
);

export default Navbar;

const StyledHeader = styled.header`
    background: lightblue;
`;
