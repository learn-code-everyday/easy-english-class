import { Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { CREATE_LESSON_PATH, PAGE_META_KEYS } from "../constants";
import type { LessonManagementMode } from "../types";

function MetaText({
  type,
  value,
}: {
  type: "description" | "eyebrow" | "title";
  value: string;
}) {
  if (type === "eyebrow") {
    if (value === "exerciseBuilder") return <Trans>Exercise Builder</Trans>;
    if (value === "learningAnalytics") return <Trans>Learning Analytics</Trans>;
    if (value === "lessonEditor") return <Trans>Lesson Editor</Trans>;
    if (value === "reviewQueue") return <Trans>Review Queue</Trans>;
    return <Trans>Teacher Workspace</Trans>;
  }

  if (type === "title") {
    if (value === "createExercise") return <Trans>Create Exercise</Trans>;
    if (value === "createLesson") return <Trans>Create Lesson</Trans>;
    if (value === "editLesson") return <Trans>Edit Lesson</Trans>;
    if (value === "studentProgress") return <Trans>Student Progress</Trans>;
    if (value === "studentSubmissions") {
      return <Trans>Student Submissions</Trans>;
    }
    return <Trans>Lesson Management</Trans>;
  }

  if (value === "exerciseBuilderDescription") {
    return (
      <Trans>
        Draft practice prompts, quiz tasks, and speaking activities for your
        lessons.
      </Trans>
    );
  }
  if (value === "studentSubmissionsDescription") {
    return (
      <Trans>
        Review submitted exercises, leave feedback, and track completion status.
      </Trans>
    );
  }
  if (value === "studentProgressDescription") {
    return (
      <Trans>
        Monitor lesson progress, practice consistency, and skill improvement.
      </Trans>
    );
  }
  if (value === "editLessonDescription") {
    return (
      <Trans>
        Update lesson structure, objectives, and practice activities in one
        place.
      </Trans>
    );
  }

  return (
    <Trans>
      Create, organize, and review lesson content before publishing it to
      students.
    </Trans>
  );
}

export default function TeacherHero({ mode }: { mode: LessonManagementMode }) {
  const meta = PAGE_META_KEYS[mode];

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(37,99,235,0.88))",
        color: "#ffffff",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: "#bfdbfe", fontWeight: 900, letterSpacing: 1.4 }}
      >
        <MetaText type="eyebrow" value={meta.eyebrow} />
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        gap={2}
        sx={{ mt: 1, minWidth: 0 }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 28, md: 34 },
              fontWeight: 900,
              letterSpacing: 0,
              lineHeight: 1.15,
              overflowWrap: "anywhere",
            }}
          >
            <MetaText type="title" value={meta.title} />
          </Typography>
          <Typography
            sx={{
              mt: 1,
              maxWidth: 680,
              color: "#dbeafe",
              overflowWrap: "anywhere",
            }}
          >
            <MetaText type="description" value={meta.description} />
          </Typography>
        </Box>
        {mode === "lesson-management" && (
          <Button
            component={Link}
            href={CREATE_LESSON_PATH}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              borderRadius: 999,
              backgroundColor: "#ffffff",
              color: "#1d4ed8",
              flexShrink: 0,
              textTransform: "none",
              "&:hover": { backgroundColor: "#eff6ff" },
            }}
          >
            <Trans>Create Lesson</Trans>
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
