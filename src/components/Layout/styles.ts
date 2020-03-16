import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    code {
        font-family:
            source-code-pro,
            Menlo,
            Monaco,
            Consolas,
            'Courier New',
            monospace;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
    }

    body {
        font-family: 'Montserrat', sans-serif;
    }

    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after, q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    a {
        color: #000;
        text-decoration: none;
        transition: opacity 0.2s;
    }

    a:hover {
        opacity: 0.75;
    }

    code[class*="language-"],
    pre[class*="language-"] {
        color: #657b83; /* base00 */
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 1em;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;
    }

    pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
    code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
        background: #073642; /* base02 */
    }

    pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
    code[class*="language-"]::selection, code[class*="language-"] ::selection {
        background: #073642; /* base02 */
    }

    /* Code blocks */
    pre[class*="language-"] {
        padding: 1em;
        margin: .5em 0;
        overflow: auto;
        border-radius: 0.3em;
    }

    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
        background-color: #fdf6e3; /* base3 */
    }

    /* Inline code */
    :not(pre) > code[class*="language-"] {
        padding: .1em;
        border-radius: .3em;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: #93a1a1; /* base1 */
    }

    .token.punctuation {
        color: #586e75; /* base01 */
    }

    .token.namespace {
        opacity: .7;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: #268bd2; /* blue */
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.url,
    .token.inserted {
        color: #2aa198; /* cyan */
    }

    .token.entity {
        color: #657b83; /* base00 */
        background: #eee8d5; /* base2 */
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword {
        color: #859900; /* green */
    }

    .token.function,
    .token.class-name {
        color: #b58900; /* yellow */
    }

    .token.regex,
    .token.important,
    .token.variable {
        color: #cb4b16; /* orange */
    }

    .token.important,
    .token.bold {
        font-weight: bold;
    }
    .token.italic {
        font-style: italic;
    }

    .token.entity {
        cursor: help;
    }
`;
