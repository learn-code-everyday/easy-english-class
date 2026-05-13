"use client";

import { t, Trans } from "@lingui/macro";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { toast } from "react-toastify";

import MainLayout from "@/layouts/MainLayout";

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: "Emily Nguyen",
      position: t`Student`,
      avatar: "/avatars/emily.jpg",
      metric: t`Speaking confidence`,
      feedback: t`This English course transformed my confidence. The instructors are amazing and the curriculum is very practical.`,
    },
    {
      name: "James Lee",
      position: t`Working Professional`,
      avatar: "/avatars/james.jpg",
      metric: t`Business communication`,
      feedback: t`I improved my business English tremendously. The classes fit well into my busy schedule.`,
    },
    {
      name: "Sophia Tran",
      position: t`University Student`,
      avatar: "/avatars/sophia.jpg",
      metric: t`Class engagement`,
      feedback: t`Fun and engaging lessons with a great community. Highly recommend to anyone learning English!`,
    },
    {
      name: "Michael Pham",
      position: t`Freelancer`,
      avatar: "/avatars/michael.jpg",
      metric: t`Daily speaking`,
      feedback: t`Practical approach and lots of speaking practice. My English skills have never been better!`,
    },
    {
      name: "Anna Le",
      position: t`Entrepreneur`,
      avatar: "/avatars/anna.jpg",
      metric: t`Clear learning path`,
      feedback: t`The course content is clear and practical, and the teachers really care about students' progress.`,
    },
    {
      name: "David Hoang",
      position: t`Marketing Specialist`,
      avatar: "/avatars/david.jpg",
      metric: t`Workplace English`,
      feedback: t`Thanks to these courses, my English communication at work has improved significantly.`,
    },
  ];

  const stats = [
    { value: "4.9/5", label: t`Average learner rating` },
    { value: "92%", label: t`Students feel more confident` },
    { value: "8K+", label: t`Practice sessions completed` },
  ];

  const handleJoinClick = () => {
    toast.info(t`Opening registration page...`);
  };

  return (
    <Box
      sx={{
        minHeight: { xs: "100vh", md: "calc(100vh - 152px)" },
        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef6ff 48%, #ffffff 100%)",
        color: "#0f172a",
        overflow: "hidden",
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, lg: 6 }} alignItems="center">
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              <Chip
                icon={<StarRoundedIcon />}
                label={t`Learner outcomes`}
                sx={{
                  alignSelf: "flex-start",
                  borderRadius: "8px",
                  border: "1px solid #bfdbfe",
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: 800,
                  letterSpacing: 0,
                  px: 0.5,
                }}
              />

              <Box>
                <Typography
                  component="h1"
                  sx={{
                    maxWidth: 620,
                    fontSize: { xs: 34, sm: 44, md: 58 },
                    fontWeight: 900,
                    letterSpacing: 0,
                    lineHeight: 1.02,
                  }}
                >
                  <Trans>Real English progress, told by real students.</Trans>
                </Typography>
                <Typography
                  sx={{
                    mt: 2.5,
                    maxWidth: 590,
                    color: "#475569",
                    fontSize: { xs: 16, md: 18 },
                    lineHeight: 1.75,
                    letterSpacing: 0,
                  }}
                >
                  <Trans>
                    See how learners build confidence through guided lessons,
                    speaking practice, and teacher feedback that fits their
                    schedule.
                  </Trans>
                </Typography>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  component={NextLink}
                  href="/register"
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={handleJoinClick}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#2563eb",
                    boxShadow: "0 14px 28px rgba(37, 99, 235, 0.22)",
                    fontWeight: 800,
                    px: 3,
                    py: 1.4,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#1d4ed8",
                      boxShadow: "0 18px 34px rgba(37, 99, 235, 0.28)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Trans>Join Now</Trans>
                </Button>
                <Button
                  component={NextLink}
                  href="/courses/basic"
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    borderColor: "#cbd5e1",
                    color: "#0f172a",
                    fontWeight: 800,
                    px: 3,
                    py: 1.4,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#2563eb",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                >
                  <Trans>Explore lessons</Trans>
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={7}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "8px",
                border: "1px solid rgba(148, 163, 184, 0.28)",
                backgroundColor: "rgba(255, 255, 255, 0.86)",
                boxShadow: "0 24px 70px rgba(15, 23, 42, 0.10)",
                p: { xs: 2, sm: 3 },
              }}
            >
              <Grid container spacing={2}>
                {stats.map((item) => (
                  <Grid item xs={12} sm={4} key={item.value}>
                    <Box
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        p: 2.25,
                        minHeight: 118,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#2563eb",
                          fontSize: { xs: 28, md: 34 },
                          fontWeight: 900,
                          letterSpacing: 0,
                          lineHeight: 1,
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          color: "#475569",
                          fontWeight: 700,
                          lineHeight: 1.45,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 5, md: 8 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-end" }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 26, md: 36 },
                  fontWeight: 900,
                  letterSpacing: 0,
                }}
              >
                <Trans>What our students say</Trans>
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  maxWidth: 650,
                  color: "#64748b",
                  fontSize: { xs: 15, md: 16 },
                  lineHeight: 1.7,
                }}
              >
                <Trans>
                  Practical wins from students learning for work, school,
                  interviews, and everyday conversations.
                </Trans>
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Chip
                icon={<TrendingUpRoundedIcon />}
                label={t`Confidence`}
                sx={{ borderRadius: "8px", fontWeight: 800 }}
              />
              <Chip
                icon={<AutoStoriesRoundedIcon />}
                label={t`Practice`}
                sx={{ borderRadius: "8px", fontWeight: 800 }}
              />
            </Stack>
          </Stack>

          <Grid container spacing={2.5}>
            {testimonials.map(
              ({ name, position, avatar, feedback, metric }) => (
                <Grid item xs={12} sm={6} lg={4} key={name}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 14px 38px rgba(15, 23, 42, 0.06)",
                      p: { xs: 2.5, md: 3 },
                      transition:
                        "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                      "&:hover": {
                        borderColor: "#bfdbfe",
                        boxShadow: "0 20px 48px rgba(37, 99, 235, 0.12)",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Stack spacing={2.5} sx={{ height: "100%" }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                        >
                          <Avatar
                            src={avatar}
                            alt={name}
                            sx={{
                              width: 54,
                              height: 54,
                              border: "3px solid #ffffff",
                              boxShadow: "0 0 0 1px #bfdbfe",
                            }}
                          />
                          <Box>
                            <Typography sx={{ fontWeight: 900 }}>
                              {name}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#64748b",
                                fontSize: 13,
                                fontWeight: 700,
                              }}
                            >
                              {position}
                            </Typography>
                          </Box>
                        </Stack>
                        <FormatQuoteRoundedIcon
                          sx={{ color: "#bfdbfe", fontSize: 34 }}
                        />
                      </Stack>

                      <Typography
                        sx={{
                          color: "#1e293b",
                          flexGrow: 1,
                          fontSize: { xs: 15, md: 16 },
                          lineHeight: 1.75,
                          letterSpacing: 0,
                        }}
                      >
                        {feedback}
                      </Typography>

                      <Box
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          px: 1.5,
                          py: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#2563eb",
                            fontSize: 13,
                            fontWeight: 900,
                          }}
                        >
                          {metric}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsPage;

TestimonialsPage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
