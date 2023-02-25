import { Button, Modal, Paper, Stack, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import React, { useState } from "react";
import BetWindow from "./BetWindow";
import { TYPE_FOOTBALL } from "../utils/utils";

const SingleEvent = ({ singleEvent }) => {
  const [open, setOpen] = useState(false);

  const onClickHandler = (e) => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
        transition: "transform .2s",
        ":hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Stack direction={"column"} gap={2} alignItems={"center"}>
        {singleEvent.sportType === TYPE_FOOTBALL ? (
          <SportsSoccerIcon />
        ) : (
          <SportsTennisIcon />
        )}
        <Typography>
          Event : {singleEvent.teamOne} v {singleEvent.teamTwo}
        </Typography>
        <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
          {singleEvent.sportType === TYPE_FOOTBALL ? (
            <>
              <Typography>Team One: {singleEvent.teamOneOdd}</Typography>
              <Typography>Team Two: {singleEvent.teamTwoOdd}</Typography>
              <Typography>Tie: {singleEvent.tieOdd}</Typography>
            </>
          ) : (
            <>
              <Typography>Team One: {singleEvent.teamOneOdd}</Typography>
              <Typography>Team Two: {singleEvent.teamTwoOdd}</Typography>
            </>
          )}
        </Stack>
        <Button variant="contained" onClick={onClickHandler}>
          Bet
        </Button>
        <BetWindow
          open={open}
          handleClose={handleClose}
          eventId={singleEvent._id}
        />
      </Stack>
    </Paper>
  );
};

export default SingleEvent;
