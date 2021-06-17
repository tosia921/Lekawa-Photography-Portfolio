import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
// Icons
import { MdKeyboardArrowDown } from 'react-icons/md';

const LangButton = () => {
    const router = useRouter();
    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState();

    // Checking on initial render what locale is user currently on, and setting select list initial state accordingly.
    useEffect(() => {
        if (router.locale === 'en') {
            setSelected('EN');
        } else if (router.locale === 'pl') {
            setSelected('PL');
        }
    }, [router.locale]);

    // function that handles redirecting user to different locale when changing Language in select Lang dropdown.
    const handleSelectedLang = () => {
        if (selected === 'EN') {
            router.push(router.asPath, router.asPath, { locale: 'pl' });
        } else if (selected === 'PL') {
            router.push(router.asPath, router.asPath, { locale: 'en' });
        }
    };

    return (
        <SelectContainer>
            <StyledReactFlagsSelect onClick={() => setOpen(!isOpen)}>
                {selected === 'EN' ? (
                    <div className="container">
                        <div className="flag">
                            <Image
                                src="/images/UKFlag.png"
                                alt="United Kingdom Flag"
                                layout="fill"
                                objectFit="cover"
                                quality={50}
                            />
                        </div>
                        <p>EN</p>
                        <MdKeyboardArrowDown />
                    </div>
                ) : (
                    <div className="container">
                        <div className="flag">
                            <Image
                                src="/images/PLFlag.png"
                                alt="Polish Flag"
                                layout="fill"
                                objectFit="cover"
                                quality={50}
                            />
                        </div>
                        <p>PL</p>
                        <MdKeyboardArrowDown />
                    </div>
                )}
            </StyledReactFlagsSelect>
            <Dropdown isOpen={isOpen} onClick={handleSelectedLang}>
                {selected === 'EN' ? (
                    <div className="container">
                        <div className="flag">
                            <Image
                                src="/images/PLFlag.png"
                                alt="Polish Flag"
                                layout="fill"
                                objectFit="cover"
                                quality={25}
                                priority
                            />
                        </div>
                        <p>PL</p>
                    </div>
                ) : (
                    <div className="container">
                        <div className="flag">
                            <Image
                                src="/images/UKFlag.png"
                                alt="United Kingdom Flag"
                                layout="fill"
                                objectFit="cover"
                                quality={25}
                                priority
                            />
                        </div>
                        <p>EN</p>
                    </div>
                )}
            </Dropdown>
        </SelectContainer>
    );
};

export default LangButton;

// Styles

const SelectContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 2.5rem;
    left: 0;
    width: 7.6rem;
    height: 2.5rem;
    display: ${(props) => (props.isOpen ? `flex` : `none`)};
    opacity: ${(props) => (props.isOpen ? `1` : `0`)};
    transition: all 2s ease-in-out;
    background-color: var(--MainTextColor);
    z-index: 10;
    color: #171716;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    margin-top: 5px;
    cursor: pointer;

    .container {
        display: flex;
        align-items: center;
        margin-right: 2rem;
        p {
            font-size: 1.4rem;
        }
        .flag {
            position: relative;
            width: 2rem;
            height: 1.3rem;
            margin-right: 0.5rem;
        }
        svg {
            font-size: 2rem;
            margin-top: 0.2rem;
        }
    }
`;

const StyledReactFlagsSelect = styled.div`
    width: 7.6rem;
    height: 2.5rem;
    background-color: var(--MainTextColor);
    z-index: 10;
    position: relative;
    color: #171716;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;

    .container {
        display: flex;
        align-items: center;
        p {
            font-size: 1.4rem;
        }
        .flag {
            position: relative;
            width: 2rem;
            height: 1.3rem;
            margin-right: 0.5rem;
        }
        svg {
            font-size: 2rem;
            margin-top: 0.2rem;
        }
    }
`;
