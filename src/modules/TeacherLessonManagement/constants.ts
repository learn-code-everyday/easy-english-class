import type { LessonManagementMode } from "./types";

export const CREATE_LESSON_PATH = "/manage/teacher/lessons/create";

export const LESSON_LEVEL_OPTIONS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const LESSON_STATUS_OPTIONS = [
  "draft",
  "published",
  "archived",
] as const;

export const PAGE_META_KEYS: Record<
  LessonManagementMode,
  {
    description:
      | "createLessonDescription"
      | "editLessonDescription"
      | "exerciseBuilderDescription"
      | "lessonManagementDescription"
      | "studentProgressDescription"
      | "studentSubmissionsDescription";
    eyebrow:
      | "exerciseBuilder"
      | "learningAnalytics"
      | "lessonEditor"
      | "reviewQueue"
      | "teacherWorkspace";
    title:
      | "createExercise"
      | "createLesson"
      | "editLesson"
      | "lessonManagement"
      | "studentProgress"
      | "studentSubmissions";
  }
> = {
  "lesson-management": {
    eyebrow: "teacherWorkspace",
    title: "lessonManagement",
    description: "lessonManagementDescription",
  },
  "create-exercise": {
    eyebrow: "exerciseBuilder",
    title: "createExercise",
    description: "exerciseBuilderDescription",
  },
  "student-submissions": {
    eyebrow: "reviewQueue",
    title: "studentSubmissions",
    description: "studentSubmissionsDescription",
  },
  "student-progress": {
    eyebrow: "learningAnalytics",
    title: "studentProgress",
    description: "studentProgressDescription",
  },
  "edit-lesson": {
    eyebrow: "lessonEditor",
    title: "editLesson",
    description: "editLessonDescription",
  },
  "create-lesson": {
    eyebrow: "lessonEditor",
    title: "createLesson",
    description: "createLessonDescription",
  },
};
