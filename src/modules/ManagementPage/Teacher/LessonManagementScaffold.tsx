import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
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
import React, { useCallback, useEffect, useState } from "react";
import {
  Control,
  Controller,
  UseFormRegister,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "react-toastify";

import ErrorState from "@/components/ErrorState";
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

type TeacherLessonQuestionForm = {
  correctAnswer: string;
  explanation: string;
  options: Array<{ value: string }>;
  prompt: string;
  score: number;
  type: LessonQuestionType;
};

type TeacherLessonFormValues = {
  assignedToClassIds: string;
  estimatedMinutes: number;
  level: string;
  objectives: string;
  questions: TeacherLessonQuestionForm[];
  skillType: string;
  slug: string;
  title: string;
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
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadLessons = useCallback(async () => {
    setLoadError(false);
    setLoading(true);
    try {
      setLessons(await LessonService.teacherLessonList());
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

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
    } catch {
      toast.error(t`Failed to update lesson`);
    }
  };

  const deleteLesson = async (lesson: Lesson) => {
    if (!lesson.id) return;

    try {
      await LessonService.lessonDelete(lesson.id);
      toast.success(t`Lesson deleted successfully`);
      loadLessons();
    } catch {
      toast.error(t`Failed to delete lesson`);
    }
  };

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

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
      {loadError ? (
        <ErrorState
          title={<Trans>Lessons could not be loaded</Trans>}
          description={
            <Trans>
              We could not load your teacher lessons right now. Please try
              again.
            </Trans>
          }
          onRetry={loadLessons}
        />
      ) : !loading && lessons.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#f8fafc",
            border: "1px solid #dbeafe",
            borderRadius: 3,
            px: { xs: 2.5, md: 4 },
            py: { xs: 5, md: 6 },
          }}
        >
          <Stack alignItems="center" spacing={2.25} textAlign="center">
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "#ffffff",
                border: "1px solid #bfdbfe",
                borderRadius: 3,
                color: "#2563eb",
                display: "flex",
                height: 60,
                justifyContent: "center",
                width: 60,
              }}
            >
              <LibraryBooksIcon fontSize="large" />
            </Box>
            <Box>
              <Typography
                component="h2"
                sx={{
                  color: "#0f172a",
                  fontSize: { xs: 22, md: 28 },
                  fontWeight: 900,
                  letterSpacing: 0,
                  lineHeight: 1.2,
                }}
              >
                <Trans>You have not created any lessons yet.</Trans>
              </Typography>
              <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 1 }}>
                <Trans>
                  Start with a lesson draft, add practice questions, then
                  publish it for your students.
                </Trans>
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/manage/teacher/lessons/create"
              startIcon={<AddIcon />}
              variant="contained"
              sx={{ borderRadius: 2, fontWeight: 900, textTransform: "none" }}
            >
              <Trans>Create Lesson</Trans>
            </Button>
          </Stack>
        </Paper>
      ) : (
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
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={1}
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
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

const defaultQuestion = (): TeacherLessonQuestionForm => ({
  correctAnswer: "",
  explanation: "",
  options: [{ value: "" }, { value: "" }],
  prompt: "",
  score: 10,
  type: "multiple_choice",
});

const defaultLessonFormValues = (): TeacherLessonFormValues => ({
  assignedToClassIds: "",
  estimatedMinutes: 30,
  level: "beginner",
  objectives: "",
  questions: [defaultQuestion()],
  skillType: "",
  slug: "",
  title: "",
});

function lessonToFormValues(lesson: Lesson): TeacherLessonFormValues {
  return {
    assignedToClassIds: (lesson.assignedToClassIds || []).join(", "),
    estimatedMinutes: lesson.estimatedMinutes || 0,
    level: lesson.level || "beginner",
    objectives: (lesson.objectives || []).join("\n"),
    questions: lesson.questions?.length
      ? lesson.questions.map((question) => ({
          correctAnswer: question.correctAnswer || "",
          explanation: question.explanation || "",
          options: question.options?.length
            ? question.options.map((option) => ({ value: option.value }))
            : [{ value: "" }, { value: "" }],
          prompt: question.prompt,
          score: question.score || 0,
          type: question.type,
        }))
      : [defaultQuestion()],
    skillType: lesson.skillType || "",
    slug: lesson.slug,
    title: lesson.title,
  };
}

function formValuesToLessonInput(values: TeacherLessonFormValues): LessonInput {
  return {
    assignedToClassIds: values.assignedToClassIds
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    estimatedMinutes: Number(values.estimatedMinutes || 0),
    level: values.level,
    objectives: values.objectives
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    questions: values.questions.map((question) => ({
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      options:
        question.type === "multiple_choice"
          ? question.options
              .map((option) => option.value.trim())
              .filter(Boolean)
              .map((option) => ({ label: option, value: option }))
          : [],
      prompt: question.prompt,
      score: Number(question.score || 0),
      type: question.type,
    })),
    skillType: values.skillType,
    slug: values.slug,
    title: values.title,
  };
}

function QuestionOptionsFieldArray({
  control,
  questionIndex,
  register,
}: {
  control: Control<TeacherLessonFormValues>;
  questionIndex: number;
  register: UseFormRegister<TeacherLessonFormValues>;
}) {
  const { append, fields, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  return (
    <Stack spacing={1.5}>
      {fields.map((option, optionIndex) => (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          key={option.id}
          spacing={1}
        >
          <TextField
            label={`${t`Option`} ${optionIndex + 1}`}
            {...register(
              `questions.${questionIndex}.options.${optionIndex}.value`
            )}
            fullWidth
          />
          <Button
            color="error"
            disabled={fields.length <= 2}
            onClick={() => remove(optionIndex)}
          >
            <Trans>Remove</Trans>
          </Button>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={() => append({ value: "" })}
        sx={{ alignSelf: "flex-start", borderRadius: 2 }}
      >
        <Trans>Add option</Trans>
      </Button>
    </Stack>
  );
}

function TeacherLessonForm({
  initialLesson,
  lessonId,
}: {
  initialLesson?: Lesson;
  lessonId?: string;
}) {
  const [saving, setSaving] = useState(false);
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<TeacherLessonFormValues>({
    defaultValues: defaultLessonFormValues(),
  });
  const {
    append: appendQuestion,
    fields: questionFields,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    reset(
      initialLesson
        ? lessonToFormValues(initialLesson)
        : defaultLessonFormValues()
    );
  }, [initialLesson, reset]);

  const onSubmit = async (values: TeacherLessonFormValues) => {
    setSaving(true);
    try {
      const payload = formValuesToLessonInput(values);

      if (lessonId) {
        await LessonService.lessonUpdate(lessonId, payload);
        toast.success(t`Lesson updated successfully`);
      } else {
        await LessonService.lessonCreate(payload);
        toast.success(t`Lesson created successfully`);
        reset(defaultLessonFormValues());
      }
    } catch {
      toast.error(t`Failed to save lesson`);
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
            border: "1px solid #e2e8f0",
            borderRadius: 4,
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
            p: { xs: 2.5, md: 3 },
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
            <Trans>Exercise details</Trans>
          </Typography>
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={2.5}
          >
            <TextField
              label={<Trans>Title</Trans>}
              {...register("title", { required: true })}
              fullWidth
            />
            <TextField
              label={<Trans>Slug</Trans>}
              {...register("slug", { required: true })}
              fullWidth
            />
            <Controller
              control={control}
              name="level"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>
                    <Trans>Level</Trans>
                  </InputLabel>
                  <Select {...field} label={t`Level`}>
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
              )}
            />
            <TextField
              label={<Trans>Skill type</Trans>}
              {...register("skillType")}
              fullWidth
            />
            <TextField
              label={<Trans>Objectives</Trans>}
              {...register("objectives")}
              multiline
              minRows={3}
              fullWidth
            />
            <TextField
              label={<Trans>Estimated minutes</Trans>}
              type="number"
              {...register("estimatedMinutes", { valueAsNumber: true })}
              fullWidth
            />
            <TextField
              label={<Trans>Assigned class IDs</Trans>}
              {...register("assignedToClassIds")}
              fullWidth
            />

            <Stack spacing={2}>
              {questionFields.map((question, questionIndex) => (
                <QuestionEditor
                  control={control}
                  key={question.id}
                  questionCount={questionFields.length}
                  questionIndex={questionIndex}
                  register={register}
                  removeQuestion={() => removeQuestion(questionIndex)}
                />
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => appendQuestion(defaultQuestion())}
                sx={{ alignSelf: "flex-start", borderRadius: 2 }}
              >
                <Trans>Add question</Trans>
              </Button>
              <Button
                disabled={saving || isSubmitting}
                type="submit"
                variant="contained"
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
            border: "1px solid #e2e8f0",
            borderRadius: 4,
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
            p: { xs: 2.5, md: 3 },
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
            <Trans>Publishing workflow</Trans>
          </Typography>
          <Stack spacing={1.5}>
            <Chip
              label={<Trans>Save as draft</Trans>}
              sx={{ borderRadius: 2, justifyContent: "flex-start" }}
            />
            <Chip
              label={<Trans>Publish from lesson management</Trans>}
              sx={{ borderRadius: 2, justifyContent: "flex-start" }}
            />
            <Chip
              label={<Trans>Students submit from assigned lessons</Trans>}
              sx={{ borderRadius: 2, justifyContent: "flex-start" }}
            />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

function QuestionEditor({
  control,
  questionCount,
  questionIndex,
  register,
  removeQuestion,
}: {
  control: Control<TeacherLessonFormValues>;
  questionCount: number;
  questionIndex: number;
  register: UseFormRegister<TeacherLessonFormValues>;
  removeQuestion: () => void;
}) {
  const questionType = useWatch({
    control,
    name: `questions.${questionIndex}.type`,
  });

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: 3,
        p: 2,
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={2}
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: 900 }}>
            <Trans>Question</Trans> {questionIndex + 1}
          </Typography>
          <Button
            color="error"
            disabled={questionCount <= 1}
            size="small"
            startIcon={<DeleteIcon />}
            onClick={removeQuestion}
          >
            <Trans>Remove question</Trans>
          </Button>
        </Stack>
        <Controller
          control={control}
          name={`questions.${questionIndex}.type`}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>
                <Trans>Question type</Trans>
              </InputLabel>
              <Select {...field} label={t`Question type`}>
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
          )}
        />
        <TextField
          label={<Trans>Prompt</Trans>}
          {...register(`questions.${questionIndex}.prompt`, { required: true })}
          multiline
          minRows={3}
          fullWidth
        />
        {questionType === "multiple_choice" && (
          <QuestionOptionsFieldArray
            control={control}
            questionIndex={questionIndex}
            register={register}
          />
        )}
        <TextField
          label={<Trans>Correct answer</Trans>}
          {...register(`questions.${questionIndex}.correctAnswer`, {
            required: true,
          })}
          fullWidth
        />
        <TextField
          label={<Trans>Explanation</Trans>}
          {...register(`questions.${questionIndex}.explanation`)}
          multiline
          minRows={3}
          fullWidth
        />
        <TextField
          label={<Trans>Score</Trans>}
          type="number"
          {...register(`questions.${questionIndex}.score`, {
            valueAsNumber: true,
          })}
          fullWidth
        />
      </Stack>
    </Paper>
  );
}

function ExerciseBuilderScaffold({ lessonId }: { lessonId?: string }) {
  const [loadError, setLoadError] = useState(false);
  const [lesson, setLesson] = useState<Lesson | undefined>();
  const [loadingLesson, setLoadingLesson] = useState(Boolean(lessonId));

  const loadLesson = useCallback(() => {
    if (!lessonId) {
      setLesson(undefined);
      setLoadError(false);
      setLoadingLesson(false);
      return;
    }

    setLoadError(false);
    setLoadingLesson(true);
    LessonService.teacherLessonList()
      .then((lessons) => {
        setLesson(lessons.find((item) => item.id === lessonId));
      })
      .catch(() => {
        setLoadError(true);
      })
      .finally(() => setLoadingLesson(false));
  }, [lessonId]);

  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  if (loadingLesson) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: 4,
          p: { xs: 2.5, md: 3 },
        }}
      >
        <Typography sx={{ color: "#64748b" }}>
          <Trans>Loading lesson...</Trans>
        </Typography>
      </Paper>
    );
  }

  if (loadError) {
    return (
      <ErrorState
        title={<Trans>Lesson could not be loaded</Trans>}
        description={
          <Trans>
            We could not load this lesson for editing. Please try again.
          </Trans>
        }
        onRetry={loadLesson}
      />
    );
  }

  return <TeacherLessonForm initialLesson={lesson} lessonId={lessonId} />;
}

function StudentSubmissionsScaffold() {
  const [loadError, setLoadError] = useState(false);
  const [submissions, setSubmissions] = useState<TeacherSubmission[]>([]);

  const loadSubmissions = useCallback(() => {
    setLoadError(false);
    LessonService.teacherSubmissionList()
      .then(setSubmissions)
      .catch(() => {
        setLoadError(true);
      });
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

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
      {loadError ? (
        <ErrorState
          title={<Trans>Submissions could not be loaded</Trans>}
          description={
            <Trans>
              We could not load student submissions right now. Please try again.
            </Trans>
          }
          onRetry={loadSubmissions}
        />
      ) : (
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
      )}
    </Paper>
  );
}

function StudentProgressScaffold() {
  const [loadError, setLoadError] = useState(false);
  const [progressRows, setProgressRows] = useState<StudentProgress[]>([]);

  const loadProgress = useCallback(() => {
    setLoadError(false);
    LessonService.teacherStudentProgress()
      .then(setProgressRows)
      .catch(() => {
        setLoadError(true);
      });
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

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
      {loadError ? (
        <Grid item xs={12}>
          <ErrorState
            title={<Trans>Student progress could not be loaded</Trans>}
            description={
              <Trans>
                We could not load student progress right now. Please try again.
              </Trans>
            }
            onRetry={loadProgress}
          />
        </Grid>
      ) : (
        <>
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
        </>
      )}
    </Grid>
  );
}

export default LessonManagementScaffold;
