import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { messages } from '../../translations';

import mariaMachineRobotPng from './assets/maria-machine-robot.png';

const StyledPage404 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 4vw;
    box-sizing: border-box;
`;

const StyledTitle = styled.div`
    text-align: center;

    img {
        width: 50vh;
        max-width: 100%;
    }
`;

const StyledDescription = styled.h1`
    font-size: 24px;
    font-weight: 400;
    line-height: 150%;
    text-align: center;

    span {
        display: block;
    }

    a {
        position: relative;
    }

    a:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #000;
    }

    @media (max-width: 720px) {
        font-size: 4vw;
    }
`;

const Page404: FunctionComponent = () => {
    const { formatMessage } = useIntl();

    return (
        <StyledPage404>
            <StyledTitle>
                <img src={mariaMachineRobotPng} alt='Logo Maria Machine Robot' />
            </StyledTitle>
            <StyledDescription>
                <span>{formatMessage(messages.page404)}</span> <Link to='/'>{formatMessage(messages.page404more)}</Link>
            </StyledDescription>
        </StyledPage404>
    );
};

export default Page404;
