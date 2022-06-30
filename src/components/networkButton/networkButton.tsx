
/* eslint-disable */
import { useWeb3React } from '@web3-react/core';
import moonbeamLogo from 'assets/images/networks/moonbeam.jpg';
import bscLogo from 'assets/images/networks/bsc.png';
import { BaseButton } from 'components/baseButton/baseButton';
import { Col } from 'components/col/col';
import { Icon } from 'components/icon/icon';
import { Spacing } from 'components/spacing/spacing';
import { Text } from 'components/text/text';
import { IDeviceProps } from 'components/types';
import { toPx, useDevice } from 'components/utils';
import { BSC_CHAIN_ID, ETHEREUM_CHAIN_ID } from 'constants/env';
import uniqueId from 'lodash/uniqueId';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const clickClass = '9ab7283a5e02fc4621fe88d20a1d31ec66d75720c593277966057c6493b1b9f7';

const DropDownButton = styled(BaseButton)`
    background-color: transparent;
    border: ${({ theme }) => `1px solid #F97A48`};
    border-radius: 0.35rem;
    max-width: 180px;
    width: 10rem;
    height: 3rem;
    padding: 0 .5rem;
    align-items: center;
    justify-content: center;
    @media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
        width: 100%;
        max-width: 94%;
    }
`;
const Relative = styled(Col)`
    position: relative;
    @media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
        position: absolute;
    }
`;
const Absolute = styled(Col)`
	z-index: 9999;
    position: absolute;
    width: 176px;
    top: -50px;
    @media (max-width: ${({ theme }) => toPx(theme.mobileThreshold)}) {
        position: relative;
        margin-top: -12.5rem;
        width: 210px;
        top: 0px;
    }
`;
const OptionContainer = styled(Col)`
    background-color: #161719;
    border: 1px solid #4B4B4B;
    border-radius: 5px;
    width: 100%;
    padding-top: 1rem;
    margin-top: 3rem;
`;
const OptionButton = styled(BaseButton)`
    color: ${({ theme, disabled }) => (disabled ? theme.secondaryColor : theme.primaryColor)};
    background-color: transparent;
    border-radius: 0px;
    z-index: 1000;
    border-radius: 5px;
    padding: 0 1rem;
    height: 2.5rem;
    border: 1px solid #A466FF;
    margin-bottom: .75rem;
    display: flex;
    align-items: center;
    :hover {
        color: #A466FF;;
        background-color: transparent;
    }
    filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : undefined)};
`;
const StyledNetworkBtn = styled.div`
    display: flex;
    align-items: center;
`
const LogoWrapper = styled(Col) <{ size: number }>`
`;

const NetworkIcon = styled.img`
    border-radius: 0.350rem;
    width: 30px;
`;

type INetworkButtonProps = IDeviceProps;
export const NetworkButton = (props: any) => {
    const {
        library,
        chainId,
    } = useWeb3React();
    const { isDesktop } = useDevice();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([
        { icon: moonbeamLogo, label: 'Moonbeam', disabled: false, chainID: ETHEREUM_CHAIN_ID },
        { icon: bscLogo, label: 'BSC', disabled: false, chainID: BSC_CHAIN_ID },
    ])

    const [selectedNetwork, setSelectedNetwork]: any = useState({})
    const [uniqueClickClass, setUniqueClickClass] = useState(uniqueId(clickClass));
    const logoSize = isDesktop ? 24 : 16;
    const handleDropDownButton = () => {
        setOpen(!open)
    };

    const handleClickEvent = (event: MouseEvent) => {
        if (event.target && event.target instanceof HTMLElement && !event.target.className.includes(uniqueClickClass)) {
            setOpen(false)
        }
    };

    useEffect(() => {
        const defaultNetwork = chainId ? options.find((x: any) => x.chainID === chainId) : options[0]
        setSelectedNetwork(defaultNetwork)
    }, [chainId])

    useEffect(() => {
        window.addEventListener('click', handleClickEvent);
    }, [])

    const toHex = (num: any) => {
        const val = Number(num);
        return "0x" + val.toString(16);
    };

    const switchNetwork = async (networkObj: any) => {
        try {
            setSelectedNetwork(networkObj)
            await library._provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: toHex(networkObj?.chainID) }]
            });
            setOpen(false)
            window.location.replace("/")
        } catch (switchError: any) {
            setOpen(false)
        }
    };
    return (
        <Col roundTop>
            <DropDownButton className={`HelloTest ${uniqueClickClass}`} onClick={handleDropDownButton}>
                <StyledNetworkBtn className={`HelloTest`}>
                    <NetworkIcon className={`HelloTest ${uniqueClickClass} `} src={selectedNetwork?.icon} alt={selectedNetwork?.label} width={logoSize} />
                    <Spacing horizontal="s" />
                    <Text className={`HelloTest ${uniqueClickClass}`} fontSize="s">{selectedNetwork?.label}</Text>
                    <Spacing horizontal="s" />
                </StyledNetworkBtn>
                <Icon className={`HelloTest ${uniqueClickClass}`} icon="downarrow" title="downarrow" color="primary" height={6} />
            </DropDownButton>
            {open && (
                <Relative>
                    <Absolute>
                        <Spacing vertical="s" />
                        <OptionContainer className={uniqueClickClass} horizontalPadding="m" verticalPadding="s">
                            {options.map((item) => (

                                <OptionButton key={item.label} onClick={() => switchNetwork(item)}>
                                    <LogoWrapper align="center" size={logoSize}>
                                        <NetworkIcon src={item.icon} alt={item.label} width={item.label === 'NEAR' ? logoSize * 0.8 : logoSize} />
                                    </LogoWrapper>
                                    <Spacing horizontal="s" />
                                    <Text fontSize="s" color="undefined">
                                        {item.label}
                                    </Text>
                                </OptionButton>
                            ))}
                        </OptionContainer>
                    </Absolute>
                </Relative>
            )}
        </Col>
    );
}
