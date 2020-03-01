import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { IPost } from '../../interfaces/post.interface';

import { PostCategoriesEnum } from '../../enums/post-categories.enum';

import { colors } from '../../variables';

import { messages } from '../../translations';

interface IPostComponent {
    readonly post: IPost;
}

const StyledPost = styled.div`
    margin-bottom: 50px;
`;

const StyledCategories = styled.div``;

const StyledCategory = styled(Link)`
    display: inline-block;
    font-family: 'PT Mono', monospace;
    font-size: 14px;
    line-height: 150%;
    color: ${colors.mulled};
    text-transform: uppercase;
    margin-right: 10px;

    &:last-child {
        margin-right: 0;
    }
`;

const StyledTitle = styled(Link)`
    display: block;
    font-family: 'PT Serif', sans-serif;
    font-size: 44px;
    font-weight: 700;
    line-height: 130%;
    color: ${colors.moccaccino};
`;

const Post: FunctionComponent<IPostComponent> = ({post}) => {
    const { formatMessage } = useIntl();

    return (
        <StyledPost>
            <StyledCategories>
                {post.fields.categories.map((category: PostCategoriesEnum) => (
                    <StyledCategory key={category} to={`/${category}`}>
                        {formatMessage(messages[category])}
                    </StyledCategory>
                ))}
            </StyledCategories>
            <StyledTitle to={`/posts/${post.fields.publicUrl}`}>
                {post.fields.title}
            </StyledTitle>
        </StyledPost>
    );
};

export default Post;
