import { t } from "@lingui/macro";

import {
  isAdminUser,
  isStudentUser,
  isTeacherUser,
} from "@/helpers/auth-access";
import { UserRoles, UserTypes } from "@/services/user/user.model";

// --- ADMIN MENU ---
export const getAdminMenu = () => [
  {
    categoryCode: t`MANAGEMENT`,
    code: "user",
    icon: "user",
    title: t`Users`,
    header: t`User Management`,
    url: "/manage/user",
  },
  // {
  //   categoryCode: t`MANAGEMENT`,
  //   code: "teacher",
  //   icon: "teacher",
  //   title: t`Teachers`,
  //   header: t`Teacher Management`,
  //   url: "/manage/teacher",
  // },
  // {
  //   categoryCode: t`MANAGEMENT`,
  //   code: "student",
  //   icon: "student",
  //   title: t`Students`,
  //   header: t`Student Management`,
  //   url: "/manage/student",
  // },
  {
    categoryCode: t`MANAGEMENT`,
    code: "class",
    icon: "class",
    title: t`Classes`,
    header: t`Class Management`,
    url: "/manage/classes",
  },
  {
    categoryCode: t`MANAGEMENT`,
    code: "course",
    icon: "course",
    title: t`Courses`,
    header: t`Course Management`,
    url: "/manage/course",
  },
  {
    categoryCode: t`SYSTEM`,
    code: "setting",
    icon: "setting",
    title: t`Settings`,
    header: t`System Settings`,
    url: "/manage/setting/COMMON",
  },
];

// --- TEACHER MENU ---
export const getTeacherMenu = () => [
  {
    categoryCode: t`TEACHING`,
    code: "assignment-management",
    icon: "course",
    title: t`Assignment Management`,
    header: t`Assignment Management`,
    url: "/manage/teacher/assignments",
  },
  {
    categoryCode: t`TEACHING`,
    code: "create-assignment",
    icon: "assignment",
    title: t`Create Assignment`,
    header: t`Create Assignment`,
    url: "/manage/teacher/assignments/create",
  },
  {
    categoryCode: t`TEACHING`,
    code: "student-submissions",
    icon: "assignment",
    title: t`Student Submissions`,
    header: t`Student Submissions`,
    url: "/manage/teacher/submissions",
  },
  {
    categoryCode: t`TEACHING`,
    code: "student-progress",
    icon: "score",
    title: t`Student Progress`,
    header: t`Student Progress`,
    url: "/manage/teacher/progress",
  },
];

// --- STUDENT MENU ---
export const getStudentMenu = () => [
  {
    categoryCode: t`LEARNING`,
    code: "my-assignments",
    icon: "class",
    title: t`Assignments`,
    header: t`Assignments`,
    url: "/assignments",
  },
  {
    categoryCode: t`LEARNING`,
    code: "my-progress",
    icon: "score",
    title: t`My Progress`,
    header: t`My Progress`,
    url: "/manage/student/progress",
  },
  {
    categoryCode: t`LEARNING`,
    code: "submissions-scores",
    icon: "assignment",
    title: t`Submissions/Scores`,
    header: t`Submissions/Scores`,
    url: "/manage/student/submissions",
  },
];

// --- DASHBOARD ---
export const getDashboardOnlyMenu = () => [
  {
    categoryCode: "Dashboard",
    code: "dashboard",
    icon: "dashboard",
    title: t`Dashboard`,
    header: t`Overview Dashboard`,
    url: "/manage/dashboard",
  },
];

// --GET MENU BY ROLE--
export function getMenuByRoleAndType(role: UserRoles, userType?: UserTypes) {
  const user = { role, userType };

  if (isAdminUser(user)) {
    return [...getDashboardOnlyMenu(), ...getAdminMenu()];
  }
  if (isTeacherUser(user)) {
    return [...getDashboardOnlyMenu(), ...getTeacherMenu()];
  }
  if (isStudentUser(user)) {
    return [...getDashboardOnlyMenu(), ...getStudentMenu()];
  }

  return getDashboardOnlyMenu();
}
