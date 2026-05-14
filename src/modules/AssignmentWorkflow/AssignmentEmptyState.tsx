import { Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function AssignmentEmptyState({
  actionHref,
  actionLabel,
  onAction,
  description,
  title,
}: {
  actionHref?: string;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  description: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#f8fafc",
        border: "1px solid #dbeafe",
        borderRadius: 3,
        p: { xs: 3, md: 5 },
      }}
    >
      <Stack alignItems="center" spacing={2} textAlign="center">
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "#ffffff",
            border: "1px solid #bfdbfe",
            borderRadius: 3,
            color: "#2563eb",
            display: "flex",
            height: 56,
            justifyContent: "center",
            width: 56,
          }}
        >
          <AssignmentTurnedInRoundedIcon fontSize="large" />
        </Box>
        <Box>
          <Typography sx={{ color: "#0f172a", fontSize: 22, fontWeight: 900 }}>
            {title}
          </Typography>
          <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 1 }}>
            {description}
          </Typography>
        </Box>
        {actionHref ? (
          <Button
            component={Link}
            href={actionHref}
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ borderRadius: 2, fontWeight: 900, textTransform: "none" }}
          >
            {actionLabel || <Trans>Create Assignment</Trans>}
          </Button>
        ) : onAction ? (
          <Button
            onClick={onAction}
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ borderRadius: 2, fontWeight: 900, textTransform: "none" }}
          >
            {actionLabel || <Trans>Create Assignment</Trans>}
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
}
