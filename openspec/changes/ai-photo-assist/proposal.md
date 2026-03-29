## Why

Typing a meal description is the highest-friction part of logging food. A photo-to-description feature lets the user take or pick a photo, send it to a vision LLM, and get an auto-filled description they can approve or edit — lowering the barrier to logging significantly.

## What Changes

- Add a photo capture / library picker button to the food entry form
- Resize captured images before storage and before API submission
- Send the image to OpenRouter's vision API and populate the notes field with the response
- Store the image file path and AI description alongside the event
- Add OpenRouter API key configuration to Settings
- Degrade gracefully: the food form works identically when no key is configured or when the API call fails

## Capabilities

### New Capabilities

- `photo-capture`: Taking or picking a photo from within the food entry form; resizing and persisting it
- `ai-description`: Sending the image to OpenRouter, receiving a text description, pre-filling the notes field

### Modified Capabilities

- `event-logging`: Food entry form gains a photo button and AI-assisted notes pre-fill
- `settings`: OpenRouter API key input added

## Impact

- Adds `expo-camera` and `expo-image-manipulator` usage
- Adds `expo-image-picker` for library selection
- Adds OpenRouter HTTP call (fetch-based, no SDK needed)
- `app/entry/food.tsx` extended with photo UI
- `app/(tabs)/settings.tsx` extended with API key field (stored in expo-secure-store)
