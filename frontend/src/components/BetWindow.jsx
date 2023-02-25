import {
  Box,
  Modal,
  Stack,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import { TYPE_FOOTBALL } from "../utils/utils";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

const BetWindow = ({ open, handleClose, eventId }) => {
  const { data, isPending, error } = useFetch(`/api/v1/events/${eventId}`);
  const { loggedUser } = useAuth();

  const [amount, setAmount] = useState(0);
  const [winAmount, setWinAmount] = useState(0);
  const [bet, setBet] = useState(1);
  const [errorText, setErrorText] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorText(null);
    if (amount === 0) {
      return setErrorText("Please set amount");
    }

    try {
      const response = await fetch("/api/v1/tickets/create-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userUid: loggedUser.userUid,
          sportEvent: eventId,
          amount,
          userBet: bet,
          winAmount,
        }),
      });
      const data = await response.json();
      if (data && !data.msg) {
        handleClose();
        return Swal.fire(
          "Ticket created",
          "You successfully created a ticket",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {isPending ? (
        <CircularProgress />
      ) : (
        <Box sx={style}>
          <Typography
            textAlign={"center"}
            variant="h5"
            sx={{
              mb: 2,
            }}
          >
            Bet for event: {data && data.teamOne} v {data && data.teamTwo}
          </Typography>
          <TextField
            variant="outlined"
            label="Amount"
            type={"number"}
            value={amount}
            fullWidth
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => {
              setAmount(Number(e.target.value));
              switch (bet) {
                case 1:
                  data &&
                    setWinAmount(data.teamOneOdd * Number(e.target.value));
                  break;
                case 2:
                  data &&
                    setWinAmount(data.teamTwoOdd * Number(e.target.value));
                  break;
                default:
                  data && setWinAmount(data?.tieOdd * Number(e.target.value));
                  break;
              }
            }}
            required
          />
          {data && data.sportType === TYPE_FOOTBALL ? (
            <Stack direction={"column"} gap={2} alignItems={"center"}>
              <FormControl fullWidth required>
                <InputLabel id="select-id">Choose Bet</InputLabel>
                <Select
                  labelId="select-id"
                  label="Choose Bet"
                  value={bet}
                  onChange={(e) => setBet(e.target.value)}
                  required
                >
                  <MenuItem value={0}>X - Tie</MenuItem>
                  <MenuItem value={1}>1 - {data.teamOne}</MenuItem>
                  <MenuItem value={2}>2 - {data.teamTwo}</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          ) : (
            data && (
              <Stack direction={"column"} gap={2} alignItems={"center"}>
                <FormControl fullWidth>
                  <InputLabel id="select-id">Choose Bet</InputLabel>
                  <Select
                    labelId="select-id"
                    label="Choose Bet"
                    value={bet}
                    onChange={(e) => setBet(e.target.value)}
                  >
                    <MenuItem value={1}>1 - {data.teamOne}</MenuItem>
                    <MenuItem value={2}>2 - {data.teamTwo}</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            )
          )}
          <Typography>Your winnings: {winAmount}</Typography>
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={isPending}
          >
            Bet Your Offer
          </Button>
          {errorText && <Alert severity="error">{errorText}</Alert>}
        </Box>
      )}
    </Modal>
  );
};

export default BetWindow;
