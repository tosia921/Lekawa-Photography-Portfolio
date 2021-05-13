import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <Typography />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
