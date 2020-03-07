import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { messages } from '../../translations';

import { CategoriesEnum } from '../../enums/categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';
import { ColorsEnum } from '../../enums/colors.enum';

import logoSvg from './assets/logo.png';

import Lang from '../Lang';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../interfaces/state.interface';
import { setLayoutCategoriesColor } from '../../actionCreators';

export enum LayoutBarPositionEnum {
    LEFT = 'left',
    RIGHT = 'right'
}

interface IStyledCategory {
    readonly active: boolean;
    readonly activeColor?: ColorsEnum;
}

const StyledLayout = styled.div`
    min-height: 100vh;
    min-width: 100vw;
`;

const StyledContent = styled.div`
    position: relative;
    display: flex;
    min-height: calc(100vh - 8vw);
    box-sizing: border-box;
`;

const StyledMenu = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 8vw;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 0 2vw;
    box-sizing: border-box;
`;

const StyledCategories = styled.div`
    display: flex;
    align-items: stretch;
    height:inherit;
    margin-left: auto;
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
        transition: background 0.2s;
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

const StyledLogo = styled.img`
    width: 6vw;
    margin-left: -0.8vw;
`;

const StyledLangs = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: 10px;
`;

const StyledLang = styled(Lang)`
    font-size: 14px;
    line-height: 150%;
    margin-right: 10px;
    text-transform: lowercase;
    transition: opacity 0.1s;

    &:last-child {
        margin-right: 0;
    }
`;

const Layout: FunctionComponent = ({
    children
}) => {
    const dispatch = useDispatch();
    const { locale, formatMessage } = useIntl();
    const { pathname } = useLocation();
    const { color: categoryActiveColor } = useSelector((state: IState) => state.layout.categories);

    return (
        <StyledLayout>
            <StyledMenu>
                <Link to='/'>
                    <StyledLogo src={logoSvg} alt='Maria Machine Logo' />
                </Link>
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
            </StyledMenu>
            <StyledContent>
                {children}
            </StyledContent>
        </StyledLayout>
    );
};

export default Layout;
