import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { IPost } from '../../interfaces/post.interface';

import Post from '../Post';

interface IPosts {
    readonly posts: IPost[];
}

const StyledPosts = styled.div`
    display: flex;
    flex-direction: column;
`;

const Posts: FunctionComponent<IPosts> = ({posts}) => (
    <StyledPosts>
        {posts
            .filter((post) => !!post.fields.title)
            .map((post) => (<Post key={post.fields.title} post={post} />))
        }
    </StyledPosts>
);

export default Posts;
