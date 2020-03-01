import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { colors } from '../../variables';
import { messages } from '../../translations';

import { PostCategoriesEnum } from '../../enums/post-categories.enum';

interface ICategories {
    readonly categories: PostCategoriesEnum[];
}

const StyledCategories = styled.div``;

const StyledCategory = styled(Link)`
    display: inline-block;
    font-family: 'PT Mono', monospace;
    font-size: 14px;
    line-height: 150%;
    color: #fff;
    background: ${colors.mulled};
    margin-right: 10px;
    padding: 2px 7px;

    &:last-child {
        margin-right: 0;
    }
`;

const Categories: FunctionComponent<ICategories> = ({categories}) => {
    const { formatMessage } = useIntl();

    return (
        <StyledCategories>
            {categories.map((category: PostCategoriesEnum) => (
                window.location.pathname !== `/categories/${category}`
                    ? (
                        <StyledCategory key={category} to={`/categories/${category}`}>
                            {formatMessage(messages[category])}
                        </StyledCategory>
                    ) : null
            ))}
        </StyledCategories>
    );
};

export default Categories;
