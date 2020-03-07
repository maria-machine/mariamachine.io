import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { DATE_FNS_LOCALES_MAP, COVER_COLORS_MAP } from '../../maps';

import { messages } from '../../translations';

import { IPost } from '../../interfaces/post.interface';

import { ColorsEnum } from '../../enums/colors.enum';

interface IPostFeatured {
    readonly post: IPost;
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
`;

const StyledTitle = styled.div`
    font-size: 4vw;
    font-weight: 700;
    margin: 1vw 0 0.5vw;
`;

const StyledDate = styled.div`
    font-size: 1vw;
`;

const StyledPostFeatured = styled.div<IStyledPostFeatured>`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 35vw;
    transition: opacity 0.2s;

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

    &:hover {
        opacity: 0.95;
    }
`;

const StyledCover = styled.img`
    position: fixed;
    top: 10.5vw;
    left: 15vw;
    width: 30vw;
    z-index: 10;
`;

const StyledDescription = styled.div<IStyledDescription>`
    width: 100%;
    padding: 10px 10px 10px 50%;
    box-sizing: border-box;

    ${({cover}) => !cover && `
        padding: 10px 10px 10px 4vw;
    `}
`;

const StyledCategories = styled.div`
    display: flex;
`;

const StyledLink = styled(Link)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const PostFeatured: FunctionComponent<IPostFeatured> = ({post}) => {
    const { locale, formatMessage } = useIntl();

    const {
        cover,
        coverColor = ColorsEnum.GREY,
        title,
        date,
        categories,
        publicUrl
    } = post.fields;

    return (
        <StyledPostFeatured coverColor={coverColor}>
            {cover ? (
                <StyledCover src={`http:${cover.fields.file.url}`} alt={`${title} image cover`} />
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
            <StyledLink to={`/posts/${publicUrl}`} />
        </StyledPostFeatured>
    );
};

export default PostFeatured;
