import { IRouterProps } from 'components/types';
import { loadState, saveState, withRouter } from 'components/utils';
import { IIloFilter, MainView } from 'pages/main/mainView';
import React, { Component } from 'react';
import { IIlo } from 'types';
import { getIlos } from 'utils/api';

type IMainProps = IRouterProps;

interface IMainState {
	ilos: Array<IIlo>;
	iloFilter: IIloFilter;
}

class Main extends Component<IMainProps, IMainState> {
	constructor(props: IMainProps) {
		super(props);
		this.state = loadState<IMainState>(props.location.key, (state) => {
			if (state) {
				return { ...state, ilos: [] };
			}
			return {
				ilos: [],
				iloFilter: 'live',
			};
		});
	}

	async componentDidMount() {
		const ilos = await getIlos();
		this.setState({ ilos });
	}

	async componentDidUpdate(prevProps: IMainProps, prevState: IMainState) {
		const { location } = this.props;
		if (prevState !== this.state) {
			saveState(location.key, this.state, (state) => ({
				...state,
				ilos: [],
			}));
		}
	}

	handleChangeIloFilter = (iloFilter: IIloFilter) => {
		this.setState({ iloFilter });
	};

	handleCreateIlo = () => {
		this.props.navigate('/createIloGeneral');
	};

	render() {
		const { ilos, iloFilter } = this.state;
		return (
			<MainView
				ilos={ilos}
				iloFilter={iloFilter}
				onChangeIloFilter={this.handleChangeIloFilter}
				onCreateIlo={this.handleCreateIlo}
			/>
		);
	}
}

const main = withRouter(Main);

export { main as Main };
