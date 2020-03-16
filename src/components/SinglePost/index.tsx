import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl, navigate } from 'gatsby-plugin-intl';

import { IPost } from '../../interfaces/post.interface';

import { LocaleEnum } from '../../enums/locale.enum';
import { CategoriesEnum } from '../../enums/categories.enum';

import Content from './Content';
import PostFeatured from '../PostFeatured';
import Seo from '../Seo';

interface ISinglePost {
    readonly pageContext: IPost;
}

const StyledSinglePost = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const SinglePost: FunctionComponent<ISinglePost> = ({ pageContext: post }) => {
    const { locale } = useIntl();

    if (locale === LocaleEnum.EN && post.categories.some((category) => category === CategoriesEnum.TRANSLATIONS)) {
        navigate('/');
        return null;
    }

    return (
        <>
            <Seo lang={locale} title={post.title} />
            <StyledSinglePost>
                <PostFeatured post={post} staticMode />
                <Content post={post} / >
            </StyledSinglePost>
        </>
    );
};

export default SinglePost;
