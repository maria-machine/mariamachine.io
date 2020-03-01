import React, { FunctionComponent } from 'react';

interface ILink {
    readonly href: string;
}

const Link: FunctionComponent<ILink> = ({href, children}) => (
    <a href={href} target='_blank' rel='noopener noreferrer'>{children}</a>
);

export default Link;
