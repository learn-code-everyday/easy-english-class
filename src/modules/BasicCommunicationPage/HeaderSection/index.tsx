"use client";

import { Trans } from "@lingui/macro";
import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";

const HeaderSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 4, md: 6 },
        p: { xs: 3, sm: 4, md: 5 },
        border: "1px solid rgba(148, 163, 184, 0.28)",
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 64, 175, 0.9))",
        boxShadow: "0 28px 70px rgba(15, 23, 42, 0.18)",
        color: "#ffffff",
        "&::before": {
          content: "''",
          position: "absolute",
          inset: "auto -10% -45% 45%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "rgba(20, 184, 166, 0.2)",
          filter: "blur(4px)",
        },
      }}
    >
      <Box sx={{ position: "relative", maxWidth: 860 }}>
        <Stack direction="row" flexWrap="wrap" gap={1.25} sx={{ mb: 3 }}>
          <Chip
            label={<Trans>Lesson 01</Trans>}
            sx={{
              backgroundColor: "rgba(255,255,255,0.14)",
              color: "#ffffff",
              fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          />
          <Chip
            label={<Trans>Guided speaking practice</Trans>}
            sx={{
              backgroundColor: "rgba(20,184,166,0.18)",
              color: "#ccfbf1",
              fontWeight: 700,
              border: "1px solid rgba(153,246,228,0.24)",
            }}
          />
        </Stack>
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            maxWidth: 760,
            color: "#ffffff",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            fontSize: { xs: 34, md: 52 },
            lineHeight: 1.06,
          }}
        >
          <Trans>Basic Communication in English</Trans>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 680,
            color: "#dbeafe",
            fontSize: { xs: 16, md: 18 },
            lineHeight: 1.8,
          }}
        >
          <Trans>
            Master essential phrases, greetings, and polite expressions to
            kickstart your English conversation skills.
          </Trans>
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 4 }}>
          {[
            <Trans key="listen">Listen</Trans>,
            <Trans key="quiz">Quiz</Trans>,
            <Trans key="speak">Speak</Trans>,
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                borderRadius: 999,
                px: 1.75,
                py: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
              {item}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default HeaderSection;
