import { t, Trans } from "@lingui/macro";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  DashboardContentCard,
  DashboardEmptyState,
  DashboardErrorState,
  DashboardPage,
  DashboardPageHeader,
} from "@/components/Dashboard";
import { AssignmentService } from "@/services/assignment/assignment.repo";
import type { AssignmentSubmission } from "@/services/assignment-submission/assignment-submission.model";

function ReviewControls({
  onReviewed,
  submission,
}: {
  onReviewed: () => void;
  submission: AssignmentSubmission;
}) {
  const [feedback, setFeedback] = useState(submission.feedback || "");
  const [score, setScore] = useState(String(submission.score || ""));
  const [saving, setSaving] = useState(false);

  const submitReview = async (status: "need_retry" | "reviewed") => {
    setSaving(true);
    try {
      await AssignmentService.teacherReviewSubmission({
        feedback,
        score: Number(score || 0),
        status,
        submissionId: submission.id,
      });
      toast.success(t`Submission reviewed successfully`);
      onReviewed();
    } catch {
      toast.error(t`Failed to review submission`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={1.5}>
      <TextField
        label={<Trans>Score</Trans>}
        type="number"
        value={score}
        onChange={(event) => setScore(event.target.value)}
        size="small"
      />
      <TextField
        label={<Trans>Teacher feedback</Trans>}
        value={feedback}
        onChange={(event) => setFeedback(event.target.value)}
        multiline
        minRows={2}
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <Button
          disabled={saving}
          onClick={() => submitReview("reviewed")}
          variant="contained"
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          <Trans>Mark reviewed</Trans>
        </Button>
        <Button
          disabled={saving}
          color="warning"
          onClick={() => submitReview("need_retry")}
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          <Trans>Needs retry</Trans>
        </Button>
      </Stack>
    </Stack>
  );
}

export default function TeacherSubmissionReview() {
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);

  const loadSubmissions = useCallback(() => {
    setLoadError(false);
    setLoading(true);
    AssignmentService.teacherSubmissionList()
      .then(setSubmissions)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  if (loadError) {
    return (
      <DashboardPage>
        <DashboardPageHeader
          eyebrow={<Trans>Teaching</Trans>}
          title={<Trans>Student Submissions</Trans>}
          description={
            <Trans>
              Preview submitted files, add feedback, and request retries.
            </Trans>
          }
        />
        <DashboardContentCard>
          <DashboardErrorState
            title={<Trans>Submissions could not be loaded</Trans>}
            description={<Trans>Please try again later.</Trans>}
            onRetry={loadSubmissions}
          />
        </DashboardContentCard>
      </DashboardPage>
    );
  }

  if (!loading && submissions.length === 0) {
    return (
      <DashboardPage>
        <DashboardPageHeader
          eyebrow={<Trans>Teaching</Trans>}
          title={<Trans>Student Submissions</Trans>}
          description={
            <Trans>
              Preview submitted files, add feedback, and request retries.
            </Trans>
          }
        />
        <DashboardContentCard>
          <DashboardEmptyState
            title={<Trans>No submissions yet</Trans>}
            description={
              <Trans>
                Student homework submissions will appear here for review.
              </Trans>
            }
          />
        </DashboardContentCard>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage>
      <DashboardPageHeader
        eyebrow={<Trans>Teaching</Trans>}
        title={<Trans>Student Submissions</Trans>}
        description={
          <Trans>
            Preview submitted files, add feedback, and request retries.
          </Trans>
        }
      />
      <DashboardContentCard>
        {loading ? (
          <Paper
            elevation={0}
            sx={{ border: "1px solid #e2e8f0", borderRadius: 3, p: 3 }}
          >
            <Trans>Loading submissions...</Trans>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {submissions.map((submission) => {
              const previewUrl =
                submission.uploadedFiles?.[0] || submission.fileUrl;

              return (
                <Grid item xs={12} lg={6} key={submission.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 3,
                      p: 2.5,
                    }}
                  >
                    <Stack spacing={2}>
                      <Box>
                        <Typography sx={{ fontWeight: 900 }}>
                          {submission.assignment?.title || "-"}
                        </Typography>
                        <Typography sx={{ color: "#64748b" }}>
                          {submission.student?.name ||
                            submission.student?.email ||
                            "-"}
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: "wrap" }}
                      >
                        <Chip
                          label={submission.status || t`Submitted`}
                          size="small"
                        />
                        <Chip
                          label={`${submission.score || 0}%`}
                          size="small"
                        />
                      </Stack>
                      {previewUrl && (
                        <Button
                          href={previewUrl}
                          target="_blank"
                          rel="noreferrer"
                          variant="outlined"
                          sx={{ alignSelf: "flex-start", borderRadius: 2 }}
                        >
                          <Trans>Preview submission</Trans>
                        </Button>
                      )}
                      <Typography sx={{ color: "#475569" }}>
                        {submission.note || "-"}
                      </Typography>
                      <ReviewControls
                        submission={submission}
                        onReviewed={loadSubmissions}
                      />
                    </Stack>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}
      </DashboardContentCard>
    </DashboardPage>
  );
}
