# Git-Probe VSCode Extension Plan

**Status:** Planning Phase  
**Date:** 2026-04-05  
**Base:** Fork of [PixR2/mtg-code](https://github.com/PixR2/mtg-code)

## Project Name

**Git-Probe** - A play on [Gitaxian Probe](https://scryfall.com/card/nph/35/gitaxian-probe), the iconic MTG card, combined with Git version control.

>"Look at target player's hand" → Look at your collection and decks  
>"Draw a card" → Discover new cards via Scryfall

Perfect for a Git-based MTG collection manager with card discovery features.

## Executive Summary

Build a VSCode extension for Git-Probe that handles two distinct use cases:
1. **Deck editing** - `.mtg` files with syntax highlighting, autocomplete, and card preview
2. **Card discovery** - Scryfall search interface with results panel and "add to deck" workflow

Start with mtg-code's working foundation, extend it with Git-Probe specific features.

---

## What mtg-code Already Provides (Baseline)

### Features ✅
- Syntax highlighting for `.mtg` files
- Autocomplete card names as you type
- Hover preview showing card image + price
- Embedded Scryfall search: `// Search: query;`
- Card counting (select lines to see total)

### File Format
```mtg
// Section Name
4 Lightning Bolt
1 Mana Crypt
2 Island

// Search: o:"create" o:"token" id<=naya usd<5;
```

### Grammar (TextMate)
- **Sections:** `// Section Name` → `markup.heading.mtg`
- **Card lines:** `<number> <card name>` → `constant.numeric.mtg` + `variable.name.mtg`
- **Double-faced:** `//` → `keyword.operator.mtg`
- **Search syntax:** Operators, keywords, values highlighted

### Architecture
- Language: TypeScript
- Activation: `onLanguage:mtg`
- Commands: Search cards, Show rulings
- Dependencies: fuzzy, image-download, resize-img, web-request

---

## What We Need to Add (Git-Probe Extensions)

### Priority 1: Enhanced Deck Files

#### 1.1 YAML Frontmatter Support
```mtg
---
name: "Baylen Token Synergy"
commander: "Baylen, the Haymaker"
format: "Commander"
colors: ["R", "G", "W"]
description: "Token multiplication strategy"
budget: 100
created: "2026-04-05"
---

// Commander
1 Baylen, the Haymaker

// Maindeck
1 Academy Manufactor  # Token multiplier
```

**Grammar changes needed:**
- Detect YAML frontmatter block (`---` delimiters)
- Apply YAML syntax highlighting to frontmatter
- Parse frontmatter for deck metadata

**Use cases:**
- Extract commander for color identity validation
- Show deck info in status bar
- Filter autocomplete by commander colors
- Calculate total deck cost from budget

#### 1.2 Inline Comments Support
```mtg
1 Academy Manufactor  # $5.99 - Core engine piece
4 Storm-Kiln Artist   # $2.68 - Treasure generation
// TODO: Need more artifact synergies
```

**Grammar changes needed:**
- Detect `#` as comment start
- Highlight everything after `#` as comment
- Support `// TODO:` style annotations

**Use cases:**
- Personal notes on card choices
- Price annotations
- TODOs for deck improvements
- Card role explanations

#### 1.3 Collection Integration

**Show ownership status in hover:**
```
┌─────────────────────────────────┐
│ Beast Within                    │
│ {2}{G} - Instant                │
│                                  │
│ [Card Image]                    │
│                                  │
│ Destroy target permanent...     │
│                                  │
│ Price: $0.68                    │
│ ✅ You own 1 copy               │
│   Location: "goods" binder      │
└─────────────────────────────────┘
```

**Configuration needed:**
- Path to `ManaBox_Collection.csv`
- Enable/disable collection checking

**Implementation:**
- Load CSV on extension activation
- Index cards by name (case-insensitive)
- Check ownership on hover
- Show quantity + binder location

**Autocomplete enhancement:**
- Mark owned cards with ✅ icon
- Sort owned cards higher in list
- Show quantity in completion detail

#### 1.4 Price Tracking

**Inline price display:**
```mtg
1 Academy Manufactor  # $5.99
4 Storm-Kiln Artist   # $2.68 × 4 = $10.72
```

**Status bar:**
```
Deck Total: $87.45 / $100 budget | Owned: 23/99 (23%)
```

**Features:**AI-Assisted Card Discovery

#### 2.1 Search Workflow (File-Based)

**Command palette:**
```
> Git-Probe: Search for Cards
```

**Copilot builds query and creates results file:**

**User in deck file:**
```
User: "Find cheap token creators for this deck"

Copilot:
1. Reads deck frontmatter (commander, colors, budget)
2. Builds Scryfall query: o:"create" o:"token" id<=naya usd<5
3. Fetches results from API
4. Creates: decks/baylen-tokens-search-results.mtg
```

**Search results file format:**
```mtg
---
searchQuery: 'o:"create" o:"token" id<=naya f:commander usd<5'
resultsFor: "baylen-tokens.mtg"
totalResults: 86
created: "2026-04-05"
---

// Search Query
// o:"create" o:"token" id<=naya f:commander usd<5
// Found 86 cards

// Results (sorted by price)
1 Beast Within  # $0.68 - Instant | Destroy + token | ✅ OWNED (goods)
1 Generous Gift  # $1.23 - Instant | Destroy + token | ❌ Need to buy
1 Tireless Provisioner  # $1.89 - Creature | Landfall | ✅ OWNED (goods)
1 Scute Swarm  # $4.86 - Creature | Landfall copies | ❌ Need to buy

// Select cards above and copy to your deck
// Or ask Copilot: "Add Beast Within and Tireless Provisioner to my deck"
```

**Why file-based?**
- ✅ Reviewable - Can examine results at your own pace
- ✅ Editable - Annotate, reorder, filter manually
- ✅ Git-trackable - Search history is version controlled
- ✅ Shareable - Send search results to others
- ✅ AI-friendly - Copilot can read and manipulate
- ✅ No UI to build - Just syntax highlighting

#### 2.2 Multi-Query Searches

**Complex strategies need multiple searches:**

```
User: "Build the Baylen deck - search for all pieces"

Copilot creates: decks/baylen-tokens-full-search.mtg
---
searchQueries:
  - name: "Token Creators (Food)"
    query: 'o:"create" o:"Food" id<=naya usd<5'
  - name: "Token Creators (Treasure)"
    query: 'o:"create" o:"Treasure" id<=naya usd<5'
  - name: "Artifact ETB Triggers"
    query: 'o:"Whenever" o:"artifact" id<=naya usd<5'
  - name: "Artifact Sacrifice"
    query: 'o:"Sacrifice" o:"artifact" id<=naya usd<3'
---

// Token Creators (Food) - 86 results
1 Tireless Provisioner  # $1.89 | ✅ OWNED
1 The Shire  # $2.81 | ❌

// Token Creators (Treasure) - 156 results  
1 Storm-Kiln Artist  # $2.68 | ❌
1 Collector's Vault  # $1.54 | ❌

// Artifact ETB Triggers - 28 results
1 Reckless Fireweaver  # $0.45 | ❌
1 Ingenious Artillerist  # $0.50 | ❌

// Artifact Sacrifice - 78 results
1 Oswald Fiddlebender  # $1.84 | ❌
1 Throne of Geth  # $0.97 | ❌
```

#### 2.3 Add to Deck Workflow

**Manual approach (copy-paste):**
1. Review search results file
2. Select cards you want
3. Copy to deck file
4. Delete or archive search results

**AI-assisted approach:**
```
User (in search results file): "Add the first 5 cards to my maindeck"

Copilot:
1. Parses selected cards
2. Opens original deck file
3. Inserts into // Maindeck section
4. Preserves comments and prices
5. Marks as added in search results
```

**Bulk operations:**
```
User: "Add all owned cards to maindeck"

Copilot filters for ✅ OWNED and adds them
```

#### 2.4 Search Results Management

**Commands:**
- `Git-Probe: Archive Search Results` → Move to `decks/.searches/` folder
- `Git-Probe: Delete Search Results` → Remove file
- `Git-Probe: Refresh Search Results` → Re-run query, update prices
- `Git-Probe: Open Source Deck` → Jump to original deck file

**File naming:**
```
decks/
  baylen-tokens.mtg              # Main deck
  baylen-tokens-search-1.mtg     # First search
  baylen-tokens-search-2.mtg     # Second search
  .searches/                     # Archived searches
    baylen-tokens-20260405.mtg   # Dated archive
```
   1 Beast Within  # $0.68 - Added from search
   ```
5. **Update search panel:** Mark as added ✓

**Bulk add:**
- Select multiple cards with checkboxes
- Click "Add Selected to Deck"
- All go to same section with same quantity
- Or show advanced dialog for individual control

---

### Priority 3: Copilot Integration

#### 3.1 Natural Language Query Building

**In deck file, ask Copilot:**
```
User: "Find cheap token creators for this deck"

Copilot:
- Reads frontmatter (commander, colors, budget)
- Builds query: o:"create" o:"token" id<=naya f:commander usd<5
- Opens search panel with results
```

**In chat:**
```
User: "Show me artifact synergies under $3"

Copilot:
- Understands context (Baylen deck = artifact tokens)
- Searches multiple patterns:
  - o:"Whenever" o:"artifact" usd<3
  - o:"Sacrifice" o:"artifact" usd<3
- Opens multiple search panels OR
- Consolidates results in one panel
```

#### 3.2 Deck Building Assistance

**Command: "Build a budget Baylen deck"**

Copilot workflow:
1. Creates `.mtg` file with frontmatter
2. Runs searches for each category:
   - Token creators
   - Artifact synergies
   - Removal
   - Ramp
   - Card draw
3. Opens search panel for each
4. User selects cards
5. Copilot adds to appropriate sections
6. Updates budget tracking

**Command: "Compare this deck to my collection"**

Copilot workflow:
1. Parses all cards in deck
2. Checks against collection CSV
3. Shows report:
   ```
   Owned: 23/99 cards (23%)
   Missing: 76 cards
   Total cost of missing: $87.45
   
   By section:
   - Commander: 0/1
   - Maindeck: 20/70
   - Sideboard: 3/15
   ```

---

## File Format Specification

### `.mtg` File Structure

```mtg
---
name: "Deck Name"
commander: "Commander Name"  # Optional
format: "Commander"          # Required
colors: ["R", "G", "W"]      # Optional (auto-detect from cards)
description: "Strategy"      # Optional
budget: 100                  # Optional (USD)
created: "2026-04-05"        # Optional
updated: "2026-04-05"        # Optional
---

// Commander
1 Commander Name

// Maindeck
4 Card Name  # Comment
1 Another Card  # $5.99 - Note

// Sideboard
3 Card Name

// Maybeboard
1 Expensive Card  # Considering for upgrades

// Search: o:"create" o:"token" id<=naya usd<5;
// TODO: Need more removal
```

**Migration from `.md`:**
- Keep YAML frontmatter structure
- Replace `## Section` with `// Section`
- Replace `1x Card` with `1 Card`
- Keep `#` comments

---

## Grammar Specification (TextMatte)

### Scopes to Define

**Frontmatter:**
```json
{
  "begin": "^---$",
  "end": "^---$",
  "name": "meta.frontmatter.mtg",
  "contentName": "source.yaml"
}
```

**Sections:**
```json
{
  "match": "^//\\s+(.+)$",
  "name": "markup.heading.mtg",
  "captures": {
    "1": { "name": "entity.name.section.mtg" }
  }
}
```

**Card lines:**
```json
{
  "match": "^(\\d+)\\s+([^#]+?)(?:\\s*#\\s*(.*))?$",
  "captures": {
    "1": { "name": "constant.numeric.quantity.mtg" },
    "2": { "name": "entity.name.card.mtg" },
    "3": { "name": "comment.line.mtg" }
  }
}
```

**CoRepository Structure

**This repository (git-probe) IS the VSCode extension:**

```
git-probe/                         # VSCode extension root
├── package.json                   # Extension manifest
├── tsconfig.json                  # TypeScript config
├── .vscodeignore                  # What to exclude from package
├── README.md                      # Extension + project docs
├── src/                           # Extension source code
│   ├── extension.ts               # Entry point
│   ├── providers/
│   │   ├── hoverProvider.ts       # Card hover preview
│   │   ├── completionProvider.ts  # Autocomplete cards
│   │   └── diagnosticsProvider.ts # Deck validation
│   ├── commands/
│   │   ├── searchCards.ts         # Create search results files
│   │   ├── addToCollection.ts     # Track ownership
│   │   └── analyzeDeck.ts         # Deck statistics
│   ├── services/
│   │   ├── scryfallClient.ts      # API wrapper
│   │   ├── collectionManager.ts   # Collection CSV
│   │   ├── priceTracker.ts        # Price updates
│   │   └── cardDatabase.ts        # Local card index
│   ├── parsers/
│   │   ├── deckParser.ts          # Parse .mtg files
│   │   └── frontmatterParser.ts   # YAML parsing
│   └── utils/
│       ├── cache.ts               # API response cache
│       └── config.ts              # Extension settings
├── syntaxes/
│   ├── mtg.tmLanguage.json        # Deck file grammar
│   └── scryfall-query.tmLanguage.json  # Query syntax
├── test/                          # Extension tests
│   └── ...
├── .github/                       # GitHub Copilot instructions
│   ├── copilot-instructions.md
│   └── instructions/
│       ├── deck-format.instructions.md
│       ├── collection-query.instructions.md
│       └── ...
├── docs/                          # User documentation
│   ├── plan.md
│   ├── scryfall.md
│   ├── extension-plan.md
│   └── ...
├── decks/                         # Example decks + user decks
│   ├── examples/
│   │   ├── baylen-tokens.mtg
│   │   └── ...
│   └── .searches/                 # Archived search results
└── ManaBox_Colle (File-Based):**
```
User asks Copilot: "Find token creators"
  → Copilot understands context (deck colors, budget)
  → Builds Scryfall query
  → Runs Git-Probe: Search Cards command
  → Fetch results from Scryfall API (paginated)
  → Check each card against collection
  → Generate search results .mtg file
  → Open file in editor
  → User reviews, annotates, selects cards
  → User asks: "Add first 5 to maindeck"
  → Copilot parses selection
  → Inserts into original deck filard detail modal
│   ├── services/
│   │   ├── scryfallClient.ts     # API wrapper
│   │   ├── collectionManager.ts  # Collection CSV
│   │   ├── priceTracker.ts       # Price updates
│   │   └── cardDatabase.ts       # Local card index
│   ├── parsers/
│   │   ├── deckParser.ts         # Parse .mtg files
│   │   └── frontmatterParser.ts  # YAML parsing
│   └── utils/
│       ├── cache.ts              # API response cache
│       └── config.ts             # Extension settings
├── syntaxes/
│   ├── mtg.tmLanguage.json       # Deck file grammar
│   └── scryfall-query.tmLanguage.json  # Query syntax
├── media/
│   ├── styles.css                # Webview CSS
│   └── icons/                    # Extension icons
└── test/
    └── ...                       # Unit tests
```

### Data Flow

**Hover Preview:**
```
User hovers card name
  → Hover Provider detects card name
  → Check cache for card data
  → If not cached: Fetch from Scryfall API
  → Check collection CSV for ownership
  → Render hover with image + data + ownership
```

**Search Workflow:**
```
User runs "Search Cards" command
  → Show input box (with natural language support)
  → Translate query if needed (via Copilot?)
  → Fetch results from Scryfall API
  → Open webview search panel
  → Render cards with checkboxes
  → User selects cards + clicks "Add to Deck"
  → Insert into active .mtg file
  → Update panel to show "added" state
```

**Collection Sync:**
```
Extension activates
  → Read config for collection CSV path
  → Load and parse ManaBox_Collection.csv
  → Index by card name (case-insensitive)
  → Watch file for changes
  → Re-index on change
```

---Results Files (Week 4-5)
- [ ] Create "Search Cards" command
- [ ] Accept Scryfall query (natural language via Copilot)
- [ ] Fetch paginated results from API
- [ ] Check ownership for each result
- [ ] Generate .mtg search results file
- [ ] Format with sections, comments, ownership markers
- [ ] Commands: Archive, Refresh, Delete resultronment
- [ ] Test existing functionality
- [ ] Document current codebase
- [ ] Plan refactoring strategy

### Phase 2: YAML & Comments (Week 2)
- [ ] Extend grammar for YAML frontmatter
- [ ] Support `#` inline comments
- [ ] Parse frontmatter in deck files
- [ ] Extract deck metadata
- [ ] Test with Git-Probe deck files

### Phase 3: Collection Integration (Week 3)
- [ ] Configuration for CSV path
- [ ] Load and index collection
- [ ] Show ownership in hover
- [ ] Mark owned cards in autocomplete
- [ ] Watch CSV for changes

### Phase 4: Search Panel (Week 4-5)
- [ ] Create webview search panel
- [ ] Fetch and display search results
- [ ] Implement card grid UI
- [ ] Add checkboxes and selection
- [ ] "Add to deck" functionality
- [ ] Filter and sort controls

### Phase 5: Price Tracking (Week 6)
- [ ] Fetch prices from Scryfall
- [ ] Update inline price comments
- [ ] Calculate total deck cost
- [ ] Show budget comparison
- [ ] Status bar indicators

### Phase 6: Polish & Publish (Week 7)
- [ ] Write documentation
- [ ] Create demo videos
- [ ] Test on multiple platforms
- [ ] Fix bugs
- [ ] Package and publish to marketplace

---

## Configuration Settings

```json
{
  "git-probe-mtg.collectionPath": {
    "type": "string",
    "default": "${workspaceFolder}/ManaBox_Collection.csv",
    "description": "Path to your collection CSV file"
  },
  "git-probe-mtg.enableCollectionCheck": {
    "type": "boolean",
    "default": true,
    "description": "Show ownership status in card previews"
  },
  "git-probe-mtg.enablePriceTracking": {
    "type": "boolean",
    "default": true,
    "description": "Auto-update price comments in deck files"
  },
  "git-probe-mtg.defaultCurrency": {
    "type": "string",
    "enum": ["usd", "eur", "tix"],
    "default": "usd",
    "description": "Preferred currency for prices"
  },
  "git-probe-mtg.cacheExpiry": {
    "type": "number",
    "default": 86400,
    "description": "Cache expiry time in seconds (24 hours)"
  }
}
```

---

## Open Questions

1. **Frontmatter vs metadata?**
   - Keep YAML frontmatter?
   - Or use mtg-code style comments?
   - **Decision:** Keep YAML for compatibility with current decks

2. **File extension?**
   - Stay with `.mtg` (compatible with mtg-code)
   - Or use `.deck` (Git-Probe specific)
   - **Decision:** Use `.mtg` to leverage existing tools

3. **Search panel location?**
   - Sidebar panel (persistent)
   - Editor panel (temporary)
   - **Decision:** Sidebar panel, can pin/unpin

4. **Natural language translation?**
   - Build into extension?
   - Or rely on Copilot in chat?
   - **Decision:** Start with Copilot, may add later

5. **Migration tool?**
   - Auto-convert `.md` decks to `.mtg`?
   - Or manual migration?
   - **Decision:** Provide command to convert, user chooses when

---

## Success Metrics
### Step 1: Clone mtg-code as reference

```bash
# Clone mtg-code to a temporary location for reference
cd ~/projects
git clone https://github.com/PixR2/mtg-code.git mtg-code-reference
```

### Step 2: Set up git-probe extension structure

```bash
cd ~/projects/git-probe

# Copy relevant files from mtg-code-reference
cp mtg-code-reference/package.json package.json.reference
cp mtg-code-reference/tsconfig.json .
cp -r mtg-code-reference/src .
cp -r mtg-code-reference/syntaxes .

# Update package.json
# - Change name to "git-probe"
# - Change displayName to "Git-Probe"
# - Update description
# - Update repository URL
```

### Step 3: Test baseline functionality

```bash
# Install dependencies
npm install

# Open in VSCode
code .

# Press F5 to launch extension development host
# Create test.mtg file
# Validate hover, autocomplete work
```

### Step 4: Begin modifications

- Update grammar to support YAML frontmatter
- Add inline comment syntax
- Test with Git-Probe deck files
- Integrate collection CSV loading

Ready toon complete
- [ ] Ready for personal use

---

## Next Steps

1. **Fork the repository**
   ```bash
   cd ~/projects
   git clone https://github.com/PixR2/mtg-code.git git-probe-mtg
   cd git-probe-mtg
   npm install
   ```

2. **Test current functionality**
   - Open in VSCode
   - Press F5 to debug
   - Create test `.mtg` file
   - Validate all features work

3. **Plan refactoring**
   - Document current code structure
   - Identify what to keep vs replace
   - Plan new features incrementally

Ready to fork and start?
