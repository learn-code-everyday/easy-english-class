import { Trans } from "@lingui/macro";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export type CourseLandingData = {
  accent: string;
  eyebrow: string;
  title: string;
  description: string;
  targetLearners: string[];
  roadmap: string[];
  outcomes: string[];
  modules: Array<{ title: string; description: string; meta: string }>;
  packages: Array<{ name: string; price: string; description: string }>;
};

type CourseLandingPageProps = {
  course: CourseLandingData;
};

const CourseLandingPage: React.FC<CourseLandingPageProps> = ({ course }) => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 152px)",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef6ff 46%, #ffffff 100%)",
        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, lg: 6 }} alignItems="center">
          <Grid item xs={12} lg={7}>
            <Stack spacing={3}>
              <Chip
                label={course.eyebrow}
                sx={{
                  alignSelf: "flex-start",
                  borderRadius: "8px",
                  border: `1px solid ${course.accent}33`,
                  backgroundColor: `${course.accent}12`,
                  color: course.accent,
                  fontWeight: 900,
                }}
              />
              <Box>
                <Typography
                  component="h1"
                  sx={{
                    maxWidth: 780,
                    color: "#0f172a",
                    fontSize: { xs: 34, sm: 44, md: 58 },
                    fontWeight: 900,
                    letterSpacing: 0,
                    lineHeight: 1.05,
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  sx={{
                    mt: 2.5,
                    maxWidth: 720,
                    color: "#475569",
                    fontSize: { xs: 16, md: 18 },
                    lineHeight: 1.75,
                  }}
                >
                  {course.description}
                </Typography>
              </Box>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  component={Link}
                  href="/lessons"
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: course.accent,
                    boxShadow: `0 16px 34px ${course.accent}33`,
                    fontWeight: 900,
                    px: 3,
                    py: 1.35,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: course.accent,
                      filter: "brightness(0.92)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Trans>Start Learning</Trans>
                </Button>
                <Button
                  component={Link}
                  href="/lessons"
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    borderColor: "#cbd5e1",
                    color: "#0f172a",
                    fontWeight: 900,
                    px: 3,
                    py: 1.35,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: course.accent,
                      backgroundColor: `${course.accent}10`,
                    },
                  }}
                >
                  <Trans>View Lessons</Trans>
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="text"
                  sx={{
                    borderRadius: "8px",
                    color: "#334155",
                    fontWeight: 900,
                    px: 2,
                    py: 1.35,
                    textTransform: "none",
                  }}
                >
                  <Trans>Contact Advisor</Trans>
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "8px",
                border: "1px solid rgba(148, 163, 184, 0.28)",
                backgroundColor: "rgba(255,255,255,0.9)",
                boxShadow: "0 24px 70px rgba(15, 23, 42, 0.10)",
                p: { xs: 2.5, md: 3 },
              }}
            >
              <Stack spacing={2}>
                <Typography sx={{ color: "#0f172a", fontWeight: 900 }}>
                  <Trans>Target learners</Trans>
                </Typography>
                {course.targetLearners.map((learner) => (
                  <Stack direction="row" spacing={1.5} key={learner}>
                    <GroupsRoundedIcon sx={{ color: course.accent }} />
                    <Typography sx={{ color: "#475569", fontWeight: 700 }}>
                      {learner}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: { xs: 4, md: 6 } }}>
          <Grid item xs={12} md={4}>
            <SectionCard title={<Trans>Learning roadmap</Trans>}>
              {course.roadmap.map((item, index) => (
                <Stack direction="row" spacing={1.5} key={item}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "8px",
                      backgroundColor: `${course.accent}14`,
                      color: course.accent,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography sx={{ color: "#334155", lineHeight: 1.65 }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </SectionCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <SectionCard title={<Trans>Course outcomes</Trans>}>
              {course.outcomes.map((item) => (
                <Stack direction="row" spacing={1.5} key={item}>
                  <CheckCircleRoundedIcon sx={{ color: course.accent }} />
                  <Typography sx={{ color: "#334155", lineHeight: 1.65 }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </SectionCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <SectionCard title={<Trans>Pricing packages</Trans>}>
              {course.packages.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    p: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography sx={{ fontWeight: 900, color: "#0f172a" }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 900, color: course.accent }}>
                      {item.price}
                    </Typography>
                  </Stack>
                  <Typography sx={{ mt: 0.75, color: "#64748b" }}>
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </SectionCard>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Typography
            component="h2"
            sx={{
              color: "#0f172a",
              fontSize: { xs: 26, md: 34 },
              fontWeight: 900,
              letterSpacing: 0,
              mb: 2,
            }}
          >
            <Trans>Lesson modules</Trans>
          </Typography>
          <Grid container spacing={2.5}>
            {course.modules.map((module) => (
              <Grid item xs={12} sm={6} lg={3} key={module.title}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 14px 38px rgba(15, 23, 42, 0.06)",
                    p: 2.5,
                  }}
                >
                  <MenuBookRoundedIcon sx={{ color: course.accent }} />
                  <Typography sx={{ mt: 1.5, fontWeight: 900 }}>
                    {module.title}
                  </Typography>
                  <Typography sx={{ mt: 1, color: "#64748b", lineHeight: 1.6 }}>
                    {module.description}
                  </Typography>
                  <Chip
                    label={module.meta}
                    size="small"
                    sx={{
                      mt: 2,
                      borderRadius: "8px",
                      backgroundColor: `${course.accent}10`,
                      color: course.accent,
                      fontWeight: 800,
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

function SectionCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        boxShadow: "0 14px 38px rgba(15, 23, 42, 0.06)",
        p: { xs: 2.5, md: 3 },
      }}
    >
      <Typography sx={{ mb: 2, color: "#0f172a", fontWeight: 900 }}>
        {title}
      </Typography>
      <Stack spacing={1.75}>{children}</Stack>
    </Paper>
  );
}

export default CourseLandingPage;
