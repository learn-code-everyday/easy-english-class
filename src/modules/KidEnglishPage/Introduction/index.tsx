"use client";
import { Trans } from "@lingui/macro";
import { Box, Typography, Button } from "@mui/material";
import React from "react";

export default function KidEnglishIntro() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ffb74d 0%, #ffcc80 100%)",
        borderRadius: 4,
        p: 6,
        textAlign: "center",
        mb: 6,
        boxShadow: "0 10px 25px rgba(255, 183, 77, 0.3)",
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", mb: 2, color: "#6d4c41" }}
      >
        <Trans>Kid English Learning Program</Trans>
      </Typography>
      <Typography
        variant="h6"
        sx={{ maxWidth: 700, mx: "auto", mb: 4, color: "#4e342e" }}
      >
        <Trans>
          A fun and interactive English course designed specifically for kids
          aged 3-12. Our program helps your child develop essential language
          skills with games, songs, stories, and activities.
        </Trans>
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontWeight: "bold", fontSize: "1.1rem", px: 6, py: 1.5 }}
        href="#register"
      >
        <Trans>Join Now</Trans>
      </Button>
    </Box>
  );
}
