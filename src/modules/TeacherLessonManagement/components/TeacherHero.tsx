import { Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Link from "next/link";

import { DashboardPageHeader } from "@/components/Dashboard";

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
    <DashboardPageHeader
      eyebrow={<MetaText type="eyebrow" value={meta.eyebrow} />}
      title={<MetaText type="title" value={meta.title} />}
      description={<MetaText type="description" value={meta.description} />}
      action={
        mode === "lesson-management" ? (
          <Button
            component={Link}
            href={CREATE_LESSON_PATH}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: "8px",
              fontWeight: 900,
              textTransform: "none",
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Trans>Create Lesson</Trans>
          </Button>
        ) : undefined
      }
    />
  );
}
