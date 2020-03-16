import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby-plugin-intl';
import { useWindowScroll, useLocation } from 'react-use';

import { CategoriesEnum } from '../../enums/categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';
import { ColorsEnum } from '../../enums/colors.enum';

import logoSvg from './assets/logo.png';

import { GlobalStyle } from './styles';

import Lang from '../Lang';
import Footer from '../Footer';

interface ILayout {
    readonly intl: {
        readonly language: LocaleEnum;
        readonly messages: {[key: string]: string};
    };
}

interface IStyledCategory {
    readonly active: boolean;
}

interface IStyledMenu {
    readonly small: boolean;
}

const StyledLayout = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
    min-width: 100vw;
    padding-top: 8vw;
    box-sizing: border-box;

    @media (max-width: 720px) {
        padding-top: 11vw;
    }
`;

const StyledContent = styled.div`
    position: relative;
    display: flex;
    min-width: 0;
`;

const StyledLogoLink = styled(Link)`
    display: flex;
    align-items: center;
    height: 100%;
`;

const StyledLogo = styled.img`
    width: 7vw;
    height: 7vw;
    transition: width 0.2s, height 0.2s;
`;

const StyledLang = styled(Lang)`
    font-size: 1vw;
    line-height: 150%;
    margin-right: 10px;
    text-transform: lowercase;
    transition: opacity 0.1s;

    &:last-child {
        margin-right: 0;
    }
`;

const StyledCategory = styled.div<IStyledCategory>`
    display: flex;
    align-items: center;

    a {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 1.5vw;
        background: transparent;
        transition: background 0.2s, font-size 0.2s;
        font-size: 1.5vw;
        font-weight: 700;
        line-height: 150%;
        color: ${ColorsEnum.GRAPHITE};
        text-transform: uppercase;
    }

    &:hover {
        a {
            opacity: 1;
            background: #f8f8f8;
        }
    }

    ${({active}) => active && `
        pointer-events: none;

        a {
            background: #f8f8f8;
        }
    `}
`;

const StyledHeader = styled.header<IStyledMenu>`
    display: flex;
    align-items: center;
    width: 100%;
    height: 8vw;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 1000;
    padding: 0 4vw;
    box-sizing: border-box;
    transition: height 0.2s;

    @media (max-width: 720px) {
        height: 11vw;

        ${StyledLogo} {
            width: 9vw;
            height: 9vw;
        }

        ${StyledCategory} {
            a {
                font-size: 2.5vw;
            }
        }

        ${StyledLang} {
            font-size: 2vw;
        }
    }

    ${({small}) => small && `
        @media (min-width: 720px) {
            height: 5vw;

            ${StyledLogo} {
                width: 4vw;
                height: 4vw;
            }

            ${StyledCategory} {
                a {
                    font-size: 1vw;
                }
            }
        }
    `}
`;

const StyledCategories = styled.div`
    display: flex;
    align-items: stretch;
    height:inherit;
    margin-left: auto;
`;

const StyledLangs = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0.7vw;
`;

const Layout: FunctionComponent<ILayout> = ({
    intl,
    children
}) => {
    const { language, messages } = intl;

    const { y: windowScrollY } = useWindowScroll();
    const location = useLocation();

    return (
        <>
            <GlobalStyle />
            <StyledLayout>
                <StyledHeader small={windowScrollY >= 100}>
                    <StyledLogoLink to='/'>
                        <StyledLogo src={logoSvg} alt='Maria Machine Logo' />
                    </StyledLogoLink>
                    <StyledLangs>
                        <StyledLang localeName={LocaleEnum.EN}>
                            Eng
                        </StyledLang>
                        <StyledLang localeName={LocaleEnum.RU}>
                            Rus
                        </StyledLang>
                    </StyledLangs>
                    <StyledCategories>
                        {
                            Object.keys(CategoriesEnum)
                                .map((category) => category.toLowerCase())
                                .filter((category) => !(language === LocaleEnum.EN && category === CategoriesEnum.TRANSLATIONS))
                                .map((category) => (
                                    <StyledCategory
                                        key={category}
                                        active={(location.pathname || '').includes(`/categories/${category}`)}
                                    >
                                        <Link to={`/categories/${category}`}>
                                            {messages[category]}
                                        </Link>
                                    </StyledCategory>
                                ))
                        }
                    </StyledCategories>
                </StyledHeader>
                <StyledContent>
                    {children}
                </StyledContent>
                <Footer />
            </StyledLayout>
        </>
    );
};

export default Layout;
