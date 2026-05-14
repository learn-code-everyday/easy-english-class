import { t, Trans } from "@lingui/macro";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  DashboardContentCard,
  DashboardErrorState,
  DashboardTable,
} from "@/components/Dashboard";

import { useTeacherSubmissions } from "../hooks/useTeacherSubmissions";

export default function StudentSubmissionsTable() {
  const { loadError, loadSubmissions, submissions } = useTeacherSubmissions();

  return (
    <DashboardContentCard>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
        <Trans>Submission queue</Trans>
      </Typography>
      {loadError ? (
        <DashboardErrorState
          title={<Trans>Submissions could not be loaded</Trans>}
          description={
            <Trans>
              We could not load student submissions right now. Please try again.
            </Trans>
          }
          onRetry={loadSubmissions}
        />
      ) : (
        <DashboardTable>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Trans>Student</Trans>
                </TableCell>
                <TableCell>
                  <Trans>Assignment</Trans>
                </TableCell>
                <TableCell>
                  <Trans>Score</Trans>
                </TableCell>
                <TableCell>
                  <Trans>Status</Trans>
                </TableCell>
                <TableCell>
                  <Trans>Submitted time</Trans>
                </TableCell>
                <TableCell align="right">
                  <Trans>Actions</Trans>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography
                      sx={{ color: "#64748b", py: 4, textAlign: "center" }}
                    >
                      <Trans>No submissions yet.</Trans>
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {submissions.map((submission) => (
                <TableRow key={submission.id} hover>
                  <TableCell sx={{ fontWeight: 800 }}>
                    {submission.student?.name ||
                      submission.student?.email ||
                      submission.studentId ||
                      "-"}
                  </TableCell>
                  <TableCell>
                    {submission.assignment?.title ||
                      submission.lesson?.title ||
                      submission.assignmentId ||
                      "-"}
                  </TableCell>
                  <TableCell>{submission.score ?? 0}%</TableCell>
                  <TableCell>
                    <Chip
                      label={submission.status || t`Needs review`}
                      size="small"
                      color={
                        submission.status === "reviewed" ? "success" : "warning"
                      }
                      sx={{ borderRadius: 2, fontWeight: 800 }}
                    />
                  </TableCell>
                  <TableCell>{submission.submittedAt || "-"}</TableCell>
                  <TableCell align="right">
                    <Button size="small">
                      <Trans>Review</Trans>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DashboardTable>
      )}
    </DashboardContentCard>
  );
}
