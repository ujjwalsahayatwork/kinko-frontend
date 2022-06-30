import React, { FC, MouseEvent, useCallback } from 'react';
import styled from 'styled-components';

const Background = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10000;
	align-items: center;
	justify-content: center;
`;

const ModalWrapper = styled.div`
	display: flex;
	max-width: 100vw;
`;

interface IBaseModalProps {
	onClose: () => void;
}

export const BaseModal: FC<IBaseModalProps> = ({ children, onClose }) => {
	const handlePropagation = useCallback((event: MouseEvent<HTMLDivElement>) => event.stopPropagation(), []);

	return (
		<Background onClick={onClose}>
			<ModalWrapper onClick={handlePropagation}>{children}</ModalWrapper>
		</Background>
	);
};
