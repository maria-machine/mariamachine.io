import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { IState } from '../../interfaces/state.interface';
import { IPost } from '../../interfaces/post.interface';

import Loader from '../Loader';
import Posts from '../Posts';

const StyledMain = styled.div`
    display: flex;
    width: 100%;
`;

const Main: FunctionComponent = () => {
    const { locale } = useIntl();
    const posts: IPost[] = useSelector((state: IState) => state.posts[locale]);

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
