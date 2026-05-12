import { t, Trans } from "@lingui/macro";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const statusOptions = [
  { label: t`All`, value: "ALL" },
  { label: t`Paid`, value: "PAID" },
  { label: t`Unpaid`, value: "UNPAID" },
  { label: t`Refunded`, value: "REFUNDED" },
  { label: t`Overdue`, value: "OVERDUE" },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function PaymentStatusFilter({ value, onChange }: Props) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel>
        <Trans>Status</Trans>
      </InputLabel>
      <Select
        label={t`Status`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {statusOptions.map((opt) => (
          <MenuItem value={opt.value} key={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
