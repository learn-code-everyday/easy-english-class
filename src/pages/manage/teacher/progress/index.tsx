import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import LessonManagementScaffold from "@/modules/ManagementPage/Teacher/LessonManagementScaffold";

export default function StudentProgressPage() {
  return <LessonManagementScaffold mode="student-progress" />;
}

StudentProgressPage.Layout = AdminLayout;
