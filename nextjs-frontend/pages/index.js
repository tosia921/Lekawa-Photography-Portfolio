import Head from 'next/head';
import styled from 'styled-components';
import LandingPage from '../components/LandingPage';

const StyledMain = styled.main``;

export default function Home() {
    return (
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
}
