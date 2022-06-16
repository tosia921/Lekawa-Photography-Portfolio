import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
// i18n
import { useTranslation } from 'next-i18next';
// Media Queries
import { device } from '../styles/Media';
import { nextSanityImage } from '../sanity/sanity.server';

// Gallery Preiview Card Component
const GalleryPreview = ({ data, currLocale }) => {

    return (
        <StyledPreviewGallery>
            <Image
                className="gallery-preview-background"
                {...nextSanityImage(data.featuredImage)}
                alt={data.featuredImage.altText}
                layout="fill"
                objectFit="cover"
                quality="50"
                priority
            />
            <Link href={`/gallery/${data.slug.current}`} locale={currLocale}>
                {data.title}
            </Link>
        </StyledPreviewGallery>
    );
};

// All Galleries Component
const Galleries = ({ imageGalleries, currLocale }) => {
    // i18n hook that allows to use translations
    const { t } = useTranslation('commons');
    return (
        <StyledGalleryTypes>
            <h2>{t('Galleries')}</h2>
            <div className="galleryTypes-grid">
                {imageGalleries.map((imageGallery) => (
                    <GalleryPreview data={imageGallery} currLocale={currLocale} key={imageGallery.id} />
                ))}
            </div>
        </StyledGalleryTypes>
    );
};

export default Galleries;

// Styles
const StyledPreviewGallery = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    overflow: hidden;

    .gallery-preview-background {
        &:hover {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        }
    }
    a {
        font-size: 2.2rem;
        position: relative;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px 5px;
        width: 90%;
        text-align: center;
        &:hover {
            color: var(--SecondaryTextColor);
        }
        @media ${device.tablet} {
            font-size: 1.8rem;
        }
    }
`;

const StyledGalleryTypes = styled.section`
    background-image: linear-gradient(to bottom, #4d4d4d, #464647, #404040, #3a393a, #343333);
    background-color: var(--BoxBackground);
    border-radius: 15px;
    height: fit-content;
    margin-top: 1rem;
    padding: 2rem 0 5rem 0;
    margin-bottom: 1rem;

    .galleryTypes-grid {
        display: grid;
        gap: 3rem;
        justify-content: center;
        grid-template-columns: repeat(1, 75%);
        grid-auto-rows: 46rem;
        @media ${device.tablet} {
            grid-template-columns: repeat(2, 40%);
            grid-auto-rows: 40rem;
        }
        @media ${device.laptop} {
            grid-template-columns: repeat(4, 20%);
            grid-auto-rows: 32rem;
        }
        @media ${device.desktop} {
            grid-template-columns: repeat(4, 18%);
            grid-auto-rows: 32rem;
        }
    }
    h2 {
        position: relative;
        z-index: 10;
        padding-bottom: 3rem;
    }
`;
