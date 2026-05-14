import { Trans } from "@lingui/macro";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  DashboardContentCard,
  DashboardEmptyState,
  DashboardErrorState,
  DashboardPage,
  DashboardPageHeader,
  DashboardStatCard,
} from "@/components/Dashboard";
import { isStudent } from "@/helpers/auth-access";
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
  const canViewProgress = isStudent(auth);

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
    <DashboardPage>
      <DashboardPageHeader
        eyebrow={<Trans>Learning</Trans>}
        title={<Trans>My Progress</Trans>}
        description={<Trans>Track your completion and best scores.</Trans>}
      />
      {loadError ? (
        <DashboardContentCard>
          <DashboardErrorState
            title={<Trans>Progress could not be loaded</Trans>}
            description={
              <Trans>
                We could not load your progress right now. Please try again.
              </Trans>
            }
            onRetry={loadProgress}
          />
        </DashboardContentCard>
      ) : progressRows.length === 0 ? (
        <DashboardContentCard>
          <DashboardEmptyState
            title={<Trans>No progress yet</Trans>}
            description={
              <Trans>Your lesson progress will appear after submissions.</Trans>
            }
          />
        </DashboardContentCard>
      ) : (
        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid item xs={12} md={4} key={String(item.value)}>
              <DashboardStatCard label={item.label} value={item.value} />
            </Grid>
          ))}
        </Grid>
      )}
    </DashboardPage>
  );
}

StudentProgressPage.Layout = AdminLayout;
