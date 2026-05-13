export type LessonQuestionType = "fill_blank" | "multiple_choice" | "speaking";

export type LessonStatus = "archived" | "draft" | "published";

export type LessonQuestion = {
  answer?: string;
  correct?: boolean;
  correctAnswer?: string;
  explanation?: string;
  id?: string;
  options?: Array<{
    label?: string;
    value: string;
  }>;
  prompt: string;
  questionId?: string;
  score: number;
  type: LessonQuestionType;
};

export type Lesson = {
  assignedToClassIds?: string[];
  completionStatus?: string;
  estimatedMinutes?: number;
  id?: string;
  level?: string;
  objectives?: string[];
  progress?: number;
  questions?: LessonQuestion[];
  skillType?: string;
  slug: string;
  status?: LessonStatus;
  title: string;
  updatedAt?: string;
};

export type LessonAnswerInput = {
  answer: string;
  questionId: string;
};

export type LessonSubmissionResult = {
  answers?: LessonQuestion[];
  correctCount?: number;
  passed: boolean;
  score: number;
  submittedAt?: string;
  totalQuestions?: number;
};

export type TeacherSubmission = {
  id?: string;
  lesson?: Pick<Lesson, "slug" | "title">;
  passed?: boolean;
  score?: number;
  student?: {
    email?: string;
    id?: string;
    name?: string;
  };
  submittedAt?: string;
};

export type StudentProgress = {
  bestScore?: number;
  lastSubmittedAt?: string;
  lessonId?: string;
  lessonTitle?: string;
  passed?: boolean;
  studentId?: string;
  submissionCount?: number;
};

export type LessonInput = {
  assignedToClassIds?: string[];
  estimatedMinutes?: number;
  level?: string;
  objectives?: string[];
  questions?: LessonQuestion[];
  skillType?: string;
  slug: string;
  status?: LessonStatus;
  title: string;
};
