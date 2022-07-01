type IEnvProperties =
	| 'TESTING'
	| 'BACKEND_URL_MOONBEAM'
	| 'BACKEND_URL_BSC'
	| 'IMAGES_URL'
	| 'BACKEND_URL_BSC'

	| 'ETHEREUM_CHAIN_ID'
	| 'EXPLORER_URL'
	| 'LAUNCHPAD_SETTINGS_ADDRESS'
	| 'LAUNCHPAD_GENERATOR_ADDRESS'
	| 'WDEV_ADDRESS'
	| 'DAI_ADDRESS'
	| 'WBTC_ADDRESS'
	| 'USDC_ADDRESS'
	| 'WDEV_DECIMALS'
	| 'DAI_DECIMALS'
	| 'WBTC_DECIMALS'
	| 'USDC_DECIMALS'
	| 'ETHEREUM_NETWORK_NAME'
	| 'ENERGYFI_FACTORY_ADDRESS'
	| 'ETHEREUM_RPC_URL'
	| 'ENERGYFI_LOCKER_ADDRESS'

	| 'BSC_EXPLORER_URL'
	| 'BSC_CHAIN_ID'
	| 'BSC_RPC_URL'
	| 'BSC_LAUNCHPAD_SETTINGS_ADDRESS'
	| 'BSC_LAUNCHPAD_GENERATOR_ADDRESS'
	| 'WBNB_ADDRESS'
	| 'BSC_DAI_ADDRESS'
	| 'BSC_WBTC_ADDRESS'
	| 'BSC_USDC_ADDRESS'
	| 'WBNB_DECIMALS'
	| 'BSC_DAI_DECIMALS'
	| 'BSC_WBTC_DECIMALS'
	| 'BSC_USDC_DECIMALS'
	| 'BSC_ETHEREUM_NETWORK_NAME'
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
export const BACKEND_URL_MOONBEAM = getEnvString('BACKEND_URL_MOONBEAM');
export const BACKEND_URL_BSC = getEnvString('BACKEND_URL_BSC');
export const IMAGES_URL = getEnvString('IMAGES_URL');

// moonbeam network 
export const ETHEREUM_CHAIN_ID = getEnvNumber('ETHEREUM_CHAIN_ID');
export const EXPLORER_URL = getEnvString('EXPLORER_URL');
export const LAUNCHPAD_SETTINGS_ADDRESS = getEnvString('LAUNCHPAD_SETTINGS_ADDRESS');
export const LAUNCHPAD_GENERATOR_ADDRESS = getEnvString('LAUNCHPAD_GENERATOR_ADDRESS');
export const WDEV_ADDRESS = getEnvString('WDEV_ADDRESS');
export const DAI_ADDRESS = getEnvString('DAI_ADDRESS');
export const WBTC_ADDRESS = getEnvString('WBTC_ADDRESS');
export const USDC_ADDRESS = getEnvString('USDC_ADDRESS');
export const WDEV_DECIMALS = getEnvNumber('WDEV_DECIMALS');
export const DAI_DECIMALS = getEnvNumber('DAI_DECIMALS');
export const WBTC_DECIMALS = getEnvNumber('WBTC_DECIMALS');
export const USDC_DECIMALS = getEnvNumber('USDC_DECIMALS');
export const ETHEREUM_NETWORK_NAME = getEnvString('ETHEREUM_NETWORK_NAME');
export const ENERGYFI_FACTORY_ADDRESS = getEnvString('ENERGYFI_FACTORY_ADDRESS');
export const ENERGYFI_LOCKER_ADDRESS = getEnvString('ENERGYFI_LOCKER_ADDRESS');
export const ETHEREUM_RPC_URL = getEnvString('ETHEREUM_RPC_URL');
export const BSC_CHAIN_ID = getEnvNumber('BSC_CHAIN_ID');
export const BSC_EXPLORER_URL = getEnvString('BSC_EXPLORER_URL');
export const BSC_LAUNCHPAD_SETTINGS_ADDRESS = getEnvString('BSC_LAUNCHPAD_SETTINGS_ADDRESS');
export const BSC_LAUNCHPAD_GENERATOR_ADDRESS = getEnvString('BSC_LAUNCHPAD_GENERATOR_ADDRESS');
export const BSC_ETHEREUM_NETWORK_NAME = getEnvString('BSC_ETHEREUM_NETWORK_NAME');
export const PANCAKE_FACTORY_ADDRESS = getEnvString('PANCAKE_FACTORY_ADDRESS');
export const PANCAKE_LOCKER_ADDRESS = getEnvString('PANCAKE_LOCKER_ADDRESS');
export const WBNB_ADDRESS = getEnvString('WBNB_ADDRESS');
export const BSC_DAI_ADDRESS = getEnvString('BSC_DAI_ADDRESS');
export const BSC_WBTC_ADDRESS = getEnvString('BSC_WBTC_ADDRESS');
export const BSC_USDC_ADDRESS = getEnvString('BSC_USDC_ADDRESS');
export const WBNB_DECIMALS = getEnvNumber('WBNB_DECIMALS');
export const BSC_DAI_DECIMALS = getEnvNumber('BSC_DAI_DECIMALS');
export const BSC_WBTC_DECIMALS = getEnvNumber('BSC_WBTC_DECIMALS');
export const BSC_USDC_DECIMALS = getEnvNumber('BSC_USDC_DECIMALS');
export const BSC_RPC_URL = getEnvString('BSC_RPC_URL');


