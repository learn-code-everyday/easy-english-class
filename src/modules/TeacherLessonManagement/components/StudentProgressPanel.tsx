import { t, Trans } from "@lingui/macro";
import {
  Box,
  Grid,
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

import { useTeacherProgress } from "../hooks/useTeacherProgress";

export default function StudentProgressPanel() {
  const { loadError, loadProgress, progressRows, summary } =
    useTeacherProgress();

  return (
    <Grid container spacing={3}>
      {loadError ? (
        <Grid item xs={12}>
          <ErrorState
            title={<Trans>Student progress could not be loaded</Trans>}
            description={
              <Trans>
                We could not load student progress right now. Please try again.
              </Trans>
            }
            onRetry={loadProgress}
          />
        </Grid>
      ) : (
        <>
          {summary.map((item) => (
            <Grid item xs={12} md={4} key={item.label}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
                }}
              >
                <Typography sx={{ color: "#64748b", fontWeight: 700 }}>
                  {item.label}
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12}>
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
                <Trans>Progress overview</Trans>
              </Typography>
              <Box
                sx={{
                  minHeight: 220,
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Trans>Student</Trans>
                        </TableCell>
                        <TableCell>
                          <Trans>Submissions</Trans>
                        </TableCell>
                        <TableCell>
                          <Trans>Average score</Trans>
                        </TableCell>
                        <TableCell>
                          <Trans>Status</Trans>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {progressRows.map((row) => (
                        <TableRow
                          key={`${row.studentId || "student"}-${row.lessonId || "lesson"}`}
                          hover
                        >
                          <TableCell sx={{ fontWeight: 800 }}>
                            {row.studentId}
                          </TableCell>
                          <TableCell>{row.submissionCount || 0}</TableCell>
                          <TableCell>{row.bestScore || 0}%</TableCell>
                          <TableCell>
                            {row.passed ? t`Completed` : t`Needs review`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
}
