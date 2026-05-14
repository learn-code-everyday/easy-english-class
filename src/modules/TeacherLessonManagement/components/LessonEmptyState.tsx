import { Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { CREATE_LESSON_PATH } from "../constants";

export default function LessonEmptyState({
  compact = false,
  isFiltered = false,
}: {
  compact?: boolean;
  isFiltered?: boolean;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#f8fafc",
        border: "1px solid #dbeafe",
        borderRadius: 3,
        p: compact ? 2.5 : undefined,
        px: compact ? undefined : { xs: 2.5, md: 4 },
        py: compact ? undefined : { xs: 4, md: 5 },
      }}
    >
      <Stack
        alignItems={compact ? "flex-start" : "center"}
        spacing={compact ? 1.5 : 2}
        textAlign={compact ? "left" : "center"}
      >
        {!compact && (
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "#ffffff",
              border: "1px solid #bfdbfe",
              borderRadius: 3,
              color: "#2563eb",
              display: "flex",
              height: 56,
              justifyContent: "center",
              width: 56,
            }}
          >
            <LibraryBooksIcon fontSize="large" />
          </Box>
        )}
        <Box>
          <Typography
            component="h2"
            sx={{
              color: "#0f172a",
              fontSize: compact ? 16 : { xs: 20, md: 24 },
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
          {!compact && (
            <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 1 }}>
              {isFiltered ? (
                <Trans>
                  Adjust your search or filters to see more lessons.
                </Trans>
              ) : (
                <Trans>
                  Create your first lesson to assign homework to students.
                </Trans>
              )}
            </Typography>
          )}
        </Box>
        {!isFiltered && (
          <Button
            component={Link}
            href={CREATE_LESSON_PATH}
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ borderRadius: 2, fontWeight: 900, textTransform: "none" }}
          >
            <Trans>Create Lesson</Trans>
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
