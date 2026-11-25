# BrandPilot AI

BrandPilot AI is a lightweight social content studio for small businesses. Upload an authentic product or business photo, create a campaign brief, generate editable social copy, design a five-slide carousel, and export assets.

## Product principles
- Preserve the uploaded photograph. Image adjustments are non-generative and applied in the browser.
- Never invent or replace products, food, people, ingredients, or other photographed details.
- AI-style copy suggestions are generated locally in this prototype; no external AI service or API key is connected yet.

## Run locally

```bash
npm install
npm run dev
```

## Current MVP
- Business profile and campaign brief
- Photo upload and restrained brightness, contrast, and saturation controls
- Editable captions and hashtags
- Five-slide carousel editor with downloadable PNG slides
- Campaign copy and image export

## Production integrations still needed
Connect a secure server-side language-model API for genuinely model-generated copy. Do not put secret API keys in browser code. Add authentication, persistence, and deployment configuration before production use.
