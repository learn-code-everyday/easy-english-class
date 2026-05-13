"use client";

import { Trans } from "@lingui/macro";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const dialogueAudioUrl = "/audio/basic-communication-dialogue.mp3";

const DialogueSection = () => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2.5, sm: 3.5, md: 4 },
      backgroundColor: "rgba(255,255,255,0.94)",
      borderRadius: 4,
      border: "1px solid rgba(148, 163, 184, 0.28)",
      boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
    }}
  >
    <Typography
      variant="overline"
      sx={{ color: "#2563eb", fontWeight: 900, letterSpacing: 1.4 }}
    >
      <Trans>Step 1</Trans>
    </Typography>
    <Typography
      variant="h5"
      sx={{ mt: 0.5, mb: 1, color: "#0f172a", fontWeight: 900 }}
    >
      <Trans>Sample Dialogue</Trans>
    </Typography>
    <Typography sx={{ mb: 3, color: "#64748b", lineHeight: 1.7 }}>
      <Trans>Listen first, then repeat each line with a natural rhythm.</Trans>
    </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {[
        {
          speaker: <Trans key="anna-1">Anna:</Trans>,
          line: <Trans key="line-1">Hello! How are you today?</Trans>,
          align: "flex-start",
        },
        {
          speaker: <Trans key="ben">Ben:</Trans>,
          line: <Trans key="line-2">I&apos;m fine, thank you. And you?</Trans>,
          align: "flex-end",
        },
        {
          speaker: <Trans key="anna-2">Anna:</Trans>,
          line: <Trans key="line-3">I&apos;m great, thanks for asking!</Trans>,
          align: "flex-start",
        },
      ].map((item, index) => (
        <Box
          key={index}
          sx={{
            alignSelf: item.align,
            maxWidth: { xs: "100%", sm: "82%" },
            borderRadius: 4,
            p: 2,
            backgroundColor: item.align === "flex-end" ? "#eff6ff" : "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography sx={{ mb: 0.5, color: "#2563eb", fontWeight: 800 }}>
            {item.speaker}
          </Typography>
          <Typography sx={{ color: "#0f172a", fontSize: 16 }}>
            {item.line}
          </Typography>
        </Box>
      ))}
    </Box>

    <Box
      sx={{
        mt: 3,
        p: 2,
        borderRadius: 3,
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
      }}
    >
      <audio controls style={{ width: "100%", outline: "none" }}>
        <source src={dialogueAudioUrl} type="audio/mp3" />
        <Trans>Your browser does not support the audio element.</Trans>
      </audio>
    </Box>
  </Paper>
);

export default DialogueSection;
