"use client";
import { t, Trans } from "@lingui/macro";
import { Box, Typography, Grid, Paper } from "@mui/material";
import React from "react";

const funActivities = [
  {
    title: t`Interactive Games`,
    description: t`Play games that reinforce vocabulary and grammar while keeping kids engaged and entertained.`,
  },
  {
    title: t`Story Time`,
    description: t`Enjoy captivating stories with colorful illustrations and simple text, perfect for young learners.`,
  },
  {
    title: t`Songs & Rhymes`,
    description: t`Learn English naturally through fun songs and rhymes that improve pronunciation and rhythm.`,
  },
  {
    title: t`Creative Drawing`,
    description: t`Combine art and language skills by drawing and describing pictures related to lessons.`,
  },
];

export default function KidEnglishFunActivities() {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "#6d4c41" }}
      >
        <Trans>Fun Learning Activities</Trans>
      </Typography>
      <Grid container spacing={4}>
        {funActivities.map(({ title, description }) => (
          <Grid item xs={12} md={6} key={title}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#fff3e0",
                color: "#6d4c41",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2">{description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
