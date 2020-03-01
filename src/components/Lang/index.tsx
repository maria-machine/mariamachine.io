import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { config } from '../../config';

import { setLangLocale } from '../../actionCreators';

interface ILang {
    readonly localeName: string;
    readonly className?: string;
}

interface IStyledLang {
    readonly disabled: boolean;
}

const StyledLang = styled.span<IStyledLang>`
    ${({disabled}) => !disabled && `
        cursor: pointer;

        &:hover {
            opacity: 0.85;
        }
    `}
`;

const Lang: FunctionComponent<ILang> = ({children, localeName, className}) => {
    const { locale } = useIntl();
    const reduxDispatch = useDispatch();

    const isDisabled = locale === localeName;

    return (
        <StyledLang
            className={className || ''}
            disabled={isDisabled}
            onClick={() => {
                if (!isDisabled) {
                    reduxDispatch(setLangLocale(localeName));
                    localStorage.setItem(config.localStorage.locale, localeName);
                }
            }}
        >
            {children}
        </StyledLang>
    );
};

export default Lang;
