import { t, Trans } from "@lingui/macro";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

import {
  DashboardContentCard,
  DashboardEmptyState,
  DashboardErrorState,
  DashboardPage,
  DashboardPageHeader,
  DashboardTable,
} from "@/components/Dashboard";
import { isStudent } from "@/helpers/auth-access";
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
  const canViewSubmissions = isStudent(auth);

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
    <DashboardPage>
      <DashboardPageHeader
        eyebrow={<Trans>Learning</Trans>}
        title={<Trans>Submissions/Scores</Trans>}
        description={<Trans>Review your submitted lessons and scores.</Trans>}
      />
      {loadError ? (
        <DashboardContentCard>
          <DashboardErrorState
            title={<Trans>Submissions could not be loaded</Trans>}
            description={
              <Trans>
                We could not load your submissions right now. Please try again.
              </Trans>
            }
            onRetry={loadSubmissions}
          />
        </DashboardContentCard>
      ) : (
        <DashboardContentCard>
          <DashboardTable>
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
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <DashboardEmptyState
                        title={<Trans>No submissions yet</Trans>}
                        description={
                          <Trans>
                            Submitted lesson attempts will appear here.
                          </Trans>
                        }
                      />
                    </TableCell>
                  </TableRow>
                )}
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
          </DashboardTable>
        </DashboardContentCard>
      )}
    </DashboardPage>
  );
}

StudentSubmissionsPage.Layout = AdminLayout;
