"use client";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import Link from "next/link";
import path from "path";
const Header = () => {
  const Links = [
    {
      name: "Stake",
      path: "/",
    },
    {
      name: "Withdrawal",
      path: "/withdraw",
    },
    {
      name: "Demo",
      path: "/demo",
    },
  ];
  return (
    <div>
      <Box
        height={"50px"}
        lineHeight={"50px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bgcolor={"#f5f5f5"}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Rcc Stake
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <Box display={"flex"}>
            {Links.map((link) => {
              const active = usePathname() === link.path;
              return (
                <Typography
                key={link.name}
                  sx={{
                    fontSize: "30px",
                    fontWeight: active ? "bold" : "100",
                    marginRight: "20px",
                  }}
                >
                  <Link style={{cursor:link.path==='#'?'not-allowed':'pointer'}} href={link.path} >{link.name}</Link>
                </Typography>
              );
            })}
          </Box>
          <ConnectButton accountStatus="avatar" />
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default Header;
