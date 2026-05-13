import { t, Trans } from "@lingui/macro";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { isStudentUser } from "@/helpers/auth-access";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import type { Lesson } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function StudentProgressPage() {
  const router = useRouter();
  const { auth, authStatus } = useAuthStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const canViewProgress = isStudentUser(auth);

  useEffect(() => {
    if (authStatus === AuthStatuses.LOADED && !canViewProgress) {
      router.replace("/403?admin=1");
    }
  }, [authStatus, canViewProgress, router]);

  useEffect(() => {
    if (authStatus !== AuthStatuses.LOADED || !canViewProgress) return;

    LessonService.lessonList()
      .then(setLessons)
      .catch((error) => {
        toast.error(error?.message || t`Failed to load progress`);
      });
  }, [authStatus, canViewProgress]);

  const stats = useMemo(() => {
    const completed = lessons.filter(
      (lesson) => (lesson.progress || 0) >= 100
    ).length;
    const averageProgress = Math.round(
      lessons.reduce((total, lesson) => total + (lesson.progress || 0), 0) /
        Math.max(lessons.length, 1)
    );

    return [
      { label: <Trans>Completed lessons</Trans>, value: String(completed) },
      { label: <Trans>Total lessons</Trans>, value: String(lessons.length) },
      { label: <Trans>Average progress</Trans>, value: `${averageProgress}%` },
    ];
  }, [lessons]);

  if (authStatus !== AuthStatuses.LOADED || !canViewProgress) return null;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
        <Trans>My Progress</Trans>
      </Typography>
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
    </Box>
  );
}

StudentProgressPage.Layout = AdminLayout;
