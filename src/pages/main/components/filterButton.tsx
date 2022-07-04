import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { BaseButton } from 'components/baseButton/baseButton';
import { Icon, IIcon } from 'components/icon/icon';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { IColor } from 'components/types';
import { toPx, useDevice } from 'components/utils';

const StyledFilterButton = styled(BaseButton)`
	align-items: center;
`;

const StyledRow = styled(Row)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 45px;
	min-height: 45px;
	max-height: 45px;
	border-radius: 5px;
	padding: 0 1rem;
	min-width: 8rem;
	@media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
		min-width: 6rem;
		 border: 1px solid; 
		 border-color: #7079B9; 
		width: 100%;
		height: 2.5rem;
		align-items: center;
		justify-content: center;
	}
`
const StyledText = styled(Text)`
	font-weight: 600;
	font-size: 1rem;
`;

interface IFilterButtonProps {
	icon: IIcon;
	title: string;
	selected: boolean;
	onClick: () => void;
	FilterBtnCss?: string;
}

export const FilterButton: FC<IFilterButtonProps> = ({ icon, title, selected, onClick, FilterBtnCss }) => {
	const { isDesktop } = useDevice();

	const color: IColor = useMemo(() => (selected ? 'primary' : 'secondary'), [selected]);
	const backgroundColor: IColor = useMemo(() => (selected ? 'secondaryBrand' : 'transparent'), [selected]);

	return (
		<StyledFilterButton onClick={onClick} >
			<StyledRow backgroundColor={backgroundColor} className={FilterBtnCss}>
				<Icon icon={icon} color={color} height={isDesktop ? 25 : 22} />
				<Spacing horizontal="s" mobile="xs" vertical="xl" />
				<StyledText fontSize="xl" mobileFontSize="xs" color={color}>
					{title}
				</StyledText>
			</StyledRow>
		</StyledFilterButton>
	);
};
