import React, { FunctionComponent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';

import { contentful } from '../../utils/contentful';

import { IPost } from '../../interfaces/post.interface';

import Layout from '../Layout';
import Loader from '../Loader';
import Posts from '../Posts';

const fetchPosts = async (
    locale: string,
    setPosts: Dispatch<SetStateAction<IPost[]>>
) => {
    const { items: posts } = await contentful().getEntries({locale});

    setPosts(posts as IPost[]);
};

const Main: FunctionComponent = () => {
    const { locale } = useIntl();

    const [posts, setPosts] = useState([] as IPost[]);
    useEffect(() => { fetchPosts(locale, setPosts); }, [locale]);

    const isLoading = !posts.length;

    return (
        <Layout loader={isLoading}>
            {isLoading
                ? (<Loader />)
                : (<Posts posts={posts} / >)
            }
        </Layout>
    );
};

export default Main;
