import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { IState } from '../../interfaces/state.interface';
import { IPost } from '../../interfaces/post.interface';

import { CategoriesEnum } from '../../enums/categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';

import { messages } from '../../translations';

import Loader from '../Loader';
import Posts from '../Posts';

interface ICategory {
    readonly category: CategoriesEnum;
}

const StyledCategory = styled.div`
    display: flex;
    width: 100%;
`;

const Category: FunctionComponent<RouteComponentProps<ICategory>> = ({match}) => {
    const { locale, formatMessage } = useIntl();

    const { category: categoryParam } = match.params;

    const posts: IPost[] = useSelector((state: IState) => state.posts[locale])
        .filter((post) => post.fields.categories.some((category) => category === categoryParam));

    const needRedirect = locale === LocaleEnum.EN && categoryParam === CategoriesEnum.TRANSLATIONS;

    const isLoading = !posts.length;

    if (needRedirect) {
        return (<Redirect to='/' />);
    }

    return (
        <StyledCategory>
            {isLoading
                ? (<Loader />)
                : (
                    <>
                        <Helmet>
                            <html lang={locale} />
                            <title>{`Maria Machine | ${formatMessage(messages[categoryParam]).toUpperCase()}`}</title>
                            <meta name='title' content={`Maria Machine | ${formatMessage(messages[categoryParam]).toUpperCase()}`} />
                            <meta property='og:title' content={`Maria Machine | ${formatMessage(messages[categoryParam]).toUpperCase()}`} />
                            <meta property='og:url' content={`${window.location.href}`} />
                            <meta property='twitter:title' content={`Maria Machine | ${formatMessage(messages[categoryParam]).toUpperCase()}`} />
                        </Helmet>
                        <Posts posts={posts} / >
                    </>
                )
            }
        </StyledCategory>
    );
};

export default Category;
