import { t, Trans } from "@lingui/macro";
import {
  Box,
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
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

import ErrorState from "@/components/ErrorState";
import { isStudentUser } from "@/helpers/auth-access";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import type { TeacherSubmission } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function StudentSubmissionsPage() {
  const router = useRouter();
  const { auth, authStatus } = useAuthStore();
  const [loadError, setLoadError] = useState(false);
  const [rows, setRows] = useState<TeacherSubmission[]>([]);
  const canViewSubmissions = isStudentUser(auth);

  useEffect(() => {
    if (authStatus === AuthStatuses.LOADED && !canViewSubmissions) {
      router.replace("/403?admin=1");
    }
  }, [authStatus, canViewSubmissions, router]);

  const loadSubmissions = useCallback(() => {
    if (authStatus !== AuthStatuses.LOADED || !canViewSubmissions) return;

    setLoadError(false);
    LessonService.mySubmissions()
      .then(setRows)
      .catch(() => {
        setLoadError(true);
      });
  }, [authStatus, canViewSubmissions]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  if (authStatus !== AuthStatuses.LOADED || !canViewSubmissions) return null;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
        <Trans>Submissions/Scores</Trans>
      </Typography>
      {loadError ? (
        <ErrorState
          title={<Trans>Submissions could not be loaded</Trans>}
          description={
            <Trans>
              We could not load your submissions right now. Please try again.
            </Trans>
          }
          onRetry={loadSubmissions}
        />
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Trans>Lesson</Trans>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id || row.lesson?.slug} hover>
                    <TableCell sx={{ fontWeight: 800 }}>
                      {row.lesson?.title || "-"}
                    </TableCell>
                    <TableCell>{row.score || 0}%</TableCell>
                    <TableCell>
                      <Chip
                        label={row.passed ? t`Passed` : t`Needs review`}
                        size="small"
                        sx={{ borderRadius: 2, fontWeight: 800 }}
                      />
                    </TableCell>
                    <TableCell>{row.submittedAt || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}

StudentSubmissionsPage.Layout = AdminLayout;
