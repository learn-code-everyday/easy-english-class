import { Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

import { DashboardEmptyState } from "@/components/Dashboard";

import { CREATE_LESSON_PATH } from "../constants";

export default function LessonEmptyState({
  compact = false,
  isFiltered = false,
}: {
  compact?: boolean;
  isFiltered?: boolean;
}) {
  return (
    <DashboardEmptyState
      title={
        <Typography
          component="span"
          sx={{
            color: "#0f172a",
            fontSize: compact ? 16 : { xs: 20, md: 22 },
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 1.25,
          }}
        >
          {isFiltered ? (
            <Trans>No matching lessons found</Trans>
          ) : (
            <Trans>No lessons created yet</Trans>
          )}
        </Typography>
      }
      description={
        compact ? undefined : isFiltered ? (
          <Trans>Adjust your search or filters to see more lessons.</Trans>
        ) : (
          <Trans>
            Create your first lesson to assign homework to students.
          </Trans>
        )
      }
      action={
        !isFiltered ? (
          <Button
            component={Link}
            href={CREATE_LESSON_PATH}
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ borderRadius: "8px", fontWeight: 900, textTransform: "none" }}
          >
            <Trans>Create Lesson</Trans>
          </Button>
        ) : undefined
      }
    />
  );
}
