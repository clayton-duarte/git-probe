# Git-Probe: Plan & Decisions

**Status:** MVP - Learning Phase  
**Updated:** April 5, 2026

## What Is This?

Git-Probe is a version-controlled MTG collection manager designed for AI interaction. Your collection lives in a CSV file, decks are markdown files, and everything is tracked in Git.

## Why These Choices?

### Repo as Database
- CSV for collection (ManaBox export)
- Markdown for decks (human and AI readable)
- Git tracks all changes
- No external database needed

### AI-Centric Design
- VS Code Copilot is the primary interface
- Natural language: "Compare this deck to my collection"
- File formats optimized for AI understanding
- Documentation teaches Copilot how to help

### Documentation First
- Validate ideas before building tools
- Learn what we actually need
- Build automation only for proven pain points
- Keep things simple until proven complex

## Current State (MVP)

**What exists:**
- ManaBox CSV collection export (17 columns)
- Deck format: Markdown with YAML front matter
- Example decks showing the pattern
- Documentation teaching Copilot how to help

**What doesn't exist yet:**
- No scripts or automation
- No parsers or exporters
- No validation tools
- Everything is manual via Copilot

**Why this way:**
- Learn by using it
- Discover actual needs vs assumptions
- Build only what proves necessary
- Stay lightweight and flexible

## Technical Decisions

### Language & Tooling

**TypeScript for Future Development**
- Type safety for complex data transformations
- Better IDE integration
- Deferred until documentation proves the design

**No Scripts in MVP**
- Focus on design validation
- Manual workflows via Copilot
- Identify pain points before automating

### Data Formats

**ManaBox CSV as Source-of-Truth**
- ManaBox app manages the collection
- Export to CSV, drop in repo root
- Git tracks collection changes over time
- Copilot reads CSV to answer questions

**Why CSV?**
- Simple, universal format
- No database to maintain
- Git-friendly (can diff changes)
- Works with any tool

### Collection Data
- **Read-only:** Never edit CSV manually - ManaBox is source of truth
- **Updates:** Export fresh CSV when collection changes
- **Git tracking:** See what cards were added/removed over time

### Deck Format
- **Markdown files:** Human readable, AI friendly, Git trackable
- **YAML frontmatter:** Structured metadata (name, format, commander)
- **Simple syntax:** `4x Lightning Bolt` - clear and parseable
- **Flexible structure:** Support both simple and complex decks

**Why Markdown?**
- Easy to read and edit
- Works in any text editor
- Git shows meaningful diffs
- Copilot understands it naturally

**Why YAML frontmatter?**
- Structured metadata without custom format
- Standard practice in static sites
- Easy to parse if we need automation later

### Exports
- **Moxfield:** Text format (Copilot can convert)
- **Archidekt:** CSV format (Copilot can convert)
- **Manual for MVP:** Learn the conversion patterns first
- **Maybe automate later:** If we do it frequently enough

**Why manual exports?**
- Validates the deck format works
- Discovers edge cases
- Proves value before building tools
- Keeps options open (formats may change)

### External APIs
- **Scryfall:** Card data on demand (prices, legality, oracle text, advanced search)
- **No caching in MVP:** Keep it simple
- **Copilot handles curl:** No API client library needed yet

**Why Scryfall?**
- Free, comprehensive API
- Well-documented with powerful search syntax
- No API key needed
- Active community
- Supports advanced filtering (price, legality, oracle text, etc.)

**Why no caching?**
- Premature optimization
- API is fast enough
- Prices change anyway
- Build it if it becomes a problem

**See:** `docs/scryfall.md` for deck building workflows

### Git Workflow
- **Everything tracked:** Collection updates, deck changes, documentation
- **Meaningful commits:** Semantic format helps understand history
- **Git as timeline:** See how collection and decks evolve

**Why track collection in Git?**
- See what cards you added/removed over time
- Revert accidental ManaBox mistakes
- Historical record of your collection
- Backup of collection data

## Open Questions

Things we're still figuring out:

1. **Do we need set codes in deck files?**
   - Most platforms auto-detect
   - Adds complexity
   - Decision: Optional, add if needed

2. **Single file vs multi-file decks?**
   - Simple decks: Single file is clearer
   - Complex decks: Multiple files organize better
   - Decision: Support both, let user choose

3. **How often to update collection CSV?**
   - After every session? Weekly? Monthly?
   - Decision: When meaningful changes happen

4. **What automation is actually needed?**
   - Unknown until we use it more
   - Decision: Build only proven pain points

## Next Steps

1. **Use it** - Create real decks, query collection
2. **Learn** - Discover what works, what doesn't
3. **Adjust** - Update docs based on reality
4. **Build** - Add scripts only when clearly needed

---

**For agent instructions, see:** `.github/instructions/`  
**Updated:** April 5, 2026