import { Trans } from "@lingui/macro";
import { Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { DashboardPage } from "@/components/Dashboard";
import ErrorState from "@/components/ErrorState";
import { isTeacher } from "@/helpers/auth-access";
import type { Lesson } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

import LessonListTable from "./components/LessonListTable";
import StudentProgressPanel from "./components/StudentProgressPanel";
import StudentSubmissionsTable from "./components/StudentSubmissionsTable";
import TeacherHero from "./components/TeacherHero";
import TeacherLessonForm from "./components/TeacherLessonForm";
import type { LessonManagementScaffoldProps } from "./types";

function ExerciseBuilderScaffold({ lessonId }: { lessonId?: string }) {
  const [loadError, setLoadError] = useState(false);
  const [lesson, setLesson] = useState<Lesson | undefined>();
  const [loadingLesson, setLoadingLesson] = useState(Boolean(lessonId));

  const loadLesson = useCallback(() => {
    if (!lessonId) {
      setLesson(undefined);
      setLoadError(false);
      setLoadingLesson(false);
      return;
    }

    setLoadError(false);
    setLoadingLesson(true);
    LessonService.teacherLessonList()
      .then((lessons) => {
        setLesson(lessons.find((item) => item.id === lessonId));
      })
      .catch(() => {
        setLoadError(true);
      })
      .finally(() => setLoadingLesson(false));
  }, [lessonId]);

  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  if (loadingLesson) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: 4,
          p: { xs: 2.5, md: 3 },
        }}
      >
        <Typography sx={{ color: "#64748b" }}>
          <Trans>Loading lesson...</Trans>
        </Typography>
      </Paper>
    );
  }

  if (loadError) {
    return (
      <ErrorState
        title={<Trans>Lesson could not be loaded</Trans>}
        description={
          <Trans>
            We could not load this lesson for editing. Please try again.
          </Trans>
        }
        onRetry={loadLesson}
      />
    );
  }

  return <TeacherLessonForm initialLesson={lesson} lessonId={lessonId} />;
}

export default function LessonManagementScaffold({
  mode,
}: LessonManagementScaffoldProps) {
  const router = useRouter();
  const { auth, authStatus } = useAuthStore();
  const canManageTeacherLessons = isTeacher(auth);

  useEffect(() => {
    if (authStatus === AuthStatuses.LOADED && !canManageTeacherLessons) {
      router.replace("/403");
    }
  }, [authStatus, canManageTeacherLessons, router]);

  if (authStatus !== AuthStatuses.LOADED || !canManageTeacherLessons) {
    return null;
  }

  return (
    <DashboardPage>
      <TeacherHero mode={mode} />
      {mode === "lesson-management" && <LessonListTable />}
      {(mode === "create-lesson" || mode === "edit-lesson") && (
        <ExerciseBuilderScaffold
          lessonId={
            typeof router.query.lessonId === "string"
              ? router.query.lessonId
              : undefined
          }
        />
      )}
      {mode === "create-exercise" && <ExerciseBuilderScaffold />}
      {mode === "student-submissions" && <StudentSubmissionsTable />}
      {mode === "student-progress" && <StudentProgressPanel />}
    </DashboardPage>
  );
}
