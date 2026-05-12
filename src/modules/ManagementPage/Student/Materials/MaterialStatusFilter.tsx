import { t, Trans } from "@lingui/macro";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const typeOptions = [
  { label: t`All`, value: "ALL" },
  { label: "PDF", value: "PDF" },
  { label: t`Video`, value: "Video" },
  { label: t`Link`, value: "Link" },
  { label: t`Doc`, value: "Doc" },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function MaterialTypeFilter({ value, onChange }: Props) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel>
        <Trans>Type</Trans>
      </InputLabel>
      <Select
        label={t`Type`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {typeOptions.map((opt) => (
          <MenuItem value={opt.value} key={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
