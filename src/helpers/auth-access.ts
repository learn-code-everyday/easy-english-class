import { UserRoles, UserTypes } from "@/services/user/user.model";
import type { User } from "@/services/user/user.model";

export function isAdminUser(user?: Pick<User, "role">) {
  return user?.role === UserRoles.ADMIN;
}

export function isTeacherUser(user?: Pick<User, "role" | "userType">) {
  return user?.role === UserRoles.USER && user.userType === UserTypes.TEACHER;
}

export function isStudentUser(user?: Pick<User, "role" | "userType">) {
  return user?.role === UserRoles.USER && user.userType === UserTypes.STUDENT;
}

export function canAccessStudentLessons(
  user?: Pick<User, "role" | "userType">
) {
  return isStudentUser(user);
}

export function canPreviewStudentLessons(
  user?: Pick<User, "role" | "userType">
) {
  return isAdminUser(user) || isTeacherUser(user);
}

export function canOpenBasicCommunicationPage(
  user: Pick<User, "role" | "userType"> | undefined,
  preview?: boolean
) {
  if (canAccessStudentLessons(user)) return true;
  return Boolean(preview && canPreviewStudentLessons(user));
}
