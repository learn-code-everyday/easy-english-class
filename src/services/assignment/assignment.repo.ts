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

const HOMEWORK_ASSIGNMENT_LIST_FIELDS = `
  id
  title
  type
  description
  instructions
  dueDate
  status
  assignedToClassIds
  attachments
  createdAt
  updatedAt
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

export function getAssignmentContent(
  assignment: Pick<
    Assignment,
    | "assignedToClassIds"
    | "content"
    | "description"
    | "externalUrl"
    | "instructions"
    | "type"
  >
) {
  return {
    assignedToClassIds: assignment.assignedToClassIds,
    assignmentType: assignment.type,
    description: assignment.description,
    externalUrl: assignment.externalUrl,
    instructions: assignment.instructions,
    ...safeContent(assignment.content),
  };
}

export function getAssignmentType(
  assignment: Pick<Assignment, "content" | "type">
) {
  return (
    assignment.type || safeContent(assignment.content).assignmentType || "QUIZ"
  );
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
      teacherAssignmentList?: ListResponse<Assignment> | null;
    }>({
      query: this.gql`
        query TeacherAssignmentList {
          teacherAssignmentList(q: { limit: 1000 }) {
            data {
              ${HOMEWORK_ASSIGNMENT_LIST_FIELDS}
            }
            total
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    const response = result.data;
    const rows = response?.teacherAssignmentList?.data ?? [];
    const total = response?.teacherAssignmentList?.total ?? 0;
    void total;

    return rows;
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

  async teacherSubmissionList() {
    const result = await this.client.query<{
      teacherSubmissionList?: AssignmentSubmission[] | null;
    }>({
      query: this.gql`
        query TeacherSubmissionList {
          teacherSubmissionList {
            ${SUBMISSION_FIELDS}
          }
        }
      `,
      fetchPolicy: "network-only",
    });

    return result.data?.teacherSubmissionList ?? [];
  }

  async teacherReviewSubmission(input: TeacherReviewSubmissionInput) {
    const result = await this.client.mutate<{
      teacherReviewSubmission: AssignmentSubmission;
    }>({
      mutation: this.gql`
        mutation TeacherReviewSubmission($input: TeacherReviewSubmissionInput!) {
          teacherReviewSubmission(input: $input) {
            ${SUBMISSION_FIELDS}
          }
        }
      `,
      variables: {
        input: {
          feedback: input.feedback || "",
          score: Number(input.score || 0),
          status: input.status,
          submissionId: input.submissionId,
        },
      },
      fetchPolicy: "no-cache",
    });

    return result.data?.teacherReviewSubmission;
  }
}

export const AssignmentService = new AssignmentRepository();
