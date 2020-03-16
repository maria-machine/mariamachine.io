import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';
import { useIntl, Link } from 'gatsby-plugin-intl';
import { useLocation } from 'react-use';

import { DATE_FNS_LOCALES_MAP, COVER_COLORS_MAP } from '../../maps';

import { messages } from '../../translations';

import { IPost } from '../../interfaces/post.interface';

import { ColorsEnum } from '../../enums/colors.enum';

interface IPostFeatured {
    readonly post: IPost;
    readonly staticMode?: boolean;
}

interface IStyledPostFeatured {
    readonly coverColor: ColorsEnum;
}

interface IStyledDescription {
    readonly cover: boolean;
}

const StyledCategory = styled.div`
    font-size: 1vw;
    text-transform: uppercase;
    z-index: 15;

    @media (max-width: 720px) {
        font-size: 2.5vw;
    }
`;

const StyledTitle = styled.div`
    font-size: 4vw;
    font-weight: 700;
    margin: 1vw 0 0.5vw;

    @media (max-width: 720px) {
        font-size: 6vw;
        text-align: center;
        margin: 1.5vw 0 1vw;
    }
`;

const StyledDate = styled.div`
    font-size: 1vw;

    @media (max-width: 720px) {
        font-size: 2.5vw;
        text-align: center;
    }
`;

const StyledPostFeatured = styled.div<IStyledPostFeatured>`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 35vw;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.95;
    }

    @media (max-width: 720px) {
        flex-direction: column;
        padding: 4vw;
        box-sizing: border-box;
        min-height: auto;
    }

    ${({coverColor}) => `
        background: ${coverColor};

        ${StyledCategory} a {
            color: ${COVER_COLORS_MAP[coverColor].category}
        }

        ${StyledTitle} {
            color: ${COVER_COLORS_MAP[coverColor].title}
        }

        ${StyledDate} {
            color: ${COVER_COLORS_MAP[coverColor].date}
        }
    `}
`;

const StyledCover = styled.img`
    position: fixed;
    top: 10.5vw;
    left: 15vw;
    width: 30vw;
    z-index: 10;

    @media (max-width: 720px) {
        position: relative;
        top: 0;
        left: 0;
    }
`;

const StyledDescription = styled.div<IStyledDescription>`
    width: 100%;
    padding: 10px 10px 10px 50%;
    box-sizing: border-box;

    @media (max-width: 720px) {
        padding: 2.5vw 0 0;
    }

    ${({cover}) => !cover && `
        padding: 0 4vw;
        width: 100%;
        max-width: 910px;
        margin: auto;
    `}
`;

const StyledCategories = styled.div`
    display: flex;

    @media (max-width: 720px) {
        justify-content: center;
    }
`;

const StyledLink = styled(Link)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
`;

const PostFeatured: FunctionComponent<IPostFeatured> = ({post, staticMode}) => {
    const { locale, formatMessage } = useIntl();
    const location = useLocation();

    const {
        cover,
        coverColor = ColorsEnum.GREY,
        title,
        date,
        categories,
        publicUrl
    } = post;

    return (
        <StyledPostFeatured coverColor={coverColor}>
            {cover ? (
                <StyledCover src={`${location.origin}${cover.publicURL}`} alt={`${title} image cover`} />
            ) : null}
            <StyledDescription cover={!!cover}>
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
                <StyledTitle>{title}</StyledTitle>
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
            </StyledDescription>
            { !staticMode ? (<StyledLink to={`/posts/${publicUrl}`}>{''}</StyledLink>) : null}
        </StyledPostFeatured>
    );
};

export default PostFeatured;
