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

const courseGroups: CourseGroup[] = [
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
  const [selectedGroup, setSelectedGroup] = useState<CourseGroup>(
    courseGroups[0]
  );

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-center text-4xl font-bold mb-12">
        <Trans>Course Roadmaps</Trans>
      </h2>

      {/* Group selector */}
      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        {courseGroups.map((group) => (
          <button
            key={group.groupTitle}
            onClick={() => setSelectedGroup(group)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedGroup.groupTitle === group.groupTitle
                ? "bg-[#4f46e5] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
            }`}
            aria-label={t`Select ${group.groupTitle} roadmap`}
          >
            {group.groupTitle}
          </button>
        ))}
      </div>

      {/* Roadmap steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {selectedGroup.steps.map(
          ({ step, title, objectives, studyInfo, ctaLabel, ctaHref }) => (
            <div
              key={step}
              className="relative rounded-lg border border-transparent p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 group bg-white hover:animate-border-fade"
            >
              {/* Step Number */}
              <div className="absolute -top-6 left-8 flex items-center gap-2 rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-2 shadow-sm text-[#4f46e5] font-bold text-lg select-none group-hover:border-[#4f46e5] group-hover:bg-indigo-100 transition">
                <span className="rounded-full bg-indigo-100 w-8 h-8 flex items-center justify-center">
                  {step}
                </span>
                <span className="text-sm">
                  <Trans>Course</Trans>
                </span>
                <span className="text-lg font-semibold">{title}</span>
              </div>

              {/* Objectives */}
              <div className="mb-6 pt-8">
                <h4 className="mb-3 font-semibold text-gray-700 uppercase">
                  <Trans>Objectives</Trans>
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FaCheckCircle className="text-[#4f46e5] mt-1" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Study Info */}
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-gray-700 uppercase">
                  <Trans>Study Info</Trans>
                </h4>
                <ul className="space-y-3 text-gray-600 text-sm">
                  {studyInfo.map((info, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {i === 0 && <FaCalendarAlt className="text-[#4f46e5]" />}
                      {i === 1 && <FaUserGraduate className="text-[#4f46e5]" />}
                      {i === 2 && <FaLink className="text-[#4f46e5]" />}
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded border border-[#4f46e5] px-6 py-2 font-semibold text-[#4f46e5] shadow-sm transition hover:bg-[#4f46e5] hover:text-white"
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
