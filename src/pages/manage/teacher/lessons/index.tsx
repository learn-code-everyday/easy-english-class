import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import LessonManagementScaffold from "@/modules/ManagementPage/Teacher/LessonManagementScaffold";

export default function TeacherLessonsPage() {
  return <LessonManagementScaffold mode="lesson-management" />;
}

TeacherLessonsPage.Layout = AdminLayout;
