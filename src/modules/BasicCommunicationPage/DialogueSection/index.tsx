"use client";

import { Trans } from "@lingui/macro";
import { Paper, Typography } from "@mui/material";
import React from "react";

const dialogueAudioUrl = "/audio/basic-communication-dialogue.mp3";

const DialogueSection = () => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      mb: 8,
      backgroundColor: "white",
      borderRadius: 3,
      maxWidth: 900,
      mx: "auto",
      boxShadow: "0 10px 25px rgba(3,90,142,0.12)",
    }}
  >
    <Typography variant="h5" fontWeight="bold" mb={2} color="#035a8e">
      <Trans>Sample Dialogue</Trans>
    </Typography>
    <Typography sx={{ mb: 1 }}>
      <strong>
        <Trans>Anna:</Trans>
      </strong>{" "}
      <Trans>Hello! How are you today?</Trans>
    </Typography>
    <Typography sx={{ mb: 1 }}>
      <strong>
        <Trans>Ben:</Trans>
      </strong>{" "}
      <Trans>I&apos;m fine, thank you. And you?</Trans>
    </Typography>
    <Typography sx={{ mb: 2 }}>
      <strong>
        <Trans>Anna:</Trans>
      </strong>{" "}
      <Trans>I&apos;m great, thanks for asking!</Trans>
    </Typography>
    <audio controls style={{ width: "100%", outline: "none" }}>
      <source src={dialogueAudioUrl} type="audio/mp3" />
      <Trans>Your browser does not support the audio element.</Trans>
    </audio>
  </Paper>
);

export default DialogueSection;
