import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import TeacherSubmissionReview from "@/modules/AssignmentWorkflow/TeacherSubmissionReview";

export default function StudentSubmissionsPage() {
  return <TeacherSubmissionReview />;
}

StudentSubmissionsPage.Layout = AdminLayout;
