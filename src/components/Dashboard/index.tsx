import { Trans } from "@lingui/macro";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  Box,
  Button,
  Paper,
  Stack,
  TableContainer,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import React from "react";

export const dashboardMaxWidth = 1280;

const sxArray = (sx?: SxProps<Theme>) =>
  Array.isArray(sx) ? sx : sx ? [sx] : [];

export function DashboardPage({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      sx={[
        {
          maxWidth: dashboardMaxWidth,
          minWidth: 0,
          mx: "auto",
          width: "100%",
        },
        ...sxArray(sx),
      ]}
    >
      {children}
    </Box>
  );
}

export function DashboardPageHeader({
  action,
  description,
  eyebrow,
  title,
}: {
  action?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        alignItems: { xs: "stretch", md: "flex-end" },
        justifyContent: "space-between",
        mb: 3,
        minWidth: 0,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        {eyebrow && (
          <Typography
            sx={{
              color: "#2563eb",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 0,
              mb: 0.75,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography
          component="h1"
          sx={{
            color: "#0f172a",
            fontSize: { xs: 28, md: 34 },
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 1.15,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            sx={{
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: 720,
              mt: 0.75,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Stack>
  );
}

export function DashboardHeroCard({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Paper
      elevation={0}
      sx={[
        {
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          p: { xs: 2.5, md: 4 },
        },
        ...sxArray(sx),
      ]}
    >
      {children}
    </Paper>
  );
}

export function DashboardContentCard({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Paper
      elevation={0}
      sx={[
        {
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
          minWidth: 0,
          overflow: "hidden",
          p: { xs: 2, md: 3 },
        },
        ...sxArray(sx),
      ]}
    >
      {children}
    </Paper>
  );
}

export function DashboardToolbar({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={1.5}
      sx={{
        alignItems: { xs: "stretch", md: "center" },
        mb: 2.5,
        minWidth: 0,
        width: "100%",
      }}
    >
      {children}
    </Stack>
  );
}

export function DashboardTable({ children }: { children: React.ReactNode }) {
  return (
    <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
      {children}
    </TableContainer>
  );
}

export function DashboardEmptyState({
  action,
  description,
  title,
}: {
  action?: React.ReactNode;
  description?: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <Stack
      alignItems="center"
      spacing={1.5}
      sx={{
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        p: { xs: 3, md: 4 },
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#ffffff",
          border: "1px solid #dbeafe",
          borderRadius: "8px",
          color: "#2563eb",
          display: "flex",
          height: 48,
          justifyContent: "center",
          width: 48,
        }}
      >
        <InboxRoundedIcon />
      </Box>
      <Box>
        <Typography sx={{ color: "#0f172a", fontWeight: 900 }}>
          {title}
        </Typography>
        {description && (
          <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>
      {action}
    </Stack>
  );
}

export function DashboardErrorState({
  description = <Trans>Please try again later.</Trans>,
  onRetry,
  title,
}: {
  description?: React.ReactNode;
  onRetry?: () => void;
  title: React.ReactNode;
}) {
  return (
    <Stack
      alignItems="center"
      spacing={1.5}
      sx={{
        border: "1px solid #fecaca",
        borderRadius: "8px",
        p: { xs: 2.5, md: 3 },
        textAlign: "center",
      }}
    >
      <Box sx={{ color: "#dc2626", display: "flex" }}>
        <ErrorOutlineRoundedIcon />
      </Box>
      <Box>
        <Typography sx={{ color: "#0f172a", fontWeight: 900 }}>
          {title}
        </Typography>
        <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 0.5 }}>
          {description}
        </Typography>
      </Box>
      {onRetry && (
        <Button
          onClick={onRetry}
          startIcon={<RefreshRoundedIcon />}
          variant="outlined"
          sx={{ borderRadius: "8px", fontWeight: 900, textTransform: "none" }}
        >
          <Trans>Retry</Trans>
        </Button>
      )}
    </Stack>
  );
}

export function DashboardStatCard({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <DashboardContentCard sx={{ height: "100%" }}>
      <Typography sx={{ color: "#64748b", fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
        {value}
      </Typography>
    </DashboardContentCard>
  );
}
