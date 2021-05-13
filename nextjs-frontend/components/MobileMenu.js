import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MobileMenu = ({ burgerMenu, setBurgerMenu }) => {
    const router = useRouter();

    // Since Next.js 'Link' does not pass onClick events,
    // had to use useRouter hook and push to other page to
    // have ability to close menu when clicking on Link.
    const handleClick = (e, path) => {
        e.preventDefault();
        setBurgerMenu(!burgerMenu);
        router.push(path);
    };

    return (
        <StyledMobileMenu burgerMenu={burgerMenu}>
            <Link href="/" passHref>
                <a onClick={(e) => handleClick(e, '/')} aria-hidden="true">
                    Home
                </a>
            </Link>
            <Link href="/about" passHref>
                <a onClick={(e) => handleClick(e, '/about')} aria-hidden="true">
                    About
                </a>
            </Link>
            <Link href="/gallery" passHref>
                <a onClick={(e) => handleClick(e, '/gallery')} aria-hidden="true">
                    Gallery
                </a>
            </Link>
            <Link href="/publications" passHref>
                <a onClick={(e) => handleClick(e, '/publications')} aria-hidden="true">
                    Publications
                </a>
            </Link>
            <Link href="/contact" passHref>
                <a onClick={(e) => handleClick(e, '/contact')} aria-hidden="true">
                    Contact
                </a>
            </Link>
        </StyledMobileMenu>
    );
};

export default MobileMenu;

const StyledMobileMenu = styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${(props) => (props.burgerMenu ? `1` : `0`)};
    transition: opacity 0.5s ease-in-out;
    height: 100vh;
    width: 100vw;
    z-index: 5;
    background-color: var(--BoxBackground);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
        font-size: 4rem;
        &:hover {
            color: var(--SecondaryTextColor);
        }
    }
`;
