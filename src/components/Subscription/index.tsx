import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { config } from '../../config';

import { ColorsEnum } from '../../enums/colors.enum';

import twitterSvg from '../assets/twitter.svg';
import telegramSvg from '../assets/telegram.svg';
import facebookSvg from '../assets/facebook.svg';
import vkSvg from '../assets/vk.svg';
import youtubeSvg from '../assets/youtube.svg';
import githubSvg from '../assets/github.svg';

interface IStyledSocialItem {
    readonly href: string;
    readonly target: string;
    readonly icon: string;
}

const StyledSubscription = styled.div`
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
`;

const StyledSocial = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const StyledSocialItem = styled.a<IStyledSocialItem>`
    background: url(${({icon}) => icon}) no-repeat;
    width: 3vw;
    height: 3vw;
    margin-right: 3vw;

    @media (max-width: 720px) {
        width: 5vw;
        height: 5vw;
        margin-right: 5vw;
    }

    &:last-child {
        margin-right: 0;
    }
`;

const Subscription: FunctionComponent = () => {
    const {
        twitter,
        telegramChannel,
        youtube,
        facebook,
        vk,
        github,
    } = config.socials;

    return (
        <StyledSubscription>
            <StyledSocial>
                <StyledSocialItem href={twitter.link} target='_blank' icon={twitterSvg} />
                <StyledSocialItem href={telegramChannel.link} target='_blank' icon={telegramSvg} />
                <StyledSocialItem href={youtube.link} target='_blank' icon={youtubeSvg} />
                <StyledSocialItem href={facebook.link} target='_blank' icon={facebookSvg} />
                <StyledSocialItem href={vk.link} target='_blank' icon={vkSvg} />
                <StyledSocialItem href={github.link} target='_blank' icon={githubSvg} />
            </StyledSocial>
        </StyledSubscription>
    );
};

export default Subscription;
