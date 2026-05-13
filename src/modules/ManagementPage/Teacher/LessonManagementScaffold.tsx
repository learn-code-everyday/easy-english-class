import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { isTeacherUser } from "@/helpers/auth-access";
import type {
  Lesson,
  LessonInput,
  LessonQuestionType,
  StudentProgress,
  TeacherSubmission,
} from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

type LessonManagementScaffoldProps = {
  mode:
    | "create-exercise"
    | "create-lesson"
    | "edit-lesson"
    | "lesson-management"
    | "student-progress"
    | "student-submissions";
};

type QuestionDraft = {
  correctAnswer: string;
  explanation: string;
  id: string;
  options: string[];
  prompt: string;
  score: number;
  type: "fill_blank" | "multiple_choice" | "speaking";
};

const pageMeta = {
  "lesson-management": {
    eyebrow: <Trans>Teacher Workspace</Trans>,
    title: <Trans>Lesson Management</Trans>,
    description: (
      <Trans>
        Create, organize, and review lesson content before publishing it to
        students.
      </Trans>
    ),
  },
  "create-exercise": {
    eyebrow: <Trans>Exercise Builder</Trans>,
    title: <Trans>Create Exercise</Trans>,
    description: (
      <Trans>
        Draft practice prompts, quiz tasks, and speaking activities for your
        lessons.
      </Trans>
    ),
  },
  "student-submissions": {
    eyebrow: <Trans>Review Queue</Trans>,
    title: <Trans>Student Submissions</Trans>,
    description: (
      <Trans>
        Review submitted exercises, leave feedback, and track completion status.
      </Trans>
    ),
  },
  "student-progress": {
    eyebrow: <Trans>Learning Analytics</Trans>,
    title: <Trans>Student Progress</Trans>,
    description: (
      <Trans>
        Monitor lesson progress, practice consistency, and skill improvement.
      </Trans>
    ),
  },
  "edit-lesson": {
    eyebrow: <Trans>Lesson Editor</Trans>,
    title: <Trans>Edit Lesson</Trans>,
    description: (
      <Trans>
        Update lesson structure, objectives, and practice activities in one
        place.
      </Trans>
    ),
  },
  "create-lesson": {
    eyebrow: <Trans>Lesson Editor</Trans>,
    title: <Trans>Create Lesson</Trans>,
    description: (
      <Trans>
        Create, organize, and review lesson content before publishing it to
        students.
      </Trans>
    ),
  },
};

const LessonManagementScaffold: React.FC<LessonManagementScaffoldProps> = ({
  mode,
}) => {
  const meta = pageMeta[mode];
  const router = useRouter();
  const { auth, authStatus } = useAuthStore();
  const canManageTeacherLessons = isTeacherUser(auth);

  useEffect(() => {
    if (authStatus === AuthStatuses.LOADED && !canManageTeacherLessons) {
      router.replace("/403");
    }
  }, [authStatus, canManageTeacherLessons, router]);

  if (authStatus !== AuthStatuses.LOADED || !canManageTeacherLessons) {
    return null;
  }

  return (
    <Box>
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
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: "#bfdbfe", fontWeight: 900, letterSpacing: 1.4 }}
        >
          {meta.eyebrow}
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          gap={2}
          sx={{ mt: 1 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              {meta.title}
            </Typography>
            <Typography sx={{ mt: 1, maxWidth: 680, color: "#dbeafe" }}>
              {meta.description}
            </Typography>
          </Box>
          {mode === "lesson-management" && (
            <Button
              component={Link}
              href="/manage/teacher/lessons/create"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                alignSelf: { xs: "flex-start", sm: "center" },
                borderRadius: 999,
                backgroundColor: "#ffffff",
                color: "#1d4ed8",
                textTransform: "none",
                "&:hover": { backgroundColor: "#eff6ff" },
              }}
            >
              <Trans>Create Lesson</Trans>
            </Button>
          )}
        </Stack>
      </Paper>

      {mode === "lesson-management" && <LessonListScaffold />}
      {(mode === "create-lesson" || mode === "edit-lesson") && (
        <ExerciseBuilderScaffold
          lessonId={
            typeof router.query.lessonId === "string"
              ? router.query.lessonId
              : undefined
          }
        />
      )}
      {mode === "create-exercise" && <ExerciseBuilderScaffold />}
      {mode === "student-submissions" && <StudentSubmissionsScaffold />}
      {mode === "student-progress" && <StudentProgressScaffold />}
    </Box>
  );
};

function LessonListScaffold() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLessons = async () => {
    setLoading(true);
    try {
      setLessons(await LessonService.teacherLessonList());
    } catch (error: any) {
      toast.error(error?.message || t`Failed to load lessons`);
    } finally {
      setLoading(false);
    }
  };

  const updateLessonStatus = async (
    lesson: Lesson,
    status: Lesson["status"]
  ) => {
    if (!lesson.id) return;

    try {
      if (status === "published") {
        await LessonService.lessonPublish(lesson.id);
      } else if (status === "archived") {
        await LessonService.lessonArchive(lesson.id);
      }
      toast.success(t`Lesson updated successfully`);
      loadLessons();
    } catch (error: any) {
      toast.error(error?.message || t`Failed to update lesson`);
    }
  };

  const deleteLesson = async (lesson: Lesson) => {
    if (!lesson.id) return;

    try {
      await LessonService.lessonDelete(lesson.id);
      toast.success(t`Lesson deleted successfully`);
      loadLessons();
    } catch (error: any) {
      toast.error(error?.message || t`Failed to delete lesson`);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        gap={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            <Trans>Lesson workspace</Trans>
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#64748b" }}>
            <Trans>Manage draft and published lessons in one place.</Trans>
          </Typography>
        </Box>
        <TextField
          size="small"
          placeholder={t`Search lessons...`}
          InputProps={{ startAdornment: <SearchIcon color="disabled" /> }}
          sx={{ minWidth: { md: 280 } }}
        />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Trans>Lesson</Trans>
              </TableCell>
              <TableCell>
                <Trans>Level</Trans>
              </TableCell>
              <TableCell>
                <Trans>Status</Trans>
              </TableCell>
              <TableCell>
                <Trans>Modules</Trans>
              </TableCell>
              <TableCell>
                <Trans>Updated</Trans>
              </TableCell>
              <TableCell align="right">
                <Trans>Actions</Trans>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id || lesson.slug} hover>
                <TableCell sx={{ fontWeight: 800 }}>{lesson.title}</TableCell>
                <TableCell>{lesson.level}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{lesson.questions?.length || 0}</TableCell>
                <TableCell>{lesson.updatedAt || "-"}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
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
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteLesson(lesson)}
                    >
                      <Trans>Delete</Trans>
                    </Button>
                    <Button
                      size="small"
                      color="inherit"
                      startIcon={<ArchiveIcon />}
                      onClick={() => updateLessonStatus(lesson, "archived")}
                    >
                      <Trans>Archive</Trans>
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {!loading && lessons.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <Trans>No lessons found.</Trans>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function LessonEditorScaffold() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
            <Trans>Lesson details</Trans>
          </Typography>
          <Stack spacing={2.5}>
            <TextField label={<Trans>Lesson title</Trans>} fullWidth />
            <TextField label={<Trans>Learning objective</Trans>} fullWidth />
            <TextField
              label={<Trans>Lesson description</Trans>}
              minRows={5}
              multiline
              fullWidth
            />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
            <Trans>Publishing checklist</Trans>
          </Typography>
          <Stack spacing={1.5}>
            {[
              <Trans key="dialogue">Dialogue</Trans>,
              <Trans key="quiz">Quiz</Trans>,
              <Trans key="speaking">Speaking practice</Trans>,
            ].map((item, index) => (
              <Chip
                key={index}
                label={item}
                color={index === 0 ? "primary" : "default"}
                variant={index === 0 ? "filled" : "outlined"}
                sx={{ justifyContent: "flex-start", borderRadius: 2 }}
              />
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

function ExerciseBuilderScaffold({ lessonId }: { lessonId?: string }) {
  const [form, setForm] = useState<LessonInput>({
    assignedToClassIds: [],
    estimatedMinutes: 30,
    level: "beginner",
    objectives: [],
    skillType: "",
    slug: "",
    status: "draft",
    title: "",
  });
  const [saving, setSaving] = useState(false);
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    {
      correctAnswer: "",
      explanation: "",
      id: "question-1",
      prompt: "",
      score: 10,
      type: "multiple_choice",
      options: ["", "", "", ""],
    },
  ]);

  useEffect(() => {
    if (!lessonId) return;

    LessonService.teacherLessonList()
      .then((lessons) => {
        const lesson = lessons.find((item) => item.id === lessonId);

        if (!lesson) return;

        setForm({
          assignedToClassIds: lesson.assignedToClassIds || [],
          estimatedMinutes: lesson.estimatedMinutes || 0,
          level: lesson.level || "beginner",
          objectives: lesson.objectives || [],
          skillType: lesson.skillType || "",
          slug: lesson.slug,
          status: lesson.status || "draft",
          title: lesson.title,
        });

        if (lesson.questions?.length) {
          setQuestions(
            lesson.questions.map((question, index) => ({
              correctAnswer: question.correctAnswer || "",
              explanation: question.explanation || "",
              id: question.id || `question-${index + 1}`,
              options: (question.options || []).map((option) => option.value),
              prompt: question.prompt,
              score: question.score || 0,
              type: question.type,
            }))
          );
        }
      })
      .catch((error) => {
        toast.error(error?.message || t`Failed to load lesson`);
      });
  }, [lessonId]);

  const addQuestion = () => {
    setQuestions((current) => [
      ...current,
      {
        id: `question-${current.length + 1}`,
        correctAnswer: "",
        explanation: "",
        prompt: "",
        score: 10,
        type: "multiple_choice",
        options: ["", ""],
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((current) =>
      current.length === 1 ? current : current.filter((item) => item.id !== id)
    );
  };

  const updateQuestion = (
    id: string,
    data: Partial<Omit<QuestionDraft, "id">>
  ) => {
    setQuestions((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
              options:
                data.type && data.type !== "multiple_choice"
                  ? []
                  : data.type === "multiple_choice" && item.options.length === 0
                    ? ["", ""]
                    : data.options || item.options,
            }
          : item
      )
    );
  };

  const addOption = (id: string) => {
    setQuestions((current) =>
      current.map((item) =>
        item.id === id ? { ...item, options: [...item.options, ""] } : item
      )
    );
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions((current) =>
      current.map((item) =>
        item.id === questionId
          ? {
              ...item,
              options:
                item.options.length <= 2
                  ? item.options
                  : item.options.filter((_, index) => index !== optionIndex),
            }
          : item
      )
    );
  };

  const saveLesson = async () => {
    setSaving(true);
    try {
      const payload: LessonInput = {
        ...form,
        estimatedMinutes: Number(form.estimatedMinutes || 0),
        questions: questions.map((question) => ({
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          options:
            question.type === "multiple_choice"
              ? question.options
                  .filter(Boolean)
                  .map((option) => ({ label: option, value: option }))
              : [],
          prompt: question.prompt,
          score: Number(question.score || 0),
          type: question.type,
        })),
      };

      if (lessonId) {
        await LessonService.lessonUpdate(lessonId, payload);
        if (form.status === "published")
          await LessonService.lessonPublish(lessonId);
        if (form.status === "archived")
          await LessonService.lessonArchive(lessonId);
        toast.success(t`Lesson updated successfully`);
      } else {
        const lesson = await LessonService.lessonCreate(payload);
        if (lesson?.id && form.status === "published") {
          await LessonService.lessonPublish(lesson.id);
        }
        if (lesson?.id && form.status === "archived") {
          await LessonService.lessonArchive(lesson.id);
        }
        toast.success(t`Lesson created successfully`);
      }
    } catch (error: any) {
      toast.error(error?.message || t`Failed to save lesson`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
            <Trans>Exercise details</Trans>
          </Typography>
          <Stack spacing={2.5}>
            <TextField
              label={<Trans>Title</Trans>}
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label={<Trans>Slug</Trans>}
              value={form.slug}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  slug: event.target.value,
                }))
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>
                <Trans>Level</Trans>
              </InputLabel>
              <Select
                label={t`Level`}
                value={form.level}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    level: event.target.value,
                  }))
                }
              >
                <MenuItem value="beginner">
                  <Trans>Beginner</Trans>
                </MenuItem>
                <MenuItem value="intermediate">
                  <Trans>Intermediate</Trans>
                </MenuItem>
                <MenuItem value="advanced">
                  <Trans>Advanced</Trans>
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={<Trans>Estimated minutes</Trans>}
              type="number"
              value={form.estimatedMinutes}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  estimatedMinutes: Number(event.target.value),
                }))
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>
                <Trans>Status</Trans>
              </InputLabel>
              <Select
                label={t`Status`}
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as LessonInput["status"],
                  }))
                }
              >
                <MenuItem value="draft">
                  <Trans>Draft</Trans>
                </MenuItem>
                <MenuItem value="published">
                  <Trans>Published</Trans>
                </MenuItem>
                <MenuItem value="archived">
                  <Trans>Archived</Trans>
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={<Trans>Objectives</Trans>}
              value={(form.objectives || []).join("\n")}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  objectives: event.target.value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
                }))
              }
              multiline
              minRows={3}
              fullWidth
            />
            <TextField
              label={<Trans>Skill type</Trans>}
              value={form.skillType}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  skillType: event.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label={<Trans>Assigned class IDs</Trans>}
              value={(form.assignedToClassIds || []).join(", ")}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  assignedToClassIds: event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                }))
              }
              fullWidth
            />
            <Stack spacing={2}>
              {questions.map((question, questionIndex) => (
                <Paper
                  elevation={0}
                  key={question.id}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    p: 2,
                  }}
                >
                  <Stack spacing={2}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Typography sx={{ fontWeight: 900 }}>
                        <Trans>Question</Trans> {questionIndex + 1}
                      </Typography>
                      <Button
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trans>Remove question</Trans>
                      </Button>
                    </Stack>
                    <FormControl fullWidth>
                      <InputLabel>
                        <Trans>Question type</Trans>
                      </InputLabel>
                      <Select
                        label={t`Question type`}
                        value={question.type}
                        onChange={(event) =>
                          updateQuestion(question.id, {
                            type: event.target.value as LessonQuestionType,
                          })
                        }
                      >
                        <MenuItem value="multiple_choice">
                          <Trans>Multiple choice</Trans>
                        </MenuItem>
                        <MenuItem value="fill_blank">
                          <Trans>Fill blank</Trans>
                        </MenuItem>
                        <MenuItem value="speaking">
                          <Trans>Speaking</Trans>
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label={<Trans>Prompt</Trans>}
                      value={question.prompt}
                      onChange={(event) =>
                        updateQuestion(question.id, {
                          prompt: event.target.value,
                        })
                      }
                      multiline
                      minRows={3}
                      fullWidth
                    />
                    {question.type === "multiple_choice" && (
                      <Stack spacing={1.5}>
                        {question.options.map((_, optionIndex) => (
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            key={`${question.id}-${optionIndex}`}
                          >
                            <TextField
                              label={`${t`Option`} ${optionIndex + 1}`}
                              value={question.options[optionIndex]}
                              onChange={(event) =>
                                updateQuestion(question.id, {
                                  options: question.options.map(
                                    (option, index) =>
                                      index === optionIndex
                                        ? event.target.value
                                        : option
                                  ),
                                })
                              }
                              fullWidth
                            />
                            <Button
                              color="error"
                              onClick={() =>
                                removeOption(question.id, optionIndex)
                              }
                            >
                              <Trans>Remove</Trans>
                            </Button>
                          </Stack>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => addOption(question.id)}
                        >
                          <Trans>Add option</Trans>
                        </Button>
                      </Stack>
                    )}
                    <TextField
                      label={<Trans>Correct answer</Trans>}
                      value={question.correctAnswer}
                      onChange={(event) =>
                        updateQuestion(question.id, {
                          correctAnswer: event.target.value,
                        })
                      }
                      fullWidth
                    />
                    <TextField
                      label={<Trans>Explanation</Trans>}
                      value={question.explanation}
                      onChange={(event) =>
                        updateQuestion(question.id, {
                          explanation: event.target.value,
                        })
                      }
                      multiline
                      minRows={3}
                      fullWidth
                    />
                    <TextField
                      label={<Trans>Score</Trans>}
                      type="number"
                      value={question.score}
                      onChange={(event) =>
                        updateQuestion(question.id, {
                          score: Number(event.target.value),
                        })
                      }
                      fullWidth
                    />
                  </Stack>
                </Paper>
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addQuestion}
                sx={{ alignSelf: "flex-start", borderRadius: 2 }}
              >
                <Trans>Add question</Trans>
              </Button>
              <Button
                disabled={saving}
                variant="contained"
                onClick={saveLesson}
                sx={{ alignSelf: "flex-start", borderRadius: 2 }}
              >
                {lessonId ? (
                  <Trans>Update lesson</Trans>
                ) : (
                  <Trans>Create lesson</Trans>
                )}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
            <Trans>Assign homework</Trans>
          </Typography>
          <Stack spacing={2}>
            <TextField label={<Trans>Class or student</Trans>} fullWidth />
            <TextField label={<Trans>Due date</Trans>} fullWidth />
            <Button variant="contained" sx={{ borderRadius: 2 }}>
              <Trans>Assign homework</Trans>
            </Button>
            <Typography sx={{ color: "#64748b", lineHeight: 1.6 }}>
              <Trans>
                Assign after publishing so students can submit answers from
                their lesson detail page.
              </Trans>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

function StudentSubmissionsScaffold() {
  const [submissions, setSubmissions] = useState<TeacherSubmission[]>([]);

  useEffect(() => {
    LessonService.teacherSubmissionList()
      .then(setSubmissions)
      .catch((error) => {
        toast.error(error?.message || t`Failed to load submissions`);
      });
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
        <Trans>Submission queue</Trans>
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Trans>Student</Trans>
              </TableCell>
              <TableCell>
                <Trans>Lesson</Trans>
              </TableCell>
              <TableCell>
                <Trans>Score</Trans>
              </TableCell>
              <TableCell>
                <Trans>Passed</Trans>
              </TableCell>
              <TableCell>
                <Trans>Submitted time</Trans>
              </TableCell>
              <TableCell align="right">
                <Trans>Actions</Trans>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id} hover>
                <TableCell sx={{ fontWeight: 800 }}>
                  {submission.student?.name || submission.student?.email}
                </TableCell>
                <TableCell>{submission.lesson?.title}</TableCell>
                <TableCell>{submission.score}%</TableCell>
                <TableCell>
                  <Chip
                    label={submission.passed ? t`Passed` : t`Needs review`}
                    size="small"
                    color={submission.passed ? "success" : "warning"}
                    sx={{ borderRadius: 2, fontWeight: 800 }}
                  />
                </TableCell>
                <TableCell>{submission.submittedAt || "-"}</TableCell>
                <TableCell align="right">
                  <Button size="small">
                    <Trans>Review</Trans>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function StudentProgressScaffold() {
  const [progressRows, setProgressRows] = useState<StudentProgress[]>([]);

  useEffect(() => {
    LessonService.teacherStudentProgress()
      .then(setProgressRows)
      .catch((error) => {
        toast.error(error?.message || t`Failed to load student progress`);
      });
  }, []);

  const progress = [
    { label: t`Active students`, value: String(progressRows.length) },
    {
      label: t`Average completion`,
      value: `${Math.round(
        progressRows.reduce((total, row) => total + (row.bestScore || 0), 0) /
          Math.max(progressRows.length, 1)
      )}%`,
    },
    {
      label: t`Needs feedback`,
      value: String(progressRows.filter((row) => !row.passed).length),
    },
  ];

  return (
    <Grid container spacing={3}>
      {progress.map((item) => (
        <Grid item xs={12} md={4} key={item.label}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
            }}
          >
            <Typography sx={{ color: "#64748b", fontWeight: 700 }}>
              {item.label}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
            <Trans>Progress overview</Trans>
          </Typography>
          <Box
            sx={{
              minHeight: 220,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Trans>Student</Trans>
                    </TableCell>
                    <TableCell>
                      <Trans>Submissions</Trans>
                    </TableCell>
                    <TableCell>
                      <Trans>Average score</Trans>
                    </TableCell>
                    <TableCell>
                      <Trans>Status</Trans>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {progressRows.map((row) => (
                    <TableRow
                      key={`${row.studentId || "student"}-${row.lessonId || "lesson"}`}
                      hover
                    >
                      <TableCell sx={{ fontWeight: 800 }}>
                        {row.studentId}
                      </TableCell>
                      <TableCell>{row.submissionCount || 0}</TableCell>
                      <TableCell>{row.bestScore || 0}%</TableCell>
                      <TableCell>
                        {row.passed ? t`Completed` : t`Needs review`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LessonManagementScaffold;
