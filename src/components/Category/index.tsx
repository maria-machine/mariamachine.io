import React, { FunctionComponent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { contentful } from '../../utils/contentful';

import { IPost } from '../../interfaces/post.interface';

import { CategoriesEnum } from '../../enums/categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';

import { messages } from '../../translations';

import Loader from '../Loader';
import Posts from '../Posts';
import Page404 from '../Page404';

interface ICategory {
    readonly category: CategoriesEnum;
}

const StyledCategory = styled.div`
    display: flex;
    width: 100%;
`;

const fetchPosts = async (
    locale: string,
    category: string,
    setPosts: Dispatch<SetStateAction<IPost[]>>
) => {
    const { items: posts } = await contentful().getEntries({
        'content_type': 'post',
        'fields.categories': category,
        order: '-fields.date',
        locale
    });

    setPosts(posts as IPost[]);
};

const Category: FunctionComponent<RouteComponentProps<ICategory>> = ({match}) => {
    const { locale, formatMessage } = useIntl();
    const { category } = match.params;
    const [posts, setPosts] = useState([] as IPost[]);

    useEffect(() => { fetchPosts(locale, category, setPosts); }, [category, locale]);

    const isLoading = !posts.length;

    if (locale === LocaleEnum.EN && category === CategoriesEnum.TRANSLATIONS) {
        return (<Page404 />);
    }

    return (
        <StyledCategory>
            {isLoading
                ? (<Loader />)
                : (
                    <>
                        <Helmet>
                            <html lang={locale} />
                            <title>{`Maria Machine | ${formatMessage(messages[category]).toUpperCase()}`}</title>
                            <meta name='title' content={`Maria Machine | ${formatMessage(messages[category]).toUpperCase()}`} />
                            <meta property='og:title' content={`Maria Machine | ${formatMessage(messages[category]).toUpperCase()}`} />
                            <meta property='og:url' content={`${window.location.href}`} />
                            <meta property='twitter:title' content={`Maria Machine | ${formatMessage(messages[category]).toUpperCase()}`} />
                        </Helmet>
                        <Posts posts={posts} / >
                    </>
                )
            }
        </StyledCategory>
    );
};

export default Category;
