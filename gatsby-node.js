// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const getPost = (node) => {
    const frontmatter = node.frontmatter;

    if (frontmatter) {
        return {
            title: frontmatter.title || '',
            content: node.html || '',
            cover: frontmatter.cover || undefined,
            coverColor: frontmatter.coverColor,
            categories: (frontmatter.categories || '').split(','),
            publicUrl: frontmatter.publicUrl || '',
            date: frontmatter.date || '',
            originName: frontmatter.originName || '',
            originLink: frontmatter.originLink || '',
            originAuthor: frontmatter.originAuthor || ''
        };
    }

    return {};
};

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const post = path.resolve(`src/components/SinglePost/index.tsx`);

    const result = await graphql(`
        {
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
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: `/posts/${node.frontmatter.publicUrl}`,
            component: post,
            context: getPost(node)
        });
    });
};

