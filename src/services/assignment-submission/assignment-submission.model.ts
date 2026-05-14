import { BaseModel } from "@/helpers/base-model";

import { Assignment } from "../assignment/assignment.model";
import { User } from "../user/user.model";

export interface AssignmentSubmission extends BaseModel {
  id: string;
  assignment: Assignment;
  student: User;
  answers?: Array<{ answer: string; questionId: string }>;
  fileUrl: string;
  note: string;
  submitTime: string;
  status: string;
  score: number;
  feedback: string;
  gradedAt: string;
}
