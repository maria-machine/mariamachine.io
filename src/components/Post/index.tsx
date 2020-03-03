import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { IPost } from '../../interfaces/post.interface';

import { colors } from '../../variables';

import Categories from '../Categories';

interface IPostComponent {
    readonly post: IPost;
}

const StyledPost = styled.div`
    margin-bottom: 50px;
`;

const StyledTitle = styled(Link)`
    display: block;
    font-size: 44px;
    font-weight: 700;
    line-height: 130%;
    color: ${colors.moccaccino};
`;

const Post: FunctionComponent<IPostComponent> = ({post}) => {
    return (
        <StyledPost>
            <Categories categories={post.fields.categories} />
            <StyledTitle to={`/posts/${post.fields.publicUrl}`}>
                {post.fields.title}
            </StyledTitle>
        </StyledPost>
    );
};

export default Post;
