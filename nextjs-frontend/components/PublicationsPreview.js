import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
// Carousel
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// i18n
import { useTranslation } from 'next-i18next';
// media queries
import { device } from '../styles/Media';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1100: { items: 3 },
};

const PublicationsPreview = ({ publications }) => {
    // translations hook
    const { t } = useTranslation('commons');

    // filtering all publications down to the ones with HomePage vlue set to true, which means it should be displayed on homepage PublicationPreview.
    const FilteredPublications = publications.filter((publication) => publication.HomePage);

    // Populating photos Array with Images from CMS with correct url's and other neccessery data.
    const PublicationsPhotos = FilteredPublications.map((publication) => (
        <Link href={`publications/${publication.Slug}`}>
            <Image
                className="image"
                src={publication.FeaturedImage.Image[0].url}
                alt="Men wearing a suit and glasses"
                layout="fill"
                objectFit="contain"
                quality={50}
                priority
            />
        </Link>
    ));

    return (
        <StyledPublicationsPreview>
            <h2>{t('Publications')}</h2>
            <AliceCarousel
                items={PublicationsPhotos}
                responsive={responsive}
                controlsStrategy="alternate"
                autoPlay
                autoPlayStrategy="default"
                autoPlayInterval={2500}
                animationDuration={1200}
                animationType="fadeout"
                infinite
                touchTracking={false}
                disableButtonsControls
            />
            <p className="link-to-publications">
                <Link href="/publications">{t('Click to see all')}</Link>
            </p>
        </StyledPublicationsPreview>
    );
};

export default PublicationsPreview;

// Styles

const StyledPublicationsPreview = styled.section`
    height: fit-content;
    padding: 5rem 0.5rem 7rem 0.5rem;
    position: relative;
    @media ${device.tablet} {
        margin: 0 1rem;
    }
    @media ${device.laptopL} {
        margin: 0 calc((100vw - 1200px) / 2);
    }
    @media ${device.desktop} {
        margin: 0 calc((100vw - 1400px) / 2);
    }
    background-image: url('/images/concrete-wall.png'),
        linear-gradient(to top, #4d4d4d, #464647, #404040, #3a393a, #343333);
    background-repeat: repeat;
    background-position: center bottom;
    background-size: contain;
    border-radius: 15px;

    h2 {
        margin-bottom: 2rem;
        @media ${device.tablet} {
            margin-bottom: 3rem;
        }
    }
    .alice-carousel__stage-item {
        height: 43rem;
        width: 28rem;
        position: relative;
        cursor: pointer;
    }
    .alice-carousel__dots-item:not(.__custom):hover,
    .alice-carousel__dots-item:not(.__custom).__active {
        background-color: var(--SecondaryTextColor);
    }
    .link-to-publications {
        a {
            font-size: 2rem;
            font-weight: 500;
            text-decoration: underline;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 1rem;
            &:hover {
                text-decoration-color: var(--SecondaryTextColor);
            }
        }
    }
`;
