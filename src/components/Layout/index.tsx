import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { setNoScroll } from '../../utils/set-no-scroll';
import { colors } from '../../variables';
import { config, IConfigLink } from '../../config';
import { messages } from '../../translations';

import { PostCategoriesEnum } from '../../enums/post-categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';

import logoSvg from './assets/logo.png';
import arrowRightSvg from './assets/arrow-right.svg';
import arrowDownSvg from './assets/arrow-down.svg';

import Lang from '../Lang';

export enum LayoutBarPositionEnum {
    LEFT = 'left',
    RIGHT = 'right'
}

interface ILayout {
    readonly loader?: boolean;
}

interface IStyledBar {
    readonly opened: boolean;
}

interface IStyledContent {
    readonly loader: boolean;
}

const StyledLayout = styled.div`
    min-height: 100vh;
    min-width: 100vw;
`;

const StyledBarMenuArrow = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    background: url(${arrowRightSvg});
    cursor: pointer;
    transition: transform 0.3s, opacity 0.1s;

    @media (max-width: 1200px) {
        background: url(${arrowDownSvg});
        left: auto;
        right: 20px;
        width: 40px;
        height: 40px;
    }

    &:hover {
        opacity: 0.70;
    }
`;

const StyledBarMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 150px;
    background: #fff;
    padding: 25px 0;
    box-sizing: border-box;
    border-right: 1px solid #ccc;

    @media (max-width: 1200px) {
        top: auto;
        left: 0;
        right: 0;
        width: 100%;
        height: 70px;
    }
`;

const StyledBar = styled.div<IStyledBar>`
    position: fixed;
    top: 0;
    left: 0;
    width: 150px;
    height: 100%;
    background: #fff;
    transition: width 0.3s, height 0.3s;
    z-index: 10;
    overflow: hidden;

    @media (max-width: 1200px) {
        width: 100%;
        height: 70px;
    }

    ${({opened}) => opened && `
        width: 100%;

        ${StyledBarMenu} {
            border: none;
            border-left: 1px solid #ccc;
        }

        ${StyledBarMenuArrow} {
            transform: scaleX(-1);
        }

        @media (max-width: 1200px) {
            height: 100%;

            ${StyledBarMenuArrow} {
                transform: scaleY(-1);
            }
        }
    `}
`;

const StyledBarContent = styled.div`
    padding: 20px calc(150px + 20px) 20px 20px;
    box-sizing: border-box;
`;

const StyledContent = styled.div<IStyledContent>`
    position: relative;
    min-height: 100vh;
    padding: 30px 40px 30px calc(150px + 40px);
    box-sizing: border-box;

    @media (max-width: 1200px) {
        padding: 70px 0 0 0;
    }

    ${({loader}) => loader && `
        display: flex;
        justify-content: center;
    `}
`;

const StyledLogo = styled.img`
    width: 90px;
    transition: opacity 0.1s;

    &:hover {
        opacity: 0.85;
    }

    @media (max-width: 1200px) {
        top: 0;
        bottom: 0;
        left: 20px;
        right: auto;
        width: 60px;
    }
`;

const StyledLangs = styled.div``;

const StyledLang = styled(Lang)`
    font-family: 'PT Mono', monospace;
    font-size: 14px;
    line-height: 150%;
    margin-right: 10px;
    text-transform: uppercase;
    transition: opacity 0.1s;

    &:last-child {
        margin-right: 0;
    }
`;

const StyledCategories = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
`;

const StyledCategory = styled(Link)`
    display: inline-block;
    font-family: 'PT Mono', monospace;
    font-size: 60px;
    font-weight: 700;
    line-height: 150%;
    color: ${colors.mulled};
    text-transform: uppercase;
`;

const StyledSocials = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StyledSocial = styled.a`
    position: relative;
    display: inline-block;
    font-family: 'PT Mono', monospace;
    font-size: 48px;
    font-weight: 700;
    line-height: 150%;
    color: ${colors.peru};
    text-transform: uppercase;
    margin: 0 70px 20px 0;

    &:last-child {
        margin-right: 0;
    }

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: ${colors.peru};
    }
`;

const StyledSubscribe = styled.a`
    display: inline-block;
    font-family: 'PT Mono', monospace;
    font-size: 39px;
    font-weight: 700;
    line-height: 150%;
    color: ${colors.moccaccino};
    text-transform: uppercase;
    margin-bottom: 100px;
`;

const StyledAuthor = styled.a`
    position: absolute;
    bottom: 0;
    left: 30px;
    font-family: 'PT Mono', monospace;
    font-size: 70px;
    font-weight: 700;
    line-height: 150%;
    color: ${colors.wheat};

    span {
        font-size: 39px;
        color: #ccc;
    }
`;

const Layout: FunctionComponent<ILayout> = ({
    loader = false,
    children
}) => {
    const { locale, formatMessage } = useIntl();

    const [isBarOpened, setIsBarOpened] = useState(false);

    return (
        <StyledLayout>
            <StyledBar opened={isBarOpened}>
                <StyledBarContent>
                    <StyledCategories>
                        {
                            Object.keys(PostCategoriesEnum)
                                .map((category) => category.toLowerCase())
                                .filter((category) => !(locale === LocaleEnum.EN && category === PostCategoriesEnum.TRANSLATIONS))
                                .map((category) => (
                                    <StyledCategory to={`/${category}`} key={category}>
                                        {formatMessage((messages as {[key: string]: {[key: string]: string}})[category])}
                                    </StyledCategory>
                                ))
                        }
                    </StyledCategories>
                    <StyledSubscribe href='http://eepurl.com/gUHEFD' target='_blank'>
                        {formatMessage(messages.subscribeTitle)}
                    </StyledSubscribe>
                    <StyledSocials>
                        {
                            Object.keys(config.socials).map((socialName) => {
                                const social = (config.socials as {[key: string]: IConfigLink})[socialName];

                                return (
                                    <StyledSocial key={social.link} href={social.link} target='_blank'>
                                        {social.name}
                                    </StyledSocial>
                                );
                            })
                        }
                    </StyledSocials>
                    <StyledAuthor href='https://twitter.com/maksugr' target="_blank">
                        <span>{formatMessage(messages.author)}: </span>@maksugr
                    </StyledAuthor>
                </StyledBarContent>
                <StyledBarMenu>
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
                    <StyledBarMenuArrow onClick={() => {
                        setNoScroll(!isBarOpened);
                        setIsBarOpened(!isBarOpened);
                    }} />
                </StyledBarMenu>
            </StyledBar>
            <StyledContent loader={loader}>
                {children}
            </StyledContent>
        </StyledLayout>
    );
};

export default Layout;
