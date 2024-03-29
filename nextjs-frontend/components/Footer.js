import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
// icons
import { AiFillFacebook, AiFillInstagram, AiFillPhone, AiTwotoneMail } from 'react-icons/ai';
// i18n
import { useTranslation } from 'next-i18next';
// Media Queries
import { device } from '../styles/Media';

const Footer = () => {
    // i18n hook that allows to use translations
    const { t } = useTranslation('footer');
    return (
        <StyledFooter>
            <div className="top">
                <div className="logo-socials">
                    <div className="socials">
                        <a href="https://www.facebook.com/TomekPLekawa" target="_blank" rel="noreferrer">
                            <AiFillFacebook className="fb" />
                        </a>
                        <a href="https://www.instagram.com/tpl.photography" target="_blank" rel="noreferrer">
                            <AiFillInstagram className="insta" />
                        </a>
                    </div>
                </div>
                <div className="footer-menu">
                    <Link href="/">{t('Home')}</Link>
                    <Link href="/gallery">{t('Gallery')}</Link>
                    <Link href="/publications">{t('Publications')}</Link>
                    <Link href="/modeling">{t('Modeling')}</Link>
                    <Link href="/about">{t('About Us')}</Link>
                    <Link href="/contact">{t('Contact')}</Link>
                </div>
                <div className="contact-details">
                    <p>{t('Tomasz Lekawa')}</p>
                    <p>Nottingham</p>
                    <div className="email">
                        <AiTwotoneMail />
                        <a href="mailto:tomaszlewaka@gmail.com" className="email-address">
                            tomasz@lekawa-photography.co.uk
                        </a>
                    </div>
                    <a href="tel:07476-33-66-55">
                        <AiFillPhone />
                        <p className="phone-number">07510 830 333</p>
                    </a>
                </div>
            </div>
            <div className="bottom">
                <div className="policy-links">
                    <Link href="/privacy-policy" className="terms">
                        {t('Privacy Policy')}
                    </Link>
                    <span>|</span>
                    <Link href="/terms-and-conditions" className="terms">
                        {t('Terms and Conditions')}
                    </Link>
                    <span>|</span>
                    <Link href="/sitemap.xml" className="terms">
                        Site Map
                    </Link>
                </div>
                <div className="Copyright">{t('Copyright ©2021 Tomasz Lekawa Photography. All rights reserved.')}</div>
                <div className="developed">
                    {t('Designed and developed by ')}
                    <a href="https://www.tomaszposiadala.com">Tomasz Posiadala</a>
                </div>
            </div>
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.footer`
    background: lightblue;
    height: fit-content;
    margin: 0 -1rem;
    padding: 1rem;
    background-image: linear-gradient(to bottom, #4d4d4d, #464647, #404040, #3a393a, #343333);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media ${device.tablet} {
        padding: 2rem 1rem;
    }
    @media ${device.laptop} {
        padding: 2rem calc((100vw - 1100px) / 2);
    }
    @media ${device.laptopL} {
        padding: 2rem calc((100vw - 1200px) / 2);
    }
    @media ${device.desktop} {
        padding: 2rem calc((100vw - 1400px) / 2);
    }
    .top {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media ${device.tablet} {
            width: 100%;
            padding: 0 2rem;
            flex-direction: row;
            align-items: start;
        }
        .logo-socials,
        .footer-menu,
        .contact-details {
            display: flex;
            flex-direction: column;
            align-items: center;

            a {
                display: flex;
                align-items: center;
            }
            .email {
                display: flex;
                align-items: center;
            }
        }
        .logo-socials {
            margin-bottom: 1rem;
            @media ${device.tablet} {
                margin-right: 5rem;
            }
            .socials {
                display: flex;
                svg {
                    font-size: 2.5rem;
                }
                .fb {
                    cursor: pointer;
                    &:hover {
                        color: #4267b2;
                    }
                }
                .insta {
                    cursor: pointer;
                    &:hover {
                        color: #f77737;
                    }
                }
            }
        }
        .footer-menu {
            margin-bottom: 1rem;
            @media ${device.tablet} {
                display: flex;
                flex-direction: row;
                a:not(:last-child) {
                    margin-right: 1rem;
                }
            }
            a {
                &:hover {
                    color: var(--SecondaryTextColor);
                }
            }
        }
        .contact-details {
            margin-bottom: 1rem;
            margin-left: auto;
            p {
                font-size: 1.4rem;
                font-weight: 300;
                font-style: normal;
            }
            .email-address,
            .phone-number {
                margin-left: 5px;
                font-size: 1.4rem;
                font-weight: 300;
                font-style: normal;
            }
        }
    }
    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        .policy-links {
            margin-bottom: 0.5rem;
            a {
                font-size: 1rem;
            }
            span {
                margin: 0 0.5rem;
            }
        }
        .developed {
            margin-top: 0.5rem;
            a {
                font-size: inherit;
            }
        }
    }
`;
