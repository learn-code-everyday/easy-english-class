import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import LessonManagementScaffold from "@/modules/ManagementPage/Teacher/LessonManagementScaffold";

export default function StudentSubmissionsPage() {
  return <LessonManagementScaffold mode="student-submissions" />;
}

StudentSubmissionsPage.Layout = AdminLayout;
