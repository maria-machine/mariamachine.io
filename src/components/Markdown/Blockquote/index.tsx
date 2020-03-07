import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledBlockquote = styled.div`
    position: relative;
    padding-left: 20px;
    margin: 45px 0;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: blue;
    }

    p {
        font-weight: 300;
    }

    p:last-child {
        margin-bottom: 0!important;
    }

    &:first-child {
        margin-top: 0;
    }
`;

const Blockquote: FunctionComponent = ({children}) => (
    <StyledBlockquote>{children}</StyledBlockquote>
);

export default Blockquote;
