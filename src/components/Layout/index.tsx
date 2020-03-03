import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { colors } from '../../variables';
import { messages } from '../../translations';

import { PostCategoriesEnum } from '../../enums/post-categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';

import logoSvg from './assets/logo.png';

import Lang from '../Lang';

export enum LayoutBarPositionEnum {
    LEFT = 'left',
    RIGHT = 'right'
}

interface ILayout {
    readonly contentCenter?: boolean;
}

interface IStyledContent {
    readonly contentCenter: boolean;
}

const StyledLayout = styled.div`
    min-height: 100vh;
    min-width: 100vw;
`;

const StyledContent = styled.div<IStyledContent>`
    position: relative;
    min-height: calc(100vh - 8vw);
    box-sizing: border-box;

    ${({contentCenter}) => contentCenter && `
        display: flex;
        flex-direction: column;
        justify-content: center;
    `}
`;

const StyledMenu = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 8vw;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 0 2vw;
    box-sizing: border-box;
`;

const StyledCategories = styled.div`
    display: flex;
    align-items: stretch;
    height:inherit;
    margin-left: auto;
`;

const StyledCategory = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 1.5vw;
    font-size: 2vw;
    font-weight: 700;
    line-height: 150%;
    color: ${colors.mulled};
    background: transparent;
    transition: background 0.2s;

    &:last-child {
        color: ${colors.peru}
    }

    &:hover {
        opacity: 1;
        background: #f8f8f8;
    }
`;

const StyledLogo = styled.img`
    width: 6vw;
    margin-left: -0.8vw;
`;

const StyledLangs = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const StyledLang = styled(Lang)`
    font-size: 14px;
    line-height: 150%;
    margin-right: 10px;
    text-transform: uppercase;
    transition: opacity 0.1s;

    &:last-child {
        margin-right: 0;
    }
`;

const Layout: FunctionComponent<ILayout> = ({
    contentCenter = false,
    children
}) => {
    const { locale, formatMessage } = useIntl();

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
                        Object.keys(PostCategoriesEnum)
                            .map((category) => category.toLowerCase())
                            .filter((category) => !(locale === LocaleEnum.EN && category === PostCategoriesEnum.TRANSLATIONS))
                            .map((category) => (
                                <StyledCategory to={`/categories/${category}`} key={category}>
                                    {formatMessage((messages as {[key: string]: {[key: string]: string}})[category])}
                                </StyledCategory>
                            ))
                    }
                    <StyledCategory to={`/contacts`}>
                        {formatMessage(messages.contactsCategory)}
                    </StyledCategory>
                </StyledCategories>
            </StyledMenu>
            <StyledContent contentCenter={contentCenter}>
                {children}
            </StyledContent>
        </StyledLayout>
    );
};

export default Layout;
