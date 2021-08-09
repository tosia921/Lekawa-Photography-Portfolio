import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
// Apollo Client
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Form validation
import { useForm } from 'react-hook-form';
// React Gallery Lib
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
// Media Queries
import { useRouter } from 'next/router';
import { device } from '../styles/Media';

// GalleryPageTemplate Component
const ModelingPage = ({ pageData }) => {
    // defining state for succesfully send message text
    const [sendSuccesfully, setSendSuccesfully] = useState(false);
    // Hook that allows me to use nexti18next translations
    const { t } = useTranslation('modeling');
    // defining next router
    const router = useRouter();
    // defining current locale
    const currLocale = router.locale;

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const photos = [];

    // Populating photos Array with Images from CMS with correct url's and other neccessery data.
    if (pageData === null) {
        console.log('missing image data');
    } else {
        pageData.PageGallery.forEach((pageGalleryImage) => {
            photos.push({
                src: `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}${pageGalleryImage.Image.url}`,
                width: pageGalleryImage.Image.width,
                height: pageGalleryImage.Image.height,
                alt: pageGalleryImage.Alt,
            });
        });
    }

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
            url: `/${currLocale}/api/modeling`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: values,
        };
        try {
            const response = await axios(config);
            // reseting form and redirecting user to homepage after succesfully sent email.
            if (response.status === 200) {
                // reseting form content
                reset();
                // setting up state to display succes message
                setSendSuccesfully(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // RETURNING JSX
    return (
        <StyledModelingPage>
            <Head>
                <title>{pageData === null ? 'no data' : pageData.SeoTitle}</title>
                <meta name="description" content={pageData === null ? 'no data' : pageData.SeoDescription} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link
                    rel="alternate"
                    hrefLang={currLocale === 'en' ? 'pl' : 'en-gb'}
                    href={
                        currLocale === 'en'
                            ? 'https://lekawa-photography.co.uk/pl/modeling/'
                            : 'https://lekawa-photography.co.uk/modeling/'
                    }
                />
            </Head>
            <section className="page-content">
                <h1>Modeling</h1>
                <p>{pageData === null ? 'Add text yo your CMS' : pageData.PageText}</p>
                <div className="images-container">
                    <Gallery photos={photos} targetRowHeight={275} onClick={openLightbox} />
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={photos.map((x) => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title,
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </div>
                <h3>{t('Fill Form')}</h3>
                <div className="email-form">
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div>
                            <label htmlFor="companyname">{t('Company Name')}</label>
                            <input
                                type="text"
                                name="companyname"
                                className="input"
                                placeholder={t('Company Name')}
                                {...register('companyname', {
                                    required: {
                                        value: true,
                                        message: 'You must enter your company name',
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Your company name can't be longer than 50 characters",
                                    },
                                })}
                            />
                            {errors.fullname && <p>{errors.fullname.message}</p>}
                        </div>
                        <div>
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
                            <label htmlFor="phone">{t('Phone')}</label>
                            <input
                                type="text"
                                name="phone"
                                className="input"
                                placeholder={t('Phone')}
                                {...register('phone', {
                                    minLength: {
                                        value: 9,
                                        message: 'Your phone number is too short',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Your phone number is too long',
                                    },
                                })}
                            />
                            {errors.phone && <p>{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="products">{t('Products')}</label>
                            <textarea
                                name="products"
                                className="input products"
                                placeholder={t('Products')}
                                {...register('products', {
                                    required: {
                                        value: true,
                                        message: 'You must enter type of products you would like to be photographed',
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Your product list is too short',
                                    },
                                    maxLength: {
                                        value: 1000,
                                        message: 'Your product list is too long',
                                    },
                                })}
                            />
                            {errors.products && <p>{errors.products.message}</p>}
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
                            {sendSuccesfully === true ? (
                                <p className="succes-message">{t('Thank you your message has been sent!')}</p>
                            ) : (
                                <button type="submit" className="submit-button">
                                    {t('Send')}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </StyledModelingPage>
    );
};

export default ModelingPage;

// getStaticProps Async function, that pulls in data from Sanity CMS based on current locale and slug passed in params object from getStaticPaths.
export async function getStaticProps({ locale }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    // GraphQL query
    const { data } = await client.query({
        query: gql`
        query {
            modelingPage(locale: "${locale}")  {
              PageText
              SeoTitle
              SeoDescription
              PageGallery {
                Image {
                  url
                  width
                  height
                }
              }
            }
        }
        `,
    });

    return {
        props: {
            pageData: data.modelingPage,

            ...(await serverSideTranslations(locale, [
                'common',
                'commons',
                'navigation',
                'homepage',
                'footer',
                'contact',
                'modeling',
            ])),
            // Will be passed to the page component as props
        },
    };
}

// Styles

const StyledModelingPage = styled.div`
    height: fit-content;
    margin: 1rem 0;

    .page-content {
        padding: 1rem 2rem 2rem 2rem;
        margin: 0rem 1rem;
        background-image: linear-gradient(to bottom, #4d4d4d, #464647, #404040, #3a393a, #343333);
        border-radius: 15px;

        display: flex;
        flex-direction: column;
        align-items: center;

        @media ${device.tablet} {
            margin: 0 1rem;
        }
        @media ${device.laptop} {
            margin: 0 calc((100vw - 1100px) / 2);
        }
        @media ${device.laptopL} {
            margin: 0 calc((100vw - 1200px) / 2);
        }
        @media ${device.desktop} {
            margin: 0 calc((100vw - 1400px) / 2);
        }

        .images-container {
            padding: 1rem 0rem;
            @media ${device.laptop} {
                padding: 1rem 5rem;
            }
            @media ${device.laptopL} {
                padding: 1rem 15rem;
            }
        }
    }

    h1 {
        margin: 5rem 0;
    }
    h3 {
        font-size: 2.5rem;
        margin: 5rem 0;
    }

    p {
        font-size: 1.6rem;
        font-weight: 400;
        margin-bottom: 2rem;
        text-align: center;

        @media ${device.tablet} {
            font-size: 1.7rem;
        }
        @media ${device.laptop} {
            font-size: 1.8rem;
            padding: 0 2rem;
        }
        @media ${device.laptopL} {
            padding: 0 2.5rem;
        }
        @media ${device.desktop} {
            padding: 0 3rem;
        }
    }
    .email-form {
        width: 80%;
        margin-bottom: 10rem;
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
            .products {
                width: 100%;
                height: 8rem;
                resize: none;
                padding: 1rem;
                outline: none;
            }
            .button-container {
                display: flex;
                justify-content: center;
                .succes-message {
                    color: #40eb34;
                    margin-top: 1rem;
                    font-size: 1.8rem;
                }
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
`;
