import { Trans } from "@lingui/macro";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import type { Lesson } from "@/services/lesson/lesson.model";

import LessonEmptyState from "./LessonEmptyState";
import {
  LessonActions,
  LessonSkillChip,
  LessonStatusChip,
} from "./LessonListActions";

export default function LessonMobileCards({
  deleteLesson,
  filteredLessons,
  isFilteredEmpty,
  loading,
  updateLessonStatus,
}: {
  deleteLesson: (lesson: Lesson) => void;
  filteredLessons: Lesson[];
  isFilteredEmpty: boolean;
  loading: boolean;
  updateLessonStatus: (lesson: Lesson, status: Lesson["status"]) => void;
}) {
  return (
    <Stack spacing={1.5} sx={{ display: { xs: "flex", md: "none" } }}>
      {loading && (
        <Paper
          elevation={0}
          sx={{ border: "1px solid #e2e8f0", borderRadius: 3, p: 2 }}
        >
          <Typography sx={{ color: "#64748b" }}>
            <Trans>Loading lessons...</Trans>
          </Typography>
        </Paper>
      )}
      {!loading &&
        filteredLessons.map((lesson) => (
          <Paper
            key={lesson.id || lesson.slug}
            elevation={0}
            sx={{ border: "1px solid #e2e8f0", borderRadius: 3, p: 2 }}
          >
            <Stack spacing={1.5}>
              <Box>
                <Typography
                  sx={{
                    color: "#0f172a",
                    fontWeight: 900,
                    overflowWrap: "anywhere",
                  }}
                >
                  {lesson.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: 13,
                    mt: 0.25,
                    overflowWrap: "anywhere",
                  }}
                >
                  {lesson.slug}
                </Typography>
              </Box>
              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label={lesson.level || "-"}
                  size="small"
                  sx={{ borderRadius: 2, fontWeight: 800 }}
                />
                <LessonSkillChip lesson={lesson} />
                <LessonStatusChip lesson={lesson} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={1}
                sx={{ color: "#64748b", fontSize: 13 }}
              >
                <Typography sx={{ color: "inherit", fontSize: "inherit" }}>
                  {lesson.estimatedMinutes ? (
                    <Trans>{lesson.estimatedMinutes} min</Trans>
                  ) : (
                    "-"
                  )}
                </Typography>
                <Typography sx={{ color: "inherit", fontSize: "inherit" }}>
                  {lesson.updatedAt || "-"}
                </Typography>
              </Stack>
              <LessonActions
                deleteLesson={deleteLesson}
                lesson={lesson}
                updateLessonStatus={updateLessonStatus}
              />
            </Stack>
          </Paper>
        ))}
      {!loading && filteredLessons.length === 0 && (
        <LessonEmptyState compact isFiltered={isFilteredEmpty} />
      )}
    </Stack>
  );
}
