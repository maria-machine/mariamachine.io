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
    grid-row-start: 2;
    grid-row-end: 3;
    align-items: center;
    background: ${ColorsEnum.GREY};
    color: #fff;
    padding: 5vw 4vw;
    z-index: 20;
`;

const StyledSocial = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4vw;

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

const StyledAuthor = styled.div`
    display: flex;
    margin-top: 4vw;

    span {
        align-self: flex-end;
        font-size: 1vw;
        color: ${ColorsEnum.GRAPHITE};
        margin-right: 10px;
    }

    a {
        font-size: 2vw;
        font-weight: 700;
        color: ${ColorsEnum.VALENCIA};
    }

    @media (max-width: 720px) {
        span {
            font-size: 2vw;
        }

        a {
            font-size: 4vw;
        }
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
            <StyledAuthor>
                <span>© {(new Date()).getFullYear()}</span>
                <a href='https://twitter.com/maksUgr' target='_blank' rel="noopener noreferrer">@maksugr</a>
            </StyledAuthor>
        </StyledFooter>
    );
};

export default Footer;
