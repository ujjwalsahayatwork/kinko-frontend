
import axios from 'axios';
import BigNumber from 'bignumber.js';
import {
	DAI_ADDRESS,
	DAI_DECIMALS,
	LAUNCHPAD_GENERATOR_ADDRESS,
	USDC_ADDRESS,
	USDC_DECIMALS,
	WBTC_ADDRESS,
	WBTC_DECIMALS,
	WBNB_ADDRESS,
	WBNB_DECIMALS,
	ETHEREUM_CHAIN_ID,


} from 'constants/env';
import erc20Abi from 'constants/erc20Abi.json';
import launchpadGeneratorAbi from 'constants/launchpadGeneratorAbi.json';
import bscLaunchpadGeneratorAbi from 'constants/bscLaunchpadGeneratorAbi.json';

import { ECSignature, IBaseToken, ITimeline } from 'types';
import { getDEVCreationFee } from 'utils/launchpadSettings';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core/types';
import { BlockTransactionString } from 'web3-eth/types';
import { AbiItem } from 'web3-utils/types';

const hasOwnProperty = <X, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> =>
	Object.prototype.hasOwnProperty.call(obj, prop);

export const sleep = (ms: number): Promise<void> =>
	new Promise<void>((resolve) => {
		setTimeout(resolve, ms);
	});

const bigNumberToHex = (value: BigNumber): string => `0x${value.toString(16)}`;

export const bigNumberToUint256 = (value: BigNumber, decimals: BigNumber): string =>
	`0x${value.times(new BigNumber(10).pow(decimals)).integerValue().toString(16)}`;

export const numberToHex = (value: number, prefix = true): string =>
	prefix ? `0x${Math.round(value).toString(16)}` : Math.round(value).toString(16);

export const bigintToHex = (value: bigint, prefix = true): string =>
	prefix ? `0x${value.toString(16)}` : value.toString(16);

export const errorToString = (error: unknown): string => {
	if (typeof error === 'string') {
		return error;
	}
	if (typeof error === 'number' || typeof error === 'bigint' || typeof error === 'boolean') {
		return error.toString();
	}
	if (typeof error === 'object' && error && error.toString() !== '[object Object]') {
		return error.toString();
	}
	if (typeof error === 'object' && error && hasOwnProperty(error, 'message') && typeof error.message === 'string') {
		return error.message;
	}
	if (typeof error === 'object') {
		return JSON.stringify(error);
	}
	return `${error}`;
};

export const getBlockNumber = async (web3: Web3): Promise<number> => web3.eth.getBlockNumber();

export const getBlock = async (web3: Web3, blockNumber: number): Promise<BlockTransactionString> =>
	web3.eth.getBlock(blockNumber.toString());

export const getBalance = async (web3: Web3, walletAddress: string): Promise<BigNumber> => {
	const balance = await web3.eth.getBalance(walletAddress);
	return new BigNumber(balance).div(new BigNumber(10).pow(18));
};

export const getERC20Decimals = async (web3: Web3, tokenAddress: string): Promise<BigNumber> => {

	const token = new web3.eth.Contract(erc20Abi as Array<AbiItem>, tokenAddress);
	const decimals: string = await token.methods.decimals().call();
	return new BigNumber(decimals);
};

export const getERC20Balance = async (web3: Web3, walletAddress: string, tokenAddress: string): Promise<BigNumber> => {
	const token = new web3.eth.Contract(erc20Abi as Array<AbiItem>, tokenAddress);
	const balance: string = await token.methods.balanceOf(walletAddress).call();
	return new BigNumber(balance).div(new BigNumber(10).pow(await getERC20Decimals(web3, tokenAddress)));
};

export const getERC20TotalSupply = async (web3: Web3, tokenAddress: string): Promise<BigNumber> => {
	const token = new web3.eth.Contract(erc20Abi as Array<AbiItem>, tokenAddress);
	const totalSupply: string = await token.methods.totalSupply().call();
	return new BigNumber(totalSupply).div(new BigNumber(10).pow(await getERC20Decimals(web3, tokenAddress)));
};

export const getERC20Name = async (web3: Web3, tokenAddress: string): Promise<string> => {
	const token = new web3.eth.Contract(erc20Abi as Array<AbiItem>, tokenAddress);
	return token.methods.name().call();
};

export const getERC20Symbol = async (web3: Web3, tokenAddress: string): Promise<string> => {
	const token = new web3.eth.Contract(erc20Abi as Array<AbiItem>, tokenAddress);
	return token.methods.symbol().call();
};

export const approveERC20 = async (
	web3: Web3,
	tokenAddress: string,
	walletAddress: string,
	spenderAddress: string,
	amount: BigNumber
): Promise<void> => {
	const token = new web3.eth.Contract(erc20Abi as Array<AbiItem>, tokenAddress);
	await token.methods
		.approve(
			spenderAddress,
			bigNumberToHex(
				amount
					.times(new BigNumber(10).pow(await getERC20Decimals(web3, tokenAddress)))
					.integerValue(BigNumber.ROUND_CEIL)
			)
		)
		.send({ from: walletAddress });
};

export const createLaunchpad = async (params: {
	web3: Web3;
	walletAddress: string;
	saleTokenAddress: string;
	baseTokenAddress: string;
	referralAddress: string;
	amount: BigNumber;
	hardcap: BigNumber;
	softcap: BigNumber;
	liquidityRatePercent: number;
	listingRatePercent: number;
	startBlockDate: Date;
	endBlockDate: Date;
	maxSpendPerBuyer: BigNumber;
	liquidityLockPeriod: bigint;
}): Promise<string> => {
	const {
		web3,
		walletAddress,
		saleTokenAddress,
		baseTokenAddress,
		referralAddress,
		amount,
		hardcap,
		softcap,
		liquidityRatePercent,
		listingRatePercent,
		startBlockDate,
		endBlockDate,
		maxSpendPerBuyer,
		liquidityLockPeriod,
	} = params;
	const saleTokenDecimals = await getERC20Decimals(web3, saleTokenAddress);
	const baseTokenDecimals = await getERC20Decimals(web3, baseTokenAddress);
	const data = new Array<string>();
	data.push(bigNumberToUint256(amount, saleTokenDecimals)); // 0 amount
	data.push(bigNumberToUint256(hardcap, baseTokenDecimals)); // 1 hardcap
	data.push(bigNumberToUint256(softcap, baseTokenDecimals)); // 2 softcap
	data.push(numberToHex(liquidityRatePercent * 10)); // 3 liquidityPercent
	data.push(numberToHex(listingRatePercent)); // 4 listingRate
	data.push(bigNumberToUint256(maxSpendPerBuyer, baseTokenDecimals)); // 5 maxSpendPerBuyer
	data.push(bigintToHex(liquidityLockPeriod)); // 6 lockPeriod
	data.push(numberToHex(startBlockDate.getTime() / 1000)); // 7 startTime
	data.push(numberToHex(endBlockDate.getTime() / 1000)); // 8 endTime

	const  chainId  = await web3.eth.getChainId();
	const launchpadGenerator = new web3.eth.Contract(
		(chainId === ETHEREUM_CHAIN_ID?launchpadGeneratorAbi:bscLaunchpadGeneratorAbi) as Array<AbiItem>,
	   LAUNCHPAD_GENERATOR_ADDRESS
	);
	const creationFee = await getDEVCreationFee(web3);
	const transactionHash = await new Promise<string>((resolve, reject) => {

		launchpadGenerator.methods
			.createLaunchpad(walletAddress, saleTokenAddress, baseTokenAddress, referralAddress, data)
			.send(
				{ from: walletAddress, value: bigNumberToUint256(creationFee, new BigNumber(18)) },
				(error: unknown, transactionHash: string) => {
					if (error) {

						reject(error);
					} else {
						resolve(transactionHash);
					}
				}
			);
	});
	let transactionReceipt: TransactionReceipt | null;
	do {
		// eslint-disable-next-line no-await-in-loop
		transactionReceipt = (await web3.eth.getTransactionReceipt(transactionHash)) as TransactionReceipt | null;
		if (!transactionReceipt) {
			// eslint-disable-next-line no-await-in-loop
			await sleep(1000);
		}
	} while (!transactionReceipt);
	const log = transactionReceipt.logs.find(
		({ topics }) => topics[0] === '0x077d8c327c063838fcf08b9de8f97861315f0b111723a0ae87d949bb660dda54'
	);
	if (!log) {
		throw new Error('Cannot find log');
	}
	return `0x${log.topics[1].slice(-40)}`;
};

export const getBaseTokenSymbol = (baseToken: IBaseToken): string => {
	// eslint-disable-next-line default-case
	switch (baseToken) {
		case 'dai':
			return 'DAI';
		case 'wbtc':
			return 'WBTC';
		case 'usdc':
			return 'USDC';
		case 'bnb':
			return 'BNB';
	}
};

export const getBaseTokenName = (baseToken: IBaseToken): string => {
	// eslint-disable-next-line default-case
	switch (baseToken) {
		case 'dai':
			return 'DAI';
		case 'wbtc':
			return 'Wrapped BTC';
		case 'usdc':
			return 'USDC';
		case 'bnb':
			return 'BNB';
	}
};

export const getBaseTokenAddress = (baseToken: IBaseToken): string => {
	// eslint-disable-next-line default-case
	switch (baseToken) {
		case 'dai':
			return DAI_ADDRESS;
		case 'wbtc':
			return WBTC_ADDRESS;
		case 'usdc':
			return USDC_ADDRESS;
		case 'bnb':
			return WBNB_ADDRESS;
	}
};

export const getBaseTokenDecimals = (baseToken: IBaseToken): number => {
	// eslint-disable-next-line default-case
	switch (baseToken) {
		case 'dai':
			return DAI_DECIMALS;
		case 'wbtc':
			return WBTC_DECIMALS;
		case 'usdc':
			return USDC_DECIMALS;
		case 'bnb':
			return WBNB_DECIMALS;

	}
};

export const createBaseTokenDropDownOption = (
	baseToken: IBaseToken
): { key: IBaseToken; label: string; payload: IBaseToken } => ({
	key: baseToken,
	label: getBaseTokenName(baseToken),
	payload: baseToken,
});

export const createSignature = async (web3: Web3, walletAddress: string, message: string): Promise<ECSignature> => {
	const signature = await web3.eth.personal.sign(message, walletAddress, '');
	const r = signature.slice(2).slice(0, 64);
	const s = signature.slice(2).slice(64, 128);
	const v = signature.slice(2).slice(128, 130);
	return { r, s, v };
};

export const blobToBase64 = (blob: Blob): Promise<string> =>
	new Promise<string>((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			if (!reader.result) {
				resolve('');
			} else if (typeof reader.result === 'string') {
				resolve(reader.result);
			} else {
				const bytes = new Uint8Array(reader.result);
				let binary = '';
				for (let i = 0; bytes.byteLength > i; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				resolve(window.btoa(binary));
			}
		};
	});

export const base64ToBlob = async (data: string): Promise<Blob> => fetch(data).then((res) => res.blob());

export const downloadFile = async (url: string): Promise<Blob> =>
	axios.get<Blob>(url, { responseType: 'blob' }).then(async (response) => response.data);

export const getTimeline = (params: {
	startBlockDate: Date;
	endBlockDate: Date;
	totalBaseCollected: BigNumber;
	hardcap: BigNumber;
	softcap: BigNumber;
	round1Length: number;
	lpGenerationComplete: boolean;
}): Array<ITimeline> => {
	const { startBlockDate, endBlockDate, totalBaseCollected, hardcap, softcap, round1Length, lpGenerationComplete } =
		params;
	const timeline: Array<ITimeline> = [
		{ reached: false, icon: 'trophy', title: 'ILO Creation', subtitle: '' },
		{ reached: false, icon: 'trophy', title: 'Round 1 Started', subtitle: '' },
		{ reached: false, icon: 'trophy', title: 'Round 1 Ended', subtitle: '' },
		{ reached: false, icon: 'trophy', title: 'Round 2 Started', subtitle: '' },
		{ reached: false, icon: 'trophy', title: 'Round 2 Ended', subtitle: '' },
		{ reached: false, icon: 'lock', title: 'LP Token Locked', subtitle: '' },
		{ reached: false, icon: 'trophy', title: 'ILO Successful', subtitle: '' },
	];
	timeline[0].reached = true;
	if (Date.now() >= startBlockDate.getTime()) {
		timeline[1].reached = true;
	} else {
		return timeline;
	}
	if (
		startBlockDate.getTime() + round1Length * 1000 < Date.now() ||
		totalBaseCollected.gte(hardcap) ||
		endBlockDate.getTime() < Date.now()
	) {
		timeline[2].reached = true;
		timeline[3].reached = true;
	} else {
		return timeline;
	}
	if (totalBaseCollected.gte(hardcap) || (endBlockDate.getTime() < Date.now() && totalBaseCollected.gte(softcap))) {
		timeline[4].reached = true;
	} else {
		return timeline;
	}
	if (lpGenerationComplete) {
		timeline[5].reached = true;
		timeline[6].reached = true;
	}
	return timeline;
};

export const copyToClipboard = (value: string): void => {
	const textField = document.createElement('textarea');
	textField.innerText = value;
	document.body.appendChild(textField);
	textField.select();
	textField.setSelectionRange(0, 99999);
	document.execCommand('copy');
	textField.remove();
};

export const isZeroAddress = (address: string): boolean =>
	address.toLowerCase() === '0x0000000000000000000000000000000000000000';
