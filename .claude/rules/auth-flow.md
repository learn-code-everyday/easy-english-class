# Auth Flow Rules

## Authentication

- User must have valid JWT.
- On expired token:
  - clear session
  - redirect to login
  - show toast error

## Role handling

- Do not hardcode role checks repeatedly.
- Use reusable role helper/hooks.

## Route protection

- STUDENT routes:
  - /lessons
  - /manage/student/\*

- TEACHER routes:
  - /manage/teacher/\*

- ADMIN routes:
  - /manage/admin/\*
