import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { colors } from '../../variables';
import { messages } from '../../translations';

import Layout from '../Layout';

const StyledTitle = styled.h1`
    font-size: 300px;
    font-weight: 700;
    line-height: 100%;
    color: ${colors.moccaccino};
    text-transform: uppercase;
    text-align: center;
`;

const StyledDescription = styled.div`
    font-size: 24px;
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
`;

const Page404: FunctionComponent = () => {
    const { formatMessage } = useIntl();

    return (
        <Layout contentCenter>
            <StyledTitle>
                <span role='img' aria-label='robot'>🤖</span>
            </StyledTitle>
            <StyledDescription>
                <span>{formatMessage(messages.page404)}</span> <Link to='/'>{formatMessage(messages.page404more)}</Link>
            </StyledDescription>
        </Layout>
    );
};

export default Page404;
