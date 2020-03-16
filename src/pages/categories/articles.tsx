import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useIntl } from 'gatsby-plugin-intl';
import { graphql } from 'gatsby';

import { PostsQuery } from '../../../graphql-types';

import { messages } from '../../translations';

import Seo from '../../components/Seo';
import Posts from '../../components/Posts';

import { getPosts } from '../../utils';
import { CategoriesEnum } from '../../enums/categories.enum';

interface ICategory {
    readonly data: PostsQuery;
}

const StyledCategory = styled.div`
    display: flex;
    width: 100%;
`;

const CategoryArticles: FunctionComponent<ICategory> = ({ data }) => {
    const { locale, formatMessage } = useIntl();

    const posts = getPosts(data, locale).filter((post) => post.categories.some((category) => category === CategoriesEnum.ARTICLES));

    return (
        <>
            <Seo lang={locale} title={`${formatMessage(messages.translations).toUpperCase()}`} / >
            <StyledCategory>
                <Posts posts={posts} / >
            </StyledCategory>
        </>

    );
};

export const CategoryArticlesQuery = graphql`
    query CategoryArticlesPosts {
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

export default CategoryArticles;
