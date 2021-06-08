import React from 'react';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

const About = () => {
    const { t } = useTranslation('about-page');

    return (
        <AboutPage>
            <Head>
                <title>{t('About Title')}</title>
                <meta name="description" content={t('About Description')} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>{t('About Us')}</h1>
        </AboutPage>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['commons', 'commons', 'navigation', 'about-page', 'footer'])),
    },
});

export default About;

// Styles

const AboutPage = styled.section`
    min-height: calc(100vh - 50px);
`;
