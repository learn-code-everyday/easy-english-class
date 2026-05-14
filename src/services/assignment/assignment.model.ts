import { BaseModel } from "@/helpers/base-model";

import { AssignmentSubmission } from "../assignment-submission/assignment-submission.model";
import { Class } from "../class/class.model";
import { User } from "../user/user.model";

export type AssignmentType = "IMAGE" | "LINK" | "QUIZ";
export type AssignmentWorkflowStatus =
  | "ARCHIVED"
  | "DRAFT"
  | "PUBLISHED"
  | "SUBMITTED"
  | "NEED_RETRY"
  | "REVIEWED";

export type AssignmentQuestion = {
  correctAnswer?: string;
  explanation?: string;
  options?: Array<{ label?: string; value: string }>;
  prompt: string;
  score: number;
  type: "fill_blank" | "multiple_choice" | "short_answer";
};

export type AssignmentContent = {
  assignedToClassIds?: string[];
  assignmentType?: AssignmentType;
  description?: string;
  externalUrl?: string;
  instructions?: string;
  questions?: AssignmentQuestion[];
  referenceImageUrl?: string;
};

export interface Assignment extends BaseModel {
  id: string;
  assignedToClassIds?: string[];
  attachments?: string[];
  description?: string;
  dueDate?: string;
  externalUrl?: string;
  instructions?: string;
  title: string;
  type?: AssignmentType;
  content?: string;
  class?: Class;
  teacher?: User;
  deadline?: string;
  attachmentUrl?: string;
  submissions?: [AssignmentSubmission];
  status?: AssignmentWorkflowStatus | string;
}

export type AssignmentCreateInput = {
  assignedToClassIds?: string[];
  assignmentType: AssignmentType;
  attachmentUrl?: string;
  description?: string;
  dueDate?: string;
  externalUrl?: string;
  instructions?: string;
  questions?: AssignmentQuestion[];
  referenceImageUrl?: string;
  title: string;
};

export type AssignmentSubmitInput = {
  answers?: Array<{ answer: string; questionId: string }>;
  assignmentId: string;
  fileUrl?: string;
  note?: string;
};

export type TeacherReviewSubmissionInput = {
  feedback?: string;
  score?: number;
  status: "need_retry" | "reviewed";
  submissionId: string;
};
