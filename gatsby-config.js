module.exports = {
    siteMetadata: {
        title: 'Maria Machine',
        author: 'Roman Ponomarev',
        description: '',
        siteUrl: 'https://mariamachine.io',
        social: {
            twitter: 'mariamachine_ml',
            facebook: 'maria.machine.ml',
            vk: 'maria_machine',
            telegram: 'maria_machine'
        }
    },
    plugins: [
        `gatsby-plugin-typescript`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Maria Machine`,
                short_name: `Maria Machine`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#f6e088`,
                display: `minimal-ui`,
                icon: `src/images/maria-machine.png`
            }
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ]
};
