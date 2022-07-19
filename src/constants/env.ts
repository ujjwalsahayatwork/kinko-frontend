type IEnvProperties =
	| 'TESTING'
	| 'BACKEND_URL_BSC'
	| 'FRONTEND_URL'
	| 'IMAGES_URL'
	| 'BACKEND_URL_BSC'
	| 'ETHEREUM_CHAIN_ID'
	| 'EXPLORER_URL'
	| 'LAUNCHPAD_SETTINGS_ADDRESS'
	| 'LAUNCHPAD_GENERATOR_ADDRESS'
	| 'DAI_ADDRESS'
	| 'WBTC_ADDRESS'
	| 'USDC_ADDRESS'
	| 'DAI_DECIMALS'
	| 'WBTC_DECIMALS'
	| 'USDC_DECIMALS'
	| 'ETHEREUM_NETWORK_NAME'
	| 'ETHEREUM_RPC_URL'
	| 'WBNB_ADDRESS'
	| 'WBNB_DECIMALS'
	| 'PANCAKE_FACTORY_ADDRESS'
	| 'PANCAKE_LOCKER_ADDRESS';

const getEnvString = (property: IEnvProperties): string => {
	const value = process.env[`REACT_APP_${property}`];
	if (value === undefined) {
		throw new Error(`Environment variable ${property} is undefined`);
	}
	return value;
};

const getEnvNumber = (property: IEnvProperties): number => {
	const value = process.env[`REACT_APP_${property}`];
	if (value === undefined) {
		throw new Error(`Environment variable ${property} is undefined`);
	}
	const numberValue = Number(value);
	if (!Number.isFinite(numberValue)) {
		throw new Error(`Environment variable ${property} is not a number`);
	}
	return numberValue;
};

export const TESTING = getEnvNumber('TESTING');
export const BACKEND_URL_BSC = getEnvString('BACKEND_URL_BSC');
export const IMAGES_URL = getEnvString('IMAGES_URL');
export const FRONTEND_URL = getEnvString('FRONTEND_URL');

// moonbeam network
export const ETHEREUM_CHAIN_ID = getEnvNumber('ETHEREUM_CHAIN_ID');
export const EXPLORER_URL = getEnvString('EXPLORER_URL');
export const LAUNCHPAD_SETTINGS_ADDRESS = getEnvString('LAUNCHPAD_SETTINGS_ADDRESS');
export const LAUNCHPAD_GENERATOR_ADDRESS = getEnvString('LAUNCHPAD_GENERATOR_ADDRESS');
export const DAI_ADDRESS = getEnvString('DAI_ADDRESS');
export const WBTC_ADDRESS = getEnvString('WBTC_ADDRESS');
export const USDC_ADDRESS = getEnvString('USDC_ADDRESS');
export const DAI_DECIMALS = getEnvNumber('DAI_DECIMALS');
export const WBTC_DECIMALS = getEnvNumber('WBTC_DECIMALS');
export const USDC_DECIMALS = getEnvNumber('USDC_DECIMALS');
export const ETHEREUM_NETWORK_NAME = getEnvString('ETHEREUM_NETWORK_NAME');
export const ETHEREUM_RPC_URL = getEnvString('ETHEREUM_RPC_URL');
export const PANCAKE_FACTORY_ADDRESS = getEnvString('PANCAKE_FACTORY_ADDRESS');
export const PANCAKE_LOCKER_ADDRESS = getEnvString('PANCAKE_LOCKER_ADDRESS');
export const WBNB_ADDRESS = getEnvString('WBNB_ADDRESS');
export const WBNB_DECIMALS = getEnvNumber('WBNB_DECIMALS');
