"use client";

import { t, Trans } from "@lingui/macro";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import ErrorState from "@/components/ErrorState";
import { GetAuthToken } from "@/graphql/auth";
import { isAdmin, isStudent, isTeacher } from "@/helpers/auth-access";
import MainLayout from "@/layouts/MainLayout";
import type {
  Lesson,
  LessonSubmissionResult,
} from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const LessonDetailPage = () => {
  const router = useRouter();
  const token = GetAuthToken();
  const { auth, authStatus, verifiedToken } = useAuthStore();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] =
    useState<LessonSubmissionResult | null>(null);
  const preview =
    router.query.preview === "1" || router.query.preview === "true";
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";
  const canSubmit = isStudent(auth);
  const canPreview = isAdmin(auth) || isTeacher(auth);
  const canOpenPage = canSubmit || (preview && canPreview);
  const hasVerifiedToken = Boolean(token && verifiedToken === token);

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

  const loadLesson = useCallback(() => {
    if (
      !router.isReady ||
      !slug ||
      authStatus !== AuthStatuses.LOADED ||
      !hasVerifiedToken ||
      !canOpenPage
    ) {
      return;
    }

    setLoadError(false);
    setLoading(true);
    LessonService.lessonGetBySlug(slug)
      .then((data) => {
        setLesson(data);
      })
      .catch(() => {
        setLoadError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authStatus, canOpenPage, hasVerifiedToken, router.isReady, slug]);

  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  const handleSubmit = async () => {
    if (!lesson?.id) return;

    setSubmitting(true);
    try {
      const result = await LessonService.lessonSubmitAnswers(
        lesson.id || "",
        Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        }))
      );

      if (result) {
        setSubmitResult(result);
        setSubmitted(true);
        toast.success(t`Answers submitted successfully`);
      }
    } catch (error: any) {
      toast.error(t`Failed to submit answers`);
    } finally {
      setSubmitting(false);
    }
  };

  if (
    !token ||
    !hasVerifiedToken ||
    authStatus !== AuthStatuses.LOADED ||
    !canOpenPage
  ) {
    return null;
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 152px)",
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eef6ff 46%, #ffffff 100%)",
          py: { xs: 4, md: 7 },
        }}
      >
        <Container maxWidth="lg">
          <Skeleton variant="rounded" height={220} sx={{ borderRadius: 4 }} />
          <Stack spacing={2.5} sx={{ mt: 3 }}>
            <Skeleton variant="rounded" height={220} sx={{ borderRadius: 4 }} />
            <Skeleton variant="rounded" height={220} sx={{ borderRadius: 4 }} />
          </Stack>
        </Container>
      </Box>
    );
  }

  if (loadError) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 152px)",
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eef6ff 46%, #ffffff 100%)",
          py: { xs: 4, md: 7 },
        }}
      >
        <Container maxWidth="lg">
          <ErrorState
            title={<Trans>Lesson could not be loaded</Trans>}
            description={
              <Trans>
                We could not load this lesson right now. Please try again.
              </Trans>
            }
            onRetry={loadLesson}
          />
        </Container>
      </Box>
    );
  }

  if (!lesson) return null;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 152px)",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef6ff 46%, #ffffff 100%)",
        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Button
          component={Link}
          href="/lessons"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ mb: 3, borderRadius: 2, textTransform: "none" }}
        >
          <Trans>Back to lessons</Trans>
        </Button>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
            p: { xs: 3, md: 4 },
            mb: 3,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
            <Chip label={lesson.level} sx={{ borderRadius: 2 }} />
            <Chip
              label={
                lesson.estimatedMinutes
                  ? `${lesson.estimatedMinutes} ${t`min`}`
                  : t`Flexible`
              }
              sx={{ borderRadius: 2 }}
            />
            <Chip label={lesson.skillType} sx={{ borderRadius: 2 }} />
            {preview && <Chip label={t`Preview mode`} color="info" />}
          </Stack>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            {lesson.title}
          </Typography>
          <Typography sx={{ mt: 1.5, color: "#64748b", lineHeight: 1.7 }}>
            {lesson.objectives}
          </Typography>
        </Paper>

        <Stack spacing={2.5}>
          {(lesson.questions || []).map((question, index) => {
            const explanation = submitResult?.answers?.find(
              (item) => item.questionId === question.id
            );

            return (
              <Paper
                elevation={0}
                key={question.id || index}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
                  p: { xs: 2.5, md: 3 },
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" gap={2}>
                    <Typography sx={{ fontWeight: 900 }}>
                      <Trans>Question</Trans> {index + 1}
                    </Typography>
                    <Chip
                      label={`${question.score} ${t`points`}`}
                      size="small"
                    />
                  </Stack>
                  <Typography sx={{ color: "#334155", lineHeight: 1.7 }}>
                    {question.prompt}
                  </Typography>
                  {question.type === "multiple_choice" ? (
                    <FormControl disabled={submitted || !canSubmit}>
                      <RadioGroup
                        value={answers[question.id || ""] || ""}
                        onChange={(event) =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id || ""]: event.target.value,
                          }))
                        }
                      >
                        {question.options?.map((option) => (
                          <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio />}
                            label={option.label || option.value}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <TextField
                      disabled={submitted || !canSubmit}
                      fullWidth
                      multiline={question.type === "speaking"}
                      minRows={question.type === "speaking" ? 4 : 1}
                      label={
                        question.type === "speaking"
                          ? t`Your speaking response`
                          : t`Your answer`
                      }
                      value={answers[question.id || ""] || ""}
                      onChange={(event) =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id || ""]: event.target.value,
                        }))
                      }
                    />
                  )}
                  {submitted && (
                    <Box
                      sx={{
                        borderRadius: 3,
                        border: "1px solid #bfdbfe",
                        backgroundColor: "#eff6ff",
                        p: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: 900, color: "#1d4ed8" }}>
                        <Trans>Correct answer</Trans>:{" "}
                        {explanation?.correctAnswer || t`Review required`}
                      </Typography>
                      <Typography sx={{ mt: 0.75, color: "#334155" }}>
                        {explanation?.explanation ||
                          t`Teacher feedback pending.`}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Paper>
            );
          })}
        </Stack>

        <Paper
          elevation={0}
          sx={{
            mt: 3,
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            p: { xs: 2.5, md: 3 },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            gap={2}
          >
            <Box>
              <Typography sx={{ fontWeight: 900 }}>
                <Trans>Submit your answers</Trans>
              </Typography>
              <Typography sx={{ mt: 0.5, color: "#64748b" }}>
                <Trans>
                  Explanations and correct answers are shown only after
                  submission.
                </Trans>
              </Typography>
            </Box>
            {submitted && submitResult ? (
              <Stack direction="row" spacing={1}>
                <Chip
                  icon={<CheckCircleRoundedIcon />}
                  color={submitResult.passed ? "success" : "warning"}
                  label={`${t`Score`}: ${submitResult.score}%`}
                  sx={{ borderRadius: 2, fontWeight: 900 }}
                />
                <Chip
                  color={submitResult.passed ? "success" : "warning"}
                  label={submitResult.passed ? t`Passed` : t`Needs review`}
                  sx={{ borderRadius: 2, fontWeight: 900 }}
                />
              </Stack>
            ) : (
              <Button
                disabled={!canSubmit || submitting}
                variant="contained"
                onClick={handleSubmit}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 900 }}
              >
                <Trans>Submit answers</Trans>
              </Button>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

LessonDetailPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default LessonDetailPage;
