# Copilot Instructions for Git-Probe

You are assisting with Git-Probe, a version-controlled Magic: The Gathering collection manager. This document provides specifications, patterns, and workflows for operating Git-Probe effectively.

## Project Context

**What is Git-Probe?**
- MTG collection and deck management via Git repository
- ManaBox CSV export is source-of-truth for collection
- Decks are markdown files with custom DSL
- Designed for natural language interaction via Copilot

**Core Philosophy:**
- Repo-as-database: Filesystem is the data store
- Agent-centric: Operate via Copilot Chat
- Documentation-first: Specs enable incremental automation
- Growth-oriented: Manual → Automated as needs arise

## ManaBox Collection CSV

**Location:** `ManaBox_Collection.csv` in repo root

**Schema (17 columns):**
1. **Binder Name** — Physical binder/box name (e.g., "goods")
2. **Binder Type** — Container type (e.g., "binder", "box")
3. **Name** — Card name (e.g., "Lightning Bolt")
4. **Set code** — 3-4 letter set code (e.g., "TDM", "M10")
5. **Set name** — Full set name (e.g., "Tarkir: Dragonstorm")
6. **Collector number** — Card number in set (e.g., "99")
7. **Foil** — "normal" or "foil"
8. **Rarity** — "common", "uncommon", "rare", "mythic"
9. **Quantity** — Number of copies (integer)
10. **ManaBox ID** — Internal ManaBox identifier
11. **Scryfall ID** — UUID from Scryfall database
12. **Purchase price** — Price paid (decimal)
13. **Misprint** — "true" or "false"
14. **Altered** — "true" or "false"
15. **Condition** — "near_mint", "lightly_played", "moderately_played", "heavily_played", "damaged"
16. **Language** — 2-letter code (e.g., "en")
17. **Purchase price currency** — Currency code (e.g., "CAD", "USD")

**Usage Patterns:**

Read the CSV when user asks about their collection:
- "What cards do I have from [set]?"
- "Do I own [card name]?"
- "Show me all foils in [binder]"

Example parsing approach (manual for MVP):
```bash
# Find all cards from Tarkir Dragonstorm set
grep "TDM" ManaBox_Collection.csv

# Count unique card names
awk -F',' '{print $3}' ManaBox_Collection.csv | sort -u | wc -l

# Find specific card
grep -i "lightning bolt" ManaBox_Collection.csv
```

**Never modify** the CSV file. It's read-only and user-managed.

## Deck DSL Specification

Decks are Markdown files with YAML front matter and section-based card lists.

### Front Matter (YAML)

```yaml
---
name: "Deck Name"                    # Required: Human-readable deck name
format: "Commander"                   # Required: Standard, Modern, Commander, Legacy, Vintage, Pauper, etc.
commander: "Meren of Clan Nel Toth"  # Optional: Commander for EDH
colors: ["B", "G"]                   # Optional: W, U, B, R, G (mono or multi-color)
description: "Graveyard recursion"   # Optional: Brief strategy description
tags: ["reanimator", "value"]        # Optional: Searchable tags
preferredSets: false                 # Optional: Include set codes in cards (default: false)
created: "2026-04-05"                # Optional: Creation date
updated: "2026-04-05"                # Optional: Last update date
---
```

### Card List Syntax

**Supported formats (all equivalent):**
```markdown
4x Lightning Bolt       # Preferred format
4 Lightning Bolt        # Alternative
Lightning Bolt x4       # Alternative
```

**With set codes (when `preferredSets: true`):**
```markdown
4x Lightning Bolt (M10)
1x Sol Ring (C21) 263
```

**Single copy (quantity defaults to 1):**
```markdown
1x Mana Crypt
Mana Crypt            # Also valid for single copy
```

### Standard Sections

Use Markdown headers to organize cards:

```markdown
## Maindeck
4x Lightning Bolt
4x Counterspell
20x Island

## Sideboard
3x Surgical Extraction
4x Leyline of the Void

## Maybeboard
2x Force of Will
1x Mana Drain
```

**Section Guidelines:**
- `## Maindeck` — Required for all decks
- `## Sideboard` — Optional (for formats with sideboards)
- `## Maybeboard` — Optional (cards under consideration)
- Custom sections allowed: `## Creatures`, `## Lands`, etc.

### Comments and Annotations

Inline comments for notes:
```markdown
## Maindeck
4x Lightning Bolt  # Core removal spell
3x Shock  # TODO: Replace with more Bolts
# This section needs work
2x Lava Spike
```

### Multi-File Decks

For complex decks, use directory structure:

```
decks/golgari-midrange/
  main.md          # Front matter + maindeck
  sideboard.md     # Sideboard cards
  maybeboard.md    # Cards under consideration
```

**main.md:**
```yaml
---
name: "Golgari Midrange"
format: "Standard"
colors: ["B", "G"]
---

## Maindeck
4x Llanowar Elves
...
```

**sideboard.md:**
```markdown
## Sideboard
3x Duress
2x Assassin's Trophy
```

## Common Workflows

### 1. Creating a New Deck

**User Request:** "Create a Commander deck with Meren of Clan Nel Toth"

**Your Response:**
1. Create file: `decks/meren-edh.md`
2. Add front matter with commander specified
3. Start with base structure (99 cards + commander)
4. Suggest typical Golgari recursion cards

**Example Output:**
```yaml
---
name: "Meren Reanimator"
format: "Commander"
commander: "Meren of Clan Nel Toth"
colors: ["B", "G"]
description: "Graveyard recursion and value engine"
tags: ["reanimator", "midrange", "attrition"]
---

## Commander
1x Meren of Clan Nel Toth

## Maindeck
# Ramp
1x Sol Ring
1x Arcane Signet
1x Llanowar Elves
...
```

### 2. Comparing Deck to Collection

**User Request:** "Which cards from decks/meren-edh.md do I own?"

**Your Approach:**
1. Read the deck file and parse card names
2. Read ManaBox_Collection.csv
3. Cross-reference card names (case-insensitive)
4. Report owned vs missing cards

**Example Response Format:**
```
✅ OWNED (45/99 cards):
- Sol Ring (C21) - Qty: 1 in "goods" binder
- Llanowar Elves (TDM) - Qty: 3 in "goods" binder
- ...

❌ MISSING (54/99 cards):
- Meren of Clan Nel Toth
- Phyrexian Arena
- ...

Summary: You own 45% of this deck. Missing 54 cards.
```

### 3. Querying Collection

**User Request:** "Show me all cards from Tarkir Dragonstorm"

**Your Approach:**
```bash
grep ",TDM," ManaBox_Collection.csv | awk -F',' '{print $3, "x" $9}' | sort
```

**Example Response:**
```
Found 127 cards from Tarkir: Dragonstorm (TDM):
- Alesha's Legacy x2
- Armament Dragon x1
- Avenger of the Fallen x1 (foil)
...

Total unique cards: 127
Total quantity: 189
```

### 4. Exporting to Moxfield

**User Request:** "Export decks/meren-edh.md to Moxfield format"

**Your Approach:**
1. Read and parse deck file
2. Convert to Moxfield text format (see Export Formats section)
3. Create output file or display for copy-paste

**Moxfield Format Example:**
```
Commander:
1 Meren of Clan Nel Toth

Deck:
1 Sol Ring
1 Arcane Signet
...
```

### 5. Exporting to Archidekt

**User Request:** "Export decks/meren-edh.md to Archidekt CSV"

**Your Approach:**
1. Read and parse deck file
2. Convert to Archidekt CSV format
3. Map data to required columns

**Archidekt CSV Headers:**
```
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
```

### 6. Tracking Collection Updates

**User Request:** "I updated my collection CSV"

**Your Approach:**
1. Suggest committing the change:
   ```bash
   git add ManaBox_Collection.csv
   git commit -m "chore(collection): update from ManaBox export on 2026-04-05"
   ```
2. Optionally show what changed:
   ```bash
   git diff HEAD~1 ManaBox_Collection.csv
   ```

## Scryfall API Integration

Use curl for on-demand card lookups (no caching in MVP).

**Base URL:** `https://api.scryfall.com`

### Named Card Search

```bash
curl -s "https://api.scryfall.com/cards/named?exact=Lightning+Bolt"
curl -s "https://api.scryfall.com/cards/named?fuzzy=lightning+bolt"
```

### Response Format (JSON):
```json
{
  "object": "card",
  "name": "Lightning Bolt",
  "mana_cost": "{R}",
  "type_line": "Instant",
  "oracle_text": "Lightning Bolt deals 3 damage...",
  "prices": {
    "usd": "0.25",
    "usd_foil": "2.00"
  },
  "set": "m10",
  "set_name": "Magic 2010",
  "collector_number": "146",
  "legalities": {
    "standard": "not_legal",
    "modern": "legal",
    "commander": "legal"
  }
}
```

### Common Use Cases

**Price Lookup:**
```bash
curl -s "https://api.scryfall.com/cards/named?exact=Mana+Crypt" | \
  jq '.prices.usd'
```

**Legality Check:**
```bash
curl -s "https://api.scryfall.com/cards/named?exact=Black+Lotus" | \
  jq '.legalities.commander'
```

**Rate Limiting:**
- Scryfall allows ~10 requests/second
- Add 100ms delay between bulk requests:
  ```bash
  sleep 0.1
  ```

## Export Formats

### Moxfield Text Format

**Deck Structure:**
```
Commander:
1 Commander Name

Companion:
1 Companion Name

Deck:
4 Card Name
3 Another Card
...

Sideboard:
2 Sideboard Card
...
```

**Rules:**
- One card per line: `quantity cardname`
- Commanders in separate section
- Can include set codes: `1 Sol Ring (C21) 263`
- Import via Moxfield's "Import" → "Text"

### Archidekt CSV Format

**Headers:**
```csv
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
```

**Example Rows:**
```csv
1,Meren of Clan Nel Toth,Commander 2015,Near Mint,English,false,Commander
1,Sol Ring,Commander 2021,Near Mint,English,false,Ramp
4,Llanowar Elves,Magic 2010,Near Mint,English,false,Ramp;Creature
```

**Conversion Notes:**
- Map DSL `## Maindeck` cards to rows
- Set "Tags" to section name or card type
- Default condition: "Near Mint"
- Default language: "English"
- Foil: "false" unless noted in comments

## Semantic Commit Format

Use conventional commits for all changes.

**Format:** `<type>(<scope>): <message>`

**Types:**
- `feat` — New feature (deck, script)
- `fix` — Bug fix
- `docs` — Documentation changes
- `chore` — Maintenance (collection updates)
- `refactor` — Code restructuring without feature changes
- `style` — Formatting changes
- `test` — Adding tests

**Scopes:**
- `deck` — Deck file changes
- `collection` — Collection CSV updates
- `dsl` — DSL specification changes
- `export` — Export functionality
- `script` — Script/tool changes

**Examples:**
```bash
git commit -m "feat(deck): add Golgari Midrange"
git commit -m "refactor(deck): swap removal suite in Meren"
git commit -m "chore(collection): update from ManaBox export on 2026-04-05"
git commit -m "docs(dsl): clarify card syntax variations"
git commit -m "fix(export): handle double-faced cards in Moxfield format"
```

## Best Practices

### When Creating Decks
1. Always include complete front matter
2. Validate format (Standard needs 60+ mainboard)
3. Use clear section headers
4. Add comments for card choices or TODOs
5. Commit with descriptive message

### When Comparing to Collection
1. Use case-insensitive matching for card names
2. Account for quantity (user may own multiples)
3. Report by section (Maindeck vs Sideboard)
4. Include approximate total cost for missing cards

### When Exporting
1. Validate deck structure before export
2. Preserve commander/companion in correct sections
3. Include set codes if available in deck
4. Verify format requirements (Moxfield vs Archidekt)

### When Querying Collection
1. Use grep/awk for simple queries
2. Account for CSV escaping (commas in card names)
3. Show relevant columns (Name, Set, Quantity, Foil)
4. Sort results alphabetically

## Error Handling

### Invalid Deck Files
- Missing front matter → Suggest adding required fields
- Invalid format name → List valid formats
- Duplicate cards → Report and suggest consolidation

### Collection Query Issues
- Card not found → Check spelling, suggest fuzzy search
- CSV parsing errors → Verify comma escaping
- Empty results → Expand search criteria

### Export Problems
- Format mismatch → Explain format requirements
- Missing data → Use sensible defaults
- Invalid card names → Flag for user review

## Example Prompts and Responses

### User: "Create a Standard deck with Sheoldred"

**Your Response:**
```markdown
I'll create a Standard deck featuring Sheoldred, the Apocalypse.

Created: decks/sheoldred-control.md
```

**File Content:**
```yaml
---
name: "Sheoldred Control"
format: "Standard"
colors: ["B"]
description: "Midrange control with Sheoldred as finisher"
tags: ["control", "midrange"]
---

## Maindeck
4x Sheoldred, the Apocalypse
4x Fatal Push
4x Go for the Throat
...
20x Swamp
```

### User: "Compare decks/meren-edh.md to my collection"

**Your Response:**
```
Analyzing Meren Reanimator deck...

✅ OWNED (23 cards):
[Detailed list with binder locations]

❌ MISSING (77 cards):
[Detailed list]

Summary: You own 23% of this deck (23/100 cards).
Estimated cost for missing cards: ~$XXX (based on Scryfall prices)

Would you like me to:
1. Show specific missing cards by category?
2. Suggest owned alternatives from your collection?
3. Export the missing cards list?
```

### User: "Show all my cards worth over $10"

**Your Response:**
```bash
# Note: ManaBox CSV includes purchase price, not current value.
# For current prices, I'll need to query Scryfall.

Found these cards with purchase price ≥ $10 CAD:
- Rot-Curse Rakshasa (TDM) - Qty: 1 - Purchase: $11.75 CAD

For current market values, would you like me to:
1. Query Scryfall for all cards? (will take time)
2. Check specific cards you're interested in?
```

---

## Quick Reference

**Deck Location:** `decks/*.md` or `decks/*/main.md`  
**Collection:** `ManaBox_Collection.csv`  
**Docs:** `docs/*.md`  
**Examples:** `decks/examples/`

**Need Help?** Refer to:
- `docs/plan.md` — Project architecture
- `docs/deck-dsl.md` — Complete DSL specification
- `docs/collection-usage.md` — Collection patterns
- `docs/export-formats.md` — Export specifications
