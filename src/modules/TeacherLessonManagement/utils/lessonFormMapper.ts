import type { Lesson, LessonInput } from "@/services/lesson/lesson.model";

import type {
  TeacherLessonFormValues,
  TeacherLessonQuestionForm,
} from "../types";

export const defaultQuestion = (): TeacherLessonQuestionForm => ({
  correctAnswer: "",
  explanation: "",
  options: [{ value: "" }, { value: "" }],
  prompt: "",
  score: 10,
  type: "multiple_choice",
});

export const defaultLessonFormValues = (): TeacherLessonFormValues => ({
  assignedToClassIds: "",
  estimatedMinutes: 30,
  level: "beginner",
  objectives: "",
  questions: [defaultQuestion()],
  skillType: "",
  slug: "",
  title: "",
});

export function lessonToFormValues(lesson: Lesson): TeacherLessonFormValues {
  return {
    assignedToClassIds: (lesson.assignedToClassIds || []).join(", "),
    estimatedMinutes: lesson.estimatedMinutes || 0,
    level: lesson.level || "beginner",
    objectives: (lesson.objectives || []).join("\n"),
    questions: lesson.questions?.length
      ? lesson.questions.map((question) => ({
          correctAnswer: question.correctAnswer || "",
          explanation: question.explanation || "",
          options: question.options?.length
            ? question.options.map((option) => ({ value: option.value }))
            : [{ value: "" }, { value: "" }],
          prompt: question.prompt,
          score: question.score || 0,
          type: question.type,
        }))
      : [defaultQuestion()],
    skillType: lesson.skillType || "",
    slug: lesson.slug,
    title: lesson.title,
  };
}

export function formValuesToLessonInput(
  values: TeacherLessonFormValues
): LessonInput {
  return {
    assignedToClassIds: values.assignedToClassIds
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    estimatedMinutes: Number(values.estimatedMinutes || 0),
    level: values.level,
    objectives: values.objectives
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    questions: values.questions.map((question) => ({
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      options:
        question.type === "multiple_choice"
          ? question.options
              .map((option) => option.value.trim())
              .filter(Boolean)
              .map((option) => ({ label: option, value: option }))
          : [],
      prompt: question.prompt,
      score: Number(question.score || 0),
      type: question.type,
    })),
    skillType: values.skillType,
    slug: values.slug,
    title: values.title,
  };
}
