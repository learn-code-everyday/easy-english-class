"use client";

import { t } from "@lingui/macro";
import React from "react";

import MainLayout from "@/layouts/MainLayout";
import CourseLandingPage from "@/modules/CourseLandingPage";

export default function OnlineCoursesPage() {
  return (
    <CourseLandingPage
      course={{
        accent: "#0f766e",
        eyebrow: t`Online Course`,
        title: t`Flexible online English lessons that fit your week.`,
        description: t`Study live and self-paced lessons from anywhere with structured modules, practice tasks, and support for speaking, business, and exam goals.`,
        targetLearners: [
          t`Remote learners who need a flexible schedule`,
          t`Working adults balancing study with a busy week`,
          t`Students who want guided online practice`,
        ],
        roadmap: [
          t`Choose a learning track that matches your goal`,
          t`Complete weekly video lessons and practice tasks`,
          t`Join live speaking sessions for real interaction`,
          t`Track progress and adjust your study plan`,
        ],
        outcomes: [
          t`Maintain a consistent English practice routine`,
          t`Improve speaking and listening from home`,
          t`Access lessons on desktop and mobile`,
          t`Get clear next steps after every module`,
        ],
        modules: [
          {
            title: t`Live speaking lab`,
            description: t`Practice conversations with teacher-guided prompts.`,
            meta: t`Online · 30 min`,
          },
          {
            title: t`Self-paced grammar`,
            description: t`Review grammar patterns with short exercises.`,
            meta: t`Online · 25 min`,
          },
          {
            title: t`Business track`,
            description: t`Prepare for meetings, emails, and presentations.`,
            meta: t`Online · 35 min`,
          },
          {
            title: t`Progress review`,
            description: t`Check completed tasks and plan your next lesson.`,
            meta: t`Online · 15 min`,
          },
        ],
        packages: [
          {
            name: t`Online Flex`,
            price: t`$79`,
            description: t`Self-paced access with weekly live practice options.`,
          },
          {
            name: t`Online Plus`,
            price: t`$159`,
            description: t`Live coaching, feedback, and a personalized study plan.`,
          },
        ],
      }}
    />
  );
}

OnlineCoursesPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
