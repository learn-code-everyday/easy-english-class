"use client";

import { t } from "@lingui/macro";
import React from "react";

import MainLayout from "@/layouts/MainLayout";
import CourseLandingPage from "@/modules/CourseLandingPage";

export default function BasicCommunicationCoursePage() {
  return (
    <CourseLandingPage
      course={{
        accent: "#2563eb",
        eyebrow: t`Basic Communication`,
        title: t`Speak English clearly in everyday situations.`,
        description: t`Build practical listening, speaking, and response skills with guided lessons for greetings, classroom talk, shopping, travel, and daily conversation.`,
        targetLearners: [
          t`New learners who want a confident foundation`,
          t`Students preparing for daily English conversations`,
          t`Busy adults who need short, guided practice`,
        ],
        roadmap: [
          t`Learn core phrases and sentence patterns`,
          t`Practice short dialogues with guided prompts`,
          t`Record speaking tasks and review pronunciation`,
          t`Apply the language in real-life scenarios`,
        ],
        outcomes: [
          t`Start and respond to common conversations`,
          t`Use polite complete sentences naturally`,
          t`Improve pronunciation through repeated practice`,
          t`Build confidence for everyday English`,
        ],
        modules: [
          {
            title: t`Greetings and introductions`,
            description: t`Practice names, small talk, and polite first conversations.`,
            meta: t`Beginner · 18 min`,
          },
          {
            title: t`Classroom English`,
            description: t`Ask questions, request help, and respond to teachers clearly.`,
            meta: t`Beginner · 22 min`,
          },
          {
            title: t`Daily routines`,
            description: t`Talk about schedules, habits, and simple plans.`,
            meta: t`Beginner · 20 min`,
          },
          {
            title: t`Travel basics`,
            description: t`Use essential phrases for directions, tickets, and hotels.`,
            meta: t`Beginner · 25 min`,
          },
        ],
        packages: [
          {
            name: t`Starter`,
            price: t`$49`,
            description: t`Self-paced lessons with essential practice tasks.`,
          },
          {
            name: t`Coached`,
            price: t`$99`,
            description: t`Guided learning with teacher feedback and speaking review.`,
          },
        ],
      }}
    />
  );
}

BasicCommunicationCoursePage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
