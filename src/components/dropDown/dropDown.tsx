import { BaseButton } from 'components/baseButton/baseButton';
import { Col } from 'components/col/col';
import { Icon } from 'components/icon/icon';
import { Row } from 'components/row/row';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import uniqueId from 'lodash/uniqueId';
import React, { Component } from 'react';
import styled from 'styled-components';
import "./dropDown.scss";

const clickClass = '9ab7283a5e02fc4621fe88d20a1d31ec66d75720c593277966057c6493b1b9f7';

export interface IDropDownOption<T> {
	key: string;
	label: string;
	payload: T;
}

const DropDownButton = styled(BaseButton)`
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	color: ${({ theme }) => theme.primaryColor};
	background-color: transparent;
	border: none;
	border-radius: 0px;
	border-bottom: 1px solid #4B4B4B;
	padding: .5rem 0rem;
`;

const OptionContainer = styled(Col) <{ width: number }>`
	position: absolute;
	width: ${({ width }) => `${width}px`};
	box-shadow: ${({ theme }) => `0px 0px 10px ${theme.shadowColor}`};
`;

const OptionButton = styled(BaseButton)`
	color: ${({ theme }) => theme.primaryColor};
	background-color: ${({ theme }) => theme.secondaryBackgroundColor};
	border-radius: 0px;
	z-index: 1000;
	padding: 5px;
	:hover {
		color: ${({ theme }) => theme.onSecondaryBrandColor};
		background-color: ${({ theme }) => theme.secondaryBrandColor};
	}
`;

const StyledLabel = styled(Text)`
	color: #BDBDBD;
`;

interface IDropDownProps<T> {
	className?: string;
	label: string;
	options: Array<IDropDownOption<T>>;
	startEmpty: boolean;
	selected?: string;
	onSelect: (key: string, payload: T) => void;
}

interface IDropDownState<T> {
	open: boolean;
	selectedKey: string | undefined;
	selectedLabel: string;
	selectedPayload: T | undefined;
	width: number;
	widthElementId: string;
	uniqueClickClass: string;
}

export class DropDown<T> extends Component<IDropDownProps<T>, IDropDownState<T>> {
	resizeObserver: ResizeObserver | undefined;

	constructor(props: IDropDownProps<T>) {
		super(props);
		const { options, startEmpty, selected } = props;
		let selectedKey: string | undefined;
		let selectedLabel = '';
		let selectedPayload: T | undefined;
		if (!startEmpty) {
			if (selected) {
				const option = options.find((option) => option.key === selected);
				if (option) {
					selectedKey = option.key;
					selectedLabel = option.label;
					selectedPayload = option.payload;
				}
			} else if (options.length > 0) {
				selectedKey = options[0].key;
				selectedLabel = options[0].label;
				selectedPayload = options[0].payload;
			}
		}
		this.state = {
			open: false,
			selectedKey,
			selectedLabel,
			selectedPayload,
			width: 0,
			widthElementId: uniqueId('DropDown-Col-'),
			uniqueClickClass: uniqueId(clickClass),
		};
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	componentDidMount() {
		const { selected } = this.props;
		const { widthElementId, selectedKey, selectedPayload } = this.state;
		window.addEventListener('click', this.handleClickEvent);
		this.resizeObserver = new ResizeObserver((entries) => {
			if (entries.length > 0) {
				this.setState({ width: entries[0].contentRect.width });
			}
		});
		const element = document.getElementById(widthElementId);
		if (element) {
			this.resizeObserver.observe(element);
		}
		if (selected === undefined && selectedKey) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.props.onSelect(selectedKey, selectedPayload!);
		}
	}

	componentDidUpdate(prevProps: IDropDownProps<T>): void {
		const { selected, options } = this.props;
		if (prevProps.selected !== selected && selected) {
			const option = options.find((option) => option.key === selected);
			if (option) {
				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({
					selectedKey: option.key,
					selectedLabel: option.label,
					selectedPayload: option.payload,
				});
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	componentWillUnmount() {
		window.removeEventListener('click', this.handleClickEvent);
		this.resizeObserver?.disconnect();
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	handleDropDownButton = () => {
		const { open } = this.state;
		this.setState({ open: !open });
	};

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	handleOptionButton = (key: string) => {
		const { options } = this.props;
		let selectedLabel = '';
		let selectedPayload: T | undefined;
		const option = options.find((option) => option.key === key);
		if (option) {
			selectedLabel = option.label;
			selectedPayload = option.payload;
		}
		this.setState({ open: false, selectedKey: key, selectedLabel, selectedPayload });
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.props.onSelect(key, selectedPayload!);
	};

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	handleClickEvent = (event: MouseEvent) => {
		const { uniqueClickClass } = this.state;
		if (event.target && event.target instanceof HTMLElement && !event.target.className.includes(uniqueClickClass)) {
			this.setState({ open: false });
		}
	};

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	render() {
		const { className, label, options } = this.props;
		const { open, selectedLabel, width, widthElementId, uniqueClickClass } = this.state;
		return (
			<Col id={widthElementId} className={className} maxWidth backgroundColor="transparent">
				<StyledLabel fontSize="xs">
					{label}
				</StyledLabel>
				<Spacing vertical="s" />
				<DropDownButton className={uniqueClickClass} onClick={this.handleDropDownButton}>
					<Row className={uniqueClickClass} justify="space-between" maxWidth>
						<Text className={uniqueClickClass} fontSize="m">
							{selectedLabel}
						</Text>
						<Row className={uniqueClickClass} align="center" backgroundColor="transparent">
							<Icon className={uniqueClickClass} icon="angleDown" color="primary" height={8} />
							<Spacing className={uniqueClickClass} horizontal="s" />
						</Row>
					</Row>
				</DropDownButton>
				{open && (
					<Col>
						<OptionContainer className='' width={width}>
							{options.map((option) => (
								<OptionButton key={option.key} onClick={() => this.handleOptionButton(option.key)}>
									<Text fontSize="m" color="undefined">
										{option.label}
									</Text>
								</OptionButton>
							))}
						</OptionContainer>
					</Col>
				)}
			</Col>
		);
	}
}
