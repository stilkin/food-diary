## Why

Users taking regular or as-needed medications need to log them alongside food, ache, and toilet events so their diary gives their dietician or physician a complete picture of what they ingested and when. Without medication tracking, the diary is missing a clinically relevant data point.

## What Changes

- Add `type='medication'` as a first-class event type stored in the existing `events` table
- Add a `name TEXT` column to `events` for the medication name (also useful for future named entry types)
- New medication entry form: timestamp (defaults to now), medication name with autocomplete + sanitization, optional notes
- Name input: autocomplete suggestions drawn from distinct past medication names in SQLite; input normalised to Title Case with whitespace trimmed on save
- FAB action sheet: add "Medication" option alongside Food / Ache / Toilet
- Timeline: add distinct icons for all event types (food, ache, toilet, medication) to make entries visually distinguishable at a glance
- PDF export: render medication entries grouped with other events per day, showing name and notes

## Capabilities

### New Capabilities

- `medication-logging`: Medication entry form with name autocomplete and sanitization, data persistence, and FAB integration

### Modified Capabilities

- `data-model`: Add `name TEXT` column to `events` table via migration; add `'medication'` to the type enum in the schema
- `timeline-view`: Add per-type icons for all event types (food, ache, toilet, and the new medication type)
- `export`: Render medication entries (name + notes) in the PDF diary export

## Impact

- `src/db/migrations.ts` — new migration to `ALTER TABLE events ADD COLUMN name TEXT`
- `src/db/queries.ts` — `insertEvent` and `getEventsByDate*` updated to handle `name` field; new query for autocomplete suggestions
- `src/store/index.ts` — event type union extended with `'medication'`
- `src/components/ActionSheet.tsx` — add Medication option
- `app/entry/medication.tsx` — new modal screen
- `app/(tabs)/index.tsx` — timeline row icons updated for all four types
- `src/export/template.ts` — medication entries rendered in HTML template
