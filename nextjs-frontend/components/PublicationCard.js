import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// Media Queries
import Link from 'next/link';
import { device } from '../styles/Media';
import { nextSanityImage } from '../sanity/sanity.server';

const PublicationCard = ({ publication }) => {
    const publicationImgData = nextSanityImage(publication.previewImage)
    console.log(publication)
    return (
        <StyledPublicationCard>
            <div className="publication-featured-image">
                <Image
                    className="image"
                    src={publicationImgData.src}
                    loader={publicationImgData.loader}
                    alt={publication.previewImage.altText}
                    layout="fill"
                    objectFit="contain"
                    quality={50}
                    priority
                />
            </div>
            <div className="content">
                <Link href={`publications/${publication.slug.current}`}>
                    <h2>{publication.title}</h2>
                </Link>
                <p className="publication-type">{publication.smallText1}</p>
                <p className="smalltext">{publication.smallText2}</p>
                <p className="location">{publication.location}</p>
            </div>
            <p className="date">{publication.Date}</p>
        </StyledPublicationCard>
    )
}
    


export default PublicationCard;

// Styles

const StyledPublicationCard = styled.article`
    width: 100%;
    aspect-ratio: 3/1;
    min-height: 500px;
    background: var(--BoxBackground);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    margin-bottom: 2rem;
    @media ${device.laptop} {
        width: 45%;
        flex-direction: row;
        min-height: 300px;
    }
    .publication-featured-image {
        height: 100%;
        width: 100%;
        position: relative;
        border-radius: 15px;
        margin-bottom: 1rem;
        @media ${device.laptop} {
            width: 28rem;
            margin-bottom: 0;
        }
        .image {
            border-radius: 10px;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: top;
        align-items: center;
        padding-top: 1rem;
        @media ${device.laptop} {
            height: 100%;
            width: 60%;
            align-items: flex-start;
            margin-left: 1rem;
            padding-left: 2rem;
        }
        h2 {
            text-align: left;
            font-size: 1.8rem;
            text-shadow: var(--TextShadowSmall);
            cursor: pointer;
            &:hover {
                color: var(--SecondaryTextColor);
            }
            @media ${device.tablet} {
                margin-bottom: 1rem;
                text-align: left;
                font-size: 2rem;
            }
            @media ${device.laptop} {
                font-size: 2.5rem;
            }
        }

        p {
            font-family: Kanit;
            font-size: 1.4rem;
            text-align: left;
            @media ${device.tablet} {
                font-size: 1.8rem;
            }
            @media ${device.laptop} {
                font-size: 2rem;
            }
        }
        .smalltext {
            font-family: Kanit;
            font-size: 1.4rem;
            font-style: italic;
            font-weight: 400;
            @media ${device.tablet} {
                margin-bottom: 1rem;
                font-size: 1.6rem;
                text-align: left;
            }
            @media ${device.laptop} {
                font-size: 1.6rem;
            }
        }
        .location {
            font-style: italic;
            font-weight: 400;
            font-size: 1.4rem;
            @media ${device.tablet} {
                margin-bottom: 1rem;
                font-size: 1.6rem;
            }
            @media ${device.laptop} {
                font-size: 2.1rem;
            }
        }
        .publication-type {
            font-size: 1.8rem;
            font-style: italic;
            font-weight: 600;
            margin-bottom: 1rem;
            @media ${device.tablet} {
                font-size: 2rem;
            }
            @media ${device.laptop} {
                font-size: 2.5rem;
            }
        }
    }
    .date {
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 600;
        margin-top: 1rem;
        @media ${device.tablet} {
            position: absolute;
            right: 2rem;
            bottom: 2rem;
        }
        @media ${device.laptop} {
            font-size: 1.6rem;
        }
    }
`;
