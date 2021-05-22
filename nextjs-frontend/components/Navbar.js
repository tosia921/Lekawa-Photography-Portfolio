import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
// Icons
import { AiFillHome, AiFillCamera } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
// components
import { useTranslation } from 'next-i18next';
import MobileMenu from './MobileMenu';
import BurgerButton from './BurgerButton';
import LangSelect from './LangSelect';
// Media Queries
import { device } from '../styles/Media';
// i18n

const Navbar = () => {
    // state that holds value of open and closed mobile menu.
    const [burgerMenu, setBurgerMenu] = useState(false);
    // i18n hook that allows to use translations
    const { t } = useTranslation('navigation');

    return (
        <StyledHeader>
            <Logo>
                <p>ATL Photoraphy</p>
            </Logo>
            <div className="right-side">
                <Nav>
                    <div className="link-container">
                        <AiFillHome className="icons-smaller" />
                        <Link href="/">{t('Home')}</Link>
                    </div>
                    <div className="link-container">
                        <BsFillImageFill className="icons-smaller" />
                        <Link href="/gallery">{t('Gallery')}</Link>
                    </div>
                    <div className="link-container">
                        <AiFillCamera className="icons" />
                        <Link href="/publications">{t('Publications')}</Link>
                    </div>
                    <div className="link-container">
                        <FaUserAlt className="icons-smaller" />
                        <Link href="/about">{t('About Me')}</Link>
                    </div>
                    <div className="link-container">
                        <MdEmail className="icons" />
                        <Link href="/contact">{t('Contact')}</Link>
                    </div>
                </Nav>
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
        font-size: 1.6rem;
        @media ${device.laptop} {
            font-size: 2rem;
        }
    }
`;

const Nav = styled.nav`
    display: none;
    z-index: 10;
    margin-right: 3rem;

    @media ${device.tablet} {
        display: flex;
    }
    .link-container {
        display: flex;
        align-items: center;
        &:hover {
            color: var(--SecondaryTextColor);
            a {
                color: var(--SecondaryTextColor);
            }
        }
        &:not(:last-child) {
            margin-right: 1rem;
        }
        a {
            font-size: 1.6rem;
            @media ${device.laptop} {
                font-size: 2rem;
            }
        }
    }
    .icons {
        font-size: 1.6rem;
        margin-right: 0.6rem;
        @media ${device.laptop} {
            font-size: 2rem;
        }
    }
    .icons-smaller {
        font-size: 1.6rem;
        margin-right: 0.6rem;
        @media ${device.laptop} {
            height: 2rem;
        }
    }
`;
