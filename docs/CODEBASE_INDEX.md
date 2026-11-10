# Codebase Index

Living map of the portfolio project. Use this as the starting point before making changes.

## 1. What this is

A personal portfolio for **Nkwenti Severian Ndongtsop**: a React/Vite single-page app with a
public AI assistant. The AI assistant is a separate Express service (`portfolio-ai-server/`)
that proxies chat requests to Groq.

Deployed pieces:

| Piece | Host | Notes |
| --- | --- | --- |
| Frontend | Vercel (`nkwenti-severian-ndongtsop.vercel.app`) | Static Vite build |
| AI backend | Render (`backend-ai-x0er.onrender.com`) | Express service in `portfolio-ai-server/` |
| Frontend container | GHCR (`ghcr.io/.../nkwenti-portfolio`) | Optional nginx + Docker build |

## 2. Tech stack

- **Frontend:** React 19, TypeScript, Vite 7, React Router 7, Tailwind CSS, shadcn/Radix UI,
  TanStack Query, Framer-style CSS animations, Plausible analytics.
- **AI backend:** Node.js 20+, Express 4, `groq-sdk`, `express-rate-limit`, `cors`, `dotenv`.
- **Infrastructure:** Docker (multi-stage frontend image), nginx, GitHub Actions (lint/build +
  GHCR push), Render, Vercel.
- **Tooling:** ESLint 9, TypeScript 5.9. No test framework is configured yet.

## 3. Quick start

```bash
# Frontend
npm ci
npm run dev        # http://localhost:8080

# AI backend (separate terminal)
cd portfolio-ai-server
npm ci
cp .env.example .env   # then add GROQ_API_KEY
npm run dev            # http://localhost:3001
```

Useful commands:

```bash
npm run lint       # ESLint
npm run build      # Vite build (does not type-check; see roadmap)
npm run ci         # lint + build (used by GitHub Actions)
npm run preview    # serve production build locally
```

## 4. Directory map

```
.
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Providers, router, analytics, AI health warm-up
│   ├── pages/
│   │   ├── Index.tsx             # Landing: hero, tech stack, featured projects
│   │   ├── Projects.tsx          # Searchable/filterable project list
│   │   ├── About.tsx             # Story, experience timeline, skills
│   │   ├── Achievements.tsx      # Certifications and milestones
│   │   ├── Contact.tsx           # Formspree contact form, socials, FAQ
│   │   └── NotFound.tsx          # Catch-all route
│   ├── components/
│   │   ├── ai/ChatWidget.tsx     # AI chat UI, persistence, suggestions, streaming-less API calls
│   │   ├── analytics/            # Plausible wrapper + cookie banner
│   │   ├── layout/               # Navbar (theme toggle) + Footer
│   │   └── ui/                   # shadcn/Radix primitives + ProjectCard, TechStack, LazyImage
│   ├── data/projects.ts          # Single source of truth for portfolio projects
│   ├── hooks/                    # use-mobile, use-toast, useAnalytics
│   ├── lib/
│   │   ├── config.ts             # AI backend URL + endpoint constants
│   │   └── utils.ts              # cn() helper
│   └── index.css                 # Tailwind layers, design tokens, custom animations
├── portfolio-ai-server/
│   ├── server.js                 # Express API: /health, POST /api/chat
│   ├── Dockerfile                # Node 18 Alpine production image
│   ├── .env.example              # Required/optional env vars
│   └── README.md                 # Backend setup + deployment docs
├── public/                       # Images, robots.txt, sitemap.xml
├── leetcard-custom/              # Separate LeetCode stats-card generator (Python/Node)
├── nginx.conf                    # SPA routing + /api/chat reverse proxy + security headers
├── Dockerfile                    # Frontend build + nginx runtime
├── docker-entrypoint.sh          # Writes runtime env file (currently unused by index.html)
└── .github/workflows/            # build.yml (CI), package-build.yaml (GHCR), update_card.yml
```

## 5. Frontend routing

All routes are defined in `src/App.tsx` and lazy-loaded:

| Route | Page |
| --- | --- |
| `/` | `pages/Index.tsx` |
| `/projects` | `pages/Projects.tsx` |
| `/about` | `pages/About.tsx` |
| `/achievements` | `pages/Achievements.tsx` |
| `/contact` | `pages/Contact.tsx` |
| `*` | `pages/NotFound.tsx` |

`ChatWidget` is mounted per-page, not globally. On mount, `App.tsx` warms up the Render backend
because free instances sleep and take ~30-60s to wake.

## 6. AI request flow

```
ChatWidget (browser)
  └─ POST {AI_SERVER_URL}/api/chat  { message, conversationHistory[-5] }
       └─ Express /api/chat (portfolio-ai-server/server.js)
            ├─ build system prompt from AI_SYSTEM_PROMPT + AI_CONTEXT
            ├─ Groq chat completion  (GROQ_MODEL, default: openai/gpt-oss-120b)
            ├─ on model-not-found 404: retry once with openai/gpt-oss-20b
            └─ JSON { response, model, suggestions, conversationId, ... }
```

- Chat history is stored in `localStorage` under `nkwenti-chat-messages`.
- Messages render as plain text; full `http(s)` URLs and email addresses become clickable links.
  External links open in a new tab with `rel="noopener noreferrer"`.
- Follow-up suggestions are generated server-side from keywords.
- `GET /health` returns status, version, and the active model.
- CORS allows only `FRONTEND_URL` (default `http://localhost:8080`).

### Environment variables

Backend (`portfolio-ai-server/.env`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `GROQ_API_KEY` | yes | Groq API key |
| `GROQ_MODEL` | no | Model ID, default `openai/gpt-oss-120b` |
| `FRONTEND_URL` | yes in prod | Allowed CORS origin |
| `AI_CONTEXT` | no | Extra context appended to the system prompt |
| `AI_SYSTEM_PROMPT` | yes | Full system prompt (keep it out of git) |
| `CHAT_RATE_LIMIT` | no | Max chat requests per IP per window (default `20`) |
| `CHAT_RATE_WINDOW_MS` | no | Rate-limit window in ms (default `60000`) |
| `JSON_BODY_LIMIT` | no | Max request body size (default `16kb`) |
| `PORT` | no | Defaults to 3001; Render sets automatically |

The full prompt is supplied through `AI_SYSTEM_PROMPT` and is deliberately **not committed**
so personal details stay private. Set it in `.env` locally and in the Render dashboard for
production. If it is missing, the server uses a generic fallback with no personal data.

Frontend (`.env` / Vercel project settings):

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_AI_SERVER_URL` | no | Override the AI backend URL (defaults to Render URL) |

## 7. Known issues and improvement roadmap

### P0 — correctness/security

- [x] **AI returned 404:** Groq decommissioned `llama-3.3-70b-versatile` on 2026-08-16. The backend
  now defaults to `openai/gpt-oss-120b` and falls back to `openai/gpt-oss-20b`. Redeploy the Render
  service for the change to take effect.
- [x] **Rate limiting + request size limits** added to `/api/chat` via `express-rate-limit`,
  `express.json({ limit: "16kb" })`, and bounded payloads.
- [x] **`conversationHistory` validation** added server-side (allowed roles, string content,
  max 8 messages, 2000 chars each).
- [x] **Safe client errors.** Upstream provider errors are logged server-side and returned as a
  generic 502 with a fallback message.

### P1 — maintainability

- [x] `npm run typecheck` (`tsc -b`) added and included in `npm run ci`.
- [x] Project data centralized in `src/data/projects.ts`; both pages consume it.
- [x] Removed the unused `groq-sdk` dependency from the frontend.
- [x] Backend Dockerfile updated to Node 20 and `npm ci --omit=dev`.
- [ ] `docker-entrypoint.sh` writes `/env/env.js`, but `index.html` never loads it. Either load the
  runtime env script or remove the runtime-substitution mechanism in favour of build-time
  `VITE_AI_SERVER_URL`.
- [ ] `leetcard-custom/` is unrelated to the portfolio app; consider splitting it into its own repo.

### P2 — quality/UX

- [ ] Add tests: Vitest + React Testing Library for components, Supertest for the API.
- [ ] Accessibility pass: focus traps in mobile menu/chat, labels for icon-only buttons, reduced
  motion support, color contrast.
- [ ] Add a global error boundary and error tracking.
- [ ] Cache/stream AI responses; current UI blocks until the full completion returns.
- [x] Chat history persisted in `localStorage` is capped at 50 messages.
- [x] Unified contact email across the prompt, contact page, footer, and backend fallback
  (`severiannkwenti@gmail.com`).
- [x] Updated `index.html` metadata (title, description, author, Open Graph/Twitter previews).
- [ ] Cookie/analytics consent is not fully wired: `Analytics.tsx` loads Plausible regardless of
  consent, and `CookieBanner.tsx` currently never renders due to a faulty guard.

## 8. Deployment checklist

Frontend (Vercel):

1. Set `VITE_AI_SERVER_URL` if the backend URL changes.
2. `npm ci && npm run build`; output directory `dist`.

Backend (Render, Docker):

1. Root directory: `portfolio-ai-server` (or Dockerfile path `portfolio-ai-server/Dockerfile`).
2. Set `GROQ_API_KEY`, `FRONTEND_URL`, and optionally `GROQ_MODEL`.
3. Deploy/restart after changing `server.js`.
4. Verify: `curl https://backend-ai-x0er.onrender.com/health` should report the active model.
5. Verify: `curl -X POST .../api/chat -H 'Content-Type: application/json' -d '{"message":"hi"}'`
   should return a `response`, not a 404/500.

GitHub Actions:

- `.github/workflows/build.yml` runs lint + build on pushes to `master`.
- `.github/workflows/package-build.yaml` builds/pushes the frontend image to GHCR.
- `.github/workflows/update_card.yml` regenerates the LeetCode card.
