import Head from 'next/head';
import styled from 'styled-components';

const StyledMain = styled.main`
    background: red;
`;

export default function Home() {
    return (
        <>
            <Head>
                <title>Lekawa Portfolio</title>
                <meta name="description" content="Tomasz Lekawa Photography Portfolio Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StyledMain>
                <h1>Hello</h1>
            </StyledMain>
        </>
    );
}
