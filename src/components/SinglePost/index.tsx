import React, { FunctionComponent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { contentful } from '../../utils/contentful';

import { IPost } from '../../interfaces/post.interface';

import Loader from '../Loader';
import Content from './Content';
import Page404 from '../Page404';
import PostFeatured from '../PostFeatured';

interface ISinglePost {
    readonly publicUrl: string;
}

const StyledSinglePost = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const fetchPost = async (
    locale: string,
    publicUrl: string,
    setPost: Dispatch<SetStateAction<IPost>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
    const { items: posts } = await contentful().getEntries({
        'content_type': 'post',
        'fields.publicUrl': publicUrl,
        locale
    });

    setPost((posts.length ? posts[0] : {}) as IPost);
    setIsLoading(false);
};

const SinglePost: FunctionComponent<RouteComponentProps<ISinglePost>> = ({match}) => {
    const { locale } = useIntl();
    const { publicUrl } = match.params;

    const [post, setPost] = useState({} as IPost);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { fetchPost(locale, publicUrl, setPost, setIsLoading); }, [publicUrl, locale]);

    if (!isLoading && (!post.fields || !post.fields.title)) {
        return (<Page404 />);
    }

    return (
        <StyledSinglePost>
            {isLoading
                ? (<Loader />)
                : (
                    <>
                        <Helmet>
                            <title>{`Maria Machine | ${post.fields.title}`}</title>
                            <meta name='title' content={`Maria Machine | ${post.fields.title}`} />
                            <meta property='og:title' content={`Maria Machine | ${post.fields.title}`} />
                            <meta property='og:url' content={`${window.location.href}`} />
                            <meta property='twitter:title' content={`Maria Machine | ${post.fields.title}`} />
                        </Helmet>
                        <PostFeatured post={post} staticMode />
                        <Content post={post} / >
                    </>
                )
            }
        </StyledSinglePost>
    );
};

export default SinglePost;
