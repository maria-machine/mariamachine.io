import React, { FunctionComponent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useIntl } from 'gatsby-plugin-intl';

import { IPost } from '../interfaces/post.interface';

import SEO from '../components/seo';
import Layout from '../components/Layout';

// import Posts from '../Posts';

const StyledMain = styled.div`
    display: flex;
    width: 100%;
`;

// const fetchPosts = async (
//     locale: string,
//     setPosts: Dispatch<SetStateAction<IPost[]>>
// ) => {
//     const { items: posts } = await contentful().getEntries({
//         'content_type': 'post',
//         order: '-fields.date',
//         locale
//     });

//     setPosts(posts as IPost[]);
// };

const Main: FunctionComponent = () => {
    const { locale } = useIntl();

    // const [posts, setPosts] = useState([] as IPost[]);
    // useEffect(() => { fetchPosts(locale, setPosts); }, [locale]);

    // const isLoading = !posts.length;

    return (
        <Layout>
            <StyledMain>
                <SEO
                    lang={locale}
                / >
                {/* <Posts posts={posts} /> */}
            </StyledMain>
        </Layout>
    );
};

export default Main;
