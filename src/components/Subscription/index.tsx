import React, { FunctionComponent, useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useIntl, MessageDescriptor } from 'react-intl';
import * as emailValidator from 'email-validator';
import jsonp from 'jsonp';
import { useSelector } from 'react-redux';

import { config } from '../../config';
import { messages } from '../../translations';

import { ColorsEnum } from '../../enums/colors.enum';

import { IState } from '../../interfaces/state.interface';

interface ISubscription {
    readonly footer?: boolean;
}

interface IStyledSubscription {
    readonly footer: boolean;
}

interface IStyledSubmit {
    readonly disabled: boolean;
    readonly success: boolean;
}

interface IStyledInput {
    readonly disabled: boolean;
}

const StyledInput = styled.input<IStyledInput>`
    font-size: 2vw;
    font-weight: 300;
    width: 50%;
    margin-right: 10%;
    padding: 0.3vw 0 0.5vw;
    border: none;
    color: ${ColorsEnum.GRAPHITE};
    border-bottom: 1px solid ${ColorsEnum.GRAPHITE};
    outline: none;
    transition: opacity 0.2s;
    background: transparent;
    box-sizing: border-box;
    border-radius: 0;

    &::placeholder {
        font-size: 2vw;
        font-weight: 300;
        color: ${ColorsEnum.GRAPHITE};
        opacity: 0.2;
    }

    @media (max-width: 720px) {
        font-size: 3vw;

        &::placeholder {
            font-size: 3vw;
        }
    }

    ${({disabled}) => disabled && `
        pointer-events: none;
        opacity: 0.2;
    `}
`;

const StyledSubmit = styled.div<IStyledSubmit>`
    cursor: pointer;
    font-size: 2vw;
    text-transform: uppercase;
    color: ${ColorsEnum.VALENCIA};
    transition: opacity 0.2s;
    width: 40%;
    margin-left: auto;
    text-align: right;

    &:hover {
        opacity: 0.85;
    }

    @media (max-width: 720px) {
        font-size: 3vw;
    }

    ${({success}) => success && `
        pointer-events: none;
        cursor: default;
    `}

    ${({disabled}) => disabled && `
        pointer-events: none;
        cursor: default;
        opacity: 0.2;
    `}
`;

const StyledSubscription = styled.div<IStyledSubscription>`
    position: relative;
    display: flex;
    align-items: center;
    width: 50vw;
    padding: 4vw;
    border: 5px solid ${ColorsEnum.VALENCIA};
    box-sizing: border-box;

    @media (max-width: 720px) {
        width: 100%;
    }

    ${({footer}) => footer && `
        width: 50%;
        padding: 0;
        border: none;

        ${StyledInput} {
            text-align: center;
        }

        ${StyledSubmit} {
            width: auto;
            margin-left: 0;
            text-align: left;
        }

        @media (max-width: 720px) {
            width: auto;
        }
    `}
`;

const validateEmail = (email: string): boolean => {
    return !!email && emailValidator.validate(email);
};

const subscribe = (
    email: string,
    formatMessage: (text: MessageDescriptor) => string,
    setSubmit: Dispatch<SetStateAction<string>>,
    setFormDisabled: Dispatch<SetStateAction<boolean>>,
) => {
    const { mailchimp } = config;

    setFormDisabled(true);
    setSubmit(formatMessage(messages.subscriptionProcessing));

    jsonp(
        `https://${mailchimp.client}.us19.list-manage.com/subscribe/post-json?EMAIL=${email}&u=${mailchimp.u}&amp;id=${mailchimp.id}`,
        { param: 'c' },
        () => {
            setSubmit(formatMessage(messages.subscriptionSuccess));
            localStorage.setItem(config.localStorage.subscription, 'true');
        }
    );
};

const Subscription: FunctionComponent<ISubscription> = ({
    footer = false
}) => {
    const { formatMessage } = useIntl();

    const [email, setEmail] = useState('');
    const [submit, setSubmit] = useState(formatMessage(messages.subscriptionSubscribe));

    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [formDisabled, setFormDisabled] = useState(false);

    useEffect(() => {
        setSubmitDisabled(!validateEmail(email));
    }, [email]);

    const subscription = useSelector((state: IState) => state.subscription);

    if (subscription) {
        return null;
    }

    return (
        <StyledSubscription footer={footer}>
            <StyledInput
                pattern='+'
                value={email}
                placeholder={formatMessage(messages.subscriptionEmail)}
                onChange={({target}) => {
                    setEmail(target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        if (validateEmail(email)) {
                            subscribe(email, formatMessage, setSubmit, setFormDisabled);
                        }
                    }
                }}
                disabled={formDisabled}
                autoComplete='something'
            />
            <StyledSubmit
                disabled={submitDisabled}
                success={formDisabled}
                onClick={() => {
                    if (validateEmail(email)) {
                        subscribe(email, formatMessage, setSubmit, setFormDisabled);
                    }
                }}
            >
                {submit}
            </StyledSubmit>
        </StyledSubscription>
    );
};

export default Subscription;
