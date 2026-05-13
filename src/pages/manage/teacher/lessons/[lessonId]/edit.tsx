import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import LessonManagementScaffold from "@/modules/ManagementPage/Teacher/LessonManagementScaffold";

export default function EditLessonPage() {
  return <LessonManagementScaffold mode="edit-lesson" />;
}

EditLessonPage.Layout = AdminLayout;
