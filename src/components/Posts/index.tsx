import React, { FunctionComponent, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Masonry from 'react-masonry-component';

import { setLayoutCategoriesColor } from '../../actionCreators';

import { config } from '../../config';

import { IPost } from '../../interfaces/post.interface';

import { ColorsEnum } from '../../enums/colors.enum';

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
    const dispatch = useDispatch();

    const availablePosts = posts
        .filter((post) => config.app.dev || post.fields.showOnProduction)
        .filter((post) => !!post.fields.title);

    const firstPost = posts[0];

    useEffect(() => {
        dispatch(setLayoutCategoriesColor(firstPost.fields.coverColor || ColorsEnum.VALENCIA));
    }, [dispatch, firstPost.fields.coverColor]);

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
                                        <Fragment key={post.fields.title}>
                                            <Subscription />
                                            {
                                                !post.fields.cover
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

                                if (!post.fields.cover) {
                                    return (<PostMini key={post.fields.title} post={post} />);
                                }

                                return (<PostRegular key={post.fields.title} post={post} />);
                            })
                    }
                </Masonry>
            </StyledMasonry>
        </StyledPosts>
    );
};

export default Posts;
