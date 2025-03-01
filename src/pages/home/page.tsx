"use client";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { stakeAbi } from "../../abis/stake";

import {
  useAccount,
  useWalletClient,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import LoadingButton from "@mui/lab/LoadingButton";
import { Contract } from "ethers";
import { formatUnits } from "viem";
import {useStakeContract} from "../hooks/useStakeContract";
import { ethers, formatEther, parseEther,parseUnits } from "ethers";
import path from "path";
const Home = () => {
  const [amount, setAmount] = useState("0");
  const { address, isConnected } = useAccount();
  const { data:balanceData} = useBalance({ address });
  const [loading, setLoading] = useState(false);
  const [StakedAmount, setStakedAmount] = useState('0');
  const [signer, setSigner] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const stakeContract=useStakeContract(signer);
  const getStakedAmount =async () => {
    // if (address && stakeContract) {
      // const res = await stakeContract?.read.poolLength();
      // const res = await stakeContract?.stakingBalance([0, address])
      const res = await stakeContract?.stakingBalance(0, address);
      // setStakedAmount(formatUnits(res as bigint, 18))
      console.log(formatUnits(res as bigint, 18),'getStakedAmount','address',address)
      setStakedAmount(formatUnits(res as bigint, 18))
    // }
  }
  useEffect(() => {

    // 检查 window 是否可用，确保代码只在客户端执行
    if (typeof window !== "undefined" && window.ethereum) {
      const provider1 = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider1);
      const fetchSigner = async () => {
        const fetchedSigner = await provider1.getSigner();
        setSigner(fetchedSigner);
      };
      fetchSigner();
    }
    if(address){
      getStakedAmount()
    }
    // getStakedAmount()
    // getStakedAmount()
  }, [address]); // 只在组件首次
  const handleStake = async () => {
 
    try{
      setLoading(true)
      // console.log(balanceData)
      var isLess=false;
      if (balanceData) {
        const { formatted } = balanceData;
        if (parseFloat(formatted) < parseFloat(amount)) {
          console.log("balanceData is less than amount");
          isLess=true;
          setLoading(false)
        }
      }
      if(isLess) return
      const tx=await stakeContract?.depositETH({value:parseUnits(amount,18),});
      if(tx.wait){
        const res=await tx.wait();
        console.log('res',res)

        getStakedAmount()
        setLoading(false)
      }

    }catch(e){
      setLoading(false)
      console.log(e)
    }
  };

  
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <Typography sx={{}}>Stake ETH to earn tokens.</Typography>
      <Box
        sx={{
          border: "1px solid #eee",
          borderRadius: "20px",
          mt: "30px",
          width: "600px",
          p: "20px",
        }}
      >
        <Typography sx={{ fontSize: "16px" }}>Rcc Stake</Typography>

        <Box display={"flex"} width={"100%"} mb={"20px"}>
          <Box>Staked Amount: </Box>
          <Box ml={"4px"}> {StakedAmount} ETH</Box>
        </Box>

        <TextField
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          id="outlined-basic"
          label="Amount"
          variant="outlined"
        />

        <Box mt={"20px"}>
          {!isConnected ? (
            <ConnectButton />
          ) : (
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleStake}
            >
              Stake
            </LoadingButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
function getStakedAmount() {
  throw new Error("Function not implemented.");
}
