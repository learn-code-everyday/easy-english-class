import { UserRoles, UserTypes } from "@/services/user/user.model";
import type { User } from "@/services/user/user.model";

type AuthUser = Pick<User, "role" | "userType"> | undefined;

export function isAdmin(user?: Pick<User, "role">) {
  return user?.role === UserRoles.ADMIN;
}

export function isTeacher(user?: AuthUser) {
  return user?.role === UserRoles.USER && user.userType === UserTypes.TEACHER;
}

export function isStudent(user?: AuthUser) {
  return user?.role === UserRoles.USER && user.userType === UserTypes.STUDENT;
}

export function canManageAssignments(user?: AuthUser) {
  return isTeacher(user);
}

export function canAccessAssignments(user?: AuthUser) {
  return isStudent(user);
}
