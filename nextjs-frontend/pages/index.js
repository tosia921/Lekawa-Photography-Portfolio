import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import LandingPage from '../components/LandingPage';
import Quote from '../components/Quote';

const StyledMain = styled.main`
    .ImageAlicja {
        border-radius: 15px;
    }
`;

const Homepage = () => (
    <>
        <Head>
            <title>Lekawa Portfolio</title>
            <meta name="description" content="Tomasz Lekawa Photography Portfolio Website" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <StyledMain>
            <LandingPage />
            <Quote />
            <Image
                className="ImageAlicja"
                src="/images/alicjaHome.jpg"
                alt="Women in Hat"
                layout="responsive"
                width={5100}
                height={3300}
            />
        </StyledMain>
    </>
);

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'commons', 'navigation', 'homepage'])),
    },
});

export default Homepage;
