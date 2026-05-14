import { t } from "@lingui/macro";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { StudentProgress } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";

export function useTeacherProgress() {
  const [loadError, setLoadError] = useState(false);
  const [progressRows, setProgressRows] = useState<StudentProgress[]>([]);

  const loadProgress = useCallback(() => {
    setLoadError(false);
    LessonService.teacherStudentProgress()
      .then(setProgressRows)
      .catch(() => {
        setLoadError(true);
      });
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const summary = useMemo(
    () => [
      { label: t`Active students`, value: String(progressRows.length) },
      {
        label: t`Average completion`,
        value: `${Math.round(
          progressRows.reduce((total, row) => total + (row.bestScore || 0), 0) /
            Math.max(progressRows.length, 1)
        )}%`,
      },
      {
        label: t`Needs feedback`,
        value: String(
          progressRows.filter((row) => row.status !== "reviewed").length
        ),
      },
    ],
    [progressRows]
  );

  return { loadError, loadProgress, progressRows, summary };
}
