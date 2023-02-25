import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

const EventResolver = () => {
  const [eventState, setEventState] = useState({
    teamOne: "",
    teamTwo: "",
    teamOneOdd: "",
    teamTwoOdd: "",
  });

  const [sportType, setSportType] = useState("FOOTBALL");

  const handleChange = (e) => {
    setEventState({
      ...eventState,
      [e.target.name]: e.target.value,
    });
  };

  const handleResolveClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/events/resolve-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result && !result.msg) {
        Swal.fire("Resolved Success", "You resolved all events", "success");
      }
    } catch (error) {
      Swal.fire("Error by resolving", "Something went wrong", "error");
    }
  };

  const handleSportTypeChange = (e) => setSportType(e.target.value);

  const onSubmitAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/events/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...eventState, sportType }),
      });
      const result = await response.json();
      if (result) {
        Swal.fire("Event Added", "You added new evet", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClickResolve = () => {};

  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
      }}
    >
      <form onSubmit={onSubmitAdd}>
        <Stack direction={"column"} gap={2} alignItems="center">
          <Typography variant="h5" textAlign={"center"}>
            Event Adder and Resolver
          </Typography>
          <TextField
            variant="outlined"
            label="Team / Player First"
            name="teamOne"
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Team / Player Second"
            required
            name="teamTwo"
            onChange={handleChange}
            fullWidth
          />
          <Stack
            direction={"row"}
            gap={2}
            sx={{
              width: "100%",
            }}
          >
            <TextField
              variant="outlined"
              label="Odd Team One"
              required
              name="teamOneOdd"
              onChange={handleChange}
              fullWidth
              InputProps={{ inputProps: { min: 1, step: 0.01 } }}
              type={"number"}
            />
            <TextField
              variant="outlined"
              label="Odd Team Two"
              required
              name="teamTwoOdd"
              onChange={handleChange}
              fullWidth
              InputProps={{ inputProps: { min: 1, step: 0.01 } }}
              type={"number"}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="sport-type">Sport Type</InputLabel>
            <Select
              label="Sport Type"
              labelId="sport-type"
              required
              value={sportType}
              onChange={handleSportTypeChange}
            >
              <MenuItem value={"FOOTBALL"}>Football</MenuItem>
              <MenuItem value={"TENNIS"}>Tennis</MenuItem>
            </Select>
          </FormControl>
          <Stack gap={2} direction={"row"}>
            <Button variant="contained" type="submit">
              Add New Event
            </Button>
            <Button variant="contained" onClick={handleResolveClick}>
              Resolve All Events
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default EventResolver;
