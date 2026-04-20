# WhatsApp Poetry Submission Feature

## A. Product breakdown

### What user problem this solves

- Writers already use WhatsApp as their default creation and sharing surface, but your site currently requires manual re-entry.
- This feature turns WhatsApp into a low-friction submission channel while keeping publishing, moderation, and author identity inside your existing website.
- It removes copy-paste operations for admins and gives writers a direct path from phone to public profile.

### User journey from WhatsApp to website

1. User sends a plain text poem to the WhatsApp bot.
2. WhatsApp provider posts a webhook event to your backend.
3. Backend verifies the webhook signature and stores the raw inbound payload.
4. Sender phone number is normalized to E.164 and matched against a linked account.
5. If matched:
   - create a `poem_submission`
   - assign moderation status
   - auto-publish or queue for review
6. If not matched:
   - store in `unmatched_submissions`
   - surface it in admin tools
   - reconcile later when the user links their phone number
7. When approved, a canonical `poems` record is created or updated.
8. The poem appears on the public author page under that user’s name with source `WhatsApp`.

### Edge cases

- Same number used by two accounts: block linking until resolved by admin.
- Duplicate submission from the same sender: detect by normalized content hash and similarity window.
- Message too short, too long, or link-heavy: reject or hold.
- Multi-message poem split across several WhatsApp messages: MVP should treat each inbound text as one submission; multi-part assembly can come later.
- Sender without account: keep in unmatched queue rather than inventing a visible public user.
- Phone changed after account creation: require re-verification before moving future submissions.
- Author deleted or suspended: hold future submissions automatically.

### Moderation flow

- `manual_review`: all matched submissions go to `pending_review`.
- `auto_publish_known_authors`: only verified linked authors auto-publish; everything else still queues.
- `rejected`: keep the submission and moderation reason, but do not expose it publicly.
- Every action writes to `moderation_logs`.

### Account-linking flow

1. Logged-in user opens account linking UI.
2. User enters WhatsApp number.
3. Backend sends verification through WhatsApp or SMS fallback.
4. User confirms code or deep-link challenge.
5. Backend creates an active phone link.
6. Any `unmatched_submissions` for that phone are reconciled into `poem_submissions`.
7. Those reconciled items enter the standard moderation path.

## B. Technical architecture

### Overall system components

- Existing React frontend
- Backend API service
- PostgreSQL database
- WhatsApp webhook ingestion endpoint
- Async job queue for moderation, dedupe, and notifications
- Admin moderation dashboard
- Public author page rendering from canonical `poems`

### WhatsApp integration provider options

- Meta WhatsApp Cloud API
  - Best default for MVP
  - Official platform
  - Good webhook model
  - Requires business verification and template approval for outbound messages
- Twilio WhatsApp
  - Faster operational setup if your team already uses Twilio
  - Adds vendor dependency and cost layer
- 360dialog
  - Useful when BSP support matters
  - Similar integration shape to Meta, but another vendor to manage

### Backend services needed

- `webhooks/whatsapp`
  - verify signatures
  - persist raw inbound payload
  - enqueue processing job
- `submissions`
  - normalize, validate, dedupe, store
- `identity`
  - phone linking and reconciliation
- `moderation`
  - state transitions and logs
- `authors`
  - fetch public poems by user
- `notifications`
  - optional publish/reject updates

### Webhook flow

1. Receive provider webhook.
2. Verify challenge on GET and signature on POST.
3. Persist raw event into `webhook_events`.
4. Ack fast with `200 OK`.
5. Process inbound text asynchronously.
6. Write `poem_submissions` or `unmatched_submissions`.

### Frontend changes

- Public author page for community writers
- Linked WhatsApp dashboard inside signed-in account area
- Admin moderation screen
- Link-number UI with verification state
- Public discovery section showing WhatsApp-origin authors

### Async processing

- Required once traffic is non-trivial
- Queue jobs for:
  - content normalization
  - dedupe checks
  - spam scoring
  - moderation routing
  - outbound confirmation messages

### Deployment considerations

- Keep webhook receiver publicly reachable over HTTPS
- Separate API from static frontend deployment
- Use idempotency on provider message ids
- Store raw payloads encrypted or access-restricted
- Add alerting for webhook failures and queue lag

## C. Database design

### Core tables

- `users`
  - existing site users
- `whatsapp_accounts`
  - one row per verified or pending phone link
- `poem_submissions`
  - moderation and ingestion record
- `poems`
  - canonical public content record
- `moderation_logs`
  - audit trail
- `unmatched_submissions`
  - inbound texts from unknown senders
- `webhook_events`
  - raw provider payload ledger

### Key relationships

- `users.id -> whatsapp_accounts.user_id`
- `users.id -> poems.author_user_id`
- `poem_submissions.user_id -> users.id`
- `poem_submissions.published_poem_id -> poems.id`
- `moderation_logs.submission_id -> poem_submissions.id`
- `whatsapp_accounts.phone_e164` reconciles `unmatched_submissions.sender_phone_e164`

## D. API design

### Public and internal endpoints

- `GET /api/webhooks/whatsapp`
  - Meta verification challenge
- `POST /api/webhooks/whatsapp`
  - receive inbound WhatsApp events
- `POST /api/account/whatsapp/link/start`
  - begin phone verification
- `POST /api/account/whatsapp/link/confirm`
  - confirm OTP or challenge token
- `GET /api/account/whatsapp/status`
  - current user link state
- `GET /api/account/submissions`
  - current user submission history
- `GET /api/authors/:slug/poems`
  - published poems by author
- `GET /api/admin/submissions`
  - filter by status, source, date, linked state
- `POST /api/admin/submissions/:id/publish`
- `POST /api/admin/submissions/:id/reject`
- `POST /api/admin/submissions/:id/hold`
- `POST /api/admin/unmatched/:id/link-user`
  - admin reconciliation path

## E. Backend logic

### Inbound message handling

1. Verify webhook source.
2. Extract provider message id, sender phone, text body, timestamp.
3. Normalize phone to E.164.
4. Store raw event for replay and debugging.
5. Validate content:
   - plain text only for MVP
   - length bounds
   - no blocked links
   - no malformed repeated junk
6. Dedupe:
   - exact hash match on normalized content
   - same sender within duplicate window
   - optional fuzzy similarity later
7. Match sender:
   - active verified `whatsapp_accounts`
8. Route:
   - matched -> `poem_submissions`
   - unmatched -> `unmatched_submissions`
9. Assign moderation state from feature config.
10. If published:
   - create `poems`
   - mark visible on author page

## F. Frontend integration

### Where poems appear

- Public author page under community or author section
- Optional homepage/community highlights later

### Author profile page changes

- show source badge `WhatsApp`
- show published works only
- keep pending/rejected hidden from public view

### Admin moderation dashboard

- pending queue
- unmatched queue
- publish/reject/hold controls
- moderation mode toggle
- audit log view

### Linking UI

- signed-in account screen
- show current linked number
- start verification
- explain that unmatched submissions are reconciled after verification

## G. Security and abuse prevention

- Verify WhatsApp webhook signature and challenge tokens.
- Rate limit webhook endpoint by provider IP and provider message id.
- Use exact dedupe hashes plus per-phone daily submission limits.
- Add spam rules for URLs, repeated characters, mass repeats, and blocked keywords.
- Restrict moderation endpoints to admin or moderator role.
- Never expose full phone numbers publicly; store E.164, display masked.
- Encrypt or tightly restrict raw webhook payload access.

## H. MVP scope

- Plain text only
- One poem per inbound message
- Phone linking UI
- Matched vs unmatched submission routing
- Manual moderation dashboard
- Public author page integration
- Duplicate and basic spam checks
- Audit logs

## I. Future improvements

- multilingual text variants per poem
- voice-note transcription
- AI moderation assistance
- theme and mood categorization
- outbound WhatsApp notifications when published or rejected
- author trust scores for selective auto-publishing

## J. Recommended stack

- Frontend: keep existing Vite + React app
- Backend: Node.js with Fastify or Express
- Database: PostgreSQL
- ORM: Prisma or Drizzle
- Queue: BullMQ + Redis once webhook volume grows
- WhatsApp provider: Meta WhatsApp Cloud API for MVP
- Deployment: Vercel/Netlify for frontend, Render/Fly/Railway/AWS for API

## K. Deliverables

### Folder structure

```text
src/
  components/
    AuthorCard.jsx
  context/
    WhatsappFeatureContext.jsx
  pages/
    SubmissionHub.jsx
    AuthorProfile.jsx
    AdminModeration.jsx
backend/
  README.md
  contracts/
    whatsapp-poetry-api.md
  schema/
    001_whatsapp_poetry.sql
docs/
  whatsapp-poetry-feature.md
```

### Backend module breakdown

- `webhooks`
- `identity`
- `submissions`
- `moderation`
- `authors`
- `notifications`

### Frontend module breakdown

- author discovery cards
- public author page
- signed-in submission hub
- admin moderation page
- feature state/context layer

### Developer task order

1. Add database schema and migrations.
2. Build webhook receiver and raw event storage.
3. Implement phone-link verification flow.
4. Implement submission processor with validation and dedupe.
5. Implement moderation endpoints.
6. Replace frontend demo state with real API calls.
7. Add monitoring and replay tools.

### Testing checklist

- valid linked sender creates `pending_review` or `published`
- unknown sender creates `unmatched_submission`
- duplicate inbound is blocked
- rejected submission never appears publicly
- published submission appears on author page
- phone linking reconciles unmatched items
- admin-only endpoints reject non-admin users

### Launch checklist

- Meta webhook verified
- phone-link verification tested
- moderation roles configured
- DB indexes added
- alerting for webhook failures enabled
- raw payload retention policy defined

## Final recommended architecture for MVP

- Existing React frontend
- Single Node API service
- PostgreSQL
- Meta WhatsApp Cloud API webhook
- Manual moderation by default
- Unmatched queue instead of auto-creating public users

## Final recommended database schema

- `users`
- `whatsapp_accounts`
- `poem_submissions`
- `poems`
- `moderation_logs`
- `unmatched_submissions`
- `webhook_events`

## Final recommended user flow

1. User links WhatsApp number from account settings.
2. User sends poem to WhatsApp bot.
3. Webhook ingests and matches phone number.
4. Submission enters moderation queue.
5. Admin publishes.
6. Poem appears on author page under source `WhatsApp`.

## Biggest risks and how to handle them

- Phone identity collisions
  - require verified ownership before linking
- Spam and duplicate floods
  - rate limits, hashes, moderation hold
- WhatsApp platform constraints
  - use official webhook flow and approved outbound templates only
- Premature auto-publishing
  - keep MVP on manual review first
