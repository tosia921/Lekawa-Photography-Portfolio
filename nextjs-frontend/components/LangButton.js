import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// i18n
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import Image from 'next/image';

const LangButton = () => {
    const router = useRouter();
    const { t } = useTranslation('commons');
    return (
        <Link href="/" locale={router.locale === 'en' ? 'pl' : 'en'}>
            <CircleFlag>
                <div className="flag-darken-background">
                    {router.locale === 'en' ? (
                        <Image
                            className="circle-flag"
                            src="/images/PL-Flag.png"
                            alt="Polish Flag"
                            layout="fill"
                            objectFit="cover"
                            quality="100"
                        />
                    ) : (
                        <Image
                            className="circle-flag"
                            src="/images/UK-Flag.png"
                            alt="United Kingdom Flag"
                            layout="fill"
                            objectFit="cover"
                            quality="100"
                        />
                    )}

                    <p>{t('change-locale')}</p>
                </div>
            </CircleFlag>
        </Link>
    );
};

export default LangButton;

// Styles

const CircleFlag = styled.div`
    height: 35px;
    width: 35px;
    border-radius: 50%;
    margin-right: 2rem;

    position: relative;
    z-index: 10;
    overflow: hidden;

    .circle-flag {
        z-index: -1;
    }
    .flag-darken-background {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            color: white;
            text-shadow: var(TextShadowMedium);
            font-weight: 600;
            font-style: bold;
            font-size: 1.2rem;
        }
    }
`;
