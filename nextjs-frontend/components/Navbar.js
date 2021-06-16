import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
// Icons
import { AiFillHome, AiFillCamera } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { GiLargeDress } from 'react-icons/gi';
import { RiMoneyPoundBoxFill } from 'react-icons/ri';
// i18n
import { useTranslation } from 'next-i18next';
// components
import MobileMenu from './MobileMenu';
import BurgerButton from './BurgerButton';
import LangSelect from './LangSelect';
// Media Queries
import { device } from '../styles/Media';

const Navbar = () => {
    // state that holds value of open and closed mobile menu.
    const [burgerMenu, setBurgerMenu] = useState(false);
    // i18n hook that allows to use translations
    const { t } = useTranslation('navigation');

    return (
        <StyledHeader>
            <Logo href="/">
                <Link href="/">
                    <img src="/images/LogoWhite.png" alt="logo" />
                </Link>
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
                        <GiLargeDress className="icons" />
                        <Link href="/modeling">{t('Modeling')}</Link>
                    </div>
                    <div className="link-container">
                        <RiMoneyPoundBoxFill className="icons" />
                        <Link href="/pricing">{t('Pricing')}</Link>
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
        align-items: center;
    }
`;

const Logo = styled.div`
    position: relative;
    z-index: 10;
    cursor: pointer;
    img {
        height: 5rem;
        width: auto;
        margin-top: 2rem;
        @media ${device.tablet} {
            height: 6rem;
            margin-top: 3rem;
        }
        @media ${device.laptop} {
            height: 7rem;
            margin-top: 4rem;
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
            font-size: 1.2rem;
            @media ${device.tablet} {
                font-size: 1.4rem;
            }
            @media ${device.laptop} {
                font-size: 1.6rem;
            }
            @media ${device.laptopL} {
                font-size: 1.8rem;
            }
        }
    }
    .icons {
        font-size: 1.2rem;
        margin-right: 0.4rem;
        font-size: 1.2rem;
        @media ${device.tablet} {
            font-size: 1.4rem;
        }
        @media ${device.laptop} {
            font-size: 1.6rem;
        }
        @media ${device.laptopL} {
            font-size: 1.8rem;
        }
    }
    .icons-smaller {
        font-size: 1.2rem;
        margin-right: 0.4rem;
        @media ${device.tablet} {
            font-size: 1.2rem;
        }
        @media ${device.laptop} {
            font-size: 1.4rem;
        }
        @media ${device.laptopL} {
            font-size: 1.6rem;
        }
    }
`;
