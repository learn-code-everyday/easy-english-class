import type {
  Lesson,
  LessonQuestionType,
} from "@/services/lesson/lesson.model";

export type LessonManagementMode =
  | "create-exercise"
  | "create-lesson"
  | "edit-lesson"
  | "lesson-management"
  | "student-progress"
  | "student-submissions";

export type LessonManagementScaffoldProps = {
  mode: LessonManagementMode;
};

export type TeacherLessonQuestionForm = {
  correctAnswer: string;
  explanation: string;
  options: Array<{ value: string }>;
  prompt: string;
  score: number;
  type: LessonQuestionType;
};

export type TeacherLessonFormValues = {
  assignedToClassIds: string;
  estimatedMinutes: number;
  level: string;
  objectives: string;
  questions: TeacherLessonQuestionForm[];
  skillType: string;
  slug: string;
  title: string;
};

export type LessonLevelFilter =
  | "advanced"
  | "all"
  | "beginner"
  | "intermediate";
export type LessonStatusFilter = "all" | NonNullable<Lesson["status"]>;
