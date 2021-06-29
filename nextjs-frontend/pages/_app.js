import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import '../styles/styles.css';

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

export default appWithTranslation(MyApp);
