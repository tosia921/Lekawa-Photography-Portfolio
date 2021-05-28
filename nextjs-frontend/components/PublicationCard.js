import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// Media Queries
import { device } from '../styles/Media';

const PublicationCard = ({ publication }) => {
    const a = 3;
    return (
        <StyledPublicationCard>
            <div className="publication-featured-image">
                <Image
                    className="image"
                    src={`http://localhost:1337${publication.FeaturedImage.Image[0].url}`}
                    alt="Men wearing a suit and glasses"
                    height={publication.FeaturedImage.Image[0].height}
                    width={publication.FeaturedImage.Image[0].width}
                    quality={100}
                />
            </div>
            <div className="content">
                <h2>{publication.Title}</h2>
                <p className="publication-type">{publication.SmallText1}</p>
                <p className="smalltext">{publication.SmallText2}</p>
                <p className="location">{publication.Location}</p>
            </div>
            <p className="date">{publication.Date}</p>
        </StyledPublicationCard>
    );
};

export default PublicationCard;

// Styles

const StyledPublicationCard = styled.article`
    height: 40rem;
    width: 95%;
    background: var(--BoxBackground);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    margin-bottom: 2rem;
    @media ${device.tablet} {
        flex-direction: row;
        justify-content: left;
    }
    .publication-featured-image {
        height: 100%;
        width: 15rem;
        position: relative;
        border-radius: 15px;
        @media ${device.tablet} {
            width: 28rem;
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
        @media ${device.tablet} {
            height: 100%;
            align-items: flex-start;
            margin-left: 1rem;
            padding-left: 2rem;
        }
        h2 {
            text-align: left;
            font-size: 2.5rem;
            text-shadow: var(--TextShadowSmall);
            @media ${device.tablet} {
                font-size: 3.5rem;
            }
            @media ${device.laptop} {
                font-size: 4rem;
            }
        }

        p {
            font-size: 1.6rem;
            text-align: center;
            @media ${device.tablet} {
                font-size: 2rem;
            }
            @media ${device.laptop} {
                font-size: 2.5rem;
            }
        }
        .smalltext {
            font-size: 1.4rem;
            font-style: normal;
            font-weight: 400;
            @media ${device.tablet} {
                font-size: 1.6rem;
            }
            @media ${device.laptop} {
                font-size: 2.1rem;
            }
        }
        .location {
            font-style: normal;
            font-weight: 400;
            font-size: 1.4rem;
            @media ${device.tablet} {
                font-size: 1.6rem;
            }
            @media ${device.laptop} {
                font-size: 2.1rem;
            }
        }
        .publication-type {
            font-size: 1.8rem;
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
            font-size: 2rem;
        }
    }
`;
