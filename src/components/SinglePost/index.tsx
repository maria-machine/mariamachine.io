import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { IState } from '../../interfaces/state.interface';
import { IPost } from '../../interfaces/post.interface';

import Loader from '../Loader';
import Content from './Content';
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

const SinglePost: FunctionComponent<RouteComponentProps<ISinglePost>> = ({match}) => {
    const { locale } = useIntl();
    const { publicUrl } = match.params;

    const post: IPost = useSelector((state: IState) => state.posts[locale])
        .find((post) => post.fields.publicUrl === publicUrl) || {} as IPost;

    const isLoading = !post.fields;

    const needRedirect = !isLoading && (!post.fields || !post.fields.title);

    if (needRedirect) {
        return (<Redirect to='/' />);
    }

    return (
        <StyledSinglePost>
            {isLoading
                ? (<Loader />)
                : (
                    <>
                        <Helmet>
                            <html lang={locale} />
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
