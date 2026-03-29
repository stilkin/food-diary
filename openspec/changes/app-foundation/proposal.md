## Why

There is no application yet. This change establishes the complete project foundation: the Expo app, navigation structure, database schema, and state management layer that all future changes will build on.

## What Changes

- Initialise a new Expo (React Native) project with TypeScript and Expo Router
- Define the SQLite schema for all event types (food, ache, toilet) and image references
- Set up Zustand store structure
- Implement the navigation shell: tab bar with Timeline and Settings screens, FAB placeholder
- Add dayjs for date formatting

## Capabilities

### New Capabilities

- `data-model`: SQLite schema for events and images; the canonical shape of all persistent data
- `navigation-shell`: Expo Router layout, tab structure, and FAB — the skeleton every screen will inhabit

### Modified Capabilities

_(none — this is the initial setup)_

## Impact

- Creates the Expo project directory and all root-level config files (`app.json`, `tsconfig.json`, etc.)
- Installs all foundation dependencies
- No existing code is affected
