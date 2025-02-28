"use client";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
// Import everything
import { ethers, formatEther, parseEther } from "ethers";
// Import just a few select items
import { BrowserProvider, parseUnits } from "ethers";
import { stakeAbi } from "../../abis/stake";
// Import from a specific export
import { HDNodeWallet } from "ethers/wallet";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useAccount, useWalletClient, useBalance } from "wagmi";

import LoadingButton from "@mui/lab/LoadingButton";
import path from "path";
const demo = () => {
  const [amount, setAmount] = useState("2");
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const handleUnStake = () => {};
  const handleWithdraw = () => {};
  const daiAddress = "0x01A01E8B862F10a3907D0fC7f47eBF5d34190341";
  // const daiAddress = "dai.tokens.ethers.eth";
  const myAddress = "0xB10e349a6C6cEe4408cAB9aB5bA63DeB02AE8850";
  // The ERC-20 Contract ABI, which is a common contract interface
  // for tokens (this is the Human-Readable ABI format)
  const daiAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ];

  const connetETH = async () => {
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner();
      console.log("provider", provider);
      console.log("signer", signer);
      // Look up the current block number (i.e. height)
      let BlockNumber = await provider.getBlockNumber();
      console.log("BlockNumber", BlockNumber);
      // Get the current balance of an account (by address or ENS name)
      let balance = await provider.getBalance(myAddress);

      balance = formatEther(balance);
      console.log("balance", balance);
      //   let tx = await signer.sendTransaction({
      //     to: "0xB10e349a6C6cEe4408cAB9aB5bA63DeB02AE8850",
      //     value: parseEther("0.01"),
      //   });
      //   let receipt = await tx.wait();
      //   console.log("receipt", receipt);

      // The Contract object
      const daiContract = await new ethers.Contract(
        daiAddress,
        stakeAbi,
        signer
      );
      console.log(daiContract.address, "daiContract.address ");
      let startBlock = await daiContract.startBlock();
      console.log(startBlock, "startBlock");
      const code = await provider.getCode(daiAddress);
      console.log(code, "code");
      // 有关使用此对象的示例，请参见下面(Resolver)
      const resolver = await provider.getResolver("ricmoo.eth");
      console.log(resolver, "resolver");
      const lookupAddress = await provider.lookupAddress(
        "0x5555763613a12D8F3e73be831DFf8598089d3dCa"
      );
      console.log(lookupAddress, "lookupAddress");
      const resolveName = await provider.resolveName("ricmoo.eth");
      console.log(resolveName, "resolveName");
      console.log(resolver.address, "resolver.address");
      const getNetwork = await provider.getNetwork();
      console.log("provider.getNetwork()", getNetwork);

      let gasPrice = await provider.getFeeData();
      console.log("gasPrice", gasPrice);
  
    }
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <h1>ethers：</h1>
      <Button onClick={connetETH}>连接以太坊: RPC</Button>
    </Box>
  );
};

export default demo;
