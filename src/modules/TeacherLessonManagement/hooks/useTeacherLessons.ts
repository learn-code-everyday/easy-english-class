import { t } from "@lingui/macro";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import type { Lesson } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";

import type { LessonLevelFilter, LessonStatusFilter } from "../types";
import { filterLessons } from "../utils/lessonFilters";

export function useTeacherLessons() {
  const [levelFilter, setLevelFilter] = useState<LessonLevelFilter>("all");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LessonStatusFilter>("all");

  const loadLessons = useCallback(async () => {
    setLoadError(false);
    setLoading(true);
    try {
      setLessons(await LessonService.teacherLessonList());
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLessonStatus = useCallback(
    async (lesson: Lesson, status: Lesson["status"]) => {
      if (!lesson.id) return;

      try {
        if (status === "published") {
          await LessonService.lessonPublish(lesson.id);
        } else if (status === "archived") {
          await LessonService.lessonArchive(lesson.id);
        }
        toast.success(t`Lesson updated successfully`);
        loadLessons();
      } catch {
        toast.error(t`Failed to update lesson`);
      }
    },
    [loadLessons]
  );

  const deleteLesson = useCallback(
    async (lesson: Lesson) => {
      if (!lesson.id) return;

      try {
        await LessonService.lessonDelete(lesson.id);
        toast.success(t`Lesson deleted successfully`);
        loadLessons();
      } catch {
        toast.error(t`Failed to delete lesson`);
      }
    },
    [loadLessons]
  );

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  const filteredLessons = useMemo(
    () => filterLessons(lessons, { levelFilter, search, statusFilter }),
    [lessons, levelFilter, search, statusFilter]
  );

  return {
    deleteLesson,
    filteredLessons,
    lessons,
    levelFilter,
    loadError,
    loading,
    loadLessons,
    search,
    setLevelFilter,
    setSearch,
    setStatusFilter,
    statusFilter,
    updateLessonStatus,
  };
}
