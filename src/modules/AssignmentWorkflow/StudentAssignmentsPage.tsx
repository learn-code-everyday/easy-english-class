import { t, Trans } from "@lingui/macro";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import ErrorState from "@/components/ErrorState";
import { GetAuthToken } from "@/graphql/auth";
import { canAccessAssignments } from "@/helpers/auth-access";
import type { Assignment } from "@/services/assignment/assignment.model";
import { AssignmentService } from "@/services/assignment/assignment.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

import AssignmentEmptyState from "./AssignmentEmptyState";
import {
  getAssignmentDescription,
  getAssignmentTypeChip,
} from "./assignmentUi";

export default function StudentAssignmentsPage() {
  const router = useRouter();
  const token = GetAuthToken();
  const { auth, authStatus, verifiedToken } = useAuthStore();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const canOpenPage = canAccessAssignments(auth);
  const hasVerifiedToken = Boolean(token && verifiedToken === token);

  useEffect(() => {
    if (!router.isReady) return;
    if (!token) router.replace("/login");
    if (
      authStatus === AuthStatuses.LOADED &&
      hasVerifiedToken &&
      !canOpenPage
    ) {
      router.replace("/403");
    }
  }, [authStatus, canOpenPage, hasVerifiedToken, router, token]);

  const loadAssignments = useCallback(() => {
    if (authStatus !== AuthStatuses.LOADED || !hasVerifiedToken || !canOpenPage)
      return;
    setLoadError(false);
    setLoading(true);
    AssignmentService.assignmentList()
      .then(setAssignments)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [authStatus, canOpenPage, hasVerifiedToken]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  if (
    !token ||
    !hasVerifiedToken ||
    authStatus !== AuthStatuses.LOADED ||
    !canOpenPage
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "calc(100vh - 152px)",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Box>
            <Chip
              label={t`Homework`}
              sx={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                fontWeight: 900,
                mb: 2,
              }}
            />
            <Typography variant="h3" sx={{ fontWeight: 900 }}>
              <Trans>Your assignments</Trans>
            </Typography>
            <Typography sx={{ color: "#64748b", mt: 1 }}>
              <Trans>
                Open homework, complete quiz questions, or upload your work.
              </Trans>
            </Typography>
          </Box>
          {loadError ? (
            <ErrorState
              title={<Trans>Assignments could not be loaded</Trans>}
              description={<Trans>Please try again later.</Trans>}
              onRetry={loadAssignments}
            />
          ) : !loading && assignments.length === 0 ? (
            <AssignmentEmptyState
              title={<Trans>No assignments yet</Trans>}
              description={
                <Trans>Your teacher will publish homework here.</Trans>
              }
            />
          ) : (
            <Grid container spacing={2.5}>
              {loading && (
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{ border: "1px solid #e2e8f0", borderRadius: 3, p: 3 }}
                  >
                    <Trans>Loading assignments...</Trans>
                  </Paper>
                </Grid>
              )}
              {!loading &&
                assignments.map((assignment) => (
                  <Grid item xs={12} md={6} lg={4} key={assignment.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        border: "1px solid #e2e8f0",
                        borderRadius: 3,
                        height: "100%",
                        p: 2.5,
                      }}
                    >
                      <Stack spacing={2} sx={{ height: "100%" }}>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={getAssignmentTypeChip(assignment)}
                            size="small"
                          />
                          <Chip
                            label={assignment.status || t`Published`}
                            size="small"
                          />
                        </Stack>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontWeight: 900 }}>
                            {assignment.title}
                          </Typography>
                          <Typography sx={{ color: "#64748b", mt: 1 }}>
                            {getAssignmentDescription(assignment)}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                          <Trans>Due date</Trans>: {assignment.deadline || "-"}
                        </Typography>
                        <Button
                          component={Link}
                          href={`/assignments/${assignment.id}`}
                          endIcon={<ArrowForwardRoundedIcon />}
                          variant="contained"
                          sx={{ borderRadius: 2, textTransform: "none" }}
                        >
                          <Trans>Open assignment</Trans>
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
