import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useWindowScroll } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';

import { setLayoutCategoriesColor } from '../../actionCreators';

import { messages } from '../../translations';

import { IState } from '../../interfaces/state.interface';

import { CategoriesEnum } from '../../enums/categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';
import { ColorsEnum } from '../../enums/colors.enum';

import logoSvg from './assets/logo.png';

import Lang from '../Lang';
import Footer from '../Footer';

interface IStyledCategory {
    readonly active: boolean;
    readonly activeColor?: ColorsEnum;
}

interface IStyledMenu {
    readonly small: boolean;
}

const StyledLayout = styled.div`
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
    min-height: calc(100vh - 8vw);
    box-sizing: border-box;

    @media (max-width: 720px) {
        min-height: calc(100vh - 11vw);
    }
`;

const StyledLogoLink = styled(Link)`
    display: flex;
`;

const StyledLogo = styled.img`
    width: 7vw;
    transition: width 0.2s;
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

    &:last-child {
        a {
            color: ${ColorsEnum.GREY};
        }
    }

    &:hover {
        a {
            opacity: 1;
            background: #f8f8f8;
        }
    }

    ${({active, activeColor}) => active && `
        pointer-events: none;

        a {
            background: ${activeColor || '#f8f8f8'};
            color: #fff;
        }

        &:last-child {
            a {
                background: ${ColorsEnum.VALENCIA};
                color: #fff;
            }
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
            width: 10vw;
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

const Layout: FunctionComponent = ({
    children
}) => {
    const dispatch = useDispatch();
    const { locale, formatMessage } = useIntl();
    const { pathname } = useLocation();
    const { color: categoryActiveColor } = useSelector((state: IState) => state.layout.categories);

    const { y: windowScrollY } = useWindowScroll();

    return (
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
                            .filter((category) => !(locale === LocaleEnum.EN && category === CategoriesEnum.TRANSLATIONS))
                            .map((category) => (
                                <StyledCategory
                                    key={category}
                                    active={pathname === `/categories/${category}`}
                                    activeColor={categoryActiveColor}
                                >
                                    <Link
                                        to={`/categories/${category}`}
                                        onClick={() => {
                                            dispatch(setLayoutCategoriesColor());
                                        }}
                                    >
                                        {formatMessage((messages as {[key: string]: {[key: string]: string}})[category])}
                                    </Link>
                                </StyledCategory>
                            ))
                    }
                    <StyledCategory active={pathname === `/contacts`}>
                        <Link
                            to={`/contacts`}
                        >
                            {formatMessage(messages.contactsCategory)}
                        </Link>
                    </StyledCategory>
                </StyledCategories>
            </StyledHeader>
            <StyledContent>
                {children}
            </StyledContent>
            <Footer />
        </StyledLayout>
    );
};

export default Layout;
