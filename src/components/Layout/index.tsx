import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { setNoScroll } from '../../utils/set-no-scroll';

import logoSvg from './assets/logo.png';
import arrowRightSvg from './assets/arrow-right.svg';
import arrowDownSvg from './assets/arrow-down.svg';

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

const StyledBar = styled.div<IStyledBar>`
    position: fixed;
    top: 0;
    left: 0;
    width: 150px;
    height: 100%;
    background: #23262c;
    transition: width 0.3s, height 0.3s;
    z-index: 10;
    border-right: 1px solid #ccc;

    @media (max-width: 1200px) {
        width: 100%;
        height: 70px;
    }

    ${({opened}) => opened && `
        width: 100%;

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

const StyledBarMenu = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 150px;
    background: #fff;

    @media (max-width: 1200px) {
        top: auto;
        left: 0;
        right: 0;
        width: 100%;
        height: 70px;
    }
`;

const StyledContent = styled.div<IStyledContent>`
    position: relative;
    min-height: 100vh;
    padding: 30px 40px 20px calc(150px + 40px);
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
    position: absolute;
    top: 25px;
    left: 0;
    right: 0;
    margin: auto;
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

const Layout: FunctionComponent<ILayout> = ({
    loader = false,
    children
}) => {
    const [isBarOpened, setIsBarOpened] = useState(false);

    return (
        <StyledLayout>
            <StyledBar opened={isBarOpened}>
                <StyledBarMenu>
                    <Link to='/'>
                        <StyledLogo src={logoSvg} alt='Maria Machine Logo' />
                    </Link>
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
