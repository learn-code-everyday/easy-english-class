import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import ErrorState from "@/components/ErrorState";
import type { Assignment } from "@/services/assignment/assignment.model";
import { AssignmentService } from "@/services/assignment/assignment.repo";

import AssignmentEmptyState from "./AssignmentEmptyState";
import {
  ASSIGNMENT_STATUSES,
  ASSIGNMENT_TYPES,
  getAssignmentDescription,
  getAssignmentTypeChip,
} from "./assignmentUi";

export default function TeacherAssignmentList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const loadAssignments = useCallback(() => {
    setLoadError(false);
    setLoading(true);
    AssignmentService.teacherAssignmentList()
      .then(setAssignments)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  const filteredAssignments = useMemo(
    () =>
      assignments.filter((assignment) => {
        const matchesSearch =
          !search ||
          [assignment.title, getAssignmentDescription(assignment)]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL" || assignment.status === statusFilter;
        const matchesType =
          typeFilter === "ALL" ||
          getAssignmentTypeChip(assignment) === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      }),
    [assignments, search, statusFilter, typeFilter]
  );

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e2e8f0",
        borderRadius: 4,
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
        p: { xs: 2, md: 3 },
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            <Trans>Assignment Management</Trans>
          </Typography>
          <Typography sx={{ color: "#64748b", mt: 0.5 }}>
            <Trans>
              Create homework, review submissions, and track assignment status.
            </Trans>
          </Typography>
        </Box>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t`Search assignments...`}
          />
          <FormControl size="small" sx={{ minWidth: { md: 170 } }}>
            <InputLabel>
              <Trans>Status</Trans>
            </InputLabel>
            <Select
              label={t`Status`}
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              {ASSIGNMENT_STATUSES.map((status) => (
                <MenuItem value={status} key={status}>
                  {status === "ALL" ? <Trans>All statuses</Trans> : status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: { md: 150 } }}>
            <InputLabel>
              <Trans>Type</Trans>
            </InputLabel>
            <Select
              label={t`Type`}
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              <MenuItem value="ALL">
                <Trans>All types</Trans>
              </MenuItem>
              {ASSIGNMENT_TYPES.map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            component={Link}
            href="/manage/teacher/assignments/create"
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ borderRadius: 2, fontWeight: 900, textTransform: "none" }}
          >
            <Trans>Create Assignment</Trans>
          </Button>
        </Stack>

        {loadError ? (
          <ErrorState
            title={<Trans>Assignments could not be loaded</Trans>}
            description={<Trans>Please try again later.</Trans>}
            onRetry={loadAssignments}
          />
        ) : !loading && filteredAssignments.length === 0 ? (
          <AssignmentEmptyState
            actionHref="/manage/teacher/assignments/create"
            title={<Trans>No assignments created yet</Trans>}
            description={
              <Trans>Create your first homework assignment for students.</Trans>
            }
          />
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 820 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Trans>Assignment</Trans>
                  </TableCell>
                  <TableCell>
                    <Trans>Type</Trans>
                  </TableCell>
                  <TableCell>
                    <Trans>Status</Trans>
                  </TableCell>
                  <TableCell>
                    <Trans>Due Date</Trans>
                  </TableCell>
                  <TableCell>
                    <Trans>Updated At</Trans>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Trans>Loading assignments...</Trans>
                    </TableCell>
                  </TableRow>
                )}
                {!loading &&
                  filteredAssignments.map((assignment) => (
                    <TableRow hover key={assignment.id}>
                      <TableCell>
                        <Typography sx={{ fontWeight: 900 }}>
                          {assignment.title}
                        </Typography>
                        <Typography sx={{ color: "#64748b" }}>
                          {getAssignmentDescription(assignment)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getAssignmentTypeChip(assignment)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={assignment.status || t`Published`}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{assignment.deadline || "-"}</TableCell>
                      <TableCell>{assignment.updatedAt || "-"}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Paper>
  );
}
