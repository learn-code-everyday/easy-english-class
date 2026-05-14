import type { Lesson } from "@/services/lesson/lesson.model";

import type { LessonLevelFilter, LessonStatusFilter } from "../types";

export function filterLessons(
  lessons: Lesson[],
  {
    levelFilter,
    search,
    statusFilter,
  }: {
    levelFilter: LessonLevelFilter;
    search: string;
    statusFilter: LessonStatusFilter;
  }
) {
  const normalizedSearch = search.trim().toLowerCase();

  return lessons.filter((lesson) => {
    const searchableText = [
      lesson.title,
      lesson.slug,
      lesson.skillType,
      lesson.level,
      lesson.status,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesSearch =
      !normalizedSearch || searchableText.includes(normalizedSearch);
    const matchesStatus =
      statusFilter === "all" || lesson.status === statusFilter;
    const matchesLevel = levelFilter === "all" || lesson.level === levelFilter;

    return matchesSearch && matchesStatus && matchesLevel;
  });
}
