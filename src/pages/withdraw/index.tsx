"use client";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCallback, useEffect, useState } from "react";
import {
  ethers,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from "ethers";
import { usePathname } from "next/navigation";
import { useStakeContract } from "../hooks/useStakeContract";
import { useAccount, useWalletClient, useBalance } from "wagmi";

import LoadingButton from "@mui/lab/LoadingButton";

export type UserStakeData = {
  staked: string;
  withdrawPending: string;
  withdrawable: string;
};

const InitData = {
  staked: "0",
  withdrawable: "0",
  withdrawPending: "0",
};

import path from "path";
const Home = () => {
  const [amount, setAmount] = useState("0");
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [unStakeLoading, setUnstakeLoading] = useState(false);
  const handleUnStake = async () => {
    if (!stakeContract) return;
    try {
      setUnstakeLoading(true)
      const tx = await stakeContract.unstake(0, parseUnits(amount, 18))
      if(tx.wait){
        const res=await tx.wait();
        console.log('res',res)

        getUserInfo()
        setUnstakeLoading(false)
      }
   
   
    } catch (error) {
      setUnstakeLoading(false)
      console.log(error, 'stake-error')
    }
  }
  const handleWithdraw = async () => {
    try {
      setLoading(true)
      const tx = await stakeContract?.withdraw(0)
      console.log(tx, 'withdraw-res')
      if(tx.wait){
        const res=await tx.wait();
        console.log('res',res)
        setLoading(false)
        getUserInfo()
      }
    } catch (error) {
      setLoading(false)
      console.log(error, 'stake-error')
    }

  };
  const [StakedAmount, setStakedAmount] = useState("0");
  const [signer, setSigner] = useState<any>(null);
  const stakeContract = useStakeContract(signer);
  const [userData, setUserData] = useState<UserStakeData>(InitData);

  const getUserInfo = async () => {
    if (!stakeContract || !address) return;  // Ensure that stakeContract and address are available

    console.log('Fetching user info for address:', address);
    const stakeBalance = await stakeContract?.stakingBalance(0, address);
    const [requestAmount, pendingWithdrawAmount] = await stakeContract?.withdrawAmount(0, address);

    const available = Number(formatUnits(pendingWithdrawAmount, 18));
    const totalRequested = Number(formatUnits(requestAmount, 18));
    let staked=formatUnits(stakeBalance as bigint, 18)
    setUserData({
      staked,
      withdrawPending: (totalRequested - available).toFixed(4),
      withdrawable: available.toString(),
    });
    console.log(userData);
  };

  useEffect(() => {
    // This effect is only triggered when the address changes.
    if (address) {
      const provider1 = new ethers.BrowserProvider(window.ethereum);
      const fetchSigner = async () => {
        const fetchedSigner = await provider1.getSigner();
        setSigner(fetchedSigner);
      };
      fetchSigner();
    }
  }, [address]);  // Only depend on `address`, not `signer`

  useEffect(() => {
    if (signer && address) {
      getUserInfo();
    }
  }, [signer, address]);  // Depend on `signer` and `address` to trigger `getUserInfo`
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
        <Box
          sx={{
            p: "20px",
            mb: "30px",
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Box width={"100%"} mb={"20px"} textAlign={"center"}>
                <Box>Staked Amount: </Box>
                <Box m={"0 auto"} textAlign={"center"}>
                  {" "}
                  {userData.staked} ETH
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box width={"100%"} mb={"20px"} textAlign={"center"}>
                <Box>Available to withdraw</Box>
                <Box m={"0 auto"} textAlign={"center"}>
                  {" "}
                  {userData.withdrawable} ETH
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box width={"100%"} mb={"20px"} textAlign={"center"}>
                <Box>Pending Withdraw:</Box>
                <Box m={"0 auto"} textAlign={"center"}>
                  {" "}
                  {userData.withdrawPending} ETH
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box display={"flex"} width={"100%"} mb={"20px"}>
          <Box>Unstake </Box>
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
              loading={unStakeLoading}
              onClick={handleUnStake}
            >
              UnStake
            </LoadingButton>
          )}
        </Box>

        <Box sx={{ fontSize: "20px", mb: "10px", mt: "40px" }}>Withdraw</Box>
        <Box> Ready Amount: {userData.withdrawable}  </Box>
        <Typography fontSize={"14px"} color={"#888"}>
          After unstaking, you need to wait 20 minutes to withdraw.
        </Typography>
        <LoadingButton
          sx={{ mt: "20px" }}
          disabled={false}
          variant="contained"
          loading={loading}
          onClick={handleWithdraw}
        >
          Withdraw
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Home;
