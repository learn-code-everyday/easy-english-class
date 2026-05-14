import { Trans } from "@lingui/macro";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import ErrorState from "@/components/ErrorState";
import { GetAuthToken } from "@/graphql/auth";
import { canAccessAssignments } from "@/helpers/auth-access";
import type {
  Assignment,
  AssignmentContent,
} from "@/services/assignment/assignment.model";
import {
  AssignmentService,
  getAssignmentContent,
  getAssignmentType,
} from "@/services/assignment/assignment.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

type SubmitValues = {
  answers: Record<string, string>;
  fileUrl: string;
  note: string;
};

export default function StudentAssignmentDetailPage() {
  const router = useRouter();
  const token = GetAuthToken();
  const { auth, authStatus, verifiedToken } = useAuthStore();
  const assignmentId =
    typeof router.query.id === "string" ? router.query.id : "";
  const [assignment, setAssignment] = useState<Assignment>();
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, reset } = useForm<SubmitValues>({
    defaultValues: { answers: {}, fileUrl: "", note: "" },
  });
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

  const loadAssignment = useCallback(() => {
    if (
      !assignmentId ||
      authStatus !== AuthStatuses.LOADED ||
      !hasVerifiedToken ||
      !canOpenPage
    ) {
      return;
    }
    setLoadError(false);
    setLoading(true);
    AssignmentService.assignmentGet(assignmentId)
      .then(setAssignment)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [assignmentId, authStatus, canOpenPage, hasVerifiedToken]);

  useEffect(() => {
    loadAssignment();
  }, [loadAssignment]);

  const onSubmit = async (values: SubmitValues) => {
    if (!assignment) return;
    setSaving(true);
    try {
      await AssignmentService.assignmentSubmit(
        {
          answers: Object.entries(values.answers || {}).map(
            ([questionId, answer]) => ({
              answer,
              questionId,
            })
          ),
          assignmentId: assignment.id,
          fileUrl: values.fileUrl,
          note: values.note,
        },
        auth?.id
      );
      toast.success((<Trans>Assignment submitted successfully</Trans>) as any);
      reset({ answers: {}, fileUrl: "", note: "" });
    } catch {
      toast.error((<Trans>Failed to submit assignment</Trans>) as any);
    } finally {
      setSaving(false);
    }
  };

  if (
    !token ||
    !hasVerifiedToken ||
    authStatus !== AuthStatuses.LOADED ||
    !canOpenPage
  ) {
    return null;
  }

  const content: AssignmentContent = assignment
    ? getAssignmentContent(assignment)
    : {};
  const assignmentType = assignment ? getAssignmentType(assignment) : "QUIZ";

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "calc(100vh - 152px)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        {loadError ? (
          <ErrorState
            title={<Trans>Assignment could not be loaded</Trans>}
            description={<Trans>Please try again later.</Trans>}
            onRetry={loadAssignment}
          />
        ) : loading || !assignment ? (
          <Paper
            elevation={0}
            sx={{ border: "1px solid #e2e8f0", borderRadius: 3, p: 3 }}
          >
            <Trans>Loading assignment...</Trans>
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: 4,
              p: { xs: 2, md: 3 },
            }}
          >
            <Stack
              component="form"
              spacing={3}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  {assignment.title}
                </Typography>
                <Typography sx={{ color: "#64748b", mt: 1 }}>
                  {content.description}
                </Typography>
                <Typography sx={{ color: "#475569", mt: 2 }}>
                  {content.instructions}
                </Typography>
              </Box>
              {assignmentType === "QUIZ" &&
                (content.questions || []).map((question, index) => (
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 3,
                      p: 2,
                    }}
                    key={`${question.prompt}-${index}`}
                  >
                    <Stack spacing={1.5}>
                      <Typography sx={{ fontWeight: 900 }}>
                        {question.prompt}
                      </Typography>
                      <Controller
                        control={control}
                        name={`answers.${String(index)}`}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={<Trans>Your answer</Trans>}
                            fullWidth
                          />
                        )}
                      />
                    </Stack>
                  </Paper>
                ))}
              {assignmentType === "LINK" && content.externalUrl && (
                <Button
                  href={content.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  sx={{ alignSelf: "flex-start", borderRadius: 2 }}
                >
                  <Trans>Open external assignment</Trans>
                </Button>
              )}
              {assignmentType === "IMAGE" && assignment.attachmentUrl && (
                <Button
                  href={assignment.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  sx={{ alignSelf: "flex-start", borderRadius: 2 }}
                >
                  <Trans>Open worksheet</Trans>
                </Button>
              )}
              {assignmentType !== "QUIZ" && (
                <Controller
                  control={control}
                  name="fileUrl"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={<Trans>Screenshot or completed work URL</Trans>}
                      fullWidth
                    />
                  )}
                />
              )}
              <Controller
                control={control}
                name="note"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={<Trans>Note</Trans>}
                    multiline
                    minRows={3}
                    fullWidth
                  />
                )}
              />
              <Button
                disabled={saving}
                type="submit"
                variant="contained"
                sx={{
                  alignSelf: "flex-start",
                  borderRadius: 2,
                  fontWeight: 900,
                }}
              >
                <Trans>Submit assignment</Trans>
              </Button>
            </Stack>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
