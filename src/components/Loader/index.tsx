import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import loaderSvg from './assets/loader.svg';

const StyledLoaderWrapper = styled.div`
    width: 100%;
    padding: 60px 0;
`;

const StyledLoader = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    &:after {
        content: '';
        background: url(${loaderSvg});
        width: 38px;
        height: 38px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }
`;

const Loader: FunctionComponent = () => (
    <StyledLoaderWrapper>
        <StyledLoader />
    </StyledLoaderWrapper>
);

export default Loader;
