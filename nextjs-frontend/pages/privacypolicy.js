import React from 'react';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

const PrivacyPolicy = () => {
    const { t } = useTranslation('commons');

    return (
        <StyledPrivacyPolicy>
            <Head>
                <title>{t('About Title')}</title>
                <meta name="description" content={t('About Description')} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>Privacy Policy</h1>
        </StyledPrivacyPolicy>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['commons', 'commons', 'navigation', 'about-page', 'footer'])),
    },
});

export default PrivacyPolicy;

// Styles

const StyledPrivacyPolicy = styled.section`
    min-height: calc(100vh - 50px);
`;
