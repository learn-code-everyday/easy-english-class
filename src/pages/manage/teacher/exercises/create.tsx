import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import LessonManagementScaffold from "@/modules/ManagementPage/Teacher/LessonManagementScaffold";

export default function CreateExercisePage() {
  return <LessonManagementScaffold mode="create-exercise" />;
}

CreateExercisePage.Layout = AdminLayout;
