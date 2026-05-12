# Localize UI

Read:

- CLAUDE.md
- .claude/rules/i18n.md
- .claude/skills/localization/SKILL.md

Task:
Localize selected files using the existing i18n structure.

Rules:

- Follow existing localization conventions.
- Replace hardcoded UI text with translation keys.
- Keep TypeScript strict.
- Do not modify business logic.

## PO/Gettext Rules

- Do not translate msgid.
- Translate only msgstr.
- Preserve placeholders exactly.
- Keep source references unchanged.
- For Vietnamese locale files, msgstr must be Vietnamese.
