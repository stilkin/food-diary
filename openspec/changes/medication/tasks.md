## 1. Schema Migration

- [ ] 1.1 Bump `schema_version` constant in `src/db/migrations.ts` from 1 to 2
- [ ] 1.2 Add migration step: if stored version < 2, run `ALTER TABLE events ADD COLUMN name TEXT`; update AsyncStorage to version 2

## 2. Data Layer

- [ ] 2.1 Update `src/db/queries.ts` — extend `insertEvent` to accept and write the `name` field; update result-mapping types to include `name: string | null`
- [ ] 2.2 Add `getMedicationNames(): Promise<string[]>` to `src/db/queries.ts` — `SELECT DISTINCT name FROM events WHERE type='medication' AND name IS NOT NULL ORDER BY name`
- [ ] 2.3 Extend event type union in `src/store/index.ts` (and any shared type definitions) to include `'medication'`

## 3. Medication Entry Form

- [ ] 3.1 Create `app/entry/medication.tsx` — modal screen with timestamp field (defaults to now), name text input, optional notes text input, Save / Cancel buttons
- [ ] 3.2 On form mount, call `getMedicationNames()` and hold result in component state for autocomplete
- [ ] 3.3 Render autocomplete suggestion list below the name input — filter suggestions case-insensitively as user types; hide list when input is empty or no matches; tapping a suggestion fills the field and dismisses the list
- [ ] 3.4 On save: apply `name.trim().replace(/\b\w/g, c => c.toUpperCase())` to normalise the name, validate it is non-empty, then call `insertEvent` and update the Zustand store

## 4. FAB Integration

- [ ] 4.1 Add "Medication" option to `src/components/ActionSheet.tsx` — always visible (no setting gate); navigates to `app/entry/medication.tsx`

## 5. Timeline Icons

- [ ] 5.1 In the timeline event row component (`app/(tabs)/index.tsx` or its sub-component), add an icon per event type using `@expo/vector-icons` (Ionicons): `restaurant` for food, `alert-circle` for ache, `water` for toilet, `medical` for medication
- [ ] 5.2 Ensure medication rows display the medication `name` as the primary label and `notes` as secondary text (consistent with how other types show their key field)

## 6. PDF Export

- [ ] 6.1 Update `src/export/template.ts` — render medication entries with the medication name as the primary label and notes below; add a "Medication" type label consistent with other type labels in the layout

## 7. Smoke Test

- [ ] 7.1 Verify migration: launch on a device/emulator with existing data — confirm app starts without error and existing entries are intact
- [ ] 7.2 Log a medication entry — verify it appears on the timeline with the correct icon and name
- [ ] 7.3 Test autocomplete — log two medications, open form again, confirm both appear as suggestions; typing filters the list; tapping fills the field
- [ ] 7.4 Test sanitization — enter " ibuprofen 400mg " and confirm stored/displayed as "Ibuprofen 400Mg" (or verify your chosen Title Case behaviour is consistent)
- [ ] 7.5 Export a date range containing a medication entry — verify name and notes appear in the PDF
