import React from 'react';
import styled from 'styled-components';

const Footer = () => (
    <StyledFooter>
        <p>To jest footer</p>
    </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
    background: lightblue;
    height: 60px;
    margin: 0 -1rem -60px -1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
