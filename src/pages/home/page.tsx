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

import { ethers, formatEther, parseEther } from "ethers";
import path from "path";
const Home = () => {
  
  const [amount, setAmount] = useState("2");
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [loading, setLoading] = useState(false);
  const [signer, setSigner] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
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
  }, []); // 只在组件首次
  const handleStake = () => {
    const daiContract = new ethers.Contract(signer.address, stakeAbi, signer);
    setContract(daiContract)
    console.log(balance);
    daiContract.depositETH()
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
          <Box ml={"4px"}> {0} ETH</Box>
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
