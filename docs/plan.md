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
17.Key Decisions

### Collection Data
- **Format:** ManaBox CSV export (17 columns)
- **Location:** `ManaBox_Collection.csv` in repo root
- **Updates:** User drops new export when collection changes
- **Never edit CSV manually** - ManaBox is source of truth
- **Track with git:** See collection changes over time

### Deck Format
- **YAML front matter:** name, format, commander, colors
- **Markdown sections:** `## Maindeck`, `## Sideboard`, `## Maybeboard`
- **Card syntax:** `4x Lightning Bolt` (simple and clear)
- **Comments allowed:** Use `#` for notes
- **Multi-file option:** Complex decks can split into multiple .md files

### Exports
- **Moxfield:** Text format (see `.github/instructions/`)
- **Archidekt:** CSV format (see `.github/instructions/`)
- **MVP:** Manual via Copilot
- **Future:** Maybe scripts if frequently needed

### External APIs
- **Scryfall:** On-demand via curl
- **No caching** in MVP
- **Copilot handles** the curl commands
- Add automation later if needed

### Git Workflow
- **Semantic commits:** `type(scope): message`
- **Track everything:** Collection updates, deck changes
- **Use git diff** to see what changed in collection

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

###Open Questions

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