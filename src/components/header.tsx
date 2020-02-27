import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

interface IHeader {
    readonly siteTitle: string;
}

const Header: FunctionComponent<IHeader> = ({ siteTitle }) => (
    <header>
        <div>
            <h1>
                <Link to="/">
                    {siteTitle}
                </Link>
            </h1>
        </div>
    </header>
);

export default Header;
