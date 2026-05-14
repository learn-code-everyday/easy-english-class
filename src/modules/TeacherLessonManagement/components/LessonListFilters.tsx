import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";

import {
  CREATE_LESSON_PATH,
  LESSON_LEVEL_OPTIONS,
  LESSON_STATUS_OPTIONS,
} from "../constants";
import type { LessonLevelFilter, LessonStatusFilter } from "../types";

type LessonListFiltersProps = {
  levelFilter: LessonLevelFilter;
  search: string;
  setLevelFilter: (value: LessonLevelFilter) => void;
  setSearch: (value: string) => void;
  setStatusFilter: (value: LessonStatusFilter) => void;
  statusFilter: LessonStatusFilter;
};

export default function LessonListFilters({
  levelFilter,
  search,
  setLevelFilter,
  setSearch,
  setStatusFilter,
  statusFilter,
}: LessonListFiltersProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={1.5}
      sx={{
        alignItems: { xs: "stretch", md: "center" },
        flexWrap: "nowrap",
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        size="small"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={t`Search by title, slug, or skill type...`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="disabled" />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: { md: "1 1 auto" },
          minWidth: { xs: 0, md: 280 },
          width: "100%",
        }}
      />
      <FormControl
        fullWidth
        size="small"
        sx={{
          flexShrink: 0,
          minWidth: { xs: 0, md: 150 },
          width: { xs: "100%", md: 170 },
        }}
      >
        <InputLabel>
          <Trans>Status</Trans>
        </InputLabel>
        <Select
          label={t`Status`}
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as LessonStatusFilter)
          }
        >
          <MenuItem value="all">
            <Trans>All statuses</Trans>
          </MenuItem>
          {LESSON_STATUS_OPTIONS.map((status) => (
            <MenuItem value={status} key={status}>
              {status === "draft" && <Trans>Draft</Trans>}
              {status === "published" && <Trans>Published</Trans>}
              {status === "archived" && <Trans>Archived</Trans>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        size="small"
        sx={{
          flexShrink: 0,
          minWidth: { xs: 0, md: 140 },
          width: { xs: "100%", md: 150 },
        }}
      >
        <InputLabel>
          <Trans>Level</Trans>
        </InputLabel>
        <Select
          label={t`Level`}
          value={levelFilter}
          onChange={(event) =>
            setLevelFilter(event.target.value as LessonLevelFilter)
          }
        >
          <MenuItem value="all">
            <Trans>All levels</Trans>
          </MenuItem>
          {LESSON_LEVEL_OPTIONS.map((level) => (
            <MenuItem value={level} key={level}>
              {level === "beginner" && <Trans>Beginner</Trans>}
              {level === "intermediate" && <Trans>Intermediate</Trans>}
              {level === "advanced" && <Trans>Advanced</Trans>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        component={Link}
        href={CREATE_LESSON_PATH}
        startIcon={<AddIcon />}
        variant="contained"
        sx={{
          borderRadius: 2,
          flexShrink: 0,
          fontWeight: 900,
          height: 40,
          minHeight: 40,
          minWidth: { xs: 0, md: 150 },
          textTransform: "none",
          whiteSpace: "nowrap",
          width: { xs: "100%", md: "auto" },
        }}
      >
        <Trans>Create Lesson</Trans>
      </Button>
    </Stack>
  );
}
