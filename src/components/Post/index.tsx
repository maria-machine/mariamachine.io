import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { IPost } from '../../interfaces/post.interface';

import { colors } from '../../variables';

interface IPostComponent {
    readonly post: IPost;
}

const StyledPost = styled.div`
    margin-bottom: 50px;
`;

const StyledCategory = styled(Link)`
    display: inline-block;
    font-family: 'PT Mono', monospace;
    font-size: 14px;
    line-height: 150%;
    color: ${colors.mulled};
    text-transform: uppercase;
`;

const StyledTitle = styled(Link)`
    display: block;
    font-family: 'PT Serif', sans-serif;
    font-size: 44px;
    font-weight: 700;
    line-height: 130%;
    color: ${colors.moccaccino};
`;

const Post: FunctionComponent<IPostComponent> = ({post}) => (
    <StyledPost>
        <StyledCategory to={`/${post.fields.category}`}>
            {post.fields.category}
        </StyledCategory>
        <StyledTitle to={`/posts/${post.fields.publicUrl}`}>
            {post.fields.title}
        </StyledTitle>
    </StyledPost>
);

export default Post;
