import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { IPost } from '../../../interfaces/post.interface';

import { ColorsEnum } from '../../../enums/colors.enum';
import { LocaleEnum } from '../../../enums/locale.enum';

import { messages } from '../../../translations';

import { config } from '../../../config';

import Markdown from '../../Markdown';

import twitterSvg from '../../assets/twitter.svg';
import telegramSvg from '../../assets/telegram.svg';
import facebookSvg from '../../assets/facebook.svg';
import vkSvg from '../../assets/vk.svg';

interface IContent {
    readonly post: IPost;
}

interface IStyledShareIcon {
    readonly href: string;
    readonly target: string;
    readonly icon: string;
}

const StyledContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    background: #fff;
    z-index: 20;
`;

const StyledContent = styled.div`
    max-width: 780px;
    padding: 5vw 2vw;
    box-sizing: border-box;
`;

const StyledFooter = styled.div`
    margin-top: 60px;
`;

const StyledOrigin = styled.a`
    display: block;
    padding: 15px 20px;
    background: ${ColorsEnum.CREAM};
    color: #000;
    margin-bottom: 40px;
`;

const StyledSocial = styled.div`
    display: flex;
`;

const StyledShare = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledShareText = styled.span`
    font-weight: 700;
    text-transform: uppercase;
    color: ${ColorsEnum.VALENCIA};
    margin-right: 20px;
`;

const StyledShareIcon = styled.a<IStyledShareIcon>`
    background: url(${({icon}) => icon}) no-repeat;
    width: 20px;
    margin-right: 10px;

    &:last-child {
        margin-right: 0;
    }
`;

const StyledChat = styled.a`
    font-weight: 700;
    text-transform: uppercase;
    color: ${ColorsEnum.VALENCIA};
    margin-left: auto;
`;

const Content: FunctionComponent<IContent> = ({post}) => {
    const { locale, formatMessage } = useIntl();

    const {
        title,
        content,
        originAuthor,
        originLink,
        originName
    } = post.fields;

    return (
        <StyledContentWrapper>
            <StyledContent>
                <Markdown>{content}</Markdown>
                <StyledFooter>
                    {originLink ? (
                        <StyledOrigin href={originLink} target='_blank'>
                            {`${formatMessage(messages.origin)}: ${originAuthor} «${originName}»`}
                        </StyledOrigin>
                    ) : null}
                    <StyledSocial>
                        <StyledShare>
                            <StyledShareText>{formatMessage(messages.share)}</StyledShareText>
                            <StyledShareIcon href={encodeURI(`https://twitter.com/intent/tweet?text=${title} — Maria Machine ${window.location.href} via @mariamachine_ml`)} target='_blank' icon={twitterSvg} />
                            <StyledShareIcon href={encodeURI(`https://telegram.me/share/url?url=${window.location.href}&text=Maria Machine: @maria_machine`)} target='_blank' icon={telegramSvg} />
                            <StyledShareIcon href={encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)} target='_blank' icon={facebookSvg} />
                            <StyledShareIcon href={encodeURI(`https://vk.com/share.php?url=${window.location.href}`)} target='_blank' icon={vkSvg} />
                        </StyledShare>
                        {locale === LocaleEnum.RU
                        ? (
                            <StyledChat href={config.socials.telegramChat.link} target='_blank'>
                                Обудить в чате Telegram
                            </StyledChat>
                        ) : null}
                    </StyledSocial>
                </StyledFooter>
            </StyledContent>

        </StyledContentWrapper>
    );
};

export default Content;
