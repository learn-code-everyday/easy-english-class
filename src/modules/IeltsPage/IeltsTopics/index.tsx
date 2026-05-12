"use client";
import { t, Trans } from "@lingui/macro";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography, Grid, Paper } from "@mui/material";
import React from "react";

const topics = [
  {
    title: t`Listening Skills`,
    desc: t`Practice with authentic IELTS listening materials to improve comprehension.`,
  },
  {
    title: t`Reading Techniques`,
    desc: t`Learn skimming, scanning, and time management for the reading test.`,
  },
  {
    title: t`Writing Tasks`,
    desc: t`Master essay writing and report descriptions with clear structures.`,
  },
  {
    title: t`Speaking Practice`,
    desc: t`Develop confidence and fluency with mock speaking tests and feedback.`,
  },
];

export default function IeltsTopics() {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "#004d40" }}
      >
        <Trans>Course Topics</Trans>
      </Typography>
      <Grid container spacing={4}>
        {topics.map(({ title, desc }) => (
          <Grid item xs={12} md={6} key={title}>
            <Paper
              elevation={3}
              sx={{ p: 3, display: "flex", gap: 2, alignItems: "center" }}
              className="animate-fade-in-up"
            >
              <CheckCircleIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold" color="#00796b">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {desc}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
