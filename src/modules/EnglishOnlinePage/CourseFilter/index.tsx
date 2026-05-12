"use client";

import { Button, Stack } from "@mui/material";
import React from "react";

interface CourseFilterProps {
  selected: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (selected: string) => void;
}

export default function CourseFilter({
  selected,
  options,
  onChange,
}: CourseFilterProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" mb={6}>
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={opt.value === selected ? "contained" : "outlined"}
          color="primary"
          onClick={() => onChange(opt.value)}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          {opt.label}
        </Button>
      ))}
    </Stack>
  );
}
