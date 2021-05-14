// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

const Custom404 = () => {
    const { t } = useTranslation('custom404');
    return (
        <Page404Wrapper>
            <h1>{t('error-message')}</h1>
        </Page404Wrapper>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['commons', 'commons', 'custom404', 'navigation'])),
    },
});

export default Custom404;

// Styles
const Page404Wrapper = styled.section`
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
`;
