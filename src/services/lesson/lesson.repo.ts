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
  estimatedMinutes
  skillType
  status
  objectives
  progress
  completionStatus
  updatedAt
`;

const QUESTION_FIELDS_FOR_STUDENT = `
  id
  type
  prompt
  options
  score
`;

const QUESTION_FIELDS_FOR_TEACHER = `
  ${QUESTION_FIELDS_FOR_STUDENT}
  correctAnswer
  explanation
`;

const SUBMISSION_FIELDS = `
  id
  score
  passed
  submittedAt
  lesson {
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
  averageScore
  completedLessons
  lessonTitle
  progress
  totalLessons
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
    const result = await this.apollo.query<{ lessonList: ListResponse<Lesson> }>(
      {
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
      }
    );

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

  async lessonSubmitAnswers(slug: string, answers: LessonAnswerInput[]) {
    const result = await this.apollo.mutate<{
      lessonSubmitAnswers: LessonSubmissionResult;
    }>({
      mutation: gql`
        mutation LessonSubmitAnswers(
          $data: LessonSubmitAnswersInput!
        ) {
          lessonSubmitAnswers(data: $data) {
            score
            passed
            progress
            explanations {
              questionId
              correctAnswer
              explanation
            }
          }
        }
      `,
      variables: { data: { slug, answers } },
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
              ${LESSON_FIELDS}
              questions {
                ${QUESTION_FIELDS_FOR_TEACHER}
              }
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
        mutation LessonCreate($data: LessonCreateInput!) {
          lessonCreate(data: $data) {
            ${LESSON_FIELDS}
          }
        }
      `,
      variables: { data },
      fetchPolicy: "no-cache",
    });

    return result.data?.lessonCreate;
  }

  async lessonUpdate(id: string, data: Partial<LessonInput>) {
    const result = await this.apollo.mutate<{ lessonUpdate: Lesson }>({
      mutation: gql`
        mutation LessonUpdate($id: String!, $data: LessonUpdateInput!) {
          lessonUpdate(id: $id, data: $data) {
            ${LESSON_FIELDS}
          }
        }
      `,
      variables: { id, data },
      fetchPolicy: "no-cache",
    });

    return result.data?.lessonUpdate;
  }

  async lessonDelete(id: string) {
    const result = await this.apollo.mutate<{ lessonDelete: { id: string } }>({
      mutation: gql`
        mutation LessonDelete($id: String!) {
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

  async teacherSubmissionList() {
    const result = await this.apollo.query<{
      teacherSubmissionList: ListResponse<TeacherSubmission>;
    }>({
      query: gql`
        query TeacherSubmissionList {
          teacherSubmissionList {
            data {
              ${SUBMISSION_FIELDS}
            }
            total
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return normalizeList(result.data.teacherSubmissionList);
  }

  async teacherStudentProgress() {
    const result = await this.apollo.query<{
      teacherStudentProgress: ListResponse<StudentProgress>;
    }>({
      query: gql`
        query TeacherStudentProgress {
          teacherStudentProgress {
            data {
              ${PROGRESS_FIELDS}
            }
            total
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return normalizeList(result.data.teacherStudentProgress);
  }
}

export const LessonService = new LessonRepository();
