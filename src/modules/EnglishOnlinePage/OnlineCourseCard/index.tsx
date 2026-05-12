"use client";

import { Trans } from "@lingui/macro";
import {
  Box,
  Typography,
  Paper,
  Button,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  detail?: string;
}

interface Props {
  course: Course;
}

export default function OnlineCourseCard({ course }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Fade in={inView} timeout={1000}>
        <Paper
          ref={ref}
          elevation={5}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 10px 30px rgba(3,90,142,0.3)",
            },
          }}
        >
          <Box
            component="img"
            src={course.image}
            alt={course.title}
            sx={{ width: "100%", height: 180, objectFit: "cover" }}
          />
          <Box
            sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {course.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              {course.description}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" fontWeight="medium" color="#035a8e">
                <Trans>Duration:</Trans> {course.duration}
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="#fc9a14">
                ${course.price}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, fontWeight: "bold" }}
              onClick={handleOpen}
            >
              <Trans>View Details</Trans>
            </Button>
          </Box>
        </Paper>
      </Fade>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{course.title}</DialogTitle>
        <DialogContent dividers>
          <Typography paragraph>
            {course.detail || course.description}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mt={2}>
            <Trans>Duration:</Trans> {course.duration} | <Trans>Price:</Trans> $
            {course.price}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            <Trans>Close</Trans>
          </Button>
          <Button
            variant="contained"
            color="primary"
            href={`/register?course=${course.id}`}
            onClick={handleClose}
          >
            <Trans>Register Now</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
