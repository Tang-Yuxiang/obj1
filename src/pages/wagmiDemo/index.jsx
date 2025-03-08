"use client";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import {
  useAccount,
  useAccountEffect,
  useBalance,
  useBlockNumber,
  useBlockTransactionCount,
  useChainId,
  useChains,
  useConfig,
  useEnsAddress,
} from "wagmi";
import { mainnet, optimism, polygon } from 'wagmi/chains'
import { useConnections } from "wagmi";
import { UseAccountParameters } from "wagmi";
import { config } from "../../wagmi";
import { normalize } from 'viem/ens';
const wagmiDemo = () => {
  const ensName = 'wevm.eth'; // 你可以动态获取 ENS 名称
  const Account = useAccount({ config });
  const {
    data: address,
    isLoading,
    isError,
  } = useEnsAddress({
    name: normalize(ensName),
  });
  const result = useBalance({ address: Account.address, config });
  const chinid = useChainId();
  const chinids = useChains();
  const uConfig = useConfig();
  const connections = useConnections();
  const BlockNumber = useBlockNumber();
  const useBlockTransactionCounters = useBlockTransactionCount();
  const getAccount = async () => {
    console.log(Account);
  };
  const getBlannce = async () => {
    console.log(result);
  };
  const getBlockNumber = async () => {
    console.log(BlockNumber);
  };
  const getuseBlockTransactionCount = async () => {
    console.log(BlockNumber);
  };
  const useChainIdHandle = async () => {
    console.log(chinid);
  };
  const useChainsHandle = async () => {
    console.log(chinids);
  };
  const useConfigHandle = async () => {
    console.log(uConfig);
  };
  const connectionsHandle = async () => {
    console.log(connections);
  };

  useAccountEffect({
    onConnect(data) {
      console.log("Connected!", data);
    },
    onDisconnect() {
      console.log("Disconnected!");
    },
  });
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <h1>wagmiDemo</h1>
      <Button onClick={getAccount}>获取账户</Button>
      <Button onClick={getBlannce}>获取余额？</Button>
      <Button onClick={getBlockNumber}>获取BlockNumber？</Button>
      <Button onClick={getuseBlockTransactionCount}>
        获取getuseBlockTransactionCount？
      </Button>
      <Button onClick={useChainIdHandle}>useChainId ？</Button>
      <Button onClick={useChainsHandle}>useChains ？</Button>
      <Button onClick={useConfigHandle}>useConfigHandle ？</Button>
      <Button onClick={connectionsHandle}>connectionsHandle ？</Button>
      <Box>{address}？</Box>
    </Box>
  );
};

export default wagmiDemo;
