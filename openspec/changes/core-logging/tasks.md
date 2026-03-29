## 1. Data & Settings Layer

- [ ] 1.1 Create `src/db/queries.ts` — typed functions: `insertEvent`, `getEventsByDate`, `deleteEvent`; keep queries close to the schema, no ORM
- [ ] 1.2 Create `src/settings/index.ts` — read/write helpers for all settings keys (`windowHours`, `notificationMinutes`, `toiletTrackingEnabled`, `bristolScaleEnabled`) using AsyncStorage with typed defaults
- [ ] 1.3 Extend Zustand store: `events` slice (today's events array, `loadEventsForDate`, `addEvent`, `removeEvent`) and `settings` slice (mirror of persisted settings, hydrated on app start)

## 2. Entry Forms

- [ ] 2.1 Create `app/entry/food.tsx` — modal screen: timestamp field (defaults to now), notes text input, Save / Cancel buttons; on save calls `insertEvent` and updates store
- [ ] 2.2 Create `app/entry/ache.tsx` — modal screen: timestamp field, optional notes, optional 1–5 severity selector; on save calls `insertEvent`
- [ ] 2.3 Create `app/entry/toilet.tsx` — modal screen: timestamp field, optional notes, Bristol scale selector shown only when `bristolScaleEnabled`; on save calls `insertEvent`; entire screen only reachable when `toiletTrackingEnabled`
- [ ] 2.4 Wire `src/components/ActionSheet.tsx` — "Food" and "Ache" always navigate to their modal; "Toilet break" shown only when `toiletTrackingEnabled`

## 3. Fasting Window & Notifications

- [ ] 3.1 Create `src/notifications/fastingWindow.ts` — `scheduleWindowNotification(windowEnd: Date, leadMinutes: number)` and `cancelTodayNotification()`; uses expo-notifications
- [ ] 3.2 Request notification permission on first food entry (if not yet requested); store permission status in AsyncStorage
- [ ] 3.3 Call `cancelTodayNotification` + `scheduleWindowNotification` inside `insertEvent` whenever `type='food'` is inserted

## 4. Timeline Screen

- [ ] 4.1 Replace placeholder `app/(tabs)/index.tsx` with full Timeline screen; load events for selected date from Zustand / SQLite on mount and on date change
- [ ] 4.2 Implement date header: previous-day button, tappable date label (opens date picker), next-day button (disabled when today); format date with dayjs
- [ ] 4.3 Render event list: FlatList of event rows, each showing time (dayjs), type icon, and notes excerpt; visually distinct per type
- [ ] 4.4 Render fasting window indicator: if any food event exists for the day, show window start and end times below the date header
- [ ] 4.5 Implement swipe-to-delete (or long-press menu) on event rows; confirm before deleting; remove image files from filesystem on delete

## 5. Settings Screen

- [ ] 5.1 Replace placeholder `app/(tabs)/settings.tsx` with full Settings screen
- [ ] 5.2 Add window duration control (numeric input or stepper, hours, default 8)
- [ ] 5.3 Add notification lead time control (numeric input or stepper, minutes, default 30)
- [ ] 5.4 Add toilet tracking toggle (default on)
- [ ] 5.5 Add Bristol scale toggle (default off); only visible when toilet tracking is enabled
- [ ] 5.6 Persist all changes immediately on edit; update Zustand settings slice

## 6. Integration & Smoke Test

- [ ] 6.1 Verify end-to-end: log food → timeline updates → notification scheduled → navigate to past day → events shown correctly
- [ ] 6.2 Verify toilet tracking toggle hides/shows the action sheet option and the entry screen
- [ ] 6.3 Verify Bristol scale toggle hides/shows the selector in the toilet entry form
- [ ] 6.4 Verify delete removes the event from the timeline and cleans up any associated image files
