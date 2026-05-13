"use client";

import { t, Trans } from "@lingui/macro";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaUserGraduate,
  FaLink,
} from "react-icons/fa";

type Step = {
  step: number;
  title: string;
  objectives: string[];
  studyInfo: string[];
  ctaLabel: string;
  ctaHref: string;
};

type CourseGroup = {
  groupTitle: string;
  steps: Step[];
};

const getCourseGroups = (): CourseGroup[] => [
  {
    groupTitle: "IELTS Junior",
    steps: [
      {
        step: 1,
        title: "Pre-Junior",
        objectives: [
          t`Build English foundation and communication skills`,
          t`Prepare basic English grammar and vocabulary`,
        ],
        studyInfo: [
          t`Duration: 3 months`,
          t`Classes 3 times a week`,
          t`Focus on listening and speaking skills`,
        ],
        ctaLabel: t`View Details`,
        ctaHref: "/courses/pre-junior",
      },
      {
        step: 2,
        title: "Junior 1",
        objectives: [
          t`Develop basic writing and reading skills`,
          t`Prepare for A1-A2 level exams`,
          t`Build confidence in daily communication`,
        ],
        studyInfo: [
          t`Duration: 4 months`,
          t`Classes 3 times a week`,
          t`Practice with mock exams`,
        ],
        ctaLabel: t`View Details`,
        ctaHref: "/courses/junior-1",
      },
      {
        step: 3,
        title: "Junior 2",
        objectives: [
          t`Improve grammar and vocabulary to B1 level`,
          t`Develop essay writing skills`,
          t`Prepare for IELTS Junior exam`,
        ],
        studyInfo: [
          t`Duration: 4 months`,
          t`Classes 3 times a week`,
          t`Focus on all 4 skills: reading, writing, listening, speaking`,
        ],
        ctaLabel: t`View Details`,
        ctaHref: "/courses/junior-2",
      },
    ],
  },
  {
    groupTitle: "IELTS Senior",
    steps: [
      {
        step: 1,
        title: "Senior 1",
        objectives: [
          t`Master intermediate grammar and vocabulary`,
          t`Develop academic writing skills`,
          t`Prepare for IELTS band 5.0`,
        ],
        studyInfo: [
          t`Duration: 5 months`,
          t`Classes 4 times a week`,
          t`Practice with real IELTS exam materials`,
        ],
        ctaLabel: t`View Details`,
        ctaHref: "/courses/senior-1",
      },
      {
        step: 2,
        title: "Senior 2",
        objectives: [
          t`Refine listening and speaking skills`,
          t`Advanced essay writing`,
          t`Prepare for IELTS band 6.0`,
        ],
        studyInfo: [
          t`Duration: 5 months`,
          t`Classes 4 times a week`,
          t`Individualized feedback and coaching`,
        ],
        ctaLabel: t`View Details`,
        ctaHref: "/courses/senior-2",
      },
    ],
  },
  {
    groupTitle: "IELTS Advanced",
    steps: [
      {
        step: 1,
        title: "Advanced 1",
        objectives: [
          t`Perfect advanced grammar and vocabulary`,
          t`Master all IELTS question types`,
          t`Aim for band 7.0+`,
        ],
        studyInfo: [
          t`Duration: 6 months`,
          t`Classes 5 times a week`,
          t`Mock exams with detailed analysis`,
        ],
        ctaLabel: t`View Details`,
        ctaHref: "/courses/advanced-1",
      },
      {
        step: 2,
        title: "Advanced 2",
        objectives: [
          t`Expert-level essay and speaking skills`,
          t`Strategies for high band score`,
          t`Prepare for real test conditions`,
        ],
        studyInfo: [
          t`Duration: 6 months`,
          t`Classes 5 times a week`,
          t`One-on-one coaching sessions`,
        ],
        ctaLabel: t`View Details`,
        ctaHref: "/courses/advanced-2",
      },
    ],
  },
];

export default function CourseRoadmap() {
  const courseGroups = getCourseGroups();
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const selectedGroup = courseGroups[selectedGroupIndex] ?? courseGroups[0];

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        <Trans>Course Roadmaps</Trans>
      </h2>

      {/* Group selector */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {courseGroups.map((group, index) => (
          <button
            key={group.groupTitle}
            onClick={() => setSelectedGroupIndex(index)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
              selectedGroup.groupTitle === group.groupTitle
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            }`}
            aria-label={t`Select ${group.groupTitle} roadmap`}
          >
            {group.groupTitle}
          </button>
        ))}
      </div>

      {/* Roadmap steps */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {selectedGroup.steps.map(
          ({ step, title, objectives, studyInfo, ctaLabel, ctaHref }) => (
            <div
              key={step}
              className="group rounded-[var(--app-radius)] border border-slate-200 bg-white p-6 shadow-[var(--app-shadow-sm)] transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-[var(--app-shadow-md)] sm:p-7"
            >
              {/* Step Number */}
              <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-blue-700 shadow-sm transition group-hover:border-blue-200 group-hover:bg-blue-100">
                <span className="flex size-8 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
                  {step}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                  <Trans>Course</Trans>
                </span>
                <span className="min-w-0 text-base font-semibold sm:text-lg">
                  {title}
                </span>
              </div>

              {/* Objectives */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <Trans>Objectives</Trans>
                </h4>
                <ul className="space-y-2 text-sm leading-6 text-slate-700">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FaCheckCircle className="mt-1 text-blue-600" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Study Info */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <Trans>Study Info</Trans>
                </h4>
                <ul className="space-y-3 text-sm leading-6 text-slate-600">
                  {studyInfo.map((info, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {i === 0 && <FaCalendarAlt className="text-blue-600" />}
                      {i === 1 && <FaUserGraduate className="text-blue-600" />}
                      {i === 2 && <FaLink className="text-blue-600" />}
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label={t`${title} course details`}
              >
                <FaLink />
                {ctaLabel}
              </a>
            </div>
          )
        )}
      </div>
    </section>
  );
}
