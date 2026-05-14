import { BaseModel } from "@/helpers/base-model";

import { Assignment } from "../assignment/assignment.model";
import { User } from "../user/user.model";

export interface AssignmentSubmission extends BaseModel {
  id: string;
  assignmentId?: string;
  assignment: Assignment;
  student: User;
  studentId?: string;
  answers?: Array<{ answer: string; questionId: string }>;
  fileUrl?: string;
  uploadedFiles?: string[];
  note: string;
  submitTime?: string;
  submittedAt?: string;
  status: string;
  score: number;
  feedback: string;
  gradedAt?: string;
  reviewedAt?: string;
}
