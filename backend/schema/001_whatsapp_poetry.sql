CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS whatsapp_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phone_e164 VARCHAR(20) NOT NULL UNIQUE,
  provider TEXT NOT NULL DEFAULT 'meta_whatsapp_cloud',
  verification_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (verification_status IN ('pending', 'verified', 'revoked')),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS unmatched_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_message_id TEXT NOT NULL UNIQUE,
  sender_phone_e164 VARCHAR(20) NOT NULL,
  raw_text TEXT NOT NULL,
  normalized_text TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  poem_type TEXT NOT NULL DEFAULT 'nazm',
  matching_status TEXT NOT NULL DEFAULT 'awaiting_link'
    CHECK (matching_status IN ('awaiting_link', 'linked', 'discarded')),
  source TEXT NOT NULL DEFAULT 'whatsapp',
  received_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_unmatched_submissions_phone
  ON unmatched_submissions (sender_phone_e164, created_at DESC);

CREATE TABLE IF NOT EXISTS poem_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  whatsapp_account_id UUID REFERENCES whatsapp_accounts(id) ON DELETE SET NULL,
  provider_message_id TEXT NOT NULL UNIQUE,
  sender_phone_e164 VARCHAR(20) NOT NULL,
  title TEXT NOT NULL,
  raw_text TEXT NOT NULL,
  normalized_text TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  poem_type TEXT NOT NULL DEFAULT 'nazm',
  source TEXT NOT NULL DEFAULT 'whatsapp',
  moderation_status TEXT NOT NULL DEFAULT 'pending_review'
    CHECK (moderation_status IN ('pending_review', 'published', 'rejected')),
  moderation_reason TEXT,
  published_poem_id UUID,
  received_at TIMESTAMPTZ NOT NULL,
  published_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_poem_submissions_user_status
  ON poem_submissions (user_id, moderation_status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_poem_submissions_hash
  ON poem_submissions (sender_phone_e164, content_hash);

CREATE TABLE IF NOT EXISTS poems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  submission_id UUID UNIQUE REFERENCES poem_submissions(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  poem_type TEXT NOT NULL DEFAULT 'nazm',
  source TEXT NOT NULL DEFAULT 'whatsapp',
  visibility TEXT NOT NULL DEFAULT 'public'
    CHECK (visibility IN ('public', 'private')),
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE poem_submissions
  ADD CONSTRAINT fk_poem_submissions_published_poem
  FOREIGN KEY (published_poem_id) REFERENCES poems(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_poems_author_published
  ON poems (author_user_id, published_at DESC);

CREATE TABLE IF NOT EXISTS moderation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES poem_submissions(id) ON DELETE CASCADE,
  moderator_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL
    CHECK (action IN ('queued_for_review', 'published', 'rejected', 'held')),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL DEFAULT 'meta_whatsapp_cloud',
  event_type TEXT NOT NULL,
  provider_message_id TEXT,
  signature_valid BOOLEAN NOT NULL DEFAULT FALSE,
  payload_json JSONB NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
