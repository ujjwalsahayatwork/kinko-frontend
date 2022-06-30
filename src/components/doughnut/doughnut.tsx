import { ChartData } from 'chart.js';
import React, { FC, useMemo } from 'react';
import { Doughnut as RDoughnut } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

interface IDoughnutProps {
	data: Array<number>;
	labels?: Array<string>;
}

export const Doughnut: FC<IDoughnutProps> = ({ data, labels }) => {
	const theme = useTheme();

	const unitedData: ChartData<'doughnut', Array<number>, string> = useMemo(
		() => ({
			labels: labels ?? [],
			datasets: [
				{
					data,
					backgroundColor: theme.doughnutColors,
					borderWidth: 0,
					cutout: '60%',
				},
			],
		}),
		[theme, data, labels]
	);

	return <RDoughnut data={unitedData} />;
};
