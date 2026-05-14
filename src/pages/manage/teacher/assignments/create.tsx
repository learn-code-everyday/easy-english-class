import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import TeacherAssignmentForm from "@/modules/AssignmentWorkflow/TeacherAssignmentForm";

export default function CreateTeacherAssignmentPage() {
  return <TeacherAssignmentForm />;
}

CreateTeacherAssignmentPage.Layout = AdminLayout;
