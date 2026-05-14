import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
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
import { useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

import type {
  AssignmentCreateInput,
  AssignmentQuestion,
  AssignmentType,
} from "@/services/assignment/assignment.model";
import { AssignmentService } from "@/services/assignment/assignment.repo";
import { useAuthStore } from "@/stores/auth/useAuthStore";

type AssignmentFormValues = AssignmentCreateInput & {
  assignedToClassIdsText: string;
};

const defaultQuestion = (): AssignmentQuestion => ({
  correctAnswer: "",
  explanation: "",
  options: [
    { label: "", value: "" },
    { label: "", value: "" },
  ],
  prompt: "",
  score: 10,
  type: "multiple_choice",
});

const defaultValues: AssignmentFormValues = {
  assignedToClassIds: [],
  assignedToClassIdsText: "",
  assignmentType: "QUIZ",
  attachmentUrl: "",
  description: "",
  dueDate: "",
  externalUrl: "",
  instructions: "",
  questions: [defaultQuestion()],
  referenceImageUrl: "",
  title: "",
};

function QuestionBuilder({
  control,
  questionIndex,
  remove,
}: {
  control: any;
  questionIndex: number;
  remove: () => void;
}) {
  const questionType = useWatch({
    control,
    name: `questions.${questionIndex}.type`,
  });
  const {
    append,
    fields,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
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
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontWeight: 900 }}>
            <Trans>Question</Trans> {questionIndex + 1}
          </Typography>
          <Button
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={remove}
          >
            <Trans>Remove</Trans>
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
                <MenuItem value="short_answer">
                  <Trans>Short answer</Trans>
                </MenuItem>
                <MenuItem value="fill_blank">
                  <Trans>Fill blank</Trans>
                </MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name={`questions.${questionIndex}.prompt`}
          render={({ field }) => (
            <TextField
              {...field}
              label={<Trans>Prompt</Trans>}
              multiline
              minRows={3}
              fullWidth
            />
          )}
        />
        {questionType === "multiple_choice" && (
          <Stack spacing={1}>
            {fields.map((option, optionIndex) => (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                key={option.id}
              >
                <Controller
                  control={control}
                  name={`questions.${questionIndex}.options.${optionIndex}.value`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`${t`Option`} ${optionIndex + 1}`}
                      fullWidth
                    />
                  )}
                />
                <Button
                  color="error"
                  disabled={fields.length <= 2}
                  onClick={() => removeOption(optionIndex)}
                >
                  <Trans>Remove</Trans>
                </Button>
              </Stack>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() => append({ label: "", value: "" })}
              sx={{ alignSelf: "flex-start" }}
            >
              <Trans>Add option</Trans>
            </Button>
          </Stack>
        )}
        <Controller
          control={control}
          name={`questions.${questionIndex}.correctAnswer`}
          render={({ field }) => (
            <TextField
              {...field}
              label={<Trans>Correct answer</Trans>}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name={`questions.${questionIndex}.explanation`}
          render={({ field }) => (
            <TextField
              {...field}
              label={<Trans>Explanation</Trans>}
              multiline
              minRows={2}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name={`questions.${questionIndex}.score`}
          render={({ field }) => (
            <TextField
              {...field}
              label={<Trans>Score</Trans>}
              type="number"
              fullWidth
            />
          )}
        />
      </Stack>
    </Paper>
  );
}

export type TeacherAssignmentFormProps = {
  initialType?: AssignmentType;
  onSuccess?: () => void;
};

export default function TeacherAssignmentForm({
  initialType,
  onSuccess,
}: TeacherAssignmentFormProps) {
  const { auth } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, reset } = useForm<AssignmentFormValues>({
    defaultValues: {
      ...defaultValues,
      assignmentType: initialType || defaultValues.assignmentType,
    },
  });
  const assignmentType = useWatch({ control, name: "assignmentType" });
  const {
    append: appendQuestion,
    fields: questionFields,
    remove: removeQuestion,
  } = useFieldArray({ control, name: "questions" });

  const onSubmit = async (values: AssignmentFormValues) => {
    setSaving(true);
    try {
      await AssignmentService.assignmentCreate(
        {
          ...values,
          assignedToClassIds: values.assignedToClassIdsText
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          questions: values.assignmentType === "QUIZ" ? values.questions : [],
        },
        auth?.id
      );
      toast.success(t`Assignment created successfully`);
      reset({
        ...defaultValues,
        assignmentType: initialType || defaultValues.assignmentType,
      });
      onSuccess?.();
    } catch {
      toast.error(t`Failed to create assignment`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ border: "1px solid #e2e8f0", borderRadius: 4, p: { xs: 2, md: 3 } }}
    >
      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
        <BoxTitle />
        <Controller
          control={control}
          name="assignmentType"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>
                <Trans>Assignment type</Trans>
              </InputLabel>
              <Select {...field} label={t`Assignment type`}>
                {(["QUIZ", "LINK", "IMAGE"] as AssignmentType[]).map((type) => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField
                  {...field}
                  label={<Trans>Title</Trans>}
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <TextField
                  {...field}
                  label={<Trans>Due date</Trans>}
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextField
              {...field}
              label={<Trans>Description</Trans>}
              multiline
              minRows={2}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="instructions"
          render={({ field }) => (
            <TextField
              {...field}
              label={<Trans>Instructions</Trans>}
              multiline
              minRows={3}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="assignedToClassIdsText"
          render={({ field }) => (
            <TextField
              {...field}
              label={<Trans>Assigned class IDs</Trans>}
              placeholder={t`Separate class IDs with commas`}
              fullWidth
            />
          )}
        />
        {assignmentType === "QUIZ" && (
          <Stack spacing={2}>
            {questionFields.map((question, index) => (
              <QuestionBuilder
                control={control}
                key={question.id}
                questionIndex={index}
                remove={() => removeQuestion(index)}
              />
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() => appendQuestion(defaultQuestion())}
              sx={{ alignSelf: "flex-start" }}
            >
              <Trans>Add question</Trans>
            </Button>
          </Stack>
        )}
        {assignmentType === "LINK" && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="externalUrl"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={<Trans>External URL</Trans>}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="referenceImageUrl"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={<Trans>Reference image URL</Trans>}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
        {assignmentType === "IMAGE" && (
          <Controller
            control={control}
            name="attachmentUrl"
            render={({ field }) => (
              <TextField
                {...field}
                label={<Trans>Worksheet image or PDF URL</Trans>}
                fullWidth
              />
            )}
          />
        )}
        <Button
          disabled={saving}
          type="submit"
          variant="contained"
          sx={{ alignSelf: "flex-start", borderRadius: 2, fontWeight: 900 }}
        >
          <Trans>Create Assignment</Trans>
        </Button>
      </Stack>
    </Paper>
  );
}

function BoxTitle() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        <Trans>Create Assignment</Trans>
      </Typography>
      <Typography sx={{ color: "#64748b", mt: 0.5 }}>
        <Trans>
          Choose the homework type first, then add instructions and content.
        </Trans>
      </Typography>
    </Box>
  );
}
