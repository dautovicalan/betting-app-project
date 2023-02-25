import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#000000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          p: 3,
        }}
      >
        <Typography variant="h5" color={"white"} textAlign="center">
          App Designed and Developed By Alan Dautovic, 2023
        </Typography>
      </Box>
    </footer>
  );
};
