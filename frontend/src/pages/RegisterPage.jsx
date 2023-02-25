import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import { isEmail, isPasswordMatch } from "../utils/utils";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isPasswordMatch(formState.password, formState.repeatPassword)) {
        return setError("Passwords do not match");
      }
      const result = await register(formState.email, formState.password);
      if (result.user) {
        const response = await fetch("/api/v1/users/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userUid: result.user.uid }),
        });
        const newResult = await response.json();
        if (newResult && !newResult.msg) {
          Swal.fire(
            "Account created",
            "You created a account, please login",
            "success"
          );
          return navigate("/login");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        elevation={6}
        sx={{
          width: { sm: "80%", md: "50%" },
          margin: "auto",
        }}
      >
        <Box
          sx={{
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <AccountCircleIcon />
            <Typography variant="h5">Register Account</Typography>
          </Box>
          <Stack direction={"column"} gap={2}>
            <TextField
              label="Email"
              variant="outlined"
              required
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              type={"password"}
              required
              value={formState.password}
              name="password"
              onChange={handleChange}
            />
            <TextField
              label="Repeat Password"
              variant="outlined"
              type={"password"}
              required
              value={formState.repeatPassword}
              name="repeatPassword"
              onChange={handleChange}
            />
          </Stack>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              mt: 3,
            }}
          >
            Register
          </Button>
          {error && (
            <Alert sx={{ mt: 2 }} severity="error">
              {error}
            </Alert>
          )}
        </Box>
      </Paper>
    </form>
  );
};

export default RegisterPage;
