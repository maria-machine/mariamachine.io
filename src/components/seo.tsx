import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface ISEO {
    readonly description?: string;
    readonly lang?: string;
    readonly meta?: Array<
        | { name: string; content: any; property?: undefined }
        | { property: string; content: any; name?: undefined }
    >;
    readonly title: string;
}

const SEO: FunctionComponent<ISEO> = ({
    description = '',
    lang = 'en',
    meta = [],
    title
}) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
    );

    const metaDescription = description || site.siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription
                },
                {
                    property: `og:title`,
                    content: title
                },
                {
                    property: `og:description`,
                    content: metaDescription
                },
                {
                    property: `og:type`,
                    content: `website`
                },
                {
                    name: `twitter:card`,
                    content: `summary`
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author
                },
                {
                    name: `twitter:title`,
                    content: title
                },
                {
                    name: `twitter:description`,
                    content: metaDescription
                }
            ].concat(meta)}
        />
    );
};

export default SEO;
