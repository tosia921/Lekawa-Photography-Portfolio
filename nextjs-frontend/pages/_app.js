import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';
import Layout from '../components/Layout';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-P7YKKLFH45" />
            <Script strategy="lazyOnload">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
          
                gtag('config', 'G-P7YKKLFH45');
                `}
            </Script>

            <GlobalStyles />
            <Typography />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default appWithTranslation(MyApp);
