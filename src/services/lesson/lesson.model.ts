export type LessonQuestionType = "fill_blank" | "multiple_choice" | "speaking";

export type LessonStatus = "archived" | "draft" | "published";

export type LessonQuestion = {
  correctAnswer?: string;
  explanation?: string;
  id?: string;
  options?: string[];
  prompt: string;
  score: number;
  type: LessonQuestionType;
};

export type Lesson = {
  completionStatus?: string;
  estimatedMinutes?: number;
  id?: string;
  level?: string;
  objectives?: string;
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
  explanations?: Array<{
    correctAnswer?: string;
    explanation?: string;
    questionId: string;
  }>;
  passed: boolean;
  progress?: number;
  score: number;
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
  averageScore?: number;
  completedLessons?: number;
  lessonTitle?: string;
  progress?: number;
  student?: {
    email?: string;
    id?: string;
    name?: string;
  };
  totalLessons?: number;
};

export type LessonInput = {
  estimatedMinutes?: number;
  level?: string;
  objectives?: string;
  questions?: LessonQuestion[];
  skillType?: string;
  slug: string;
  status?: LessonStatus;
  title: string;
};
