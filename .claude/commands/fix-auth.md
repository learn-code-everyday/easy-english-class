# Fix Auth Session

Task:
Fix expired JWT session handling.

Requirements:

- Auto logout when token expires.
- Redirect to /login on unauthorized GraphQL response.
- Create reusable auth utilities.
- Follow existing GraphQL client structure.
- Do not change unrelated files.
