import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl, changeLocale } from 'gatsby-plugin-intl';

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

    const isDisabled = locale === localeName;

    return (
        <StyledLang
            className={className || ''}
            disabled={isDisabled}
            onClick={() => {
                if (!isDisabled) {
                    changeLocale(localeName);
                }
            }}
        >
            {children}
        </StyledLang>
    );
};

export default Lang;
