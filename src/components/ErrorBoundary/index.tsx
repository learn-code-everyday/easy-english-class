import { Trans } from "@lingui/macro";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Unexpected render error", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#f8fafc",
          display: "flex",
          minHeight: "100vh",
          py: 6,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
              p: { xs: 3, md: 5 },
            }}
          >
            <Stack alignItems="center" spacing={2.5} textAlign="center">
              <Box
                sx={{
                  alignItems: "center",
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  color: "#2563eb",
                  display: "flex",
                  height: 64,
                  justifyContent: "center",
                  width: 64,
                }}
              >
                <RestartAltRoundedIcon fontSize="large" />
              </Box>
              <Box>
                <Typography
                  component="h1"
                  sx={{
                    color: "#0f172a",
                    fontSize: { xs: 26, md: 32 },
                    fontWeight: 900,
                    letterSpacing: 0,
                    lineHeight: 1.15,
                  }}
                >
                  <Trans>Something went wrong</Trans>
                </Typography>
                <Typography
                  sx={{ color: "#64748b", lineHeight: 1.7, mt: 1.25 }}
                >
                  <Trans>
                    The page could not be rendered. You can try again without
                    losing the whole app.
                  </Trans>
                </Typography>
              </Box>
              <Button
                onClick={this.handleReset}
                startIcon={<RestartAltRoundedIcon />}
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  fontWeight: 900,
                  textTransform: "none",
                }}
              >
                <Trans>Try again</Trans>
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }
}
