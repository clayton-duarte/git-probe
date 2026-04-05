# Export Format Specifications

**Version:** 1.0.0  
**Last Updated:** April 5, 2026

## Overview

This document specifies how to convert Git-Probe deck files to formats compatible with popular deck-building platforms: **Moxfield** and **Archidekt**. Includes complete format specifications, conversion rules, and examples.

## Moxfield Text Format

### Overview

Moxfield accepts deck imports via plain text format with specific section headers and card syntax.

**Import Location:** Moxfield.com → My Decks → Import → Text

### File Structure

```
[Optional: Companion section]
Companion:
1 Companion Card Name

[Required for Commander]
Commander:
1 Commander Card Name

[Required: Main deck]
Deck:
4 Card Name
3 Another Card
...

[Optional: Sideboard]
Sideboard:
3 Sideboard Card
...
```

### Card Syntax

**Basic Format:**
```
quantity cardname
```

**With Set Codes:**
```
quantity cardname (SET) collector#
```

**Examples:**
```
4 Lightning Bolt
4 Lightning Bolt (M10) 146
1 Sol Ring (C21) 263
```

### Section Headers

**`Companion:`** (optional)
- Must be first if present
- Exactly 1 card
- For decks using companion mechanic

**`Commander:`** (required for Commander format)
- Must be before `Deck:` section
- 1-2 cards (partner commanders)
- For Commander/EDH decks

**`Deck:`** (required)
- Main deck cards
- One card per line
- All formats

**`Sideboard:`** (optional)
- Sideboard cards
- One card per line
- Not used in Commander

### Special Cases

**Double-Faced Cards:**
```
1 Delver of Secrets // Insectile Aberration
1 Jace, Vryn's Prodigy // Jace, Telepath Unbound
```
Use full card name with `//` separator.

**Split Cards:**
```
1 Fire // Ice
```

**Flip Cards:**
```
1 Nezumi Graverobber // Nighteyes the Desecrator
```

### Complete Example: Commander Deck

```
Commander:
1 Meren of Clan Nel Toth

Deck:
1 Sol Ring
1 Arcane Signet
1 Llanowar Elves
1 Birds of Paradise
1 Eternal Witness
1 Skullwinder
1 Phyrexian Reclamation
1 Viscera Seer
1 Carrion Feeder
1 Command Tower
1 Overgrown Tomb
1 Woodland Cemetery
35 Forest
5 Swamp
```

### Complete Example: Standard Deck

```
Deck:
4 Monastery Swiftspear
4 Soul-Scar Mage
4 Lightning Bolt
4 Shock
4 Skewer the Critics
20 Mountain

Sideboard:
3 Smash to Smithereens
3 Rampaging Ferocidon
```

## Archidekt CSV Format

### Overview

Archidekt accepts deck imports via CSV with specific column structure.

**Import Location:** Archidekt.com → Import → CSV Upload

### CSV Structure

**Required Headers:**
```csv
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
```

**Column Specifications:**

| Column | Type | Required | Description | Valid Values |
|--------|------|----------|-------------|--------------|
| Quantity | integer | Yes | Number of copies | `1`, `4`, etc. |
| Card Name | string | Yes | Full card name | `"Lightning Bolt"` |
| Edition | string | No | Set name or code | `"Magic 2010"`, `"M10"` |
| Condition | string | No | Card condition | See below |
| Language | string | No | Card language | `"English"`, `"Japanese"` |
| Foil | boolean | No | Foil status | `"true"`, `"false"` |
| Tags | string | No | Semicolon-separated | `"Removal;Burn"` |

### Valid Values

**Condition:**
- `"Near Mint"`
- `"Lightly Played"`
- `"Moderately Played"`
- `"Heavily Played"`
- `"Damaged"`

**Language:**
- `"English"` (default)
- `"Japanese"`
- `"Chinese Simplified"`
- `"Chinese Traditional"`
- `"French"`
- `"German"`
- `"Italian"`
- `"Korean"`
- `"Portuguese"`
- `"Russian"`
- `"Spanish"`

**Foil:**
- `"true"` — Foil card
- `"false"` — Non-foil (default)

**Tags:**
- Semicolon-separated keywords
- Examples: `"Commander"`, `"Ramp;Creature"`, `"Removal;Instant"`

### Example: Commander Deck

```csv
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
1,Meren of Clan Nel Toth,Commander 2015,Near Mint,English,false,Commander
1,Sol Ring,Commander 2021,Near Mint,English,false,Ramp
1,Arcane Signet,Commander 2021,Near Mint,English,false,Ramp
1,Llanowar Elves,Magic 2010,Near Mint,English,false,Ramp;Creature
1,Eternal Witness,Modern Masters,Near Mint,English,false,Recursion;Creature
1,Viscera Seer,Commander 2013,Near Mint,English,false,Sacrifice;Creature
35,Forest,Unstable,Near Mint,English,false,Land
5,Swamp,Unstable,Near Mint,English,false,Land
```

### Example: Standard Deck with Sideboard

```csv
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
4,Monastery Swiftspear,Khans of Tarkir,Near Mint,English,false,Creature;Maindeck
4,Soul-Scar Mage,Amonkhet,Near Mint,English,false,Creature;Maindeck
4,Lightning Bolt,Magic 2010,Near Mint,English,false,Burn;Maindeck
4,Shock,Aether Revolt,Near Mint,English,false,Burn;Maindeck
20,Mountain,Unstable,Near Mint,English,false,Land;Maindeck
3,Smash to Smithereens,Kaladesh,Near Mint,English,false,Artifact Hate;Sideboard
3,Rampaging Ferocidon,Ixalan,Near Mint,English,false,Sideboard
```

**Note:** Use Tags to distinguish Maindeck vs Sideboard.

## Conversion Rules

### From Git-Probe DSL to Moxfield

#### Step 1: Parse Deck File

Read deck markdown and extract:
- Front matter (YAML)
- Card lists from sections

#### Step 2: Map Sections

| Git-Probe Section | Moxfield Section |
|-------------------|------------------|
| `## Commander` | `Commander:` |
| `## Maindeck` | `Deck:` |
| `## Sideboard` | `Sideboard:` |
| Custom sections | `Deck:` (merge all) |

#### Step 3: Format Cards

**Input:** `4x Lightning Bolt`  
**Output:** `4 Lightning Bolt`

**Input:** `4x Lightning Bolt (M10)`  
**Output:** `4 Lightning Bolt (M10) 146` (if collector # known)

**Input:** `Sol Ring` (quantity defaults to 1)  
**Output:** `1 Sol Ring`

#### Step 4: Handle Comments

Strip inline comments:

**Input:** `4x Lightning Bolt  # Core removal`  
**Output:** `4 Lightning Bolt`

#### Step 5: Generate Output

```
[Commander section if present]
Commander:
1 Commander Name

Deck:
[All maindeck cards]
[All custom section cards]

[Sideboard section if present]
Sideboard:
[All sideboard cards]
```

### From Git-Probe DSL to Archidekt

#### Step 1: Parse Deck File

Same as Moxfield conversion.

#### Step 2: Prepare CSV Structure

Initialize with headers:
```csv
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
```

#### Step 3: Map Each Card

For each card in deck:

1. **Extract quantity and name:**
   - `4x Lightning Bolt` → Quantity: `4`, Name: `"Lightning Bolt"`

2. **Determine Edition:**
   - If deck has `preferredSets: true` and card has set code: Use set code
   - If ManaBox collection has card: Use set from collection
   - Otherwise: Leave blank (Archidekt auto-detects)

3. **Set defaults:**
   - Condition: `"Near Mint"`
   - Language: `"English"`
   - Foil: `"false"`

4. **Generate Tags:**
   - Section name: `"Maindeck"`, `"Sideboard"`, `"Commander"`
   - Card type (if known): `"Creature"`, `"Instant"`, `"Land"`
   - Custom categories from comments

#### Step 4: Create CSV Rows

```csv
4,Lightning Bolt,Magic 2010,Near Mint,English,false,Burn;Maindeck
```

#### Step 5: Handle Special Cards

**Commander:**
```csv
1,Meren of Clan Nel Toth,Commander 2015,Near Mint,English,false,Commander
```

**Lands (basic):**
```csv
20,Mountain,,Near Mint,English,false,Land;Maindeck
```

### Edge Cases

**Multi-Name Cards (Double-Faced):**
- Git-Probe: `1x Delver of Secrets`
- Moxfield: `1 Delver of Secrets // Insectile Aberration`
- Archidekt: `1,Delver of Secrets // Insectile Aberration,...`

**Unknown Set Codes:**
- Moxfield: Omit set code, card name only
- Archidekt: Leave Edition blank

**Cards with Commas in Name:**
- Archidekt: Quote the name in CSV: `"Arlinn, the Pack's Hope"`

## Manual Export Process (MVP)

### Exporting to Moxfield

**Via Copilot (Recommended):**

> "Export decks/meren-edh.md to Moxfield format"

Copilot will:
1. Parse the deck file
2. Convert to Moxfield text format
3. Display output for copy-paste

**Manual Steps:**

1. Open deck file in editor
2. Copy front matter commander to `Commander:` section
3. Copy all `## Maindeck` cards to `Deck:` section
4. Convert quantity format: `4x Card` → `4 Card`
5. Strip comments
6. Copy to Moxfield import page

### Exporting to Archidekt

**Via Copilot (Recommended):**

> "Export decks/meren-edh.md to Archidekt CSV"

Copilot will:
1. Parse the deck file
2. Generate CSV with headers
3. Save as `deck-name-archidekt.csv`

**Manual Steps:**

1. Create CSV file with headers
2. For each card in deck:
   - Add row: `quantity,name,,,English,false,Maindeck`
3. Save as `deck-name.csv`
4. Import to Archidekt

## Automated Export (Future)

### TypeScript Export Scripts

**Target:** `scripts/src/export-moxfield.ts`

```typescript
import { parseDeck } from './deck-parser';
import fs from 'fs';

interface MoxfieldExport {
  companion?: string;
  commander?: string[];
  deck: string[];
  sideboard?: string[];
}

export function exportToMoxfield(deckPath: string): string {
  const deck = parseDeck(deckPath);
  const output: MoxfieldExport = {
    deck: []
  };

  // Map sections
  if (deck.metadata.commander) {
    output.commander = [deck.metadata.commander];
  }

  // Convert cards
  for (const section of deck.sections) {
    if (section.name === 'Commander') {
      output.commander = section.cards.map(formatCard);
    } else if (section.name === 'Sideboard') {
      output.sideboard = section.cards.map(formatCard);
    } else {
      output.deck.push(...section.cards.map(formatCard));
    }
  }

  return formatMoxfieldOutput(output);
}

function formatCard(card: Card): string {
  let line = `${card.quantity} ${card.name}`;
  if (card.setCode) {
    line += ` (${card.setCode})`;
    if (card.collectorNumber) {
      line += ` ${card.collectorNumber}`;
    }
  }
  return line;
}
```

**CLI Usage:**
```bash
npm run export:moxfield decks/meren-edh.md
# Output: decks/meren-edh-moxfield.txt
```

**Target:** `scripts/src/export-archidekt.ts`

Similar structure, generating CSV instead of text.

## Testing Exports

### Validation Checklist

Before importing to platforms:

**Moxfield:**
- [ ] Commander section present for EDH decks
- [ ] Card names match exactly (case-sensitive)
- [ ] Set codes are valid (if included)
- [ ] No duplicate entries
- [ ] Quantity format is correct (`4 Card`, not `4x Card`)

**Archidekt:**
- [ ] CSV headers match exactly
- [ ] No syntax errors in CSV
- [ ] Card names with commas are quoted
- [ ] Tags help distinguish sections
- [ ] Edition names are valid (or blank)

### Test Import

1. **Generate export**
2. **Import to platform**
3. **Verify card count**
4. **Check for errors/warnings**
5. **Compare to original deck**
6. **Fix any mismatches**

### Common Issues

**Moxfield:**
- ❌ Card not found → Check spelling
- ❌ Duplicate commander → Only include in Commander section, not Deck
- ❌ Invalid set code → Use full set name or omit

**Archidekt:**
- ❌ CSV parse error → Check for unquoted commas
- ❌ Card not recognized → Verify exact name from Scryfall
- ❌ Missing tags → Add Tags column even if empty

## Round-Trip Conversion

### Export → Import → Export

To verify conversion accuracy:

1. **Export Git-Probe deck to Moxfield**
2. **Import to Moxfield**
3. **Export from Moxfield**
4. **Compare to original**

Differences indicate conversion issues or platform normalization.

### Preserving Information

**Information Preserved:**
- Card names
- Quantities
- Set codes (if included)
- Sideboard/Maindeck distinction

**Information Lost:**
- Inline comments
- Custom section names (merged to Deck)
- Front matter metadata (tags, description)
- Card organization/grouping

**Workaround:** Keep original Git-Probe file as source of truth.

## Platform-Specific Notes

### Moxfield

**Advantages:**
- Simple text format
- Easy copy-paste
- Good Commander support

**Limitations:**
- No metadata import
- Limited section support
- Set codes optional

**Best For:**
- Quick deck sharing
- Commander decks
- Simple exports

### Archidekt

**Advantages:**
- Rich metadata (tags, condition, language)
- CSV structure allows automation
- Edition tracking

**Limitations:**
- More complex format
- Requires CSV generation
- Harder to do manually

**Best For:**
- Collection integration
- Detailed deck metadata
- Bulk imports

## Future Enhancements

### Planned Features

1. **Bulk Export** — Export all decks at once
2. **Collection Mapping** — Auto-populate Edition from ManaBox CSV
3. **Foil Detection** — Mark foils based on collection
4. **Price Integration** — Include purchase prices in Archidekt export
5. **Reverse Import** — Import from Moxfield/Archidekt to Git-Probe DSL

### Integration Ideas

- **GitHub Actions** — Auto-export on deck commits
- **VS Code Extension** — One-click export from editor
- **Watch Mode** — Auto-regenerate exports on save
- **Validation** — Pre-check exports before generating

---

**For deck format specification, see [`docs/deck-dsl.md`](deck-dsl.md)**  
**For collection usage, see [`docs/collection-usage.md`](collection-usage.md)**  
**For complete project documentation, see [`docs/plan.md`](plan.md)**
