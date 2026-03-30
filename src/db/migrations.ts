import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './database';

const CURRENT_SCHEMA_VERSION = 1;

export async function runMigrations(): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS events (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      type         TEXT    NOT NULL,
      timestamp    INTEGER NOT NULL,
      notes        TEXT,
      severity     INTEGER,
      bristol_type INTEGER,
      created_at   INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS images (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id       INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      file_path      TEXT    NOT NULL,
      ai_description TEXT,
      created_at     INTEGER NOT NULL
    );

    PRAGMA foreign_keys = ON;
  `);

  const existing = await AsyncStorage.getItem('schema_version');
  if (existing === null) {
    await AsyncStorage.setItem('schema_version', String(CURRENT_SCHEMA_VERSION));
  }
}
