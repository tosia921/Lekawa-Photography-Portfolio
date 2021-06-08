/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Form validation
import { useForm } from 'react-hook-form';
// icons
import { AiFillPhone, AiTwotoneMail } from 'react-icons/ai';
import { IconContext } from 'react-icons';
// Media Queries
import axios from 'axios';
import Head from 'next/head';
import { device } from '../styles/Media';
// Axios

const ContactPage = () => {
    // defining next router
    const router = useRouter();
    // i18n hook that allows to use translations
    const { t } = useTranslation('contactpage');
    // destructuring values from provided useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    // function that handles form submit
    async function onSubmitForm(values) {
        const config = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: values,
        };
        try {
            const response = await axios(config);
            // reseting form and redirecting user to homepage after succesfully sent email.
            if (response.status === 200) {
                reset();
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <StyledContactPage>
            <Head>
                <title>{t('Contact Title')}</title>
                <meta name="description" content={t('Contact Description')} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>{t('Contact Us')}</h1>
            <div className="page-content">
                <div className="email-form">
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div>
                            <label htmlFor="name">{t('Full name')}</label>
                            <input
                                type="text"
                                name="name"
                                className="input"
                                placeholder={t('Full name')}
                                {...register('fullname', {
                                    required: {
                                        value: true,
                                        message: 'You must enter your name',
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Your name can't be shorter than 3 characters",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Your name can't be longer than 50 characters",
                                    },
                                })}
                            />
                            {errors.fullname && <p>{errors.fullname.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                type="text"
                                className="input"
                                placeholder="Email"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'You must enter your email address',
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'This is not long enough to be an email',
                                    },
                                    maxLength: {
                                        value: 120,
                                        message: 'This is too long',
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'This needs to be a valid email address',
                                    },
                                })}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="message">{t('Message')}</label>
                            <textarea
                                name="message"
                                className="input"
                                placeholder={t('Message')}
                                {...register('message', {
                                    required: {
                                        value: true,
                                        message: 'You need to enter your message',
                                    },
                                    maxLength: {
                                        value: 5000,
                                        message: "Your message can't be more than 5000 characters",
                                    },
                                })}
                            />
                            {errors.message && <p>{errors.message.message}</p>}
                        </div>
                        <div className="button-container">
                            <button type="submit" className="submit-button">
                                {t('Send')}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="contact-details">
                    <p>{t('Tomasz Lekawa')}</p>
                    <p>Nottingham</p>
                    <div className="email">
                        <IconContext.Provider value={{ size: '1.5rem' }}>
                            <AiTwotoneMail />
                        </IconContext.Provider>
                        <a href="mailto:tomaszlewaka@gmail.com" className="email-address">
                            tomaszlewaka@gmail.com
                        </a>
                    </div>
                    <a href="tel:07476-33-66-55" className="phone">
                        <IconContext.Provider value={{ size: '1.5rem', className: 'phone-svg' }}>
                            <AiFillPhone />
                        </IconContext.Provider>
                        <p className="phone-number">07476 33 66 55</p>
                    </a>
                </div>
            </div>
        </StyledContactPage>
    );
};

export default ContactPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'commons',
                'navigation',
                'homepage',
                'footer',
                'contactpage',
            ])),
            // Translations will be passed to the page component as props
        },
    };
}

// Styles

const StyledContactPage = styled.section`
    min-height: 100vh;
    h1 {
        margin: 4rem 0;
    }
    .page-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        .email-form {
            width: 80%;
            margin-bottom: 5rem;
            @media ${device.tablet} {
                width: 50%;
            }
            @media ${device.desktop} {
                width: 40%;
            }
            form {
                height: fit-content;
                width: 100%;

                label {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border-width: 0;
                }
                input {
                    width: 100%;
                    padding: 0.5rem 1rem;
                    outline: none;
                    margin-bottom: 0.5rem;
                }
                textarea {
                    width: 100%;
                    height: 20rem;
                    resize: none;
                    padding: 1rem;
                    outline: none;
                    @media ${device.tablet} {
                        height: 30rem;
                    }
                }
                .button-container {
                    display: flex;
                    justify-content: center;
                }
                .submit-button {
                    font-size: 1.6rem;
                    font-weight: 500;
                    padding: 0.5rem 2rem;
                    border-radius: 50px;
                    border: none;
                    margin-top: 1rem;
                    box-shadow: var(--TextShadowSmall);
                    transition: all 0.2s ease-in;
                    cursor: pointer;
                    &:hover {
                        transform: translateY(-2px);
                        background-color: var(--SecondaryTextColor);
                        box-shadow: var(--TextShadowMedium);
                    }
                    &:active,
                    &:focus {
                        transform: translateY(0);
                        box-shadow: var(--TextShadowSmall);
                    }
                }
                p {
                    color: #ff5757;
                    margin-top: -0.5rem;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }
            }
        }
    }

    .contact-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5rem;
        p {
            @media ${device.laptop} {
                font-size: 2rem;
            }
        }
        .email {
            display: flex;
            align-items: center;
            .email-address {
                margin-left: 0.5rem;
                @media ${device.laptop} {
                    font-size: 2rem;
                }
            }
        }
        .phone {
            display: flex;
            align-items: center;
            .phone-number {
                margin-left: 0.5rem;
                @media ${device.laptop} {
                    font-size: 2rem;
                }
            }
        }
    }
`;
