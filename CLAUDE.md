# Project Rules

This is an AI English Tutor platform built with Next.js, TypeScript, Docker, Nginx, and AWS EC2.

## Main goals

- Build clean, production-ready frontend code.
- Keep UI simple, responsive, and reusable.
- Support AI tutor features using skill-based agent design.

## Coding rules

- Use TypeScript strictly.
- Prefer small reusable components.
- Do not hardcode secrets.
- Use environment variables for API keys.
- Keep code readable and practical.

## AI features

The AI tutor should support:

- Grammar correction
- Vocabulary explanation
- Speaking practice
- Lesson plan generation
- Student progress summary

## Deployment

- Docker image is built via GitHub Actions.
- EC2 pulls the latest image and restarts containers.
- Nginx handles domain routing and HTTPS.
