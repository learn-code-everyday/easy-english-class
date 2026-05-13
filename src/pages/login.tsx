import { Trans } from "@lingui/macro";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LoginModal from "@/components/LoginModal";
import { GetAuthToken } from "@/graphql/auth";
import MainLayout from "@/layouts/MainLayout";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { auth, verifiedToken } = useAuthStore();
  const token = GetAuthToken();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (auth && token && verifiedToken === token) {
      router.replace("/manage/dashboard");
    }
  }, [auth, router, token, verifiedToken]);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 152px)",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, rgba(37, 99, 235, 0.14), transparent 34%), linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
            p: { xs: 3, md: 5 },
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>
            <Trans>Login to your Account</Trans>
          </Typography>
          <Typography sx={{ mt: 1.5, mb: 3, color: "#64748b" }}>
            <Trans>Your session has expired. Please sign in again.</Trans>
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 999, px: 4, textTransform: "none" }}
          >
            <Trans>Login</Trans>
          </Button>
        </Box>
      </Container>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

LoginPage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
