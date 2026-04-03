## Why

The PDF export can span multiple pages for a single day because images render at portrait aspect ratios and entry headers (time, type, detail) each occupy separate lines. A dietician reviewing a week of entries gets an unnecessarily long document. Compacting the layout makes the export scannable and printable.

## What Changes

- Collapse each entry's header into a single line: `HH:mm — Type` (with inline detail where applicable, e.g. medication name, severity, Bristol type)
- Render images as smaller, square-cropped thumbnails in the PDF (CSS `object-fit: cover` with fixed dimensions)
- Tighten vertical spacing between entries and day headings

## Capabilities

### New Capabilities

_None — this is a layout refinement of existing export functionality._

### Modified Capabilities

- `export`: PDF layout changes — entry headers collapse to single line, images render as square-cropped thumbnails, tighter spacing

## Impact

- `src/export/template.ts` — HTML/CSS changes to entry layout and image sizing
- No schema, API, or dependency changes
- No changes to export flow, date picker, or share sheet
