import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';

import { PostsQuery } from '../../graphql-types';

import { getPosts } from '../utils';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import Posts from '../components/Posts';

interface IMain {
    readonly data: PostsQuery;
}

const StyledMain = styled.div`
    display: flex;
    width: 100%;
`;

const Main: FunctionComponent<IMain> = ({ data }) => {
    const { locale } = useIntl();

    return (
        <>
            <Seo lang={locale} / >
            <StyledMain>
                <Posts posts={getPosts(data, locale)} />
            </StyledMain>
        </>
    );
};

export const MainQuery = graphql`
    query Posts {
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

export default Main;
