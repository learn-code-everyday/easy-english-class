import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import TeacherAssignmentList from "@/modules/AssignmentWorkflow/TeacherAssignmentList";

export default function TeacherAssignmentsPage() {
  return <TeacherAssignmentList />;
}

TeacherAssignmentsPage.Layout = AdminLayout;
