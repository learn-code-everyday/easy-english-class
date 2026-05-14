import { Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useMemo } from "react";

import { ROLE_LABELS } from "@/constants/role";
import { isStudentUser, isTeacherUser } from "@/helpers/auth-access";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import DashboardCharts from "@/modules/DashboardPage/DashboardChart";
import DashboardStats from "@/modules/DashboardPage/DashboardStats";
import { useAuthStore } from "@/stores/auth/useAuthStore";

type DashboardAction = {
  description: React.ReactNode;
  href: string;
  icon: React.ReactNode;
  title: React.ReactNode;
};

const teacherActions: DashboardAction[] = [
  {
    href: "/manage/teacher/lessons",
    icon: <LibraryBooksIcon />,
    title: <Trans>Lesson Management</Trans>,
    description: (
      <Trans>Create, publish, archive, and edit lesson content.</Trans>
    ),
  },
  {
    href: "/manage/teacher/exercises/create",
    icon: <AddIcon />,
    title: <Trans>Create Exercise</Trans>,
    description: (
      <Trans>Build practice questions and assign lesson work.</Trans>
    ),
  },
  {
    href: "/manage/teacher/submissions",
    icon: <AssignmentTurnedInIcon />,
    title: <Trans>Student Submissions</Trans>,
    description: <Trans>Review submitted answers and learner outcomes.</Trans>,
  },
  {
    href: "/manage/teacher/progress",
    icon: <TrendingUpIcon />,
    title: <Trans>Student Progress</Trans>,
    description: <Trans>Track completion and learners needing support.</Trans>,
  },
];

const studentActions: DashboardAction[] = [
  {
    href: "/lessons",
    icon: <SchoolIcon />,
    title: <Trans>Lessons</Trans>,
    description: (
      <Trans>Open assigned lessons and continue your practice.</Trans>
    ),
  },
  {
    href: "/manage/student/progress",
    icon: <TrendingUpIcon />,
    title: <Trans>My Progress</Trans>,
    description: <Trans>Check your completion and best lesson scores.</Trans>,
  },
  {
    href: "/manage/student/submissions",
    icon: <AssignmentTurnedInIcon />,
    title: <Trans>Submissions/Scores</Trans>,
    description: <Trans>Review your submitted answers and scores.</Trans>,
  },
];

function DashboardActionGrid({ actions }: { actions: DashboardAction[] }) {
  return (
    <Grid container spacing={2.5}>
      {actions.map((action) => (
        <Grid item xs={12} md={6} xl={3} key={action.href}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
              height: "100%",
              p: 3,
            }}
          >
            <Stack spacing={2} sx={{ height: "100%" }}>
              <Box
                sx={{
                  alignItems: "center",
                  backgroundColor: "#eff6ff",
                  borderRadius: "8px",
                  color: "#2563eb",
                  display: "flex",
                  fontSize: 28,
                  height: 52,
                  justifyContent: "center",
                  width: 52,
                }}
              >
                {action.icon}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ color: "#0f172a", fontWeight: 900 }}>
                  {action.title}
                </Typography>
                <Typography
                  sx={{ color: "#64748b", lineHeight: 1.7, mt: 0.75 }}
                >
                  {action.description}
                </Typography>
              </Box>
              <Button
                component={Link}
                href={action.href}
                variant="outlined"
                sx={{
                  alignSelf: "flex-start",
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                <Trans>Open</Trans>
              </Button>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function TeacherDashboard() {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          p: { xs: 3, md: 4 },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          <Trans>Teacher workspace</Trans>
        </Typography>
        <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 1 }}>
          <Trans>
            Manage lessons, build exercises, and review student progress from
            the teacher tools.
          </Trans>
        </Typography>
      </Paper>
      <DashboardActionGrid actions={teacherActions} />
    </Stack>
  );
}

function StudentDashboard() {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          p: { xs: 3, md: 4 },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          <Trans>Student dashboard</Trans>
        </Typography>
        <Typography sx={{ color: "#64748b", lineHeight: 1.7, mt: 1 }}>
          <Trans>
            Continue assigned lessons, check progress, and review your submitted
            scores.
          </Trans>
        </Typography>
      </Paper>
      <DashboardActionGrid actions={studentActions} />
    </Stack>
  );
}

const DashboardAdmin = () => {
  const { auth } = useAuthStore();
  const isTeacher = isTeacherUser(auth);
  const isStudent = isStudentUser(auth);

  const renderUserRole = useMemo(() => {
    if (!auth) return null;
    if (auth.role === "ADMIN") return ROLE_LABELS().ADMIN;
    if (auth.userType && ROLE_LABELS()[auth.userType])
      return ROLE_LABELS()[auth.userType];
    return ROLE_LABELS().UNKNOWN;
  }, [auth]);

  return (
    <div className="min-h-screen">
      <div className="mb-8 rounded-[var(--app-radius)] border border-slate-200 bg-white p-5 shadow-[var(--app-shadow-sm)] sm:p-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-blue-600">
          <Trans>Dashboard</Trans>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            <Trans>Welcome back,</Trans> {renderUserRole}
          </h1>
          <p className="text-sm text-slate-500 sm:text-base">
            <Trans>Here&apos;s your dashboard overview.</Trans>
          </p>
        </div>
      </div>

      {isTeacher ? (
        <TeacherDashboard />
      ) : isStudent ? (
        <StudentDashboard />
      ) : (
        <>
          <DashboardStats />

          <DashboardCharts />
        </>
      )}
    </div>
  );
};

DashboardAdmin.Layout = AdminLayout;
export default DashboardAdmin;
