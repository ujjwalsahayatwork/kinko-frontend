import { Icon, IIcon } from 'components/icon/icon';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import React, { FC } from 'react';
import styled from 'styled-components';

type IInfoCardType = 'alert' | 'info' | 'issue';

const getIcon = (type: IInfoCardType): IIcon => {
	// eslint-disable-next-line default-case
	switch (type) {
		case 'alert':
			return 'telegrameIcon';
		case 'info':
			return 'circleInfo';
		case 'issue':
			return 'xmark';
	}
};

const StyledRow = styled(Row)`
	border-radius: 5px;
`

interface IInfoCardProps {
	className?: string;
	type: IInfoCardType;
}

export const InfoCard: FC<IInfoCardProps> = ({ children, className, type }) => (
	<StyledRow
		className={className}
		backgroundColor={type === 'info' ? 'primaryBrand' : 'errorBackground'}
		verticalPadding="m"
		align="center"
	>
		<Spacing horizontal="m" />
		<Icon icon={getIcon(type)} color={type === 'info' ? 'onPrimaryBrand' : 'onError'} width={30} />
		<Spacing horizontal="m" />
		{children}
		<Spacing horizontal="m" />
	</StyledRow>
);
