import { useCallback, useEffect, useState } from "react";

import type { TeacherSubmission } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";

export function useTeacherSubmissions() {
  const [loadError, setLoadError] = useState(false);
  const [submissions, setSubmissions] = useState<TeacherSubmission[]>([]);

  const loadSubmissions = useCallback(() => {
    setLoadError(false);
    LessonService.teacherSubmissionList()
      .then(setSubmissions)
      .catch(() => {
        setLoadError(true);
      });
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  return { loadError, loadSubmissions, submissions };
}
