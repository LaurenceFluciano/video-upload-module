import { DB } from "sqlite";

const DB_FILE = "./videos.sqlite";

export const db = new DB(DB_FILE);

// Initialize videos table
db.execute(`
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    provider TEXT NOT NULL,
    provider_video_id TEXT,
    extension TEXT,
    status TEXT NOT NULL
  );
`);

// Keep DB instance open for the life of the app
