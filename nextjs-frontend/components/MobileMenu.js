import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const MobileMenu = ({ burgerMenu, setBurgerMenu }) => {
    const router = useRouter();
    const { t } = useTranslation('navigation');

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
                    {t('Home')}
                </a>
            </Link>
            <Link href="/gallery" passHref>
                <a onClick={(e) => handleClick(e, '/gallery')} aria-hidden="true">
                    {t('Gallery')}
                </a>
            </Link>
            <Link href="/publications" passHref>
                <a onClick={(e) => handleClick(e, '/publications')} aria-hidden="true">
                    {t('Publications')}
                </a>
            </Link>
            <Link href="/modeling" passHref>
                <a onClick={(e) => handleClick(e, '/modeling')} aria-hidden="true">
                    {t('Modeling')}
                </a>
            </Link>
            <Link href="/about" passHref>
                <a onClick={(e) => handleClick(e, '/about')} aria-hidden="true">
                    {t('About Me')}
                </a>
            </Link>
            <Link href="/contact" passHref>
                <a onClick={(e) => handleClick(e, '/contact')} aria-hidden="true">
                    {t('Contact')}
                </a>
            </Link>
        </StyledMobileMenu>
    );
};

export default MobileMenu;

const StyledMobileMenu = styled.nav`
    position: absolute;
    top: 0;
    right: 0;
    opacity: ${(props) => (props.burgerMenu ? `1` : `0`)};
    display: ${(props) => (props.burgerMenu ? `flex` : `none`)};
    transition: all 0.5s ease-in-out;
    height: 100vh;
    width: 100vw;
    z-index: 5;
    background-color: var(--BoxBackground);
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
        font-size: 4rem;
        pointer-events: ${(props) => (props.burgerMenu ? `auto` : `none`)};
        &:hover {
            color: var(--SecondaryTextColor);
        }
    }
`;
