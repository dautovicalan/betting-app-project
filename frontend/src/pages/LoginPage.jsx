import {
  Alert,
  Box,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const password = useRef();

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password.current);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
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
            }}
          >
            <LockIcon />
            <Typography variant="h5">Log In</Typography>
          </Box>
          <Stack direction={"column"} gap={2}>
            <TextField
              label="Email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type={"password"}
              ref={password}
              required
            />
          </Stack>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              mt: 3,
            }}
          >
            Log In
          </Button>
          <Box sx={{ mt: 2 }}>
            <Link to={"/register"}>Don't have an account? Sign Up</Link>
          </Box>
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

export default LoginPage;
