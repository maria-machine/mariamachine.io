import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ColorsEnum } from '../../../enums/colors.enum';

interface IImage {
    readonly alt: string;
    readonly src: string;
}

const StyledImage = styled.span`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 5px;

    img {
        max-width: 100%;
    }

    & + em {
        display: inline-block;
        font-size: 14px;
        line-height: 150%;
        width: 100%;
        color: ${ColorsEnum.GREY};
        text-align: center;
    }
`;

const Image: FunctionComponent<IImage> = ({alt, src}) => (
    <StyledImage>
        <img src={src} alt={alt} />
    </StyledImage>
);

export default Image;
