export type EventType = 'food' | 'ache' | 'toilet';

export interface DiaryEvent {
  id: number;
  type: EventType;
  timestamp: number;         // Unix ms (user-facing event time)
  notes: string | null;
  severity: number | null;       // 1–5, ache only
  bristol_type: number | null;   // 1–7, toilet only
  created_at: number;
}

export interface DiaryEventWithImage extends DiaryEvent {
  image_path: string | null;
}

export interface Settings {
  windowHours: number;              // default 8
  notificationMinutes: number;      // default 30
  toiletTrackingEnabled: boolean;   // default true
  bristolScaleEnabled: boolean;     // default false
}
