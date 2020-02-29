import React, { FunctionComponent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { contentful } from '../../utils/contentful';

import { colors } from '../../variables';

import { IPost } from '../../interfaces/post.interface';

import Layout from '../Layout';
import Loader from '../Loader';
import Posts from '../Posts';

interface ICategory {
    readonly category: string;
}

const StyledTitle = styled.div`
    font-family: 'PT Mono', monospace;
    font-size: 54px;
    font-weight: 700;
    line-height: 100%;
    color: ${colors.mulled};
    text-transform: uppercase;
    margin-bottom: 70px;
`;

const fetchPosts = async (category: string, setPosts: Dispatch<SetStateAction<IPost[]>>) => {
    const { items: posts } = await contentful().getEntries({
        'content_type': 'post',
        'fields.category': category
    });

    setPosts(posts as IPost[]);
};

const Category: FunctionComponent<RouteComponentProps<ICategory>> = ({match}) => {
    const { category } = match.params;

    const [posts, setPosts] = useState([] as IPost[]);
    useEffect(() => { fetchPosts(category, setPosts); }, []);

    const isLoading = !posts.length;

    return (
        <Layout loader={isLoading}>
            {isLoading
                ? (<Loader />)
                : (
                    <>
                        <StyledTitle>{category}</StyledTitle>
                        <Posts posts={posts} / >
                    </>
                )
            }
        </Layout>
    );
};

export default Category;
