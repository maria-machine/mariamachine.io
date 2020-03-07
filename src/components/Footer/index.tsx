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

import Subscription from '../Subscription';

interface IStyledSocialItem {
    readonly href: string;
    readonly target: string;
    readonly icon: string;
}

const StyledFooter = styled.footer`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${ColorsEnum.GREY};
    color: #fff;
    padding: 5vw 2vw;
    z-index: 20;
`;

const StyledSocial = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3vw;

    &:first-child {
        margin-top: 0;
    }
`;

const StyledSocialItem = styled.a<IStyledSocialItem>`
    background: url(${({icon}) => icon}) no-repeat;
    width: 5vw;
    height: 5vw;
    margin-right: 3vw;

    &:last-child {
        margin-right: 0;
    }
`;

const Footer: FunctionComponent = () => {
    const {
        twitter,
        telegramChannel,
        youtube,
        facebook,
        vk,
        github,
    } = config.socials;

    return (
        <StyledFooter>
            <Subscription footer />
            <StyledSocial>
                <StyledSocialItem href={twitter.link} target='_blank' icon={twitterSvg} />
                <StyledSocialItem href={telegramChannel.link} target='_blank' icon={telegramSvg} />
                <StyledSocialItem href={youtube.link} target='_blank' icon={youtubeSvg} />
                <StyledSocialItem href={facebook.link} target='_blank' icon={facebookSvg} />
                <StyledSocialItem href={vk.link} target='_blank' icon={vkSvg} />
                <StyledSocialItem href={github.link} target='_blank' icon={githubSvg} />
            </StyledSocial>
        </StyledFooter>
    );
};

export default Footer;
