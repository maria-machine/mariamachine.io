import React, { FunctionComponent, Fragment } from 'react';
import styled from 'styled-components';

import Masonry from 'react-masonry-component';

import { IPost } from '../../interfaces/post.interface';

import PostFeatured from '../PostFeatured';
import PostRegular from '../PostRegular';
import PostMini from '../PostMini';
import Subscription from '../Subscription';

interface IPosts {
    readonly posts: IPost[];
}

const StyledPosts = styled.div`
    width: 100%;
`;

const StyledMasonry = styled.div`
    position: relative;
    z-index: 20;
    background: #fff;
`;

const Posts: FunctionComponent<IPosts> = ({posts}) => {
    const availablePosts = posts.filter((post) => !!post.title);

    const firstPost = posts[0];

    return (
        <StyledPosts>
            <PostFeatured post={firstPost} />
            <StyledMasonry>
                <Masonry>
                    {
                        availablePosts
                            .filter((post, i) => i !== 0)
                            .map((post, i) => {
                                if (i === 2) {
                                    return (
                                        <Fragment key={post.title}>
                                            <Subscription />
                                            {
                                                !post.cover
                                                    ? (
                                                        <PostMini post={post} />
                                                    )
                                                    : (
                                                        <PostRegular post={post} />
                                                    )
                                            }
                                        </Fragment>
                                    );
                                }

                                if (!post.cover) {
                                    return (<PostMini key={post.title} post={post} />);
                                }

                                return (<PostRegular key={post.title} post={post} />);
                            })
                    }
                </Masonry>
            </StyledMasonry>
        </StyledPosts>
    );
};

export default Posts;
