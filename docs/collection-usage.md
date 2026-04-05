# ManaBox Collection Usage Guide

**Version:** 1.0.0  
**Last Updated:** April 5, 2026

## Overview

Git-Probe uses your ManaBox CSV export as the source-of-truth for your Magic: The Gathering collection. This document explains the CSV schema, how to query your collection, and best practices for tracking collection changes over time.

## ManaBox CSV Schema

### File Location

**Path:** `ManaBox_Collection.csv` (repository root)

**Update Process:**
1. Export CSV from ManaBox app
2. Replace existing `ManaBox_Collection.csv`
3. Commit with descriptive message (see Git Workflow section)

### Column Specifications

The ManaBox export contains **17 columns** with the following structure:

| # | Column Name | Type | Description | Example |
|---|-------------|------|-------------|---------|
| 1 | Binder Name | string | Physical storage location | `"goods"` |
| 2 | Binder Type | string | Container type | `"binder"`, `"box"` |
| 3 | Name | string | Card name | `"Lightning Bolt"` |
| 4 | Set code | string | 3-4 letter set identifier | `"TDM"`, `"M10"` |
| 5 | Set name | string | Full set name | `"Tarkir: Dragonstorm"` |
| 6 | Collector number | string | Card number in set | `"99"`, `"263"` |
| 7 | Foil | string | Foil status | `"normal"`, `"foil"` |
| 8 | Rarity | string | Card rarity | `"common"`, `"uncommon"`, `"rare"`, `"mythic"` |
| 9 | Quantity | integer | Number of copies | `1`, `4`, etc. |
| 10 | ManaBox ID | string | Internal ManaBox identifier | `"104883"` |
| 11 | Scryfall ID | string | UUID from Scryfall | `"adc18edc-01d8-4a7e-a87b-a854e50aa75e"` |
| 12 | Purchase price | decimal | Price paid | `0.41`, `11.75` |
| 13 | Misprint | boolean | Misprint status | `"true"`, `"false"` |
| 14 | Altered | boolean | Altered card | `"true"`, `"false"` |
| 15 | Condition | string | Card condition | `"near_mint"`, `"lightly_played"`, etc. |
| 16 | Language | string | 2-letter language code | `"en"`, `"jp"` |
| 17 | Purchase price currency | string | Currency code | `"CAD"`, `"USD"` |

### Example Row

```csv
goods,binder,Rot-Curse Rakshasa,TDM,Tarkir: Dragonstorm,87,normal,mythic,1,104531,31276460-fa9d-47da-85c5-c4baa8074d0d,11.75,false,false,near_mint,en,CAD
```

**Parsed:**
- Binder: "goods" (binder type)
- Card: "Rot-Curse Rakshasa"
- Set: TDM (Tarkir: Dragonstorm)
- Collector #: 87
- Foil: normal
- Rarity: mythic
- Quantity: 1
- Purchase Price: $11.75 CAD

## Querying Your Collection

### Manual Queries (MVP)

Use standard Unix tools to query the CSV:

#### Find Cards from a Specific Set

```bash
# All cards from Tarkir Dragonstorm (TDM)
grep ",TDM," ManaBox_Collection.csv

# With formatted output
grep ",TDM," ManaBox_Collection.csv | awk -F',' '{print $3, "(" $6 ") x" $9}'
```

**Output:**
```
Worthy Cost (99) x1
Nomad Outpost (263) x1
Shock Brigade (120) x1
...
```

#### Search for Specific Card

```bash
# Case-insensitive search
grep -i "lightning bolt" ManaBox_Collection.csv

# Multiple cards
grep -iE "lightning bolt|counterspell|sol ring" ManaBox_Collection.csv
```

#### Find All Foils

```bash
# All foil cards
grep ",foil," ManaBox_Collection.csv | awk -F',' '{print $3, "(" $5 ")"}'
```

#### Count Cards by Rarity

```bash
# Count mythics
grep ",mythic," ManaBox_Collection.csv | wc -l

# Distribution by rarity
awk -F',' 'NR>1 {print $8}' ManaBox_Collection.csv | sort | uniq -c
```

**Output:**
```
  45 common
  28 uncommon
  12 rare
   3 mythic
```

#### Find Most Expensive Cards

```bash
# Sort by purchase price (column 12)
awk -F',' 'NR>1 {print $12, $3, $17}' ManaBox_Collection.csv | sort -rn | head -10
```

**Output:**
```
11.75 Rot-Curse Rakshasa CAD
1.11 Avenger of the Fallen CAD
0.92 Bloomvine Regent CAD
...
```

#### Find Cards in Specific Binder

```bash
# All cards in "goods" binder
grep "^goods," ManaBox_Collection.csv | awk -F',' '{print $3}'
```

#### Total Card Count

```bash
# Total unique cards (minus header)
tail -n +2 ManaBox_Collection.csv | wc -l

# Total quantity (sum column 9)
awk -F',' 'NR>1 {sum += $9} END {print sum}' ManaBox_Collection.csv
```

### Using Copilot for Queries

Ask Copilot in natural language:

**Examples:**

> "What cards do I have from Tarkir Dragonstorm?"

> "Do I own any Lightning Bolts?"

> "Show me all my foil cards"

> "Which cards did I pay more than $10 for?"

> "How many mythic rares do I own?"

Copilot will use the grep/awk patterns above to answer.

## Collection Comparison Workflows

### Comparing a Deck to Your Collection

**Goal:** Identify which cards from a deck you own and which you need to acquire.

**Manual Process:**

1. **Extract card names from deck:**
```bash
# From deck file
grep '^[0-9]' decks/my-deck.md | sed 's/^[0-9]*x* //' | sed 's/ *#.*//'
```

2. **Check each card in collection:**
```bash
# For specific card
grep -i "Sol Ring" ManaBox_Collection.csv
```

3. **Compare quantities:**
   - Deck needs: 1x Sol Ring
   - Collection has: 0x Sol Ring
   - Status: MISSING

**Using Copilot:**

> "Compare decks/meren-edh.md to my collection"

Copilot will:
1. Parse deck file
2. Query collection CSV for each card
3. Report owned vs missing cards
4. Optionally query Scryfall for missing card prices

**Example Output:**
```
Analyzing Meren Reanimator (100 cards)...

✅ OWNED (23 cards):
- Sol Ring (C21) - Qty: 1 in "goods" binder
- Llanowar Elves - Qty: 3 in "goods" binder
  (Need 1, have 3 - ✓ sufficient)
...

❌ MISSING (77 cards):
- Meren of Clan Nel Toth
- Phyrexian Arena
- Survival of the Fittest
...

Summary:
- You own 23% of this deck (23/100 cards)
- Missing 77 cards
- Estimated cost for missing cards: ~$XXX (query Scryfall?)
```

### Finding Duplicates

```bash
# Cards owned in multiple quantities
awk -F',' '$9 > 1 {print $9, $3}' ManaBox_Collection.csv | sort -rn
```

### Checking Format Legality

Cross-reference with Scryfall:

```bash
# Check if card is legal in Commander
curl -s "https://api.scryfall.com/cards/named?exact=Black+Lotus" | \
  jq '.legalities.commander'
```

**Output:** `"banned"`

## Git Workflow for Collection Tracking

### Updating Your Collection

**When you update your collection in ManaBox:**

1. **Export new CSV from ManaBox**
2. **Replace file in repo:**
   ```bash
   # Overwrite existing file
   cp ~/Downloads/ManaBox_Collection.csv .
   ```

3. **Review changes:**
   ```bash
   git diff ManaBox_Collection.csv
   ```
   
4. **Commit with semantic message:**
   ```bash
   git add ManaBox_Collection.csv
   git commit -m "chore(collection): update from ManaBox export on 2026-04-05"
   ```

5. **Push to remote:**
   ```bash
   git push
   ```

### Viewing Collection History

**See what changed between versions:**

```bash
# Compare to previous commit
git diff HEAD~1 ManaBox_Collection.csv

# Compare to specific date
git diff @{2026-04-01} ManaBox_Collection.csv

# Show all commits affecting collection
git log --oneline -- ManaBox_Collection.csv
```

**Example output:**
```
a1b2c3d chore(collection): update from ManaBox export on 2026-04-05
e4f5g6h chore(collection): update from ManaBox export on 2026-03-28
i7j8k9l chore(collection): initial collection import
```

### Finding What You Added

```bash
# Cards added in last update
git diff HEAD~1 ManaBox_Collection.csv | grep '^+' | grep -v '^+++'
```

### Finding What You Removed

```bash
# Cards removed/traded away
git diff HEAD~1 ManaBox_Collection.csv | grep '^-' | grep -v '^---'
```

### Viewing Collection at Specific Date

```bash
# Show collection as of March 1, 2026
git show @{2026-03-01}:ManaBox_Collection.csv
```

## Common Use Cases

### 1. "Did I own this card before?"

```bash
# Search git history for card name
git log -p -- ManaBox_Collection.csv | grep -i "Birds of Paradise"
```

If found in removed lines (`-`), you previously owned it.

### 2. "When did I acquire this card?"

```bash
# Find first commit containing card
git log --all --source --full-history -S "Mana Crypt" -- ManaBox_Collection.csv
```

### 3. "What's the most valuable card I own?"

Manual approach (see queries above):
```bash
awk -F',' 'NR>1 {print $12, $3, $17}' ManaBox_Collection.csv | sort -rn | head -1
```

Or ask Copilot:
> "What's my most expensive card?"

### 4. "Show me cards I haven't used in any deck"

This requires comparing collection against all deck files:

```bash
# Extract all cards from decks
grep -h '^[0-9]' decks/**/*.md | \
  sed 's/^[0-9]*x* //' | sed 's/ *#.*//' | \
  sort -u > /tmp/deck_cards.txt

# Find collection cards not in any deck
awk -F',' 'NR>1 {print $3}' ManaBox_Collection.csv | \
  sort -u | comm -23 - /tmp/deck_cards.txt
```

Or ask Copilot:
> "Which cards from my collection aren't in any deck?"

### 5. "What decks can I build with my collection?"

This is complex; ask Copilot:

> "Analyze my collection and suggest possible deck archetypes"

Copilot will:
1. Parse collection
2. Identify card synergies
3. Suggest deck ideas based on owned cards

## Best Practices

### Collection Management

**Do:**
- ✅ Update collection regularly (weekly/monthly)
- ✅ Commit every update with date in message
- ✅ Keep CSV in root of repository
- ✅ Use ManaBox as single source of truth

**Don't:**
- ❌ Edit CSV file directly (use ManaBox app)
- ❌ Rename the CSV file
- ❌ Store multiple collection CSVs
- ❌ Track cache files or temporary exports

### Commit Messages

**Good:**
```bash
git commit -m "chore(collection): update from ManaBox export on 2026-04-05"
git commit -m "chore(collection): add Tarkir Dragonstorm cards"
git commit -m "chore(collection): remove traded cards"
```

**Bad:**
```bash
git commit -m "updated"
git commit -m "collection"
git commit -m "csv changes"
```

### Performance Tips

For large collections (1000+ cards):

1. **Use indexed searches:**
   ```bash
   # Faster than grep for repeated queries
   awk 'BEGIN {FS=","} NR>1 {cards[$3]=$0} END {print cards["Sol Ring"]}' ManaBox_Collection.csv
   ```

2. **Build temporary indices:**
   ```bash
   # Create set index
   awk -F',' 'NR>1 {print $4}' ManaBox_Collection.csv | sort -u > sets.txt
   ```

3. **Use Git sparse checkout** if collection CSV is very large

### Future Automation

**Post-MVP features to consider:**
- `scripts/collection-diff.ts` — Show what changed between versions
- `scripts/collection-stats.ts` — Generate statistics (total value, rarity distribution)
- `scripts/find-unused.ts` — Find cards not in any deck
- `scripts/suggest-decks.ts` — Recommend decks based on collection

## Scryfall Integration

For real-time data not in ManaBox CSV:

### Get Current Price

```bash
curl -s "https://api.scryfall.com/cards/named?exact=Mana+Crypt" | \
  jq '{name: .name, usd: .prices.usd, usd_foil: .prices.usd_foil}'
```

### Bulk Price Lookup

```bash
# Extract card names
awk -F',' 'NR>1 {print $3}' ManaBox_Collection.csv > cardnames.txt

# Query Scryfall (with rate limiting)
while read card; do
  curl -s "https://api.scryfall.com/cards/named?fuzzy=$card" | \
    jq -r '.prices.usd'
  sleep 0.1  # Rate limit: 10 req/sec
done < cardnames.txt
```

**Note:** This is slow for large collections. Consider building a local cache in post-MVP.

## Troubleshooting

### CSV Parsing Issues

**Problem:** Card names with commas break parsing

**Solution:** ManaBox escapes commas in quotes:
```csv
goods,binder,"Arlinn, the Pack's Hope",VOW,...
```

Use proper CSV parser:
```bash
# Python
python3 -c "import csv; print([row for row in csv.reader(open('ManaBox_Collection.csv'))])"

# Or jq with @csv
```

### Encoding Issues

**Problem:** Special characters display incorrectly

**Solution:** Ensure UTF-8 encoding:
```bash
file -I ManaBox_Collection.csv
iconv -f ISO-8859-1 -t UTF-8 ManaBox_Collection.csv > fixed.csv
```

### Git Diff Too Large

**Problem:** Collection CSV creates huge diffs

**Solution:** Use Git's word-diff:
```bash
git diff --word-diff=color ManaBox_Collection.csv
```

Or diff specific columns:
```bash
git diff HEAD~1 -- ManaBox_Collection.csv | \
  grep '^[+-]' | awk -F',' '{print $3, $9}'
```

---

**For export formats, see [`docs/export-formats.md`](export-formats.md)**  
**For deck DSL specification, see [`docs/deck-dsl.md`](deck-dsl.md)**  
**For complete project documentation, see [`docs/plan.md`](plan.md)**
