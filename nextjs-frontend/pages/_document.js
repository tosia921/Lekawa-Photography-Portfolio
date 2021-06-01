import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/Kanit/Kanit-Regular.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link rel="preload" href="/fonts/Kanit/Kanit-Medium.ttf" as="font" type="font/ttf" crossOrigin="" />
                    <link
                        rel="preload"
                        href="/fonts/Kanit/Kanit-ExtraBold.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Kanit/Kanit-BoldItalic.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Kanit/Kanit-MediumItalic.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Kanit/Kanit-ExtraLightItalic.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Caveat/Caveat-Regular.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
