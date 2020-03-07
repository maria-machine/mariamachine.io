import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ColorsEnum } from '../../../enums/colors.enum';

const StyledHr = styled.hr`
    border: none;
    background: ${ColorsEnum.GRAPHITE};
    height: 1px;
`;

const Hr: FunctionComponent = () => (
    <StyledHr />
);

export default Hr;
