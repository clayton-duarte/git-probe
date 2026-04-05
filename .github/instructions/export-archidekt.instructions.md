# Export to Archidekt CSV Format

Convert deck files to Archidekt CSV import format.

## CSV Structure

**Headers:**
```csv
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
```

## Column Defaults

- Condition: `"Near Mint"`
- Language: `"English"`
- Foil: `"false"`
- Edition: Blank (Archidekt auto-detects)
- Tags: Section name (e.g., `"Maindeck"`, `"Sideboard"`, `"Commander"`)

## Example Output

```csv
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
1,Meren of Clan Nel Toth,,Near Mint,English,false,Commander
4,Llanowar Elves,,Near Mint,English,false,Maindeck;Creature
20,Forest,,Near Mint,English,false,Maindeck;Land
3,Duress,,Near Mint,English,false,Sideboard
```

## Conversion Steps

1. Read deck file (use deck-format instructions)
2. Create CSV with headers
3. For each card:
   - Extract quantity and name
   - Set tag = section name
   - Use defaults for other fields
4. Save as `deck-name-archidekt.csv`

## Special Cases

**Card names with commas:**
Quote the name: `"Arlinn, the Pack's Hope"`

**Multi-tags:**
Semicolon-separated: `"Ramp;Creature"`
