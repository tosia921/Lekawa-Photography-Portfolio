import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';

const PageWrapper = styled.div`
    padding: 0 1rem 0 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    main {
        flex: 1 0 auto;
    }
`;

export default function Layout({ children }) {
    return (
        <div>
            <PageWrapper>
                <Navbar />
                {children}
                <Footer />
            </PageWrapper>
        </div>
    );
}
