# Solace Product Research

## What Rekhta actually is

Rekhta is not just a poetry homepage. Its current product surface includes:

- poets, sher, ghazals, nazms, prose, and curated shayari collections
- dictionary and per-word meaning support
- ebooks and rare-book digitization
- audio and video for recitation and learning
- multi-script access across Urdu, Devanagari, and Roman text
- editorial collections, quizzes, qafiya, taqti, and discovery tools

Official sources used:

- https://www.rekhta.org/
- https://www.rekhta.org/cms/about-site

## What Solace is missing today

The current app is a static React frontend with local arrays. It does not yet have:

- a normalized content model for poets, works, collections, media, and sources
- a searchable datastore or ingestion pipeline
- text cleanup and validation for multilingual content
- rights metadata or source tracking for each work
- real community comments, auth, moderation, bookmarks, or analytics
- editorial features such as collections, glossary, or audio/video support

## Recommended build order

### Phase 1: Foundation

- move content out of hardcoded JS arrays into JSON or a database-backed API
- define schemas for `poets`, `works`, `collections`, `media`, and `sources`
- store script variants separately: `urdu`, `devanagari`, `roman`, `translation`
- add `slug`, `era`, `genre`, `tags`, `rights_status`, `source_url`, and `source_notes`

### Phase 2: Search and discovery

- full-text search over poet names, titles, lines, tags, and themes
- filters for poet, genre, era, mood, and form
- curated collection pages
- poet profile statistics based on real data, not manual counts

### Phase 3: Reading experience

- per-work page with script toggle, translation, notes, and related works
- glossary popovers for difficult words
- share, save, and citation support
- audio recitation and video embeds where rights allow

### Phase 4: Community

- user accounts
- real posting, commenting, saving, and moderation
- report flows and admin review
- featured contemporary poets and user collections

## Content and legal constraint

You should not assume you can publish "all the work of all poets".

- many classical poets may be public domain depending on jurisdiction, but modern poets often are not
- you need rights tracking per work, not just per poet
- avoid copying Rekhta data or scraping copyrighted content into Solace without permission
- build a source ledger for every imported work before scaling the corpus

## Immediate next step

The next practical milestone for Solace is:

1. clean existing multilingual data
2. replace local arrays with structured content files or an API
3. build poet page, work page, and search on top of that schema
