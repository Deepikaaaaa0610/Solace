<p align="center">
  <strong>solace</strong><br/>
  <em>Find peace in poetry.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-18-61dafb?logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/vite-6-646cff?logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
</p>

---

Solace is an archive-first poetry platform for Urdu, Hindi, and South Asian literature — inspired by [Rekhta](https://rekhta.org). It brings together classical ghazals, shers, nazms, and community writing in one modern reading experience, with a built-in dictionary, personal notebook, audio recitation, and curated discovery tools.

## Features

### Reading & Discovery
- **Poet Profiles** — biographies, eras, birth places, and complete works for legendary poets like Mirza Ghalib, Faiz Ahmed Faiz, Allama Iqbal, and more.
- **Multi-script Support** — works displayed in Roman Urdu with Devanagari (Hindi) alternates; script toggling on every poem card.
- **Explore & Search** — browse the full archive, filter by genre tags (Love, Pain, Philosophy, Longing, Revolution, etc.), and search across titles and text.
- **Poetry Carousel** — auto-advancing daily "Top 5 Urdu Shayari" hero section with featured poet spotlights.
- **Mood-based Discovery** — curated mood categories with bilingual labels and direct filtering.

### Tools
- **Poetry Dictionary** — 80+ Urdu/Persian poetic terms with English meanings, Hindi translations, and simple explanations. Searchable across all fields.
- **Interactive Word Meanings** — click any word in a poem to look up its dictionary definition in a popover modal.
- **Audio Recitation** — built-in TTS player using the Web Speech API with Hindi/Urdu voice preference, adjustable speed (0.5×–1.5×), equalizer visualization, and voice selection.
- **Mojibake Repair** — automatic detection and repair of garbled multilingual text via the `text.js` utility.

### Personal Space
- **Notebook** — create, rename, and manage multiple notebook files to draft your own poetry or take notes (localStorage-persisted, login-gated).
- **Saved Works** — bookmark any poem from the archive to your personal collection.
- **Community** — read and post poetry, like, and bookmark community submissions.

### WhatsApp Poetry Submission (Planned Backend)
- **Submission Hub** — signed-in users can link their WhatsApp number, submit poems via a simulated WhatsApp-to-web flow, and track moderation status.
- **Author Profiles** — public pages for community writers showing published works with source badges.
- **Admin Moderation** — pending/unmatched queues, publish/reject/hold controls, and audit logs.
- **Backend Scaffold** — PostgreSQL schema (`001_whatsapp_poetry.sql`) and API endpoint contracts are fully designed and ready for implementation.

### News & Editorial
- **Latest News Section** — poetry-related news from GNews API (dev) or Google News RSS, with local editorial fallback articles. Cached for 15 minutes via a custom Vite plugin.

### Infrastructure
- **Auth System** — lightweight localStorage-based authentication with role support (author, admin, moderator). Admin access via `admin@solace.com`.
- **SPA Routing** — GitHub Pages-compatible 404 redirect script for client-side routing.
- **CI/CD** — GitHub Actions workflow for automated build and deploy to GitHub Pages on push to `main`.

## Tech Stack

| Layer        | Technology                                              |
| ------------ | ------------------------------------------------------- |
| Framework    | React 18 + Vite 6                                       |
| Routing      | React Router DOM v6                                     |
| Icons        | Lucide React                                            |
| Styling      | Vanilla CSS (index.css + redesign.css)                  |
| Typography   | Cormorant Garamond, Manrope, Noto Nastaliq Urdu (Google Fonts) |
| State        | React Context (Auth, WhatsApp Feature) + localStorage   |
| News API     | GNews API / Google News RSS (custom Vite server plugin) |
| Audio        | Web Speech API (SpeechSynthesis)                        |
| Deployment   | GitHub Pages, Vercel-ready                              |
| Backend (planned) | Node.js + PostgreSQL                              |

## Project Structure

```
Solace/
├── public/
│   └── 404.html                    # SPA redirect for GitHub Pages
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx         # TTS poetry recitation with equalizer
│   │   ├── AuthModal.jsx           # Login/signup modal
│   │   ├── AuthorCard.jsx          # Community author card
│   │   ├── CommunityPost.jsx       # Community post display
│   │   ├── CreatePost.jsx          # Community post creation form
│   │   ├── Footer.jsx              # Site footer
│   │   ├── HeroSection.jsx         # Homepage banner + poetry carousel
│   │   ├── InteractivePoetryText.jsx # Click-to-define poetry text
│   │   ├── LatestNewsSection.jsx   # Poetry news feed
│   │   ├── Navbar.jsx              # Top navigation bar
│   │   ├── PoetCard.jsx            # Poet profile card
│   │   ├── ProtectedRoute.jsx      # Auth-gated route wrapper
│   │   ├── ShayariCard.jsx         # Poem card with script toggle, glossary, audio, share
│   │   └── WordMeaningModal.jsx    # Dictionary word popover
│   ├── context/
│   │   ├── AuthContext.jsx         # Auth state management
│   │   └── WhatsappFeatureContext.jsx # WhatsApp submission feature state
│   ├── data/
│   │   ├── communityPosts.js       # Seed community posts
│   │   ├── dictionary.js           # 80+ Urdu/Persian word entries
│   │   ├── newsFallback.js         # Fallback news articles
│   │   ├── poets.js                # Poet profiles and complete works dataset
│   │   └── shayaris.js             # Mood categories and featured shayaris
│   ├── pages/
│   │   ├── AdminModeration.jsx     # Admin moderation dashboard
│   │   ├── AuthorProfile.jsx       # Public community author page
│   │   ├── Community.jsx           # Community feed
│   │   ├── Dictionary.jsx          # Searchable poetry dictionary
│   │   ├── Explore.jsx             # Browse and search the archive
│   │   ├── Home.jsx                # Homepage with all sections
│   │   ├── Notebook.jsx            # Personal writing notebook
│   │   ├── PoetProfile.jsx         # Individual poet page
│   │   ├── PoetsList.jsx           # All poets grid
│   │   ├── SavedWorks.jsx          # Bookmarked poems collection
│   │   └── SubmissionHub.jsx       # WhatsApp submission dashboard
│   ├── utils/
│   │   ├── dictionary.js           # Dictionary lookup and normalization
│   │   └── text.js                 # Mojibake detection and text repair
│   ├── App.jsx                     # Root component with routing
│   ├── main.jsx                    # React entry point
│   ├── index.css                   # Main stylesheet
│   └── redesign.css                # Design system overrides
├── backend/
│   ├── contracts/
│   │   └── whatsapp-poetry-api.md  # API endpoint contract
│   ├── schema/
│   │   └── 001_whatsapp_poetry.sql # PostgreSQL schema (7 tables)
│   └── README.md                   # Backend scaffold notes
├── docs/
│   ├── solace-rekhta-roadmap.md    # Product research and build roadmap
│   └── whatsapp-poetry-feature.md  # Full WhatsApp feature design doc
├── scripts/
│   ├── fix_poets.cjs               # Poet data cleanup script
│   └── generate_poets.cjs          # Poet data generation script
├── .github/workflows/
│   └── deploy-pages.yml            # GitHub Pages CI/CD
├── .env.example                    # Environment variable template
├── vite.config.js                  # Vite config + news API plugin
├── package.json
└── index.html                      # App entry HTML
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Deepikaaaaa0610/Solace.git
cd Solace

# Install dependencies
npm install
```

### Environment Variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env
```

| Variable                  | Required | Description                               |
| ------------------------- | -------- | ----------------------------------------- |
| `GNEWS_API_KEY`           | No       | GNews API key for live poetry news. Falls back to Google News RSS and then local articles if not set. |
| `WHATSAPP_VERIFY_TOKEN`   | No       | For future WhatsApp webhook verification  |
| `WHATSAPP_APP_SECRET`     | No       | For future WhatsApp webhook signature     |
| `WHATSAPP_PHONE_NUMBER_ID`| No       | For future WhatsApp Cloud API             |
| `DATABASE_URL`            | No       | PostgreSQL connection string for backend  |

> The app runs fully without any environment variables — all features gracefully degrade to local fallbacks.

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173) with hot module replacement.

### Production Build

```bash
npm run build
npm run preview
```

## Deployment

### GitHub Pages

Automated via GitHub Actions — push to `main` triggers build and deploy. The workflow is defined in `.github/workflows/deploy-pages.yml`.

### Vercel

The app auto-detects Vercel deployments and adjusts the base path accordingly. Simply connect the repo to Vercel and deploy — no additional configuration needed.

## Roadmap

The project follows a phased build plan (detailed in `docs/solace-rekhta-roadmap.md`):

| Phase | Focus | Status |
| ----- | ----- | ------ |
| **1 — Foundation** | Structured content model, schema design, data cleanup | 🟡 In progress |
| **2 — Search & Discovery** | Full-text search, filters, curated collections | ⬜ Planned |
| **3 — Reading Experience** | Per-work pages, script toggle, audio, glossary popovers | 🟢 Partially done |
| **4 — Community** | Real auth, posting, commenting, moderation | 🟡 Frontend scaffolded |
| **WhatsApp Ingestion** | WhatsApp → webhook → moderation → public profile | 🟡 Designed, frontend built |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is open source. See individual file headers for details.

---

