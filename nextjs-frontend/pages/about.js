import React from 'react';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const About = () => {
    const { t } = useTranslation('about-page');

    return (
        <AboutPage>
            <h1>{t('About Me')}</h1>
        </AboutPage>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['commons', 'commons', 'about-page'])),
    },
});

export default About;

// Styles

const AboutPage = styled.section`
    min-height: calc(100vh - 50px);
`;
