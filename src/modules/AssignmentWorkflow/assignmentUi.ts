import type {
  Assignment,
  AssignmentType,
} from "@/services/assignment/assignment.model";
import {
  getAssignmentContent,
  getAssignmentType,
} from "@/services/assignment/assignment.repo";

export const ASSIGNMENT_TYPES: AssignmentType[] = ["QUIZ", "LINK", "IMAGE"];
export const ASSIGNMENT_STATUSES = ["ALL", "DRAFT", "PUBLISHED", "ARCHIVED"];

export function assignmentTypeLabel(type: AssignmentType) {
  if (type === "LINK") return "LINK";
  if (type === "IMAGE") return "IMAGE";
  return "QUIZ";
}

export function getAssignmentDescription(assignment: Assignment) {
  return (
    getAssignmentContent(assignment).description || assignment.content || ""
  );
}

export function getAssignmentTypeChip(assignment: Assignment) {
  return getAssignmentType(assignment);
}
