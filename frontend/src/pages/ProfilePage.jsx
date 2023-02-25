import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Slide from "@mui/material/Slide";

const ProfilePage = () => {
  const [credit, setCredit] = useState("");
  const { id } = useParams();

  const { data, isPending, error } = useFetch(`/api/v1/users/${id}`);

  const handleClick = async (e) => {
    if (credit.length === 0) {
      return;
    }

    try {
      const response = await fetch("/api/v1/users/add-credits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userUid: id,
          newBalance: Number(credit),
        }),
      });
      const dataResponse = await response.json();
      if (dataResponse && !dataResponse.msg) {
        Swal.fire("Balance Added", "You added new Balance", "success").then(
          (isConfirmed) => {
            window.location.reload();
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
      }}
    >
      <Slide direction="up" mountOnEnter unmountOnExit in={true}>
        <Stack gap={2} direction={"column"} alignItems="center">
          <PersonIcon fontSize={"large"} />
          <Typography variant="h5">
            Your Current Credit: {data && data.balance}
          </Typography>
          <Stack gap={4} direction={"row"}>
            {isPending && <CircularProgress />}
            {data && data.balance ? (
              <>
                <TextField
                  variant="outlined"
                  label="Add Credits"
                  type={"number"}
                  value={credit}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => setCredit(e.target.value)}
                />
                <Button variant="contained" onClick={handleClick}>
                  Add Credit
                </Button>
              </>
            ) : (
              <Typography>Please login to fill your balance</Typography>
            )}
          </Stack>
        </Stack>
      </Slide>
    </Paper>
  );
};

export default ProfilePage;
