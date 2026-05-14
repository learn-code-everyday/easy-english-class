import { Trans } from "@lingui/macro";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import LessonEmptyState from "./LessonEmptyState";
import LessonErrorState from "./LessonErrorState";
import {
  LessonActions,
  LessonSkillChip,
  LessonStatusChip,
} from "./LessonListActions";
import LessonListFilters from "./LessonListFilters";
import LessonMobileCards from "./LessonMobileCards";
import { useTeacherLessons } from "../hooks/useTeacherLessons";

export default function LessonListTable() {
  const {
    deleteLesson,
    filteredLessons,
    lessons,
    levelFilter,
    loadError,
    loading,
    loadLessons,
    search,
    setLevelFilter,
    setSearch,
    setStatusFilter,
    statusFilter,
    updateLessonStatus,
  } = useTeacherLessons();
  const isFilteredEmpty = lessons.length > 0 && filteredLessons.length === 0;

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: "100%",
        minWidth: 0,
        overflow: "hidden",
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Stack direction="column" spacing={2.5} sx={{ mb: 3, minWidth: 0 }}>
        <Box sx={{ minWidth: 0, width: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            <Trans>Lesson workspace</Trans>
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              color: "#64748b",
              maxWidth: 720,
              overflowWrap: "normal",
              wordBreak: "normal",
            }}
          >
            <Trans>Manage draft and published lessons in one place.</Trans>
          </Typography>
        </Box>
        <LessonListFilters
          levelFilter={levelFilter}
          search={search}
          setLevelFilter={setLevelFilter}
          setSearch={setSearch}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
        />
      </Stack>
      {loadError ? (
        <LessonErrorState onRetry={loadLessons} />
      ) : (
        <>
          <TableContainer
            sx={{
              display: {
                xs: !loading && filteredLessons.length === 0 ? "block" : "none",
                md: "block",
              },
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 980 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 300, width: "34%" }}>
                    <Trans>Lesson</Trans>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", width: 120 }}>
                    <Trans>Level</Trans>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", width: 140 }}>
                    <Trans>Skill Type</Trans>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", width: 120 }}>
                    <Trans>Status</Trans>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", width: 140 }}>
                    <Trans>Estimated Time</Trans>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", width: 150 }}>
                    <Trans>Updated At</Trans>
                  </TableCell>
                  <TableCell align="right" sx={{ width: 210 }}>
                    <Trans>Actions</Trans>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ color: "#64748b", py: 4 }}>
                      <Trans>Loading lessons...</Trans>
                    </TableCell>
                  </TableRow>
                )}
                {!loading && filteredLessons.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ borderBottom: 0, py: 4 }}>
                      <LessonEmptyState isFiltered={isFilteredEmpty} />
                    </TableCell>
                  </TableRow>
                )}
                {!loading &&
                  filteredLessons.map((lesson) => (
                    <TableRow key={lesson.id || lesson.slug} hover>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          minWidth: 300,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {lesson.title}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {lesson.level}
                      </TableCell>
                      <TableCell>
                        <LessonSkillChip lesson={lesson} />
                      </TableCell>
                      <TableCell>
                        <LessonStatusChip lesson={lesson} />
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {lesson.estimatedMinutes ? (
                          <Trans>{lesson.estimatedMinutes} min</Trans>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {lesson.updatedAt || "-"}
                      </TableCell>
                      <TableCell align="right">
                        <LessonActions
                          deleteLesson={deleteLesson}
                          lesson={lesson}
                          updateLessonStatus={updateLessonStatus}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {(loading || filteredLessons.length > 0) && (
            <LessonMobileCards
              deleteLesson={deleteLesson}
              filteredLessons={filteredLessons}
              isFilteredEmpty={isFilteredEmpty}
              loading={loading}
              updateLessonStatus={updateLessonStatus}
            />
          )}
        </>
      )}
    </Paper>
  );
}
