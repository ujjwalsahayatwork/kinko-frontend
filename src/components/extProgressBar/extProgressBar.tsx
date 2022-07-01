import uniqueId from 'lodash/uniqueId';
import React, { Component } from 'react';
import { DefaultTheme, withTheme } from 'styled-components';

interface IExtProgressBarProps {
	theme: DefaultTheme;
	className?: string;
	value: number;
	max: number;
	text: string;
}

interface IExtProgressBarState {
	canvasId: string;
	height: number;
	width: number;
}

class ExtProgressBar extends Component<IExtProgressBarProps, IExtProgressBarState> {
	resizeObserver: ResizeObserver | undefined;

	constructor(props: IExtProgressBarProps) {
		super(props);
		this.state = {
			canvasId: uniqueId('ExtProgressBar-canvas-'),
			height: 0,
			width: 0,
		};
	}

	componentDidMount() {
		const { canvasId } = this.state;
		this.resizeObserver = new ResizeObserver((entries) => {
			if (entries.length > 0) {
				const { height, width } = entries[0].contentRect;
				this.setState({ height, width });
			}
		});
		const canvas = document.getElementById(canvasId);
		if (canvas) {
			this.resizeObserver.observe(canvas);
		}
	}

	componentDidUpdate(prevProps: IExtProgressBarProps, prevState: IExtProgressBarState) {
		const { value, max, text } = this.props;
		const { height, width } = this.state;
		if (
			value !== prevProps.value ||
			max !== prevProps.max ||
			text !== prevProps.text ||
			height !== prevState.height ||
			width !== prevState.width
		) {
			if (document.fonts.status === 'loading') {
				document.fonts.ready.then(() => this.drawCanvas());
			}
			this.drawCanvas();
		}
	}

	componentWillUnmount() {
		this.resizeObserver?.disconnect();
	}

	drawCanvas = () => {
		const { theme, value, max, text } = this.props;
		const { canvasId } = this.state;
		const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
		if (!canvas || !canvas.getContext || !canvas.height || !canvas.width) {
			return;
		}
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		const barLength = Math.round((value / max) * canvas.width);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = theme.secondaryBrandColor;
		ctx.fillRect(0, 0, barLength, canvas.height);
		ctx.fillStyle = theme.tertiaryBackgroundColor;
		ctx.fillRect(barLength, 0, canvas.width - barLength, canvas.height);

		ctx.save();
		ctx.beginPath();
		ctx.rect(0, 0, barLength, canvas.height);
		ctx.clip();
		ctx.fillStyle = theme.onSecondaryBrandColor;
		ctx.font = `${theme.fontSizeS}px Sora`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(text, canvas.width / 2, canvas.height / 2 + theme.fontSizeS / 8);
		ctx.restore();

		ctx.save();
		ctx.beginPath();
		ctx.rect(barLength, 0, canvas.width - barLength, canvas.height);
		ctx.clip();
		ctx.fillStyle = theme.primaryColor;
		ctx.font = `${theme.fontSizeS}px Poppins`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(text, canvas.width / 2, canvas.height / 2 + theme.fontSizeS / 8);
		ctx.restore();
	};

	render() {
		const { className } = this.props;
		const { canvasId, height, width } = this.state;
		return <canvas id={canvasId} className={className} height={height} width={width} />;
	}
}

const extProgressBar = withTheme(ExtProgressBar);

export { extProgressBar as ExtProgressBar };
