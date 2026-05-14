import { t, Trans } from "@lingui/macro";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import { Button, Chip, Stack } from "@mui/material";
import Link from "next/link";

import type { Lesson } from "@/services/lesson/lesson.model";

export function LessonActions({
  deleteLesson,
  lesson,
  updateLessonStatus,
}: {
  deleteLesson: (lesson: Lesson) => void;
  lesson: Lesson;
  updateLessonStatus: (lesson: Lesson, status: Lesson["status"]) => void;
}) {
  return (
    <Stack
      direction="row"
      justifyContent={{ xs: "flex-start", md: "flex-end" }}
      sx={{ flexWrap: "wrap", gap: 1 }}
    >
      <Button
        component={Link}
        href={`/manage/teacher/lessons/${lesson.id}/edit`}
        size="small"
        startIcon={<EditIcon />}
      >
        <Trans>Edit</Trans>
      </Button>
      <Button
        size="small"
        startIcon={<PublishIcon />}
        onClick={() => updateLessonStatus(lesson, "published")}
      >
        <Trans>Publish</Trans>
      </Button>
      <Button
        size="small"
        color="inherit"
        startIcon={<ArchiveIcon />}
        onClick={() => updateLessonStatus(lesson, "archived")}
      >
        <Trans>Archive</Trans>
      </Button>
      <Button
        size="small"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => deleteLesson(lesson)}
      >
        <Trans>Delete</Trans>
      </Button>
    </Stack>
  );
}

export function LessonStatusChip({ lesson }: { lesson: Lesson }) {
  return (
    <Chip
      label={lesson.status || t`Draft`}
      size="small"
      color={
        lesson.status === "published"
          ? "success"
          : lesson.status === "archived"
            ? "default"
            : "warning"
      }
      sx={{ borderRadius: 2, fontWeight: 800 }}
    />
  );
}

export function LessonSkillChip({ lesson }: { lesson: Lesson }) {
  return (
    <Chip
      label={lesson.skillType || "-"}
      size="small"
      sx={{
        backgroundColor: "#eff6ff",
        borderRadius: 2,
        color: "#1d4ed8",
        fontWeight: 800,
      }}
    />
  );
}
