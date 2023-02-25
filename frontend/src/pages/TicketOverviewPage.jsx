import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Ticket from "../components/Ticket";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const TicketOverviewPage = () => {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(`/api/v1/tickets/${id}`);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AccountCircleIcon fontSize={"large"} />
        <Typography variant="h5">Your Current Tickets:</Typography>
        {isPending && <CircularProgress />}
        {data &&
          data.map((x) => {
            return <Ticket key={x._id} userTicket={x} />;
          })}
        {data && data.length === 0 && <Typography>No tickets yet</Typography>}
      </Box>
    </Paper>
  );
};

export default TicketOverviewPage;
