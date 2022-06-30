import React, { FC } from 'react';
import styled from 'styled-components';

const StyledA = styled.a`
	display: flex;
	text-decoration: none;
`;

interface ILinkProps {
	className?: string;
	href: string;
	newTab?: boolean;
}

export const Link: FC<ILinkProps> = ({ children, className, href, newTab = true }) => (
	<StyledA className={className} href={href} target={newTab ? '_blank' : ''} rel="noreferrer noopener">
		{children}
	</StyledA>
);
