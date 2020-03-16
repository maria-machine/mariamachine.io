import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from 'react-use';

import { config } from '../../config';

interface ISeo {
    readonly title?: string;
    readonly description? : string;
    readonly lang: string;
}

const Seo: FunctionComponent<ISeo> = ({ title, description, lang }) => {
    const location = useLocation();

    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `
    );

    const metaTitle = title || site.siteMetadata.title;
    const metaDescription = description || site.siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={metaTitle}
            titleTemplate={`%s${site.siteMetadata.title === metaTitle ? '' : ` | ${site.siteMetadata.title}`}`}
            meta={[
                {
                    name: 'title',
                    content: metaTitle
                },
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: 'author',
                    content: 'Roman Ponomarev'
                },
                {
                    name: 'keywords',
                    content: 'Maria Machine, Artificial intelligence, Machine learning, Deep learning, AI, ML, Articles, Translations'
                },
                {
                    property: `og:title`,
                    content: metaTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:url`,
                    content: `${location.href}`
                },
                {
                    property: 'og:image',
                    content: 'https://github.com/maria-machine/about/raw/master/assets/maria_machine_robot_human_image.png'
                },
                {
                    property: 'og:image:url',
                    content: 'https://github.com/maria-machine/about/raw/master/assets/maria_machine_robot_human_image.png'
                },
                {
                    property: 'og:image:secure_url',
                    content: 'https://github.com/maria-machine/about/raw/master/assets/maria_machine_robot_human_image.png'
                },
                {
                    name: `twitter:title`,
                    content: metaTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    property: 'twitter:site',
                    content: '@mariamachine_ml'
                },
                {
                    property: 'twitter:site:id',
                    content: '@mariamachine_ml'
                },
                {
                    property: 'twitter:site:creator',
                    content: '@mariamachine_ml'
                },
                {
                    property: 'twitter:site:creator:id',
                    content: '@mariamachine_ml'
                },
                {
                    property: 'twitter:image',
                    content: 'https://github.com/maria-machine/about/raw/master/assets/maria_machine_robot_human_image.png'
                },
                {
                    property: 'twitter:url',
                    content: 'https://twitter.com/mariamachine_ml'
                }
            ]}
        >
            <script type='application/ld+json'>{`
                {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Maria Machine",
                    "legalName" : "Maria Machine",
                    "url": "https://mariamachine.io",
                    "logo": "https://github.com/maria-machine/about/raw/master/assets/maria_machine_robot_human_image.png",
                    "foundingDate": "2019-04-07T00:00:00Z",
                    "founders": [
                        {
                            "@type": "Person",
                            "name": "Roman Ponomarev",
                            "email": "maksugr@gmail.com"
                        }
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Saint Petersburg",
                        "addressRegion": "Saint Petersburg",
                        "postalCode": "191014",
                        "addressCountry": "Russia"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "customer support",
                        "url": "https://mariamachine.io",
                        "email": "maksugr@gmail.com"
                    },
                    "sameAs": [
                        "https://twitter.com/mariamachine_ml",
                        "https://t.me/maria_machine",
                        "https://www.youtube.com/channel/UCxGr5HDHxIxYZsTGiJb_NtQ",
                        "https://facebook.com/maria.machine.ml",
                        "https://vk.com/maria_machine",
                        "https://github.com/maria-machine"
                    ]
                }
            `}</script>
            {process.env.NODE_ENV === 'production' ? (
                <>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.ga.id}`} />
                    <script>
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', ${config.ga.id});
                        `}
                    </script>

                    <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${config.ga.id}`}
                    height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe></noscript>
                </>
            ) : null}
        </Helmet>
    );
};

export default Seo;
