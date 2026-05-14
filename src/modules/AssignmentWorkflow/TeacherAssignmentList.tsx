import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  DashboardContentCard,
  DashboardEmptyState,
  DashboardErrorState,
  DashboardPage,
  DashboardPageHeader,
  DashboardTable,
  DashboardToolbar,
} from "@/components/Dashboard";
import type {
  Assignment,
  AssignmentType,
} from "@/services/assignment/assignment.model";
import { AssignmentService } from "@/services/assignment/assignment.repo";

import {
  ASSIGNMENT_STATUSES,
  ASSIGNMENT_TYPES,
  getAssignmentDescription,
  getAssignmentTypeChip,
} from "./assignmentUi";
import TeacherAssignmentForm from "./TeacherAssignmentForm";

const CREATE_ASSIGNMENT_TYPES: Array<{
  description: React.ReactNode;
  label: React.ReactNode;
  type: AssignmentType;
}> = [
  {
    description: (
      <Trans>Build questions with answers, explanations, and scores.</Trans>
    ),
    label: <Trans>Quiz</Trans>,
    type: "QUIZ",
  },
  {
    description: <Trans>Share an external activity link for homework.</Trans>,
    label: <Trans>External Link</Trans>,
    type: "LINK",
  },
  {
    description: <Trans>Assign a worksheet image or PDF for students.</Trans>,
    label: <Trans>Image Homework</Trans>,
    type: "IMAGE",
  },
];

export default function TeacherAssignmentList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<AssignmentType>();
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

  const closeCreate = () => {
    setCreateOpen(false);
    setSelectedType(undefined);
  };

  const handleCreateSuccess = () => {
    closeCreate();
    loadAssignments();
  };

  return (
    <DashboardPage>
      <DashboardPageHeader
        eyebrow={<Trans>Teaching</Trans>}
        title={<Trans>Assignment Management</Trans>}
        description={
          <Trans>
            Create homework, review submissions, and track assignment status.
          </Trans>
        }
        action={
          <Button
            fullWidth
            onClick={() => setCreateOpen(true)}
            startIcon={<AddIcon />}
            variant="contained"
            sx={{
              borderRadius: "8px",
              fontWeight: 900,
              minHeight: 40,
              textTransform: "none",
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Trans>Create Assignment</Trans>
          </Button>
        }
      />
      <DashboardContentCard>
        <Stack spacing={2.5}>
          <DashboardToolbar>
            <TextField
              fullWidth
              size="small"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t`Search assignments...`}
              sx={{ flex: 1, minWidth: { md: 280 } }}
            />
            <FormControl
              fullWidth
              size="small"
              sx={{ maxWidth: { md: 180 }, minWidth: { md: 170 } }}
            >
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
            <FormControl
              fullWidth
              size="small"
              sx={{ maxWidth: { md: 160 }, minWidth: { md: 150 } }}
            >
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
          </DashboardToolbar>

          {loadError ? (
            <DashboardErrorState
              title={<Trans>Assignments could not be loaded</Trans>}
              description={<Trans>Please try again later.</Trans>}
              onRetry={loadAssignments}
            />
          ) : (
            <DashboardTable>
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
                  {!loading && filteredAssignments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <DashboardEmptyState
                          title={<Trans>No assignments created yet</Trans>}
                          description={
                            <Trans>
                              Create your first homework assignment for
                              students.
                            </Trans>
                          }
                          action={
                            <Button
                              onClick={() => setCreateOpen(true)}
                              startIcon={<AddIcon />}
                              variant="contained"
                              sx={{
                                borderRadius: "8px",
                                fontWeight: 900,
                                textTransform: "none",
                              }}
                            >
                              <Trans>Create Assignment</Trans>
                            </Button>
                          }
                        />
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
                        <TableCell>
                          {assignment.dueDate || assignment.deadline || "-"}
                        </TableCell>
                        <TableCell>{assignment.updatedAt || "-"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </DashboardTable>
          )}
        </Stack>
      </DashboardContentCard>
      <Dialog
        fullWidth
        maxWidth="md"
        open={createOpen}
        onClose={closeCreate}
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ fontWeight: 900 }}>
          {selectedType ? (
            <Trans>Create Assignment</Trans>
          ) : (
            <Trans>Choose assignment type</Trans>
          )}
        </DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          {selectedType ? (
            <TeacherAssignmentForm
              initialType={selectedType}
              key={selectedType}
              onSuccess={handleCreateSuccess}
            />
          ) : (
            <Stack spacing={1.5}>
              {CREATE_ASSIGNMENT_TYPES.map((option) => (
                <Button
                  key={option.type}
                  onClick={() => setSelectedType(option.type)}
                  sx={{
                    alignItems: "flex-start",
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                    color: "#0f172a",
                    justifyContent: "flex-start",
                    p: 2,
                    textAlign: "left",
                    textTransform: "none",
                  }}
                >
                  <Stack spacing={0.5}>
                    <Typography sx={{ fontWeight: 900 }}>
                      {option.label}
                    </Typography>
                    <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                      {option.description}
                    </Typography>
                  </Stack>
                </Button>
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </DashboardPage>
  );
}
