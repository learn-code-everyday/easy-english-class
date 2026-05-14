import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import type { Lesson } from "@/services/lesson/lesson.model";
import { LessonService } from "@/services/lesson/lesson.repo";

import type { TeacherLessonFormValues } from "../types";
import QuestionEditor from "./QuestionEditor";
import {
  defaultLessonFormValues,
  defaultQuestion,
  formValuesToLessonInput,
  lessonToFormValues,
} from "../utils/lessonFormMapper";

export default function TeacherLessonForm({
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
