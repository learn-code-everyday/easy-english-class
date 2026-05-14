import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, TextField } from "@mui/material";
import type { Control, UseFormRegister } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import type { TeacherLessonFormValues } from "../types";

export default function QuestionOptionsFieldArray({
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
