import { t, Trans } from "@lingui/macro";
import {
  Box,
  Grid,
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
  DashboardStatCard,
  DashboardTable,
} from "@/components/Dashboard";

import { useTeacherProgress } from "../hooks/useTeacherProgress";

export default function StudentProgressPanel() {
  const { loadError, loadProgress, progressRows, summary } =
    useTeacherProgress();

  return (
    <Grid container spacing={3}>
      {loadError ? (
        <Grid item xs={12}>
          <DashboardContentCard>
            <DashboardErrorState
              title={<Trans>Student progress could not be loaded</Trans>}
              description={
                <Trans>
                  We could not load student progress right now. Please try
                  again.
                </Trans>
              }
              onRetry={loadProgress}
            />
          </DashboardContentCard>
        </Grid>
      ) : (
        <>
          {summary.map((item) => (
            <Grid item xs={12} md={4} key={item.label}>
              <DashboardStatCard label={item.label} value={item.value} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <DashboardContentCard>
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
                      {progressRows.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Box
                              sx={{
                                color: "#64748b",
                                py: 4,
                                textAlign: "center",
                              }}
                            >
                              <Trans>No student progress yet.</Trans>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                      {progressRows.map((row) => (
                        <TableRow
                          key={`${row.studentId || "student"}-${row.assignmentId || "assignment"}`}
                          hover
                        >
                          <TableCell sx={{ fontWeight: 800 }}>
                            {row.studentId}
                          </TableCell>
                          <TableCell>{row.assignmentTitle || "-"}</TableCell>
                          <TableCell>{row.submissionCount || 0}</TableCell>
                          <TableCell>{row.bestScore || 0}%</TableCell>
                          <TableCell>
                            {row.status === "reviewed"
                              ? t`Reviewed`
                              : row.status || t`Needs review`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DashboardTable>
              </Box>
            </DashboardContentCard>
          </Grid>
        </>
      )}
    </Grid>
  );
}
