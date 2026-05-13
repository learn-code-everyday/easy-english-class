# API Rules

Apply to API and server-side code.

## Rules

- Never expose API keys to frontend.
- Validate request body.
- Return consistent JSON response.
- Add /health endpoint for deployment health checks.
- Use clear error messages without leaking internals.

## Health check response

```json
{
  "status": "ok"
}
```
