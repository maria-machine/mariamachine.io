import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { IPost } from '../../../interfaces/post.interface';

import Markdown from '../../Markdown';

interface IContent {
    readonly post: IPost;
}

const StyledContent = styled.div`
    max-width: 700px;
`;

const StyledTitle = styled.h1`
    font-size: 54px;
    line-height: 133%;
    color: pink;
    margin: 0 0 70px 0;
`;

const Content: FunctionComponent<IContent> = ({post}) => {
    return (
        <StyledContent>
            <StyledTitle>
                {post.fields.title}
            </StyledTitle>
            <Markdown>{post.fields.content}</Markdown>
        </StyledContent>
    );
};

export default Content;
