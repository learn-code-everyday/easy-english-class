import { t, Trans } from "@lingui/macro";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ErrorState from "@/components/ErrorState";

import { useTeacherSubmissions } from "../hooks/useTeacherSubmissions";

export default function StudentSubmissionsTable() {
  const { loadError, loadSubmissions, submissions } = useTeacherSubmissions();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
        <Trans>Submission queue</Trans>
      </Typography>
      {loadError ? (
        <ErrorState
          title={<Trans>Submissions could not be loaded</Trans>}
          description={
            <Trans>
              We could not load student submissions right now. Please try again.
            </Trans>
          }
          onRetry={loadSubmissions}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Trans>Student</Trans>
                </TableCell>
                <TableCell>
                  <Trans>Lesson</Trans>
                </TableCell>
                <TableCell>
                  <Trans>Score</Trans>
                </TableCell>
                <TableCell>
                  <Trans>Passed</Trans>
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
              {submissions.map((submission) => (
                <TableRow key={submission.id} hover>
                  <TableCell sx={{ fontWeight: 800 }}>
                    {submission.student?.name || submission.student?.email}
                  </TableCell>
                  <TableCell>{submission.lesson?.title}</TableCell>
                  <TableCell>{submission.score}%</TableCell>
                  <TableCell>
                    <Chip
                      label={submission.passed ? t`Passed` : t`Needs review`}
                      size="small"
                      color={submission.passed ? "success" : "warning"}
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
        </TableContainer>
      )}
    </Paper>
  );
}
