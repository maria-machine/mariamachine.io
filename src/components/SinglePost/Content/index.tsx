import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { colors } from '../../../variables';

import { IPost } from '../../../interfaces/post.interface';

import Categories from '../../Categories';
import Markdown from '../../Markdown';

interface IContent {
    readonly post: IPost;
}

const StyledContent = styled.div`
    max-width: 700px;
`;

const StyledCategories = styled.div`
    margin-bottom: 100px;
`;

const StyledTitle = styled.h1`
    font-family: 'PT Serif', sans-serif;
    font-size: 54px;
    font-weight: 700;
    line-height: 133%;
    color: ${colors.moccaccino};
    text-transform: uppercase;
    margin: 0 0 70px 0;
`;

const Content: FunctionComponent<IContent> = ({post}) => {
    return (
        <StyledContent>
            <StyledCategories>
                <Categories categories={post.fields.categories} />
            </StyledCategories>
            <StyledTitle>
                {post.fields.title}
            </StyledTitle>
            <Markdown>{post.fields.content}</Markdown>
        </StyledContent>
    );
};

export default Content;
