import { gql } from "@apollo/client/core";

import { initializeApollo } from "@/graphql/apollo-client";

import type {
  Lesson,
  LessonAnswerInput,
  LessonInput,
  LessonSubmissionResult,
  StudentProgress,
  TeacherSubmission,
} from "./lesson.model";

type ListResponse<T> = {
  data: T[];
  total?: number;
};

function normalizeList<T>(value: ListResponse<T> | T[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : value.data || [];
}

const LESSON_FIELDS = `
  id
  title
  slug
  level
  assignedToClassIds
  estimatedMinutes
  skillType
  status
  objectives
  progress
  completionStatus
  updatedAt
`;

const TEACHER_LESSON_LIST_FIELDS = `
  id
  title
  slug
  level
  skillType
  status
  estimatedMinutes
  objectives
  updatedAt
  assignedToClassIds
`;

const QUESTION_FIELDS_FOR_STUDENT = `
  id
  type
  prompt
  options {
    label
    value
  }
  score
`;

const SUBMISSION_FIELDS = `
  id
  score
  passed
  submittedAt
  totalQuestions
  correctCount
  answers {
    questionId
    answer
    correct
    correctAnswer
    explanation
    score
  }
  lesson {
    id
    title
    slug
  }
  student {
    id
    name
    email
  }
`;

const PROGRESS_FIELDS = `
  studentId
  lessonId
  lessonTitle
  submissionCount
  bestScore
  passed
  lastSubmittedAt
`;

const TEACHER_PROGRESS_FIELDS = `
  studentId
  assignmentId
  assignmentTitle
  submissionCount
  bestScore
  status
  lastSubmittedAt
`;

const HOMEWORK_SUBMISSION_FIELDS = `
  id
  assignmentId
  studentId
  uploadedFiles
  note
  score
  feedback
  status
  reviewedAt
  submittedAt
  assignment {
    id
    title
    type
    description
    dueDate
    status
    attachments
  }
  student {
    id
    name
    email
  }
`;

class LessonRepository {
  private get apollo() {
    return initializeApollo();
  }

  async lessonList() {
    const result = await this.apollo.query<{
      lessonList: ListResponse<Lesson>;
    }>({
      query: gql`
          query LessonList {
            lessonList {
              data {
                ${LESSON_FIELDS}
              }
              total
            }
          }
        `,
      fetchPolicy: "network-only",
    });

    return normalizeList(result.data.lessonList);
  }

  async lessonGetBySlug(slug: string) {
    const result = await this.apollo.query<{ lessonGetBySlug: Lesson }>({
      query: gql`
        query LessonGetBySlug($slug: String!) {
          lessonGetBySlug(slug: $slug) {
            ${LESSON_FIELDS}
            questions {
              ${QUESTION_FIELDS_FOR_STUDENT}
            }
          }
        }
      `,
      variables: { slug },
      fetchPolicy: "network-only",
    });

    return result.data.lessonGetBySlug;
  }

  async lessonSubmitAnswers(lessonId: string, answers: LessonAnswerInput[]) {
    const result = await this.apollo.mutate<{
      lessonSubmitAnswers: LessonSubmissionResult;
    }>({
      mutation: gql`
        mutation LessonSubmitAnswers($input: LessonSubmitAnswersInput!) {
          lessonSubmitAnswers(input: $input) {
            score
            passed
            totalQuestions
            correctCount
            submittedAt
            answers {
              questionId
              answer
              correct
              correctAnswer
              explanation
              score
            }
          }
        }
      `,
      variables: { input: { lessonId, answers } },
      fetchPolicy: "no-cache",
    });

    return result.data?.lessonSubmitAnswers;
  }

  async teacherLessonList() {
    const result = await this.apollo.query<{
      teacherLessonList: ListResponse<Lesson>;
    }>({
      query: gql`
        query TeacherLessonList {
          teacherLessonList {
            data {
              ${TEACHER_LESSON_LIST_FIELDS}
            }
            total
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return normalizeList(result.data.teacherLessonList);
  }

  async lessonCreate(data: LessonInput) {
    const result = await this.apollo.mutate<{ lessonCreate: Lesson }>({
      mutation: gql`
        mutation LessonCreate($input: LessonSaveInput!) {
          lessonCreate(input: $input) {
            ${LESSON_FIELDS}
          }
        }
      `,
      variables: { input: data },
      fetchPolicy: "no-cache",
    });

    return result.data?.lessonCreate;
  }

  async lessonUpdate(id: string, data: Partial<LessonInput>) {
    const result = await this.apollo.mutate<{ lessonUpdate: Lesson }>({
      mutation: gql`
        mutation LessonUpdate($id: ID!, $input: LessonSaveInput!) {
          lessonUpdate(id: $id, input: $input) {
            ${LESSON_FIELDS}
          }
        }
      `,
      variables: { id, input: data },
      fetchPolicy: "no-cache",
    });

    return result.data?.lessonUpdate;
  }

  async lessonDelete(id: string) {
    const result = await this.apollo.mutate<{ lessonDelete: { id: string } }>({
      mutation: gql`
        mutation LessonDelete($id: ID!) {
          lessonDelete(id: $id) {
            id
          }
        }
      `,
      variables: { id },
      fetchPolicy: "no-cache",
    });

    return result.data?.lessonDelete;
  }

  async lessonPublish(id: string) {
    const result = await this.apollo.mutate<{ lessonPublish: Lesson }>({
      mutation: gql`
        mutation LessonPublish($id: ID!) {
          lessonPublish(id: $id) {
            ${LESSON_FIELDS}
          }
        }
      `,
      variables: { id },
      fetchPolicy: "no-cache",
    });

    return result.data?.lessonPublish;
  }

  async lessonArchive(id: string) {
    const result = await this.apollo.mutate<{ lessonArchive: Lesson }>({
      mutation: gql`
        mutation LessonArchive($id: ID!) {
          lessonArchive(id: $id) {
            ${LESSON_FIELDS}
          }
        }
      `,
      variables: { id },
      fetchPolicy: "no-cache",
    });

    return result.data?.lessonArchive;
  }

  async teacherSubmissionList() {
    const result = await this.apollo.query<{
      teacherSubmissionList: TeacherSubmission[];
    }>({
      query: gql`
        query TeacherSubmissionList {
          teacherSubmissionList {
            ${HOMEWORK_SUBMISSION_FIELDS}
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return result.data.teacherSubmissionList || [];
  }

  async teacherStudentProgress() {
    const result = await this.apollo.query<{
      teacherStudentProgress: StudentProgress[];
    }>({
      query: gql`
        query TeacherStudentProgress {
          teacherStudentProgress {
            ${TEACHER_PROGRESS_FIELDS}
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return result.data.teacherStudentProgress || [];
  }

  async mySubmissions() {
    const result = await this.apollo.query<{
      mySubmissions: TeacherSubmission[];
    }>({
      query: gql`
        query MySubmissions {
          mySubmissions {
            ${SUBMISSION_FIELDS}
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return result.data.mySubmissions || [];
  }

  async myProgress() {
    const result = await this.apollo.query<{ myProgress: StudentProgress[] }>({
      query: gql`
        query MyProgress {
          myProgress {
            ${PROGRESS_FIELDS}
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return result.data.myProgress || [];
  }
}

export const LessonService = new LessonRepository();
