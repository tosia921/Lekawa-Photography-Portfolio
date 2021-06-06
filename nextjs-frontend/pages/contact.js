import React from 'react';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Media Queries
import { device } from '../styles/Media';

const ContactPage = () => {
    // i18n hook that allows to use translations
    const { t } = useTranslation('contactpage');
    return (
        <StyledContactPage>
            <h1>{t('Contact Us')}</h1>
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
            // Will be passed to the page component as props
        },
    };
}

// Styles

const StyledContactPage = styled.section`
    min-height: calc(100vh - 219px);
    h1 {
        margin-top: 4rem;
    }
`;
