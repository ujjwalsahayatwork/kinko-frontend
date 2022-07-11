/* eslint-disable */
import { IDropDownOption } from 'components/dropDown/dropDown';
import { IRouterProps, IWeb3Props } from 'components/types';
import { loadState, saveState, withRouter, withWeb3 } from 'components/utils';
import { tropicalYear2000ms } from 'constants/constants';
import { TESTING } from 'constants/env';
import moment from 'moment';
import { CreateIloPeriodView } from 'pages/createIloPeriod/createIloPeriodView';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEndBlock, updateLiquidityLockPeriod, updateStartBlock } from 'store/createIlo/actions';
import { addError } from 'store/error/actions';
import { updateShowConnectModal } from 'store/ethereum/actions';
import { IDispatch, IRootState } from 'store/store';
import { getRound1Length } from 'utils/launchpadSettings';
import Web3 from 'web3';

const liquidityLockPeriodOptionsBase: Array<IDropDownOption<bigint>> = [
	{ key: '1', label: '1 year', payload: (tropicalYear2000ms * BigInt(1)) / BigInt(1000) },
	{ key: '2', label: '2 years', payload: (tropicalYear2000ms * BigInt(2)) / BigInt(1000) },
	{ key: '3', label: '3 years', payload: (tropicalYear2000ms * BigInt(3)) / BigInt(1000) },
	{ key: '4'.toString(), label: '4 years', payload: (tropicalYear2000ms * BigInt(4)) / BigInt(1000) },
	{ key: '100', label: '100 years', payload: (tropicalYear2000ms * BigInt(100)) / BigInt(1000) },
];

const liquidityLockPeriodOptions: Array<IDropDownOption<bigint>> = TESTING
	? [{ key: 'test', label: '5 minutes', payload: BigInt(60) * BigInt(5) }, ...liquidityLockPeriodOptionsBase]
	: liquidityLockPeriodOptionsBase;

interface ICreateIloPeriodProps extends IRouterProps, IWeb3Props {
	showConnectModal: boolean;
	isCloseUpdateShowConnectModal:boolean;
	updateShowConnectModal: (showConnectModal: boolean) => void;
	updateStartBlock: (startBlockDate: Date) => void;
	updateEndBlock: (endBlockDate: Date) => void;
	updateLiquidityLockPeriod: (liquidityLockPeriod: bigint) => void;
	addError: (error: unknown) => void;
}

interface ICreateIloPeriodState {
	startBlockDate: Date | undefined;
	endBlockDate: Date | undefined;
	showAwareness: boolean;
	dateIssue: string;
	selectedLockPeriod: string;
	liquidityLockPeriod: bigint;
}

class CreateIloPeriod extends Component<ICreateIloPeriodProps, ICreateIloPeriodState> {
	constructor(props: ICreateIloPeriodProps) {
		super(props);
		this.state = loadState<ICreateIloPeriodState>(props.location.key, (state) => {
			if (state) {
				const { startBlockDate, endBlockDate, liquidityLockPeriod } = state;
				return {
					...state,
					startBlockDate: new Date(startBlockDate ?? new Date()),
					endBlockDate: new Date(endBlockDate ?? new Date()),
					liquidityLockPeriod: BigInt(liquidityLockPeriod ?? 0),
				};
			}
			return {
				startBlockDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
				endBlockDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * (7 + 14)),
				showAwareness: false,
				dateIssue: '',
				selectedLockPeriod: liquidityLockPeriodOptions[0].key,
				liquidityLockPeriod: liquidityLockPeriodOptions[0].payload,
			};
		});
	}

	async componentDidMount() {
		this.updateShowAwareness();
		await this.checkFields();
	}

	async componentDidUpdate(prevProps: ICreateIloPeriodProps, prevState: ICreateIloPeriodState) {
		const {
			location,
			web3: { active },
			showConnectModal,
			isCloseUpdateShowConnectModal,
		} = this.props;
		const { startBlockDate, endBlockDate } = this.state;
		if (prevState !== this.state) {
			saveState(location.key, this.state, (state) => {
				const { startBlockDate, endBlockDate, liquidityLockPeriod } = state;
				return {
					...state,
					startBlockDate: startBlockDate?.toISOString(),
					endBlockDate: endBlockDate?.toISOString(),
					liquidityLockPeriod: liquidityLockPeriod.toString(),
				};
			});
		}
		if (!active && !showConnectModal && !isCloseUpdateShowConnectModal) {
			this.props.updateShowConnectModal(true);
		}
		if (prevState.startBlockDate !== startBlockDate) {
			this.updateShowAwareness();
		}
		if (prevState.startBlockDate !== startBlockDate || prevState.endBlockDate !== endBlockDate) {
			await this.checkFields();
		}
	}

	updateShowAwareness = () => {
		const { startBlockDate } = this.state;
		if (startBlockDate) {
			const showAwareness = moment(startBlockDate).diff(moment().add(1, 'week')) < 0;
			this.setState({ showAwareness });
		}
	};

	checkFields = async () => {
		const {
			web3: { library },
		} = this.props;
		const { startBlockDate, endBlockDate } = this.state;
		let dateIssue = '';
		if (startBlockDate && startBlockDate.getTime() < Date.now()) {
			dateIssue = 'Your start date must be in the future.';
		} else if (startBlockDate && endBlockDate && startBlockDate.getTime() > endBlockDate.getTime()) {
			dateIssue = 'Your end date is before the start date.';
		} else if (startBlockDate && endBlockDate && moment(endBlockDate).diff(moment(startBlockDate), 'days') > 14) {
			dateIssue = 'Presale duration too long. Maximum of 14 days allowed.';
		} else if (library && startBlockDate && endBlockDate) {
			const web3 = new Web3(library);
			const round1Length = await getRound1Length(web3);
			// if (!TESTING && endBlockDate.getTime() - startBlockDate.getTime() - round1Length * 1000 < 1000 * 60 * 60 * 24) {
				// dateIssue = 'Presale duration too short.';
			// }
			if (!TESTING && endBlockDate.getTime() - startBlockDate.getTime() - round1Length * 10 < 10 ) {
				dateIssue = 'Presale duration too short.';
			}
		}
		this.setState({ dateIssue });
		return !dateIssue;
	};

	handleChangeStartBlockDate = (startBlockDate: Date) => {
		this.setState({ startBlockDate });
	};

	handleChangeEndBlockDate = (endBlockDate: Date) => {
		this.setState({ endBlockDate });
	};

	handleChangeLiquidityLockPeriod = (selectedLockPeriod: string, liquidityLockPeriod: bigint) => {
		this.setState({ selectedLockPeriod, liquidityLockPeriod });
	};

	handleSubmit = async () => {
		const { startBlockDate, endBlockDate, liquidityLockPeriod } = this.state;
		if (startBlockDate && endBlockDate && (await this.checkFields())) {
			this.props.updateStartBlock(startBlockDate);
			this.props.updateEndBlock(endBlockDate);
			this.props.updateLiquidityLockPeriod(liquidityLockPeriod);
			this.props.navigate('/createIloSummary');
		}
		// this.props.navigate('/createIloSummary');
	};

	render() {
		const { startBlockDate, endBlockDate, showAwareness, dateIssue, selectedLockPeriod } = this.state;
		return (
			<CreateIloPeriodView
				startBlockDate={startBlockDate}
				endBlockDate={endBlockDate}
				showAwareness={showAwareness}
				dateIssue={dateIssue}
				selectedLockPeriod={selectedLockPeriod}
				liquidityLockPeriodOptions={liquidityLockPeriodOptions}
				onChangeStartBlockDate={this.handleChangeStartBlockDate}
				onChangeEndBlockDate={this.handleChangeEndBlockDate}
				onChangeLiquidityLockPeriod={this.handleChangeLiquidityLockPeriod}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

const mapStateToProps = ({ ethereum }: IRootState) => ({
	showConnectModal: ethereum.showConnectModal,
	isCloseUpdateShowConnectModal: ethereum.isCloseUpdateShowConnectModal,
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
	updateShowConnectModal: (showConnectModal: boolean) => dispatch(updateShowConnectModal(showConnectModal)),
	updateStartBlock: (startBlockDate: Date) => dispatch(updateStartBlock(startBlockDate)),
	updateEndBlock: (endBlockDate: Date) => dispatch(updateEndBlock(endBlockDate)),
	updateLiquidityLockPeriod: (liquidityLockPeriod: bigint) => dispatch(updateLiquidityLockPeriod(liquidityLockPeriod)),
	addError: (error: unknown) => dispatch(addError(error)),
});

const createIloPeriod = connect(mapStateToProps, mapDispatchToProps)(withRouter(withWeb3(CreateIloPeriod)));

export { createIloPeriod as CreateIloPeriod };
