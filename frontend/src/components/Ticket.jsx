import { Box, Paper, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";

const Ticket = ({ userTicket }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        transition: "transform .2s",
        ":hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
        <InfoIcon />
        <Typography>
          Event:{" "}
          {userTicket.sportEvent.teamOne +
            " v " +
            userTicket.sportEvent.teamTwo}
        </Typography>
        <Typography>Event Type : {userTicket.sportEvent.sportType}</Typography>
        <Typography>
          Status :{" "}
          {userTicket.sportEvent.outcome === 3
            ? "Unresolved"
            : userTicket.userBet === userTicket.sportEvent.outcome
            ? "Won"
            : "Lost"}
        </Typography>
        <Typography>
          Your bet :{" "}
          {userTicket.userBet === 1
            ? userTicket.sportEvent.teamOne
            : userTicket.userBet === 2
            ? userTicket.sportEvent.teamTwo
            : "TIE"}
        </Typography>
        <Typography>Amount bet: {userTicket.amount}</Typography>
        <Typography>Win amount: {userTicket.winAmount}</Typography>
      </Stack>
    </Paper>
  );
};

export default Ticket;
