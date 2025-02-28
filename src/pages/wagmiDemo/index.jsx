"use client";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { useAccount, useAccountEffect, useBalance,useBlockNumber ,useBlockTransactionCount,useChainId  ,useChains,useConfig   } from "wagmi";
import { useConnections } from 'wagmi'
import { UseAccountParameters } from "wagmi";
import { config } from "../../wagmi";
const wagmiDemo = () => {
  const Account = useAccount({ config });

  const result = useBalance({ address: Account.address, config });
  const chinid = useChainId();
  const chinids = useChains ();
  const uConfig  = useConfig  ();
  const connections = useConnections()
  const BlockNumber = useBlockNumber()
  const useBlockTransactionCounters = useBlockTransactionCount()
  const getAccount = async () => {
    console.log(Account);
  };
  const getBlannce = async () => {
    console.log(result);
  };
  const getBlockNumber = async () => {
    console.log(BlockNumber);
  };
  const getuseBlockTransactionCount= async () => {
    console.log(BlockNumber);
  };
  const useChainIdHandle= async () => {
    console.log(chinid);
  };
  const useChainsHandle= async () => {
    console.log(chinids);
  };
  const useConfigHandle= async () => {
    console.log(uConfig);
  };
  const connectionsHandle= async () => {
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
      <Button onClick={getuseBlockTransactionCount}>获取getuseBlockTransactionCount？</Button>
      <Button onClick={useChainIdHandle}>useChainId ？</Button>
      <Button onClick={useChainsHandle}>useChains ？</Button>
      <Button onClick={useConfigHandle}>useConfigHandle ？</Button>
      <Button onClick={connectionsHandle}>connectionsHandle ？</Button>
    </Box>
  );
};

export default wagmiDemo;
