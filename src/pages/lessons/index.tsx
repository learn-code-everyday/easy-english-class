"use client";

import { t, Trans } from "@lingui/macro";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { GetAuthToken } from "@/graphql/auth";
import {
  canAccessStudentLessons,
  canPreviewStudentLessons,
} from "@/helpers/auth-access";
import MainLayout from "@/layouts/MainLayout";
import type { Lesson } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const LessonsPage = () => {
  const router = useRouter();
  const token = GetAuthToken();
  const { auth, authStatus, verifiedToken } = useAuthStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const canStart = canAccessStudentLessons(auth);
  const canPreview = canPreviewStudentLessons(auth);
  const hasVerifiedToken = Boolean(token && verifiedToken === token);
  const canOpenPage = canStart || canPreview;
  const showStudentEmptyState = !loading && canStart && lessons.length === 0;

  useEffect(() => {
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

  useEffect(() => {
    if (
      authStatus !== AuthStatuses.LOADED ||
      !hasVerifiedToken ||
      !canOpenPage
    ) {
      return;
    }

    let mounted = true;

    LessonService.lessonList()
      .then((data) => {
        if (mounted) setLessons(data);
      })
      .catch((error) => {
        toast.error(error?.message || t`Failed to load lessons`);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [authStatus, canOpenPage, hasVerifiedToken]);

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
          "linear-gradient(180deg, #f8fafc 0%, #eef6ff 46%, #ffffff 100%)",
        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Chip
              label={t`Lesson library`}
              sx={{
                mb: 2,
                borderRadius: "8px",
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                fontWeight: 900,
              }}
            />
            <Typography
              component="h1"
              sx={{
                color: "#0f172a",
                fontSize: { xs: 34, md: 52 },
                fontWeight: 900,
                letterSpacing: 0,
                lineHeight: 1.05,
              }}
            >
              <Trans>Choose your next English lesson.</Trans>
            </Typography>
            <Typography
              sx={{
                mt: 2,
                maxWidth: 720,
                color: "#475569",
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.75,
              }}
            >
              <Trans>
                Browse student-safe lesson cards with level, time, skill focus,
                and completion status. Answer keys stay out of the frontend.
              </Trans>
            </Typography>
          </Box>
          {canPreview && (
            <Chip
              icon={<PreviewRoundedIcon />}
              label={t`Preview mode available`}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                fontWeight: 900,
              }}
            />
          )}
        </Stack>

        {showStudentEmptyState ? (
          <Paper
            elevation={0}
            sx={{
              borderRadius: "8px",
              border: "1px solid #dbeafe",
              backgroundColor: "#ffffff",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
              px: { xs: 3, md: 5 },
              py: { xs: 5, md: 7 },
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
                <SchoolRoundedIcon fontSize="large" />
              </Box>
              <Box>
                <Typography
                  component="h2"
                  sx={{
                    color: "#0f172a",
                    fontSize: { xs: 24, md: 30 },
                    fontWeight: 900,
                    letterSpacing: 0,
                    lineHeight: 1.2,
                  }}
                >
                  <Trans>You do not have any lessons assigned yet.</Trans>
                </Typography>
                <Typography
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.7,
                    mt: 1.25,
                  }}
                >
                  <Trans>
                    Your teacher will assign lessons here when they are ready.
                  </Trans>
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/manage/dashboard"
                startIcon={<DashboardRoundedIcon />}
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  fontWeight: 900,
                  px: 2.5,
                  py: 1.2,
                  textTransform: "none",
                }}
              >
                <Trans>Back to Dashboard</Trans>
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Grid container spacing={2.5}>
            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={12} md={6} xl={3} key={index}>
                  <Skeleton
                    variant="rounded"
                    height={300}
                    sx={{ borderRadius: "8px" }}
                  />
                </Grid>
              ))}
            {lessons.map((lesson) => (
              <Grid item xs={12} md={6} xl={3} key={lesson.id || lesson.slug}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 14px 38px rgba(15, 23, 42, 0.06)",
                    p: { xs: 2.5, md: 3 },
                    transition:
                      "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                    "&:hover": {
                      borderColor: "#bfdbfe",
                      boxShadow: "0 20px 48px rgba(37, 99, 235, 0.12)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Stack spacing={2.25} sx={{ height: "100%" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Chip
                        label={lesson.level}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: "#eff6ff",
                          color: "#2563eb",
                          fontWeight: 900,
                        }}
                      />
                      <Typography sx={{ color: "#64748b", fontWeight: 800 }}>
                        {lesson.estimatedMinutes
                          ? `${lesson.estimatedMinutes} ${t`min`}`
                          : t`Flexible`}
                      </Typography>
                    </Stack>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          color: "#0f172a",
                          fontSize: 20,
                          fontWeight: 900,
                          lineHeight: 1.25,
                        }}
                      >
                        {lesson.title}
                      </Typography>
                      <Typography sx={{ mt: 1, color: "#64748b" }}>
                        {lesson.skillType}
                      </Typography>
                    </Box>

                    <Box>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                          <Trans>Completion</Trans>
                        </Typography>
                        <Typography
                          sx={{
                            color: "#0f172a",
                            fontSize: 13,
                            fontWeight: 800,
                          }}
                        >
                          {lesson.completionStatus || t`Not started`}
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={lesson.progress || 0}
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          backgroundColor: "#e2e8f0",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                            backgroundColor: "#2563eb",
                          },
                        }}
                      />
                    </Box>

                    <Button
                      component={Link}
                      href={
                        canStart
                          ? `/lessons/${lesson.slug}`
                          : canPreview
                            ? `/lessons/${lesson.slug}?preview=1`
                            : "/login"
                      }
                      variant={
                        canStart || canPreview ? "contained" : "outlined"
                      }
                      startIcon={
                        canStart ? (
                          <ArrowForwardRoundedIcon />
                        ) : (
                          <LockOpenRoundedIcon />
                        )
                      }
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 900,
                        py: 1.2,
                      }}
                    >
                      {canStart ? (
                        <Trans>Start lesson</Trans>
                      ) : canPreview ? (
                        <Trans>Preview lesson</Trans>
                      ) : (
                        <Trans>Login to start</Trans>
                      )}
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

LessonsPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default LessonsPage;
