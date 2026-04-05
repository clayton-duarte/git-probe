---
applyTo: "ManaBox_Collection.csv"
---

# Collection Query Patterns

`ManaBox_Collection.csv` is a 17-column CSV export. **Never edit this file** - it's read-only, user-managed.

## CSV Schema

Columns (1-indexed):
1. Binder Name
2. Binder Type
3. Name (card name)
4. Set code
5. Set name
6. Collector number
7. Foil ("normal" or "foil")
8. Rarity
9. Quantity (integer)
10. ManaBox ID
11. Scryfall ID
12. Purchase price
13. Misprint
14. Altered
15. Condition
16. Language
17. Purchase price currency

## Query Examples

**Find cards from specific set:**
```bash
grep ",TDM," ManaBox_Collection.csv | awk -F',' '{print $3, "x" $9}'
```

**Search for card (case-insensitive):**
```bash
grep -i "lightning bolt" ManaBox_Collection.csv
```

**Find all foils:**
```bash
grep ",foil," ManaBox_Collection.csv | awk -F',' '{print $3, "(" $5 ")"}'
```

**Count cards by rarity:**
```bash
awk -F',' 'NR>1 {print $8}' ManaBox_Collection.csv | sort | uniq -c
```

**Cards in specific binder:**
```bash
grep "^goods," ManaBox_Collection.csv | awk -F',' '{print $3}'
```

**Total unique cards:**
```bash
tail -n +2 ManaBox_Collection.csv | wc -l
```

**Total quantity sum:**
```bash
awk -F',' 'NR>1 {sum += $9} END {print sum}' ManaBox_Collection.csv
```

## Comparing Deck to Collection

1. Extract card names from deck file (use deck-format instructions)
2. For each card, grep collection CSV (case-insensitive)
3. Report owned vs missing
4. Format:
   - ✅ OWNED: Card name (set) - Qty: X in "binder"
   - ❌ MISSING: Card name

## Git Tracking Collection Updates

When user updates CSV:
```bash
git diff ManaBox_Collection.csv  # Review changes
git add ManaBox_Collection.csv
git commit -m "chore(collection): update from ManaBox export on $(date +%Y-%m-%d)"
```
