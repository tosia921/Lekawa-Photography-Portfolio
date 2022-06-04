import { createClient } from 'next-sanity'
import { config } from './config'
import { useNextSanityImage } from 'next-sanity-image';

export const sanityClient = createClient(config)

export const previewClient = createClient({
    ...config,
    useCdn: false,
    token: `${process.env.SANITY_TOKEN}`
})

export const getClient = (usePreview) => usePreview ? previewClient : sanityClient

// function for creating next-sanity image props variable that is later spread into images on the pages
export const nextSanityImage = (imageData) => {
    const imageProps = useNextSanityImage(
        sanityClient,
        imageData
    );
    return imageProps;
}