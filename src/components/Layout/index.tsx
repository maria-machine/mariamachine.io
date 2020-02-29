import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logoSvg from './assets/logo.png';
import arrowRightSvg from './assets/arrow-right.svg';
import arrowDownSvg from './assets/arrow-down.svg';

export enum LayoutBarPositionEnum {
    LEFT = 'left',
    RIGHT = 'right'
}

interface ILayout {
    readonly barPosition?: LayoutBarPositionEnum;
}

interface IStyledLayout {
    readonly barPosition: LayoutBarPositionEnum;
}

interface IStyledBar {
    readonly opened: boolean;
}

const StyledLayout = styled.div<IStyledLayout>`
    min-height: 100vh;
    min-width: 100vw;
    background: #23262c;
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
    transition: transform 0.3s;

    @media (max-width: 1200px) {
        background: url(${arrowDownSvg});
        left: auto;
        right: 20px;
        width: 40px;
        height: 40px;
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

const StyledContent = styled.div`
    background: red;
    padding: 0 0 0 150px;

    @media (max-width: 1200px) {
        padding: 70px 0 0 0;
    }
`;

const StyledLogo = styled.img`
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 90px;
    border-radius: 50px;

    @media (max-width: 1200px) {
        top: 0;
        bottom: 0;
        left: 20px;
        right: auto;
        width: 60px;
    }
`;

const Layout: FunctionComponent<ILayout> = ({
    barPosition = LayoutBarPositionEnum.LEFT,
    children
}) => {
    const [isBarOpened, setIsBarOpened] = useState(false);

    return (
        <StyledLayout barPosition={barPosition}>
            <StyledBar opened={isBarOpened}>
                <StyledBarMenu>
                    <Link to='/'>
                        <StyledLogo src={logoSvg} alt='Maria Machine Logo' />
                    </Link>
                    <StyledBarMenuArrow onClick={() => setIsBarOpened(!isBarOpened)} />
                </StyledBarMenu>
            </StyledBar>
            <StyledContent>
                {children}
            </StyledContent>
        </StyledLayout>
    );
};

export default Layout;
