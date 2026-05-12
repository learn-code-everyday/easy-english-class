"use client";
import { Trans } from "@lingui/macro";
import { Box, Typography, Paper } from "@mui/material";
import React from "react";

export default function IeltsAudio() {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "#004d40" }}
      >
        <Trans>Listening Practice</Trans>
      </Typography>
      <Paper
        sx={{ p: 3, maxWidth: 600, mx: "auto", textAlign: "center" }}
        elevation={3}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          <Trans>
            Listen to the audio below and try to answer related questions.
          </Trans>
        </Typography>
        <audio controls>
          <source src="/audios/sample-listening.mp3" type="audio/mpeg" />
          <Trans>Your browser does not support the audio element.</Trans>
        </audio>
      </Paper>
    </Box>
  );
}
