import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import SingleEvent from "../components/SingleEvent";
import useFetch from "../hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import Slide from "@mui/material/Slide";

export const DashboardPage = () => {
  const { data, isPending, error } = useFetch("/api/v1/events/");
  return (
    <Paper elevation={6}>
      <Stack direction={"column"} gap={2}>
        <Typography variant="h5" textAlign={"center"}>
          List of All Events
        </Typography>
        {isPending ? (
          <CircularProgress />
        ) : (
          <Slide direction="up" mountOnEnter unmountOnExit in={true}>
            <Box>
              <Stack
                direction={"row"}
                gap={2}
                flexWrap={"wrap"}
                justifyContent="center"
              >
                {data && data.length !== 0 ? (
                  data.map((singleEvent) => {
                    return (
                      <SingleEvent
                        key={singleEvent._id}
                        singleEvent={singleEvent}
                      />
                    );
                  })
                ) : (
                  <Typography variant="h5" textAlign={"center"}>
                    No events for today
                  </Typography>
                )}
              </Stack>
            </Box>
          </Slide>
        )}
      </Stack>
    </Paper>
  );
};
