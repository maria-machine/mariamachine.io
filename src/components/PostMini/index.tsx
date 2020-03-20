import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { DATE_FNS_LOCALES_MAP } from '../../maps';

import { messages } from '../../translations';

import { IPost } from '../../interfaces/post.interface';

import { ColorsEnum } from '../../enums/colors.enum';

interface IPostMini {
    readonly post: IPost;
}

const StyledPostMini = styled.div`
    position: relative;
    width: 50vw;
    background: #fff;
    padding: 4vw;
    box-sizing: border-box;
    color: ${ColorsEnum.GRAPHITE};
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.85;
    }

    @media (max-width: 720px) {
        padding: 4vw;
        box-sizing: border-box;
        width: 100%;

        & + & {
            border-top: 1px solid ${ColorsEnum.GREY};
        }
    }
`;

const StyledTitle = styled.div`
    font-size: 4vw;
    margin-bottom: 0.5vw;

    @media (max-width: 720px) {
        font-size: 5vw;
        margin-bottom: 1vw;
    }
`;

const StyledInformation = styled.div`
    display: flex;
`;

const StyledDate = styled.div`
    font-size: 1vw;

    @media (max-width: 720px) {
        font-size: 2.5vw;
    }
`;

const StyledCategories = styled.div`
    display: flex;
`;

const StyledCategory = styled.div`
    font-size: 1vw;
    text-transform: uppercase;
    z-index: 15;
    margin-right: 5px;

     a {
        color: ${ColorsEnum.GREY};
     }

    &:last-child {
        margin-right: 15px;
    }

    @media (max-width: 720px) {
        font-size: 2.5vw;
    }
`;


const StyledLink = styled(Link)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const PostMini: FunctionComponent<IPostMini> = ({post}) => {
    const { locale, formatMessage } = useIntl();

    const {
        title,
        date,
        categories,
        publicUrl
    } = post.fields;

    return (
        <StyledPostMini>
            <StyledTitle>{title}</StyledTitle>
            <StyledInformation>
                <StyledCategories>
                    {
                        categories.map((category) => {
                            return (
                                <StyledCategory key={category}>
                                    <Link to={`/categories/${category}`}>
                                        {formatMessage(messages[category])}
                                    </Link>
                                </StyledCategory>
                            );
                        })
                    }
                </StyledCategories>
                <StyledDate>
                    {
                        formatDistance(
                            new Date(date),
                            new Date(),
                            {
                                locale: DATE_FNS_LOCALES_MAP[locale],
                                addSuffix: true
                            }
                        )
                    }
                </StyledDate>
            </StyledInformation>
            <StyledLink to={`/posts/${publicUrl}`} />
        </StyledPostMini>
    );
};

export default PostMini;
