import React, { FunctionComponent, useEffect, Dispatch } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useWindowScroll } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';

import { contentful } from '../../utils/contentful';

import { setLayoutCategoriesColor, setLangLocale, setPosts } from '../../actionCreators';

import { config } from '../../config';

import { messages } from '../../translations';

import { IState } from '../../interfaces/state.interface';

import { CategoriesEnum } from '../../enums/categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';
import { ColorsEnum } from '../../enums/colors.enum';

import { ActionType } from '../../reducers/root-reducer';

import logoSvg from './assets/logo.png';

import Footer from '../Footer';

interface IStyledCategory {
    readonly active: boolean;
    readonly activeColor?: ColorsEnum;
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

    ${({active, activeColor}) => active && `
        pointer-events: none;

        a {
            background: ${activeColor || '#f8f8f8'};
            color: #fff;
        }

        &:hover {
            a {
                background: ${activeColor || '#f8f8f8'};
            }
        }
    `}
`;

const StyledLang = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.5vw;
    margin-left: 1.5vw;
    height: 100%;
    background: transparent;
    transition: opacity 0.2s, font-size 0.2s;
    font-size: 1.5vw;
    font-weight: 700;
    line-height: 150%;
    color: ${ColorsEnum.SAN_JUAN};
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
       opacity: 0.7;
    }
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
            font-size: 2.5vw;
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

            ${StyledLang} {
                font-size: 1vw;
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

const fetchPosts = async (
    locale: string,
    dispatch: Dispatch<ActionType>
) => {
    const { items: posts } = await contentful().getEntries({
        'content_type': 'post',
        order: '-fields.date',
        locale
    });

    dispatch(setPosts(locale, posts));
};

const Layout: FunctionComponent = ({
    children
}) => {
    const dispatch = useDispatch();
    const { locale, formatMessage } = useIntl();
    const { pathname } = useLocation();
    const { color: categoryActiveColor } = useSelector((state: IState) => state.layout.categories);

    useEffect(() => { fetchPosts(locale, dispatch); }, [locale, dispatch]);

    const { y: windowScrollY } = useWindowScroll();

    return (
        <StyledLayout>
            <StyledHeader small={windowScrollY >= 100}>
                <StyledLogoLink to='/'>
                    <StyledLogo src={logoSvg} alt='Maria Machine Logo' />
                </StyledLogoLink>
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
                    <StyledLang
                        onClick={() => {
                            const nextLocale = locale === LocaleEnum.EN ? LocaleEnum.RU : LocaleEnum.EN;

                            dispatch(setLangLocale(nextLocale));
                            localStorage.setItem(config.localStorage.locale, nextLocale);
                        }}
                    >
                        {locale === LocaleEnum.EN ? 'ru' : 'en'}
                    </StyledLang>
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
