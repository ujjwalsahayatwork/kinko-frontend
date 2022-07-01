import { ChartData } from 'chart.js';
import React, { FC, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

interface IPercentDoughnutProps {
	value: number;
}

export const PercentDoughnut: FC<IPercentDoughnutProps> = ({ value }) => {
	const theme = useTheme();

	const unitedData: ChartData<'doughnut', Array<number>, never> = useMemo(
		() => ({
			labels: [],
			datasets: [
				{
					label: '# of Votes',
					data: [value, 100 - value],
					backgroundColor: [theme.secondaryBrandColor, '#4F4F4F'],
					borderWidth: 0,
					cutout: '80%',
				},
			],
		}),
		[theme, value]
	);

	return <Doughnut data={unitedData} />;
};
