import { initializeApollo } from "@/graphql/apollo-client";
import { CrudRepository } from "@/graphql/repo/crud";

import { assignmentFields } from "./assignment.field";
import {
  Assignment,
  AssignmentContent,
  AssignmentCreateInput,
  AssignmentSubmitInput,
  TeacherReviewSubmissionInput,
} from "./assignment.model";
import { assignmentSubmissionFields } from "../assignment-submission/assignment-submission.field";
import type { AssignmentSubmission } from "../assignment-submission/assignment-submission.model";
import { classFields } from "../class/class.field";
import { userFields } from "../user/user.field";

type ListResponse<T> = {
  data: T[];
  total?: number;
};

const ASSIGNMENT_LIST_FIELDS = `
  id
  title
  content
  deadline
  attachmentUrl
  createdAt
  updatedAt
  status
`;

const ASSIGNMENT_DETAIL_FIELDS = `
  ${ASSIGNMENT_LIST_FIELDS}
  class {
    id
    name
  }
`;

const SUBMISSION_FIELDS = `
  id
  fileUrl
  note
  submitTime
  status
  score
  feedback
  gradedAt
  assignment {
    id
    title
    content
    attachmentUrl
    deadline
    status
  }
  student {
    id
    name
    email
  }
`;

function normalizeList<T>(value?: ListResponse<T> | T[]) {
  if (!value) return [];
  return Array.isArray(value) ? value : value.data || [];
}

function safeContent(content?: string): AssignmentContent {
  if (!content) return {};
  try {
    const parsed = JSON.parse(content);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return { description: content };
  }
}

function serializeContent(input: AssignmentCreateInput) {
  return JSON.stringify({
    assignedToClassIds: input.assignedToClassIds || [],
    assignmentType: input.assignmentType,
    description: input.description || "",
    externalUrl: input.externalUrl || "",
    instructions: input.instructions || "",
    questions: input.questions || [],
    referenceImageUrl: input.referenceImageUrl || "",
  });
}

export function getAssignmentContent(assignment: Pick<Assignment, "content">) {
  return safeContent(assignment.content);
}

export function getAssignmentType(assignment: Pick<Assignment, "content">) {
  return safeContent(assignment.content).assignmentType || "QUIZ";
}

export class AssignmentRepository extends CrudRepository<Assignment> {
  apiName = "Assignment";

  private get client() {
    return initializeApollo();
  }

  shortFragment = this.parseFragment(`
    ${assignmentFields}
  `);

  fullFragment = this.parseFragment(`
    ${assignmentFields}
    class {
      ${classFields}
    }
    teacher {
      ${userFields}
    }
    submissions {
      ${assignmentSubmissionFields}
    }
  `);

  async teacherAssignmentList() {
    const result = await this.client.query<{
      getAllAssignment: ListResponse<Assignment>;
    }>({
      query: this.gql`
        query TeacherAssignmentList {
          getAllAssignment(q: { limit: 1000 }) {
            data {
              ${ASSIGNMENT_DETAIL_FIELDS}
            }
            total
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return normalizeList(result.data.getAllAssignment);
  }

  async assignmentList(classId?: string) {
    if (classId) {
      const result = await this.client.query<{
        getAssignmentsByClass: Assignment[];
      }>({
        query: this.gql`
          query AssignmentsByClass($classId: ID!) {
            getAssignmentsByClass(classId: $classId) {
              ${ASSIGNMENT_DETAIL_FIELDS}
            }
          }
        `,
        variables: { classId },
        fetchPolicy: "network-only",
      });

      return result.data.getAssignmentsByClass || [];
    }

    return this.teacherAssignmentList();
  }

  async assignmentGet(id: string) {
    const result = await this.client.query<{ getAssignment: Assignment }>({
      query: this.gql`
        query AssignmentGet($id: ID!) {
          getAssignment(id: $id) {
            ${ASSIGNMENT_DETAIL_FIELDS}
          }
        }
      `,
      variables: { id },
      fetchPolicy: "network-only",
    });

    return result.data.getAssignment;
  }

  async assignmentCreate(data: AssignmentCreateInput, teacherId?: string) {
    const classId = data.assignedToClassIds?.[0] || "";
    const result = await this.client.mutate<{ createAssignment: Assignment }>({
      mutation: this.gql`
        mutation AssignmentCreate($data: CreateAssignmentInput!) {
          createAssignment(data: $data) {
            ${ASSIGNMENT_LIST_FIELDS}
          }
        }
      `,
      variables: {
        data: {
          attachmentUrl: data.attachmentUrl || data.referenceImageUrl || "",
          classId,
          content: serializeContent(data),
          deadline: data.dueDate || undefined,
          teacherId: teacherId || "",
          title: data.title,
        },
      },
      fetchPolicy: "no-cache",
    });

    return result.data?.createAssignment;
  }

  async assignmentSubmit(data: AssignmentSubmitInput, studentId?: string) {
    const result = await this.client.mutate<{
      submitAssignment: AssignmentSubmission;
    }>({
      mutation: this.gql`
        mutation AssignmentSubmit($data: SubmitAssignmentInput!) {
          submitAssignment(data: $data) {
            ${SUBMISSION_FIELDS}
          }
        }
      `,
      variables: {
        data: {
          assignmentId: data.assignmentId,
          fileUrl: data.fileUrl || "",
          note: data.note || JSON.stringify({ answers: data.answers || [] }),
          studentId: studentId || "",
        },
      },
      fetchPolicy: "no-cache",
    });

    return result.data?.submitAssignment;
  }

  async teacherSubmissionList(assignments?: Assignment[]) {
    const sourceAssignments =
      assignments || (await this.teacherAssignmentList());
    const submissionGroups = await Promise.all(
      sourceAssignments
        .filter((assignment) => assignment.id)
        .map((assignment) =>
          this.client
            .query<{ getAssignmentSubmissions: AssignmentSubmission[] }>({
              query: this.gql`
                query AssignmentSubmissions($assignmentId: ID!) {
                  getAssignmentSubmissions(assignmentId: $assignmentId) {
                    ${SUBMISSION_FIELDS}
                  }
                }
              `,
              variables: { assignmentId: assignment.id },
              fetchPolicy: "network-only",
            })
            .then((result) => result.data.getAssignmentSubmissions || [])
        )
    );

    return submissionGroups.flat();
  }

  async teacherReviewSubmission(input: TeacherReviewSubmissionInput) {
    const feedback = JSON.stringify({
      feedback: input.feedback || "",
      status: input.status,
    });
    const result = await this.client.mutate<{
      gradeAssignmentSubmission: AssignmentSubmission;
    }>({
      mutation: this.gql`
        mutation TeacherReviewSubmission(
          $submissionId: ID!
          $score: Float!
          $feedback: String
        ) {
          gradeAssignmentSubmission(
            submissionId: $submissionId
            score: $score
            feedback: $feedback
          ) {
            ${SUBMISSION_FIELDS}
          }
        }
      `,
      variables: {
        feedback,
        score: Number(input.score || 0),
        submissionId: input.submissionId,
      },
      fetchPolicy: "no-cache",
    });

    return result.data?.gradeAssignmentSubmission;
  }
}

export const AssignmentService = new AssignmentRepository();
