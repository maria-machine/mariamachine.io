import React, { useEffect, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FunctionComponent = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return children as React.ReactElement;
  };

export default ScrollToTop;
