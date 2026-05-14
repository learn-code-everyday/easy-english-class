import { Trans } from "@lingui/macro";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

export default function LessonErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: 3,
        p: { xs: 2, md: 2.5 },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: "#0f172a", fontWeight: 900 }}>
            <Trans>Lessons could not be loaded</Trans>
          </Typography>
          <Typography sx={{ color: "#64748b", mt: 0.5 }}>
            <Trans>Please try again later.</Trans>
          </Typography>
        </Box>
        <Button
          onClick={onRetry}
          variant="outlined"
          sx={{
            borderRadius: 2,
            flexShrink: 0,
            fontWeight: 800,
            textTransform: "none",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Trans>Retry</Trans>
        </Button>
      </Stack>
    </Paper>
  );
}
