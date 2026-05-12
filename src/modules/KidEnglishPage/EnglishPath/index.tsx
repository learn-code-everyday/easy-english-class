"use client";
import { t, Trans } from "@lingui/macro";
import { Box, Typography, Grid, Paper } from "@mui/material";
import React from "react";

const learningPaths = [
  {
    ageRange: t`3 - 5 years`,
    focus: t`Basic vocabulary, phonics, colors, numbers, simple sentences`,
    activities: t`Songs, picture books, interactive games`,
  },
  {
    ageRange: t`6 - 8 years`,
    focus: t`Basic grammar, conversation skills, simple writing`,
    activities: t`Storytelling, role-play, group activities`,
  },
  {
    ageRange: t`9 - 12 years`,
    focus: t`Reading comprehension, writing skills, oral presentation`,
    activities: t`Creative writing, debates, presentations`,
  },
];

export default function KidEnglishPath() {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "#6d4c41" }}
      >
        <Trans>Learning Path & Stages</Trans>
      </Typography>
      <Grid container spacing={4}>
        {learningPaths.map(({ ageRange, focus, activities }) => (
          <Grid item xs={12} md={4} key={ageRange}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#fff3e0",
                color: "#4e342e",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                <Trans>Age</Trans> {ageRange}
              </Typography>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  <Trans>Focus:</Trans>
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {focus}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  <Trans>Activities:</Trans>
                </Typography>
                <Typography variant="body2">{activities}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
