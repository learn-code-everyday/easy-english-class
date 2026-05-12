import { t, Trans } from "@lingui/macro";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ASSIGNMENT_STATUS_OPTIONS = [
  { label: t`All`, value: "ALL" },
  { label: t`Pending`, value: "PENDING" },
  { label: t`Submitted`, value: "SUBMITTED" },
  { label: t`Overdue`, value: "OVERDUE" },
  { label: t`Graded`, value: "GRADED" },
];

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function AssignmentStatusFilter({ value, onChange }: Props) {
  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel>
        <Trans>Status</Trans>
      </InputLabel>
      <Select
        value={value}
        label={t`Status`}
        onChange={(e) => onChange(e.target.value)}
      >
        {ASSIGNMENT_STATUS_OPTIONS.map((opt) => (
          <MenuItem value={opt.value} key={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
