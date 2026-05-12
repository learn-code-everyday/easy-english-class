"use client";

import { t, Trans } from "@lingui/macro";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Button,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import MainLayout from "@/layouts/MainLayout";

const testimonials = [
  {
    name: "Emily Nguyen",
    position: t`Student`,
    avatar: "/avatars/emily.jpg",
    feedback: t`This English course transformed my confidence. The instructors are amazing and the curriculum is very practical.`,
  },
  {
    name: "James Lee",
    position: t`Working Professional`,
    avatar: "/avatars/james.jpg",
    feedback: t`I improved my business English tremendously. The classes fit well into my busy schedule.`,
  },
  {
    name: "Sophia Tran",
    position: t`University Student`,
    avatar: "/avatars/sophia.jpg",
    feedback: t`Fun and engaging lessons with a great community. Highly recommend to anyone learning English!`,
  },
  {
    name: "Michael Pham",
    position: t`Freelancer`,
    avatar: "/avatars/michael.jpg",
    feedback: t`Practical approach and lots of speaking practice. My English skills have never been better!`,
  },
  {
    name: "Anna Le",
    position: t`Entrepreneur`,
    avatar: "/avatars/anna.jpg",
    feedback: t`The course content is clear and practical, and the teachers really care about students' progress.`,
  },
  {
    name: "David Hoang",
    position: t`Marketing Specialist`,
    avatar: "/avatars/david.jpg",
    feedback: t`Thanks to these courses, my English communication at work has improved significantly.`,
  },
  {
    name: "Linda Phan",
    position: t`Graduate Student`,
    avatar: "/avatars/linda.jpg",
    feedback: t`I loved the interactive classes and the friendly environment. Learning English became fun!`,
  },
  {
    name: "Tommy Vu",
    position: t`Software Engineer`,
    avatar: "/avatars/tommy.jpg",
    feedback: t`Highly recommend! The course helped me prepare for my international job interviews.`,
  },
];

const gradientBg =
  "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 40%, #fff7e5 100%)";

const TestimonialsPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 7, md: 9 },
        background: gradientBg,
        minHeight: { xs: "100vh", md: "calc(100vh - 152px)" },
        position: "relative",
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 0, sm: 2 } }}>
        <Typography
          variant="h3"
          color="primary"
          fontWeight={800}
          textAlign="center"
          gutterBottom
          sx={{
            mb: 2,
            fontSize: { xs: 24, sm: 30, md: 38 },
            letterSpacing: "-1.2px",
            textShadow: "0 2px 16px rgba(0,64,128,0.08)",
            fontFamily: "Montserrat, Roboto, Arial, sans-serif",
          }}
        >
          <Trans>What Our Students Say</Trans>
        </Typography>

        <Typography
          variant="h5"
          color="primary"
          fontWeight={500}
          textAlign="center"
          mb={4}
          sx={{
            fontStyle: "italic",
            maxWidth: 700,
            mx: "auto",
            fontSize: { xs: 15, sm: 18, md: 21 },
            letterSpacing: 0,
            opacity: 0.9,
          }}
        >
          <Trans>
            Curious what our students think? Here&apos;s what they say after
            transforming their English skills!
          </Trans>
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          mb={7}
          color="text.secondary"
          sx={{ fontSize: { xs: 14, sm: 15.5 }, letterSpacing: 0.1 }}
        >
          <Trans>
            Real feedback from students who have achieved outstanding results
            with our English courses.
          </Trans>
        </Typography>

        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          spaceBetween={14}
          slidesPerView={1}
          loop
          speed={6500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          grabCursor
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 1 },
            900: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
            1536: { slidesPerView: 4 },
          }}
          style={{
            paddingBottom: "40px",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          {testimonials.map(({ name, position, avatar, feedback }) => (
            <SwiperSlide key={name}>
              <Paper
                elevation={0}
                sx={{
                  backdropFilter: "blur(8px)",
                  background: "rgba(255,255,255,0.92)",
                  border: `1.5px solid ${theme.palette.primary.light}`,
                  boxShadow:
                    "0 8px 28px 0 rgba(3,90,142,0.10), 0 1.5px 7px 0 #b6e2ff50",
                  p: { xs: 2.5, sm: 3.2, md: 4.5 },
                  minHeight: { xs: 260, sm: 270, md: 300 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderRadius: 4,
                  position: "relative",
                  transition:
                    "transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s",
                  mx: { xs: 1, sm: 2, md: 2.5 },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.03)",
                    boxShadow:
                      "0 14px 42px 0 rgba(3,90,142,0.18), 0 2px 10px 0 #b6e2ff77",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: { xs: 1.5, md: 2.5 },
                  }}
                >
                  <Avatar
                    src={avatar}
                    alt={name}
                    sx={{
                      width: { xs: 52, sm: 56, md: 62 },
                      height: { xs: 52, sm: 56, md: 62 },
                      mr: 2.5,
                      border: "3px solid #ffb23f",
                      boxShadow: "0 2px 12px 0 #ffddab, 0 0 0 3px #fff",
                      background:
                        "linear-gradient(135deg, #ffe6c6 0%, #fc9a14 100%)",
                    }}
                  />
                  <Box>
                    <Typography
                      fontWeight={700}
                      fontSize={{ xs: 16.5, md: 18.5 }}
                      color="primary"
                      sx={{
                        fontFamily: "Montserrat, Roboto, Arial, sans-serif",
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="#fc9a14"
                      fontWeight={600}
                      fontSize={{ xs: 12.5, md: 13.5 }}
                      sx={{
                        letterSpacing: 0.2,
                        background:
                          "linear-gradient(90deg, #fc9a14 30%, #ffe6c6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "Montserrat, Roboto, Arial, sans-serif",
                      }}
                    >
                      {position}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontStyle: "italic",
                    color: "#383a47",
                    flexGrow: 1,
                    fontSize: { xs: 15.5, md: 16.5 },
                    lineHeight: 1.7,
                    position: "relative",
                    paddingLeft: "1.75rem",
                    fontWeight: 500,
                    letterSpacing: 0,
                    textShadow: "0 1px 8px #ffe6c660",
                    "&::before": {
                      content: "'“'",
                      position: "absolute",
                      left: 0,
                      top: -6,
                      fontSize: 40,
                      color:
                        "linear-gradient(135deg, #fc9a14 70%, #ffe6c6 100%)",
                      fontWeight: "bold",
                      lineHeight: 1,
                      fontFamily: "serif",
                      opacity: 0.7,
                    },
                  }}
                >
                  {feedback}
                </Typography>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box textAlign="center" mt={8}>
          <Typography
            variant="h6"
            fontWeight={800}
            color="primary"
            mb={2}
            sx={{
              fontSize: { xs: 17, md: 20 },
              letterSpacing: 0.2,
              fontFamily: "Montserrat, Roboto, Arial, sans-serif",
            }}
          >
            <Trans>Ready to start your own success story?</Trans>
          </Typography>
          <Button
            variant="contained"
            component={NextLink}
            href="/register"
            endIcon={
              <ArrowForwardIosRoundedIcon sx={{ fontSize: 21, ml: 0.5 }} />
            }
            sx={{
              borderRadius: 999,
              background: "linear-gradient(92deg, #fc9a14 30%, #ffe6c6 100%)",
              color: "white",
              fontWeight: 700,
              fontSize: { xs: 15.5, md: 16.5 },
              px: 4.5,
              py: 1.4,
              boxShadow: "0 2px 14px #ffc67260",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #e2940f 30%, #ffe6c6 100%)",
                boxShadow: "0 3px 20px #ffc67290",
                transform: "scale(1.05)",
              },
            }}
          >
            <Trans>Join Now</Trans>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsPage;

TestimonialsPage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
