import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl } from 'gatsby-plugin-intl';
import { graphql } from 'gatsby';

import { PostsQuery } from '../../../graphql-types';

import { messages } from '../../translations';

import { CategoriesEnum } from '../../enums/categories.enum';
import { LocaleEnum } from '../../enums/locale.enum';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Posts from '../../components/Posts';

import { getPosts } from '../../utils';

interface ICategory {
    readonly data: PostsQuery;
}

const StyledCategory = styled.div`
    display: flex;
    width: 100%;
`;

const CategoryTranslations: FunctionComponent<ICategory> = ({ data }) => {
    const { locale, formatMessage } = useIntl();

    if (locale === LocaleEnum.EN) {
        if (typeof window !== `undefined`) {
            window.location.replace('/');
        }

        return null;
    }

    const posts = getPosts(data, locale).filter((post) => post.categories.some((category) => category === CategoriesEnum.TRANSLATIONS));

    return (
        <>
            <Seo lang={locale} title={`${formatMessage(messages.translations).toUpperCase()}`} / >
            <StyledCategory>
                <Posts posts={posts} / >
            </StyledCategory>
        </>

    );
};

export const CategoryTranslationsQuery = graphql`
    query CategoryTranslationsPosts {
        allMarkdownRemark(
            sort: {
                fields: [frontmatter___date]
                order: DESC
            }
        ) {
            edges {
                node {
                    html
                    frontmatter {
                        title
                        date
                        publicUrl
                        cover {
                            publicURL
                        }
                        coverColor
                        categories
                        lang
                        originName
                        originAuthor
                        originLink
                    }
                }
            }
        }
    }
`;

export default CategoryTranslations;
