import dayjs from 'dayjs';
import type { DiaryEventWithImage } from '@/types';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildHtml(
  events: DiaryEventWithImage[],
  images: Record<number, string>,
  startDate: Date,
  endDate: Date
): string {
  const headerRange =
    `${dayjs(startDate).format('D MMM YYYY')} – ${dayjs(endDate).format('D MMM YYYY')}`;
  const exportedAt = dayjs().format('D MMM YYYY, HH:mm');

  // Group events by calendar day
  const byDay = new Map<string, DiaryEventWithImage[]>();
  for (const event of events) {
    const key = dayjs(event.timestamp).format('YYYY-MM-DD');
    const group = byDay.get(key);
    if (group) {
      group.push(event);
    } else {
      byDay.set(key, [event]);
    }
  }

  let body = '';
  if (byDay.size === 0) {
    body = '<p class="empty">No entries for this period.</p>';
  } else {
    for (const [dateKey, dayEvents] of byDay) {
      body += `<h2>${dayjs(dateKey).format('dddd, D MMMM YYYY')}</h2>`;
      for (const e of dayEvents) {
        const time = dayjs(e.timestamp).format('HH:mm');
        const type = e.type.charAt(0).toUpperCase() + e.type.slice(1);
        let header = `${time} — ${type}`;
        if (e.type === 'medication' && e.name) header += ` — ${esc(e.name)}`;
        if (e.severity != null) header += ` — Severity: ${e.severity}/5`;
        if (e.bristol_type != null) header += ` — Bristol: ${e.bristol_type}`;
        if (e.type === 'food' && e.breaks_fast === 0) header += ` (fasting-safe)`;
        body += `<div class="event">`;
        body += `<div class="header">${header}</div>`;
        if (e.notes) body += `<div class="notes">${esc(e.notes)}</div>`;
        if (images[e.id]) body += `<img src="${images[e.id]}" />`;
        body += `</div>`;
      }
    }
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: sans-serif; font-size: 14px; color: #222; margin: 0; padding: 16px; }
    h1 { font-size: 20px; margin: 0 0 4px; }
    .meta { font-size: 12px; color: #888; margin-bottom: 24px; }
    h2 { font-size: 15px; font-weight: bold; margin: 14px 0 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
    .event { margin-bottom: 8px; padding-left: 10px; border-left: 3px solid #eee; }
    .header { font-size: 13px; font-weight: bold; }
    .notes { font-size: 13px; margin-top: 2px; }
    img { width: 100px; height: 100px; object-fit: cover; margin-top: 4px; display: block; border-radius: 4px; }
    .empty { color: #aaa; text-align: center; padding: 40px 0; }
  </style>
</head>
<body>
  <h1>Gutsy</h1>
  <p class="meta">${headerRange} &middot; Exported ${exportedAt}</p>
  ${body}
</body>
</html>`;
}
