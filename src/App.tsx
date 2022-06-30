import { Web3ReactProvider } from '@web3-react/core';
import { EthereumHandler } from 'components/ethereumHandler/ethereumHandler';
import { ModalHandler } from 'modals/modalHandler/modalHandler';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'router';
import { store } from 'store/store';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import Web3 from 'web3';
import { provider } from 'web3-core/types';

const getLibrary = (p?: provider) => {
	if (p) {
		return new Web3(p);
	}
};

export const App: FC = () => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<EthereumHandler>
					<Router />
				</EthereumHandler>
				<ModalHandler />
			</Web3ReactProvider>
		</ThemeProvider>
	</Provider>
);
