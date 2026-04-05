# Git-Probe: Project Plan & Architecture

**Version:** 1.0.0 (MVP)  
**Date:** April 5, 2026  
**Status:** Documentation Phase

## Overview

Git-Probe is a version-controlled Magic: The Gathering collection manager optimized for AI-agent interaction via VS Code Copilot. The MVP focuses on thorough documentation of the system design, deck DSL specification, and comprehensive AI agent instructions. Scripts and tooling will be built incrementally over time as needs arise. ManaBox CSV is source-of-truth for collection data.

## Project Philosophy

### Core Principles

1. **Repo-as-Database** — Use the filesystem as the primary data store:
   - Collection: CSV (ManaBox export)
   - Decks: Markdown with custom DSL
   - Metadata: JSON (when needed)
   - Documentation: Markdown

2. **Agent-Centric** — Designed to be operated primarily via VS Code Copilot/Chat:
   - Natural language queries: "Compare this deck to my collection"
   - AI follows documented specifications and patterns
   - Human-readable formats enable AI understanding

3. **Documentation-First** — Comprehensive specs enable incremental automation:
   - Specifications detailed enough to generate implementations
   - Design validated before coding
   - Documentation as the source of truth

4. **Growth-Oriented** — Start simple with text files, evolve as needs arise:
   - Manual workflows initially
   - Automate pain points incrementally
   - TypeScript scripts when complexity warrants
   - Custom DSLs or VS Code extensions if needed

## Implementation Phases

### Phase 1: Core Documentation & Foundation ✅

**Goal:** Establish project structure and comprehensive documentation

**Deliverables:**
- `docs/plan.md` — This document with all decisions and roadmap
- `README.md` — Concise project overview (under 50 lines)
- `.gitignore` — Standard ignores for future development

**Rationale:** Clear documentation ensures consistent implementation and enables effective AI agent operation.

### Phase 2: Templates & Examples

**Goal:** Create specifications and examples that demonstrate the deck DSL

**Deliverables:**
- `docs/deck-dsl.md` — Complete deck format specification
- `decks/examples/simple-deck.md` — Basic 60-card deck
- `decks/examples/commander-deck.md` — EDH with commander
- `decks/examples/multi-file-deck/` — Complex deck split across files
- `docs/collection-usage.md` — ManaBox CSV integration patterns

**Rationale:** Examples serve as templates for users and training data for AI agents. Multi-file support demonstrates extensibility.

### Phase 3: Export Specifications

**Goal:** Document export format specifications

**Deliverables:**
- `docs/export-formats.md` — Moxfield and Archidekt format specs with conversion examples

**Rationale:** Thorough format documentation enables manual exports via Copilot and provides clear targets for future automation.

### Phase 4: AI Agent Instructions

**Goal:** Comprehensive Copilot instructions for all operations

**Deliverables:**
- `.github/copilot-instructions.md` — Complete agent instructions:
  - ManaBox CSV schema (17 columns)
  - Deck DSL specification
  - Scryfall API curl patterns
  - Task templates for common operations
  - Example prompts and expected responses

**Rationale:** Detailed instructions ensure Copilot can effectively assist with all Git-Probe workflows without additional context.

### Phase 5: Post-MVP (Future)

Build automation incrementally based on usage patterns:

- **TypeScript Infrastructure** (`tsconfig.json`, `package.json`)
- **Deck Parser** (`scripts/src/deck-parser.ts`)
- **Export Scripts** (`scripts/src/export-{moxfield,archidekt}.ts`)
- **Collection Reader** (`scripts/src/collection-reader.ts`)
- **Comparison Tool** (`scripts/src/compare-deck.ts`)
- **Advanced Features** (caching, analysis, UI)

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
- Location: `ManaBox_Collection.csv` in repo root
- User drops new export when collection updates
- Read-only from Git-Probe's perspective
- Never edit manually
- Track changes via git commits: `chore(collection): update from ManaBox export on YYYY-MM-DD`

**ManaBox CSV Schema (17 Columns):**
1. Binder Name
2. Binder Type
3. Name
4. Set code
5. Set name
6. Collector number
7. Foil (normal/foil)
8. Rarity
9. Quantity
10. ManaBox ID
11. Scryfall ID
12. Purchase price
13. Misprint (true/false)
14. Altered (true/false)
15. Condition (near_mint, lightly_played, etc.)
16. Language (en, etc.)
17. Purchase price currency (CAD, USD, etc.)

**Deck DSL: Simple and Export-Friendly**
- YAML front matter for metadata
- Markdown sections for card organization
- Multiple syntax variations supported
- Multi-file support for complex decks

### API Integration

**Scryfall via curl (When Needed)**
- No API client for MVP
- Document curl patterns in agent instructions
- Copilot can invoke curl when requested
- No caching initially (query on-demand)

**Example Scryfall Query:**
```bash
curl -s "https://api.scryfall.com/cards/named?fuzzy=lightning+bolt"
```

### Version Control

**Semantic Commits**
- Format: `<type>(<scope>): <message>`
- Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`
- Examples:
  - `feat(deck): add Dimir Control`
  - `chore(collection): update ManaBox export`
  - `docs(dsl): clarify card syntax`
  - `refactor(deck): swap removal suite`

**Git Workflow**
- Manual commits for MVP
- Track all collection updates
- Deck evolution visible in history
- Use git diff to see collection changes

## Deck DSL Overview

### Front Matter (YAML)

Required and optional fields for deck metadata:

```yaml
---
name: "Deck Name"           # Required
format: "Commander"          # Required (Standard, Modern, Commander, etc.)
commander: "Card Name"       # Optional (for Commander format)
colors: ["B", "G"]          # Optional (W, U, B, R, G)
description: "Brief desc"    # Optional
tags: ["aggro", "combo"]    # Optional
preferredSets: false        # Optional (default: false)
---
```

### Card Syntax Variations

All three formats supported:
- **Preferred:** `4x Lightning Bolt`
- **Alternative:** `4 Lightning Bolt`
- **Alternative:** `Lightning Bolt x4`

With set codes (when `preferredSets: true`):
- `4x Lightning Bolt (M10)`

### Sections

Standard sections:
- `## Maindeck` — Main deck cards (required)
- `## Sideboard` — Sideboard cards (optional)
- `## Maybeboard` — Cards under consideration (optional)

Custom sections allowed (preserved as-is):
- `## Creatures`
- `## Lands`
- Any `## Section Name`

### Comments

Inline comments for notes:
```markdown
## Maindeck
4x Lightning Bolt  # Core removal
3x Shock  # TODO: Consider replacing with Bolt
```

### Multi-File Decks

For complex decks, use directory structure:
```
decks/deck-name/
  main.md          # Required (front matter + maindeck)
  sideboard.md     # Optional (additional cards)
  maybeboard.md    # Optional (consideration list)
```

## Export Formats

### Moxfield

Text format, one card per line:
```
1 Card Name (SET) collector#
```

Commander section separate. See `docs/export-formats.md` for complete specification.

### Archidekt

CSV format with columns:
- Quantity
- Card Name
- Edition
- Condition
- Language
- Foil
- Tags

See `docs/export-formats.md` for complete specification.

## Verification Checklist

### Documentation Quality
- [ ] All docs answer "What is Git-Probe?"
- [ ] "How do I create a deck?" clearly explained
- [ ] "How do I use Copilot with my collection?" documented
- [ ] Export format instructions complete
- [ ] All decisions and rationale documented

### Agent Instructions Quality
- [ ] Ask Copilot: "Create a Commander deck with Meren of Clan Nel Toth"
- [ ] Ask Copilot: "Help me compare a deck to my collection"
- [ ] Ask Copilot: "Show me all cards from Tarkir Dragonstorm"
- [ ] Verify Copilot follows `.github/copilot-instructions.md`

### Example Validity
- [ ] All examples follow DSL spec exactly
- [ ] Inline comments explain structure
- [ ] Demonstrate simple vs complex decks
- [ ] Show single-file vs multi-file organization

### Specification Clarity
- [ ] Can human/AI create deck from `docs/deck-dsl.md` alone?
- [ ] All syntax variations documented
- [ ] Format is unambiguous
- [ ] Export specs detailed enough for implementation

## MVP Scope

### Included in MVP ✅
- Comprehensive project plan and architecture documentation
- Complete deck DSL specification with examples
- Copilot agent instructions for all operations
- ManaBox CSV schema documentation and usage patterns
- Moxfield and Archidekt export format specifications
- Multiple example deck templates (simple, commander, multi-file)
- Git workflow and semantic commit guidelines
- Concise README for project overview

### Post-MVP (Build as Needed) ⏳
- TypeScript deck parser
- Automated export scripts (Moxfield, Archidekt)
- Collection query/search scripts
- Deck vs collection comparison automation
- Scryfall API client with caching
- Advanced deck analysis (mana curve, color distribution)
- Web UI or VS Code extension
- Deck versioning/history visualization tools
- Automated deck suggestions based on collection

## Design Considerations

### 1. Deck File Organization

**Decision:** Support both single-file and multi-file decks

**Rationale:**
- Simple decks in `decks/deck-name.md`
- Complex decks in `decks/deck-name/main.md` (+ optional sideboard, maybeboard)
- Parser detects directory structure automatically
- Flexibility for different deck complexities

### 2. Set Code Handling in Decks

**Decision:** Make set codes optional via front matter flag

**Rationale:**
- `preferredSets: false` (default) — Card names only
- `preferredSets: true` — Allow `4x Lightning Bolt (M10)` syntax
- Moxfield/Archidekt can auto-detect sets
- Explicit codes help with specific printings
- Future export scripts use flag for behavior

### 3. Agent Instruction Detail Level

**Decision:** Include both detailed examples and general patterns

**Rationale:**
- Detailed workflows for common operations (create deck, compare)
- General patterns for novel requests
- Balance specificity with flexibility
- Enable effective zero-shot task completion

### 4. Deck Section Semantics

**Decision:** Minimal standard sections, allow custom sections

**Rationale:**
- Standard: Maindeck, Sideboard, Maybeboard
- Any `## Section Name` is valid
- Preserve custom sections as-is
- Future tools can recognize semantic sections (Creatures, Lands) if needed
- Extensibility without rigid constraints

### 5. ManaBox CSV Change Tracking

**Decision:** Manual git diff for MVP, script for post-MVP

**Rationale:**
- Document git diff workflow in `docs/collection-usage.md`
- Command: `git diff HEAD~1 ManaBox_Collection.csv`
- Sufficient for MVP validation
- Add `scripts/collection-diff.ts` if frequently used

## Future Roadmap

### Near-Term Enhancements
1. **Deck Parser** — TypeScript module for parsing deck markdown
2. **Export Scripts** — Automated Moxfield/Archidekt export CLIs
3. **Collection Reader** — Query interface for ManaBox CSV
4. **Basic Comparison** — Deck vs collection CLI tool

### Mid-Term Features
5. **Scryfall Integration** — API client with caching
6. **Advanced Comparison** — Price lookup, alternative suggestions
7. **Deck Validation** — Format legality checking
8. **Statistics** — Mana curve, color distribution, deck cost

### Long-Term Vision
9. **VS Code Extension** — Native deck editing and comparison UI
10. **Web Interface** — Browse collection and decks online
11. **Recommendation Engine** — Suggest decks based on collection
12. **Trade Tracking** — Integrated acquisition/trade history

## Maintenance Guidelines

### Documentation Updates
- Keep specs in sync with implementation
- Document all breaking changes
- Update examples when DSL evolves
- Maintain changelog for major versions

### Code Style (Future)
- Follow TypeScript best practices
- Comprehensive JSDoc comments
- Unit tests for parsers and converters
- Integration tests for workflows

### Release Process
- Semantic versioning (MAJOR.MINOR.PATCH)
- Tag releases in git
- Update README changelog
- Test all verification checklist items

---

**Last Updated:** April 5, 2026  
**Next Review:** Post-MVP implementation phase
