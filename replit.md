# The John Cooper School Website

A full-stack replica of the John Cooper School website (johncooper.org) built with React + Vite (frontend) and Express (backend), with Cloudinary integration for 37 auto-enhanced images.

## Architecture

### Monorepo Structure
- `artifacts/upload-tool/` — React + Vite frontend (school website at `/`)
- `artifacts/api-server/` — Express.js backend API
- `lib/db/` — Drizzle ORM database schemas and connection
- `lib/api-spec/` — OpenAPI spec

### Tech Stack
- **Frontend**: React, Vite, Wouter (routing), TanStack Query, Tailwind CSS, Playfair Display (Google Font)
- **Backend**: Express.js, Drizzle ORM, Multer (file uploads), Cloudinary SDK
- **Database**: PostgreSQL (via Replit built-in)
- **Images**: Cloudinary with auto-enhancement transforms (`q_auto,f_auto,e_improve`)

## Website Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero slider, stats, news, events |
| `/about` | About page with mission, history, leadership |
| `/admissions` | Admissions process and programs |
| `/academics` | K-12 academic programs and AP courses |
| `/news` | News articles and upcoming events calendar |
| `/login` | Demo login page (no real auth) |
| `/visit` | Schedule a campus visit form |
| `/inquire` | Online inquiry form |
| `/apply` | Application information and portal link |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/healthz` | GET | Health check |
| `/api/images` | GET | List all uploaded Cloudinary images |
| `/api/images/upload` | POST | Upload image to Cloudinary with auto-enhancement |
| `/api/images/:id` | DELETE | Delete image record |
| `/api/forms/inquire` | POST | Submit inquiry form (saved to DB) |
| `/api/forms/visit` | POST | Submit visit request (saved to DB) |
| `/api/forms/inquiries` | GET | List all form submissions |

## Database Tables

- `images` — Cloudinary image records (label, cloudinary_url, public_id, original_filename)
- `inquiries` — Form submissions (first_name, last_name, email, phone, grade_level, student_name, message, type)

## Cloudinary Integration

All 37 school images are uploaded to Cloudinary under the `cooper-school/` folder with labels `image1` through `image37`. The frontend applies auto-enhancement transforms to all Cloudinary URLs:
- `q_auto` — automatic quality optimization
- `f_auto` — automatic format selection (WebP/AVIF)
- `e_improve` — AI-powered image enhancement

**Note**: The Cloudinary credentials are stored in Replit secrets with the variable names and values in non-standard positions due to initial setup. The server maps:
- `CLOUDINARY_API_KEY` secret → `cloud_name`
- `CLOUDINARY_API_SECRET` secret → `api_key`
- `CLOUDINARY_CLOUD_NAME` secret → `api_secret`

## Image Fallback System

The `resolveImage()` function in `src/hooks/useImages.ts`:
1. Tries to find the image label in the Cloudinary API response
2. Falls back to a local static image in `public/images/` if not found
3. Applies Cloudinary enhancement transforms to all cloud URLs

## Color Scheme

- Primary green: `#1e4d2b` (dark forest green)
- Top bar: `#1e4d2b`
- Footer: `#1a3d22`
- Typography: Playfair Display (serif headings) + Inter (body)

## Development

```bash
# Start all services
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/upload-tool run dev

# Push DB schema changes
pnpm --filter @workspace/db run push
```
