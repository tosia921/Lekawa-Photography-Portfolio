import Head from 'next/head';
import styled from 'styled-components';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import LandingPage from '../components/LandingPage';

const StyledMain = styled.main``;

const Homepage = () => (
    <>
        <Head>
            <title>Lekawa Portfolio</title>
            <meta name="description" content="Tomasz Lekawa Photography Portfolio Website" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <StyledMain>
            <LandingPage />
        </StyledMain>
    </>
);

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage'])),
    },
});

export default Homepage;
