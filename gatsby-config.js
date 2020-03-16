/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    siteMetadata: {
        title: `Maria Machine`,
        description: `Maria Machine, Machine Learning Community`
    },
    plugins: [
        `gatsby-plugin-ts`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown`,
                path: `${__dirname}/src/markdown`
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    'gatsby-remark-prismjs',
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 950,
                            quality: 100
                        }
                    },
                    {
                        resolve: `gatsby-remark-copy-linked-files`
                    },
                    {
                        resolve: 'gatsby-remark-external-links',
                        options: {
                            target: '_blank',
                        }
                    },
                    'gatsby-remark-smartypants'
                ]
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Maria Machine`,
                short_name: `Maria Machine`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#000000`,
                display: `minimal-ui`,
                icon: `src/images/icon.png`
            }
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
              fonts: [
                `Montserrat:300,300i,400,400i,700,700i`,
              ],
              display: 'swap&subset=cyrillic'
            }
        },
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                path: `${__dirname}/src/translations`,
                languages: [`en`, `ru`],
                defaultLanguage: `en`,
                redirect: false
            }
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ]
};
