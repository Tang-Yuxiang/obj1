"use client";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAccount, useWalletClient, useBalance } from "wagmi";

import LoadingButton from "@mui/lab/LoadingButton";
import path from "path";
const Home = () => {
  const [amount, setAmount] = useState("2");
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false)
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
          
        {
            !isConnected ? <ConnectButton /> : <LoadingButton variant='contained' loading={loading}>Stake</LoadingButton>
          }

        
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
