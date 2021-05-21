import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
// Library that let me easly implement select dropdown to change languages.
import ReactFlagsSelect from 'react-flags-select';

const LangButton = () => {
    const router = useRouter();
    const [selected, setSelected] = useState();

    // Checking on initial render what locale is user currently on, and setting select list initial state accordingly.
    useEffect(() => {
        if (router.locale === 'en') {
            setSelected('GB');
        } else if (router.locale === 'pl') {
            setSelected('PL');
        }
    }, []);

    // function that handles redirecting user to different locale when changing Language in select Lang dropdown.
    const handleSelectedLang = (code) => {
        setSelected(code);
        if (code === 'GB') {
            router.push(router.asPath, router.asPath, { locale: 'en' });
        } else if (code === 'PL') {
            router.push(router.asPath, router.asPath, { locale: 'pl' });
        }
    };

    return (
        <StyledReactFlagsSelect
            selected={selected}
            countries={['GB', 'PL']}
            customLabels={{ GB: 'EN', PL: 'PL' }}
            onSelect={(code) => handleSelectedLang(code)}
            className="menu-flags"
            selectButtonClassName="menu-flags-button"
        />
    );
};

export default LangButton;

// Styles

const StyledReactFlagsSelect = styled(ReactFlagsSelect)`
    .menu-flags {
    }
    .menu-flags-button {
        background-color: white;
        color: black;
        padding: 0 5px 0 0;
        transform: translateY(5px);
        span {
            font-size: 1rem;
        }
    }
    ul li span {
        font-size: 1rem;
        color: black;
    }
`;
