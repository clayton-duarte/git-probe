# Git-Probe Deck DSL Specification

**Version:** 1.0.0  
**Status:** MVP Specification  
**Last Updated:** April 5, 2026

## Overview

The Git-Probe Deck DSL (Domain-Specific Language) defines how Magic: The Gathering decks are represented as Markdown files. The format is designed to be:

- **Human-readable** — Easy to create and edit manually
- **AI-friendly** — Parseable by Copilot and future scripts
- **Export-compatible** — Simple conversion to Moxfield and Archidekt
- **Extensible** — Supports custom sections and multi-file organization

## File Structure

### Single-File Decks

Simple decks use a single markdown file:

```
decks/
  my-deck.md
  another-deck.md
```

### Multi-File Decks

Complex decks use a directory structure:

```
decks/
  complex-deck/
    main.md          # Required: Front matter + maindeck
    sideboard.md     # Optional: Sideboard cards
    maybeboard.md    # Optional: Cards under consideration
```

**Rules:**
- Directory name becomes deck identifier
- `main.md` is required and contains front matter
- Additional files are optional
- All files in directory belong to the same deck

## Front Matter (YAML)

Every deck file starts with YAML front matter delimited by `---`.

### Required Fields

```yaml
---
name: "Deck Name"      # Human-readable deck name
format: "Commander"     # MTG format
---
```

**Valid Formats:**
- `Standard`
- `Modern`
- `Commander` (EDH)
- `Legacy`
- `Vintage`
- `Pauper`
- `Pioneer`
- `Historic`
- `Brawl`
- `Casual`

### Optional Fields

```yaml
---
name: "Meren Reanimator"
format: "Commander"
commander: "Meren of Clan Nel Toth"      # Commander for EDH
colors: ["B", "G"]                       # Color identity
description: "Graveyard recursion"       # Brief strategy
tags: ["reanimator", "midrange"]         # Searchable tags
preferredSets: false                     # Include set codes
created: "2026-04-05"                    # Creation date
updated: "2026-04-05"                    # Last update
---
```

### Field Specifications

**`name`** (string, required)
- Human-readable deck name
- Example: `"Golgari Midrange"`

**`format`** (string, required)
- Magic format identifier
- Must be valid format name
- Case-sensitive

**`commander`** (string, optional)
- Commander card name for EDH decks
- Example: `"Meren of Clan Nel Toth"`
- Only meaningful for Commander format

**`colors`** (array, optional)
- Color identity: `["W", "U", "B", "R", "G"]`
- W = White, U = Blue, B = Black, R = Red, G = Green
- Mono-color: `["R"]`
- Multi-color: `["B", "G"]`
- Colorless: `[]`

**`description`** (string, optional)
- Brief strategy or theme description
- Example: `"Aggressive red deck with burn spells"`

**`tags`** (array, optional)
- Searchable keywords
- Example: `["aggro", "burn", "competitive"]`

**`preferredSets`** (boolean, optional, default: `false`)
- When `true`, card lines can include set codes
- When `false`, card names only
- Affects export behavior

**`created`** (string, optional)
- ISO date format: `"YYYY-MM-DD"`
- Example: `"2026-04-05"`

**`updated`** (string, optional)
- ISO date format: `"YYYY-MM-DD"`
- Update when deck is modified

## Card List Syntax

### Basic Format

Three equivalent syntax variations are supported:

```markdown
4x Lightning Bolt       # Preferred (quantity + 'x' + card name)
4 Lightning Bolt        # Alternative (quantity + card name)
Lightning Bolt x4       # Alternative (card name + 'x' + quantity)
```

**Parsing Rules:**
- Quantity is optional (defaults to 1)
- Card name is case-sensitive
- Leading/trailing whitespace ignored

### Single Copy Cards

```markdown
1x Sol Ring
Sol Ring              # Equivalent (quantity defaults to 1)
```

### With Set Codes

When `preferredSets: true` in front matter:

```markdown
4x Lightning Bolt (M10)
1x Sol Ring (C21) 263
```

**Set Code Format:**
- 3-4 letter set code in parentheses
- Optional collector number after set code
- Example: `(M10)` or `(C21) 263`

### Comments

Inline comments for annotations:

```markdown
4x Lightning Bolt  # Core removal spell
3x Shock  # TODO: Consider replacing with more Bolts
```

Block comments for sections:

```markdown
# This is a comment
# Cards below need review
2x Lava Spike
```

## Sections

Organize cards using Markdown level-2 headers (`##`).

### Standard Sections

**`## Maindeck`** (required)
- Main deck cards
- Required for all decks
- Standard minimum: 60 cards
- Commander: 99 cards (+ commander)

**`## Sideboard`** (optional)
- Sideboard cards
- Standard: Up to 15 cards
- Not used in Commander

**`## Maybeboard`** (optional)
- Cards under consideration
- Not part of legal deck
- Used for planning and testing

**`## Commander`** (optional)
- Commander card(s)
- Alternative to front matter `commander` field
- Companion cards can also go here

### Custom Sections

Any section name is valid and preserved:

```markdown
## Creatures
4x Llanowar Elves

## Lands
20x Forest

## Spells
4x Lightning Bolt
```

**Custom Section Rules:**
- Use descriptive names
- Preserved during parsing
- Future tools may recognize semantic meaning
- Good for organization, not enforced

### Section Order

No required order, but common convention:

1. `## Commander` (if used)
2. `## Maindeck`
3. `## Sideboard`
4. `## Maybeboard`

Or by card type:

1. `## Creatures`
2. `## Spells`
3. `## Enchantments`
4. `## Artifacts`
5. `## Lands`

## Complete Examples

### Example 1: Simple Standard Deck

**File:** `decks/red-deck-wins.md`

```markdown
---
name: "Red Deck Wins"
format: "Standard"
colors: ["R"]
description: "Aggressive mono-red burn"
tags: ["aggro", "burn"]
created: "2026-04-05"
---

## Maindeck
# Creatures
4x Monastery Swiftspear
4x Soul-Scar Mage
4x Bomat Courier

# Burn Spells
4x Lightning Bolt
4x Shock
4x Skewer the Critics

# Lands
20x Mountain

## Sideboard
3x Smash to Smithereens
3x Rampaging Ferocidon
```

### Example 2: Commander Deck

**File:** `decks/meren-edh.md`

```markdown
---
name: "Meren Reanimator"
format: "Commander"
commander: "Meren of Clan Nel Toth"
colors: ["B", "G"]
description: "Graveyard recursion and value"
tags: ["reanimator", "midrange", "attrition"]
---

## Commander
1x Meren of Clan Nel Toth

## Maindeck
# Ramp
1x Sol Ring
1x Arcane Signet
1x Llanowar Elves
1x Birds of Paradise

# Recursion
1x Eternal Witness
1x Skullwinder
1x Phyrexian Reclamation

# Sacrifice Outlets
1x Viscera Seer
1x Carrion Feeder
1x Ashnod's Altar

# Lands
1x Command Tower
1x Overgrown Tomb
1x Woodland Cemetery
35x Forest
# TODO: Add dual lands
```

### Example 3: Multi-File Deck

**Directory:** `decks/golgari-midrange/`

**File:** `main.md`

```markdown
---
name: "Golgari Midrange"
format: "Standard"
colors: ["B", "G"]
description: "Efficient creatures and removal"
tags: ["midrange", "value"]
created: "2026-04-05"
updated: "2026-04-05"
---

## Maindeck
4x Llanowar Elves
4x Jadelight Ranger
3x Midnight Reaper
4x Ravenous Chupacabra
2x Vraska, Golgari Queen
4x Fatal Push
4x Assassin's Trophy
3x Find // Finality
4x Overgrown Tomb
4x Woodland Cemetery
12x Forest
8x Swamp
```

**File:** `sideboard.md`

```markdown
## Sideboard
3x Duress
2x Negate
3x Deathgorge Scavenger
2x The Eldest Reborn
3x Vraska's Contempt
2x Arguel's Blood Fast
```

**File:** `maybeboard.md`

```markdown
## Maybeboard
# Considering these for removal suite
2x Vraska's Contempt  # Better against planeswalkers?
2x Cast Down  # More efficient removal?

# Sideboard options
1x Golden Demise  # Against aggro
1x Ritual of Soot  # Better sweeper?
```

### Example 4: Deck with Set Codes

**File:** `decks/legacy-burn.md`

```markdown
---
name: "Legacy Burn"
format: "Legacy"
colors: ["R"]
preferredSets: true
---

## Maindeck
4x Goblin Guide (ZEN) 126
4x Monastery Swiftspear (KTK) 118
4x Eidolon of the Great Revel (JOU) 94

4x Lightning Bolt (M10) 146
4x Lava Spike (CHK) 173
4x Rift Bolt (TSP) 176

20x Mountain (M10) 242
```

## Validation Rules

### Required Elements

✅ **Valid Deck:**
- Has YAML front matter
- Contains `name` field
- Contains `format` field
- Has at least one `## Maindeck` section
- Maindeck has at least 1 card

❌ **Invalid Deck:**
- Missing front matter
- Missing required fields
- No card sections
- Empty maindeck

### Format-Specific Rules

**Standard/Modern/Pioneer:**
- Minimum 60 cards in maindeck
- Maximum 15 cards in sideboard
- Maximum 4 copies of non-basic lands

**Commander:**
- Exactly 100 cards total (99 + commander)
- Maximum 1 copy of each card (except basic lands)
- Must have commander specified

**Pauper:**
- Only commons allowed
- Minimum 60 cards in maindeck

**Note:** Validation is not enforced in MVP. These are guidelines for future tooling.

## Parsing Guidelines

### For Humans

When creating a deck manually:

1. Start with front matter (copy from examples)
2. Fill required fields (`name`, `format`)
3. Add optional fields as needed
4. Create `## Maindeck` section
5. List cards using preferred syntax (`4x Card Name`)
6. Add comments for notes/TODOs
7. Organize with custom sections if helpful
8. Save with `.md` extension in `decks/`

### For AI Agents

When parsing a deck file:

1. Extract YAML front matter (lines between `---`)
2. Parse metadata fields
3. Identify sections by `## Header` pattern
4. Within each section, parse card lines:
   - Match quantity: `(\d+)x?\s+(.+)` or `(.+)\s+x(\d+)`
   - Extract card name (trim whitespace)
   - Parse set code if present: `\(([A-Z0-9]+)\)`
   - Ignore inline comments: `#.*$`
5. Build structured representation
6. Validate required elements

### For Scripts (Future)

Example TypeScript types:

```typescript
interface DeckMetadata {
  name: string;
  format: string;
  commander?: string;
  colors?: string[];
  description?: string;
  tags?: string[];
  preferredSets?: boolean;
  created?: string;
  updated?: string;
}

interface Card {
  quantity: number;
  name: string;
  setCode?: string;
  collectorNumber?: string;
}

interface DeckSection {
  name: string;
  cards: Card[];
}

interface Deck {
  metadata: DeckMetadata;
  sections: DeckSection[];
}
```

## Best Practices

### Naming Conventions

**File Names:**
- Use kebab-case: `golgari-midrange.md`
- Be descriptive: `meren-reanimator.md` not `deck1.md`
- Match deck name when possible

**Deck Names:**
- Use title case: `"Golgari Midrange"`
- Be specific: `"Meren Reanimator"` over `"EDH Deck"`
- Include archetype or strategy

### Organization

**Single-File:**
- Simple decks (60-75 cards)
- Clear strategy
- Minimal sideboard

**Multi-File:**
- Complex decks (100+ cards)
- Extensive sideboard
- Large maybeboard
- Multiple iterations

### Comments

**Use comments for:**
- Card reasoning: `# Core removal spell`
- TODOs: `# TODO: Add more card draw`
- Section notes: `# Land base needs work`
- Testing notes: `# Testing this over X`

**Don't use comments for:**
- Obvious information
- Deck description (use front matter)
- Long paragraphs (use external docs)

### Version Control

**When to commit:**
- New deck created
- Significant changes (5+ cards)
- Strategy pivot
- Format legality fix

**Commit messages:**
```bash
feat(deck): add Golgari Midrange
refactor(deck): swap removal suite in Meren
fix(deck): correct land count for Standard legality
```

## Migration Guide

### From Other Formats

**From Moxfield:**
1. Copy deck list
2. Create front matter from deck metadata
3. Add `## Maindeck` header
4. Paste card list
5. Convert format: `1 Card Name` → `1x Card Name`

**From Archidekt:**
1. Export as CSV
2. Parse CSV for card names and quantities
3. Create front matter manually
4. Group cards into sections
5. Format as `quantity x Card Name`

**From MTG Goldfish:**
1. Copy deck list
2. Preserve section headers as-is
3. Add front matter
4. Convert quantity format if needed

## Future Enhancements

### Considered for Post-MVP

- **Inline card data:** `4x Lightning Bolt {R} // Instant`
- **Mana curve markers:** `## Creatures (CMC 1-2)`
- **Include syntax:** `@include path/to/landbase.md`
- **Variables:** `$FETCH_LANDS = 4x Polluted Delta`
- **Conditional sections:** `## Sideboard [against Control]`

### Deferred to Later Versions

- Custom metadata fields
- Deck statistics calculation
- Auto-generated sections
- Template inheritance
- Version branching within file

---

**Complete specification for Git-Probe Deck DSL v1.0.0**

For implementation examples, see `decks/examples/`. For export formats, see `docs/export-formats.md`.
