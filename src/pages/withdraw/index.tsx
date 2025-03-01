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
  const handleUnStake = () => {};
  const handleWithdraw = () => {};
  const [StakedAmount, setStakedAmount] = useState("0");
  const [signer, setSigner] = useState<any>(null);
  const stakeContract = useStakeContract(signer);
  const [userData, setUserData] = useState<UserStakeData>(InitData);

  const getStakedAmount = async () => {
    const res = await stakeContract?.stakingBalance(0, address);
    setStakedAmount(formatUnits(res as bigint, 18));
  };
  const getUserInfo = async () => {
    console.log('address',address)
    const stakeBlannce = await stakeContract?.stakingBalance(0, address);
    const [requestAmount, pendingWithdrawAmount] =
      await stakeContract?.withdrawAmount(0, address);

    const ava = Number(formatUnits(pendingWithdrawAmount, 18));
    const p = Number(formatUnits(requestAmount, 18));
    // setStakedAmount(formatUnits(res as bigint, 18));
    setUserData({
      staked: formatUnits(stakeBlannce as bigint, 18),
      withdrawPending: (p - ava).toFixed(4),
      withdrawable: ava.toString(),
    });
    console.log(userData);
  };
  useEffect(() => {
    if (address) {
      const provider1 = new ethers.BrowserProvider(window.ethereum);
      const fetchSigner = async () => {
        const fetchedSigner = await provider1.getSigner();
        setSigner(fetchedSigner);
      };
      fetchSigner();
    }
  }, [address]);

  useEffect(() => {
    if (signer) {
      getUserInfo();
    }
  }, [signer]);
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
                  {StakedAmount} ETH
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box width={"100%"} mb={"20px"} textAlign={"center"}>
                <Box>Available to withdraw</Box>
                <Box m={"0 auto"} textAlign={"center"}>
                  {" "}
                  {0} ETH
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box width={"100%"} mb={"20px"} textAlign={"center"}>
                <Box>Pending Withdraw:</Box>
                <Box m={"0 auto"} textAlign={"center"}>
                  {" "}
                  {0} ETH
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
              loading={loading}
              onClick={handleUnStake}
            >
              UnStake
            </LoadingButton>
          )}
        </Box>

        <Box sx={{ fontSize: "20px", mb: "10px", mt: "40px" }}>Withdraw</Box>
        <Box> Ready Amount: {1} </Box>
        <Typography fontSize={"14px"} color={"#888"}>
          After unstaking, you need to wait 20 minutes to withdraw.
        </Typography>
        <LoadingButton
          sx={{ mt: "20px" }}
          disabled={false}
          variant="contained"
          loading={false}
          onClick={handleWithdraw}
        >
          Withdraw
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Home;
