import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';

const StyledTitle = styled.h1`
    color: purple;
`;

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <StyledTitle>Hi people</StyledTitle>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
);

export default IndexPage;
