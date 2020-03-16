import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl } from 'gatsby-plugin-intl';
import { useLocation } from 'react-use';

import { IPost } from '../../../interfaces/post.interface';

import { ColorsEnum } from '../../../enums/colors.enum';
import { LocaleEnum } from '../../../enums/locale.enum';

import { messages } from '../../../translations';

import { config } from '../../../config';

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
    width: 100%;
    max-width: 910px;
    padding: 4vw 4vw 90px 4vw;
    box-sizing: border-box;

    @media (max-width: 720px) {
        padding-bottom: 45px;
    }
`;

const StyledFooter = styled.div`
    margin-top: 60px;

    @media (max-width: 720px) {
        margin-top: 30px;
    }
`;

const StyledOrigin = styled.a`
    display: block;
    padding: 15px 20px;
    background: ${ColorsEnum.CREAM};
    color: #000;
    margin-bottom: 40px;

    @media (max-width: 720px) {
        margin-bottom: 20px;
    }
`;

const StyledSocial = styled.div`
    display: flex;

    @media (max-width: 630px) {
        flex-direction: column;
        align-items: flex-start;
    }
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

    @media (max-width: 630px) {
        margin: 10px 0 0;
    }
`;

const StyledHtml = styled.div`
    font-size: 21px;
    line-height: 160%;
    color: #000;

    h2 {
        font-size: 34px;
        margin-bottom: 20px;
    }

    h3 {
        margin-bottom: 10px;
    }

    a {
        position: relative;
        color: #000;
        text-decoration: none;
    }

    a:before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #000;
    }

    .gatsby-resp-image-link:before {
        content: none;
    }

    code {
        font-size: 15px;
        line-height: 130%;
    }

    blockquote {
        position: relative;
        padding-left: 20px;
        margin: 45px 0;
    }

    blockquote:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: ${ColorsEnum.CREAM};
    }

    blockquote:first-child {
        margin-top: 0;
    }

    p code {
        padding: 4px 8px;
        background: rgba(0, 0, 0, 0.05);
    }

    p, ul, pre, hr {
        margin-bottom: 42px;
    }

    blockquote p {
        font-weight: 300;
    }

    p:last-child {
        margin-bottom: 0;
    }

    blockquote p:last-child {
        margin-bottom: 0!important;
    }

    img {
        width: auto;
        height: auto;
        max-width: 100%;
    }

    img + em, .gatsby-resp-image-wrapper + em {
        display: inline-block;
        font-size: 14px;
        line-height: 150%;
        width: 100%;
        color: ${ColorsEnum.GREY};
        text-align: center;
    }

    p + img {
        text-align: center;
    }

    li {
        position: relative;
        padding-left: 20px;
    }

    li:after {
        content: '';
        position: absolute;
        top: 14px;
        left: 0;
        width: 6px;
        height: 6px;
        border-radius: 50px;
        background: ${ColorsEnum.CREAM};
    }

    hr {
        border: none;
        background: ${ColorsEnum.GRAPHITE};
        height: 1px;
    }

    .gatsby-highlight pre {
        font-size: 16px;
        margin: 0;
        margin-bottom: 42px;
    }

    @media (max-width: 720px) {
        font-size: 18px;

        h2 {
            font-size: 28px;
        }

        p, ul, pre, hr {
            margin-bottom: 20px;
        }

        li:after {
            top: 11px;
        }
    }
`;

const Content: FunctionComponent<IContent> = ({post}) => {
    const { locale, formatMessage } = useIntl();
    const location = useLocation();

    const {
        title,
        content,
        originAuthor,
        originLink,
        originName
    } = post;

    return (
        <StyledContentWrapper>
            <StyledContent>
                <StyledHtml dangerouslySetInnerHTML={{__html: content}} />
                <StyledFooter>
                    {originLink ? (
                        <StyledOrigin href={originLink} target='_blank'>
                            {`${formatMessage(messages.origin)}: ${originAuthor} «${originName}»`}
                        </StyledOrigin>
                    ) : null}
                    <StyledSocial>
                        <StyledShare>
                            <StyledShareText>{formatMessage(messages.share)}</StyledShareText>
                            <StyledShareIcon href={encodeURI(`https://twitter.com/intent/tweet?text=${title} — Maria Machine ${location.href} via @mariamachine_ml`)} target='_blank' icon={twitterSvg} />
                            <StyledShareIcon href={encodeURI(`https://telegram.me/share/url?url=${location.href}&text=Maria Machine: @maria_machine`)} target='_blank' icon={telegramSvg} />
                            <StyledShareIcon href={encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${location.href}`)} target='_blank' icon={facebookSvg} />
                            <StyledShareIcon href={encodeURI(`https://vk.com/share.php?url=${location.href}`)} target='_blank' icon={vkSvg} />
                        </StyledShare>
                        {locale === LocaleEnum.RU
                        ? (
                            <StyledChat href={config.socials.telegramChat.link} target='_blank'>
                                Обсудить в чате Telegram
                            </StyledChat>
                        ) : null}
                    </StyledSocial>
                </StyledFooter>
            </StyledContent>

        </StyledContentWrapper>
    );
};

export default Content;
