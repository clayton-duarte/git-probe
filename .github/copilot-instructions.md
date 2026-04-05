# Git-Probe Copilot Instructions

## Project Overview

Git-Probe is a version-controlled MTG collection manager:
- Collection data: `ManaBox_Collection.csv` (17 columns, see collection-query instructions)
- Decks: Markdown files in `decks/` (see deck-format instructions)
- Everything tracked in Git
- Designed for AI-centric workflow

## File Organization

- `ManaBox_Collection.csv` — User's collection (never edit, read-only)
- `decks/**/*.md` — Deck files with YAML front matter
- `docs/` — User documentation (decisions and philosophy)
- `.github/instructions/` — Domain-specific agent instructions

## Quick Reference

**Common Tasks:**
- Create/edit decks → See `.github/instructions/deck-format.instructions.md`
- Query collection → See `.github/instructions/collection-query.instructions.md`
- Export decks → See `.github/instructions/export-*.instructions.md`
- Lookup card data → See `.github/instructions/scryfall.instructions.md`

**Git Commits:**
Format: `type(scope): message`
- `feat(deck): add new deck`
- `chore(collection): update from ManaBox export on YYYY-MM-DD`
- `refactor(deck): swap cards in main deck`

## Operating Principle

This is a learning phase. Build nothing unless proven necessary. Use manual workflows via Copilot until pain points emerge.

