import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import LessonManagementScaffold from "@/modules/ManagementPage/Teacher/LessonManagementScaffold";

export default function CreateLessonPage() {
  return <LessonManagementScaffold mode="create-lesson" />;
}

CreateLessonPage.Layout = AdminLayout;
