import { Trans } from "@lingui/macro";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import { DashboardPage } from "@/components/Dashboard";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import MainLayout from "@/layouts/MainLayout";

export default function Custom403() {
  const { asPath, query } = useRouter();
  const isAdminPage = query.admin === "1" || asPath.startsWith("/manage");

  if (isAdminPage) {
    return (
      <AdminLayout>
        <Error403Content isAdminPage={isAdminPage} />
      </AdminLayout>
    );
  }

  return (
    <MainLayout>
      <Error403Content isAdminPage={isAdminPage} />
    </MainLayout>
  );
}

function Error403Content({ isAdminPage }: { isAdminPage: boolean }) {
  return (
    <DashboardPage
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: isAdminPage ? "calc(100vh - 220px)" : "60vh",
        py: { xs: 5, md: 7 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: 4,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
          maxWidth: 520,
          p: { xs: 3, md: 4 },
          textAlign: "center",
          width: "100%",
        }}
      >
        <Stack alignItems="center" spacing={2.5}>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "#eef2ff",
              border: "1px solid #c7d2fe",
              borderRadius: 3,
              color: "#4f46e5",
              display: "flex",
              height: 64,
              justifyContent: "center",
              width: 64,
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Box>
          <Box>
            <Typography
              component="h1"
              sx={{ color: "#0f172a", fontSize: 28, fontWeight: 900 }}
            >
              <Trans>Access denied</Trans>
            </Typography>
            <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 1 }}>
              <Trans>You do not have permission to access this page.</Trans>
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.25}
            sx={{ justifyContent: "center", pt: 1, width: "100%" }}
          >
            <Button
              component={Link}
              href="/manage/dashboard"
              variant="contained"
              sx={{
                borderRadius: 2,
                fontWeight: 900,
                textTransform: "none",
              }}
            >
              <Trans>Go to Dashboard</Trans>
            </Button>
            <Button
              component={Link}
              href="/"
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontWeight: 900,
                textTransform: "none",
              }}
            >
              <Trans>Back Home</Trans>
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </DashboardPage>
  );
}
