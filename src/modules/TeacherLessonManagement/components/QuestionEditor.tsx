import { t, Trans } from "@lingui/macro";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Control, UseFormRegister } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";

import type { TeacherLessonFormValues } from "../types";
import QuestionOptionsFieldArray from "./QuestionOptionsFieldArray";

export default function QuestionEditor({
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
