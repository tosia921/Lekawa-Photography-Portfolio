import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
// Media Queries
import { device } from '../styles/Media';

// Gallery Preiview Card Component
const GalleryPreview = ({ data }) => {
    const ImageSrc = data.Image[0].Image[0].url;

    return (
        <StyledPreviewGallery>
            <Image
                className="gallery-preview-background"
                src={`http://localhost:1337${ImageSrc}`}
                alt={data.Image[0].AltText}
                layout="fill"
                objectFit="cover"
                quality="100"
            />
            <Link href={`/gallery/${data.Slug}`}>{data.Name}</Link>
        </StyledPreviewGallery>
    );
};

// All Galleries Component
const Galleries = ({ galleryTypes }) => (
    <StyledGalleryTypes>
        <h2>Galleries</h2>
        <div className="galleryTypes-grid">
            {galleryTypes.map((GalleryType) => (
                <GalleryPreview data={GalleryType} />
            ))}
        </div>
    </StyledGalleryTypes>
);

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
        position: relative;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px 10px;
    }
`;

const StyledGalleryTypes = styled.section`
    background-color: var(--BoxBackground);
    border-radius: 15px;
    height: fit-content;
    margin-top: 1rem;
    padding: 2rem 3rem;

    .galleryTypes-grid {
        display: grid;
        gap: 3rem;
        justify-content: space-around;
        grid-template-columns: repeat(1, 29rem);
        grid-auto-rows: 40rem;
        @media ${device.tablet} {
            grid-template-columns: repeat(2, 29rem);
            grid-auto-rows: 40rem;
        }
        @media ${device.laptop} {
            grid-template-columns: repeat(3, 32rem);
            grid-auto-rows: 42rem;
        }
        @media ${device.desktop} {
            grid-template-columns: repeat(3, 40rem);
            grid-auto-rows: 51rem;
        }
    }
    h2 {
        position: relative;
        z-index: 10;
        padding-bottom: 3rem;
    }
`;
