import React, { FunctionComponent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { contentful } from '../../utils/contentful';

import { IPost } from '../../interfaces/post.interface';

import Loader from '../Loader';
import Posts from '../Posts';

const StyledMain = styled.div`
    display: flex;
    width: 100%;
`;

const fetchPosts = async (
    locale: string,
    setPosts: Dispatch<SetStateAction<IPost[]>>
) => {
    const { items: posts } = await contentful().getEntries({
        'content_type': 'post',
        order: '-fields.date',
        locale
    });

    setPosts(posts as IPost[]);
};

const Main: FunctionComponent = () => {
    const { locale } = useIntl();

    const [posts, setPosts] = useState([] as IPost[]);
    useEffect(() => { fetchPosts(locale, setPosts); }, [locale]);

    const isLoading = !posts.length;

    return (
        <StyledMain>
            {isLoading
                ? (<Loader />)
                : (
                    <>
                        <Helmet>
                            <html lang={locale} />
                            <title>Maria Machine</title>
                            <meta name='title' content='Maria Machine' />
                            <meta property='og:title' content='Maria Machine' />
                            <meta property='og:url' content={`${window.location.href}`} />
                            <meta property='twitter:title' content='Maria Machine' />
                        </Helmet>
                        <Posts posts={posts} / >
                    </>
                )
            }
        </StyledMain>
    );
};

export default Main;
