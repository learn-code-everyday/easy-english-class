import { Trans } from "@lingui/macro";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import ErrorState from "@/components/ErrorState";
import { isStudentUser } from "@/helpers/auth-access";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import type { StudentProgress } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function StudentProgressPage() {
  const router = useRouter();
  const { auth, authStatus } = useAuthStore();
  const [loadError, setLoadError] = useState(false);
  const [progressRows, setProgressRows] = useState<StudentProgress[]>([]);
  const canViewProgress = isStudentUser(auth);

  useEffect(() => {
    if (authStatus === AuthStatuses.LOADED && !canViewProgress) {
      router.replace("/403?admin=1");
    }
  }, [authStatus, canViewProgress, router]);

  const loadProgress = useCallback(() => {
    if (authStatus !== AuthStatuses.LOADED || !canViewProgress) return;

    setLoadError(false);
    LessonService.myProgress()
      .then(setProgressRows)
      .catch(() => {
        setLoadError(true);
      });
  }, [authStatus, canViewProgress]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const stats = useMemo(() => {
    const completed = progressRows.filter((row) => row.passed).length;
    const averageProgress = Math.round(
      progressRows.reduce((total, row) => total + (row.bestScore || 0), 0) /
        Math.max(progressRows.length, 1)
    );

    return [
      { label: <Trans>Completed lessons</Trans>, value: String(completed) },
      {
        label: <Trans>Total lessons</Trans>,
        value: String(progressRows.length),
      },
      { label: <Trans>Average progress</Trans>, value: `${averageProgress}%` },
    ];
  }, [progressRows]);

  if (authStatus !== AuthStatuses.LOADED || !canViewProgress) return null;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
        <Trans>My Progress</Trans>
      </Typography>
      {loadError ? (
        <ErrorState
          title={<Trans>Progress could not be loaded</Trans>}
          description={
            <Trans>
              We could not load your progress right now. Please try again.
            </Trans>
          }
          onRetry={loadProgress}
        />
      ) : (
        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid item xs={12} md={4} key={String(item.value)}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
                }}
              >
                <Typography sx={{ color: "#64748b", fontWeight: 700 }}>
                  {item.label}
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

StudentProgressPage.Layout = AdminLayout;
