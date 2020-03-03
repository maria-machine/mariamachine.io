import React, { FunctionComponent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { contentful } from '../../utils/contentful';

import { IPost } from '../../interfaces/post.interface';

import Layout from '../Layout';
import Loader from '../Loader';
import Content from './Content';
import Page404 from '../Page404';

interface ISinglePost {
    readonly publicUrl: string;
}

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
        <Layout contentCenter={isLoading}>
            {isLoading
                ? (<Loader />)
                : (<Content post={post} / >)
            }
        </Layout>
    );
};

export default SinglePost;
