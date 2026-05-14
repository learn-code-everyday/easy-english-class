"use client";

import { Trans } from "@lingui/macro";
import {
  Box,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { GetAuthToken } from "@/graphql/auth";
import { isAdmin, isStudent, isTeacher } from "@/helpers/auth-access";
import MainLayout from "@/layouts/MainLayout";
import DialogueSection from "@/modules/BasicCommunicationPage/DialogueSection";
import ErrorSnackbar from "@/modules/BasicCommunicationPage/ErrorSnackbar";
import HeaderSection from "@/modules/BasicCommunicationPage/HeaderSection";
import QuizSection from "@/modules/BasicCommunicationPage/QuizSection";
import VoiceRecorderSection from "@/modules/BasicCommunicationPage/VoiceRecorderSection";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const BasicLessonPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const token = GetAuthToken();
  const { auth, authStatus, verifiedToken } = useAuthStore();
  const preview =
    router.query.preview === "1" || router.query.preview === "true";
  const canOpenPage =
    isStudent(auth) || (preview && (isAdmin(auth) || isTeacher(auth)));
  const hasVerifiedToken = Boolean(token && verifiedToken === token);
  const quickStats = [
    {
      id: "level",
      label: <Trans>Lesson level</Trans>,
      value: <Trans>Beginner</Trans>,
    },
    {
      id: "time",
      label: <Trans>Practice time</Trans>,
      value: <Trans>18 min</Trans>,
    },
    {
      id: "skills",
      label: <Trans>Activities</Trans>,
      value: <Trans>3 skills</Trans>,
    },
  ];
  const learningObjectives = [
    {
      id: "greetings",
      label: <Trans>Use natural greetings in everyday conversations</Trans>,
    },
    {
      id: "response",
      label: <Trans>Respond politely with simple complete sentences</Trans>,
    },
    {
      id: "speaking",
      label: <Trans>Record and review your pronunciation practice</Trans>,
    },
  ];

  React.useEffect(() => {
    if (!router.isReady) return;
    if (!token) {
      router.replace("/login");
      return;
    }
    if (
      authStatus === AuthStatuses.LOADED &&
      hasVerifiedToken &&
      !canOpenPage
    ) {
      router.replace("/403");
    }
  }, [
    authStatus,
    canOpenPage,
    hasVerifiedToken,
    router,
    router.isReady,
    token,
  ]);

  if (
    !token ||
    !hasVerifiedToken ||
    authStatus !== AuthStatuses.LOADED ||
    !canOpenPage
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 152px)",
        background:
          "radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 34%), linear-gradient(180deg, #f8fafc 0%, #eef4ff 46%, #f8fafc 100%)",
        py: { xs: 3, md: 6 },
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <HeaderSection />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
            gap: { xs: 3, lg: 4 },
            alignItems: "start",
            mt: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: "1", lg: "span 8" },
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, md: 4 },
            }}
          >
            <DialogueSection />
            <QuizSection setErrorMsg={setErrorMsg} />
            <VoiceRecorderSection setErrorMsg={setErrorMsg} />
          </Box>

          <Box
            component="aside"
            sx={{
              gridColumn: { xs: "1", lg: "span 4" },
              position: { lg: "sticky" },
              top: { lg: 96 },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: 4,
                border: "1px solid rgba(148, 163, 184, 0.26)",
                backgroundColor: "rgba(255,255,255,0.92)",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
                backdropFilter: "blur(18px)",
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "#2563eb", fontWeight: 800, letterSpacing: 1.4 }}
              >
                <Trans>Lesson progress</Trans>
              </Typography>
              <Typography
                variant="h6"
                sx={{ mt: 0.5, mb: 2, color: "#0f172a", fontWeight: 800 }}
              >
                <Trans>Today&apos;s practice path</Trans>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={36}
                sx={{
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: "#e2e8f0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    background: "linear-gradient(90deg, #2563eb, #14b8a6)",
                  },
                }}
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1.5,
                  mt: 3,
                }}
              >
                {quickStats.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      p: 1.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ display: "block", color: "#64748b" }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, color: "#0f172a", fontWeight: 800 }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: 4,
                border: "1px solid rgba(148, 163, 184, 0.26)",
                backgroundColor: "#ffffff",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "#0f766e", fontWeight: 800, letterSpacing: 1.4 }}
              >
                <Trans>Learning objectives</Trans>
              </Typography>
              <Box component="ul" sx={{ m: 0, mt: 2, p: 0, listStyle: "none" }}>
                {learningObjectives.map((objective) => (
                  <Box
                    component="li"
                    key={objective.id}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      py: 1.25,
                      color: "#334155",
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        mt: "7px",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#14b8a6",
                        flexShrink: 0,
                      }}
                    />
                    <span>{objective.label}</span>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Box>

        <ErrorSnackbar
          open={Boolean(errorMsg)}
          message={errorMsg}
          onClose={() => setErrorMsg("")}
        />
      </Container>
    </Box>
  );
};

BasicLessonPage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};

export default BasicLessonPage;
