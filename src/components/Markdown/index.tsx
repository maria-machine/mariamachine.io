import React, { FunctionComponent, useEffect, useRef, MutableRefObject } from 'react';
import styled from 'styled-components';
import MarkdownToJSX from 'markdown-to-jsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import Link from './Link';
import Blockquote from './Blockquote';
import Image from './Image';
import Hr from './Hr';

import { ColorsEnum } from '../../enums/colors.enum';

const StyledMarkdown = styled.div`
    font-size: 21px;
    line-height: 160%;
    color: #000;

    h2 {
        font-size: 34px;
        margin-bottom: 20px;
    }

    h3 {
        margin-bottom: 10px;
    }

    a {
        position: relative;
        color: #000;
        text-decoration: none;
    }

    a:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #000;
    }

    code {
        font-size: 15px;
        line-height: 130%;
    }

    p code {
        padding: 4px 8px;
        background: rgba(0, 0, 0, 0.05);
    }

    p, ul, pre, hr {
        margin-bottom: 42px;
    }

    p:last-child {
        margin-bottom: 0;
    }

    p + img {
        text-align: center;
    }

    li {
        position: relative;
        padding-left: 20px;
    }

    li:after {
        content: '';
        position: absolute;
        top: 14px;
        left: 0;
        width: 6px;
        height: 6px;
        border-radius: 50px;
        background: ${ColorsEnum.CREAM};
    }

    @media (max-width: 720px) {
        font-size: 18px;

        h2 {
            font-size: 28px;
        }

        p, ul, pre, hr {
            margin-bottom: 20px;
        }
    }
`;

const Markdown: FunctionComponent = ({children}) => {
    const rootRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        rootRef.current && rootRef.current.querySelectorAll('pre code')
            .forEach((block) => {
                hljs.highlightBlock(block);
            });
    }, [children, rootRef]);

    return (
        <div ref={rootRef}>
            <StyledMarkdown>
                <MarkdownToJSX
                    options={{
                        overrides: {
                            // eslint-disable-next-line react/display-name
                            script: { component: () => <div /> },
                            a: { component: Link },
                            blockquote: { component: Blockquote },
                            img: { component: Image },
                            hr: { component: Hr }
                        }
                    }}
                >
                    {children}
                </MarkdownToJSX>
            </StyledMarkdown>
        </div>
    );
};

export default Markdown;
