import { Trans } from "@lingui/macro";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";

type ErrorStateProps = {
  description?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: React.ReactNode;
  title?: React.ReactNode;
};

export default function ErrorState({
  description = (
    <Trans>We could not load this content. Please try again.</Trans>
  ),
  onRetry,
  retryLabel = <Trans>Try again</Trans>,
  title = <Trans>Something went wrong</Trans>,
}: ErrorStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #fecaca",
        borderRadius: "8px",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
        p: { xs: 3, md: 4 },
      }}
    >
      <Stack alignItems="center" spacing={2.25} textAlign="center">
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            color: "#dc2626",
            display: "flex",
            height: 56,
            justifyContent: "center",
            width: 56,
          }}
        >
          <ErrorOutlineRoundedIcon fontSize="large" />
        </Box>
        <Box>
          <Typography
            component="h2"
            sx={{
              color: "#0f172a",
              fontSize: { xs: 22, md: 26 },
              fontWeight: 900,
              letterSpacing: 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 1 }}>
            {description}
          </Typography>
        </Box>
        {onRetry && (
          <Button
            onClick={onRetry}
            startIcon={<RefreshRoundedIcon />}
            variant="contained"
            sx={{ borderRadius: "8px", fontWeight: 900, textTransform: "none" }}
          >
            {retryLabel}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
