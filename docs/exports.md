# Exporting Decks

Export your decks to popular deck-building platforms.

## Why Export?

- **Test online** - Playtest on Moxfield/Archidekt
- **Share with friends** - Send them the import text
- **Price check** - See total deck value
- **Alternative interface** - Use their features (recommendations, goldfishing)

## Exporting to Moxfield

Moxfield uses a text format.

### How to Export

Ask Copilot: `Export decks/my-deck.md to Moxfield format`

Copilot will:
1. Read your deck file
2. Convert to Moxfield text format
3. Display the output
4. You copy-paste to Moxfield

### Moxfield Import Steps

1. Go to [Moxfield.com](https://moxfield.com)
2. Click "Add Deck" → "Import"
3. Paste the text Copilot provided
4. Click "Import"

### What Gets Converted

- **Front matter commander** → `Commander:` section
- **`## Maindeck`** → `Deck:` section
- **`## Sideboard`** → `Sideboard:` section
- **Quantity format** → `4x Card` becomes `4 Card`

### Example Output

```
Commander:
1 Meren of Clan Nel Toth

Deck:
1 Sol Ring
1 Arcane Signet
...

Sideboard:
3 Duress
```

## Exporting to Archidekt

Archidekt uses a CSV format.

### How to Export

Ask Copilot: `Export decks/my-deck.md to Archidekt CSV`

Copilot will:
1. Read your deck file
2. Convert to CSV with proper columns
3. Save as `deck-name-archidekt.csv`
4. You upload to Archidekt

### Archidekt Import Steps

1. Go to [Archidekt.com](https://archidekt.com)
2. Create new deck or edit existing
3. Click "Import" → "CSV"
4. Upload the generated CSV file

### What Gets Converted

- **Each card** → Row in CSV
- **Section names** → Tags column
- **Quantity** → Quantity column
- **Defaults** → Near Mint, English, not foil

### Example Output

```csv
Quantity,Card Name,Edition,Condition,Language,Foil,Tags
1,Meren of Clan Nel Toth,,Near Mint,English,false,Commander
1,Sol Ring,,Near Mint,English,false,Maindeck
```

## Common Export Scenarios

### "I want to test this deck online"

1. Ask: `Export decks/my-deck.md to Moxfield`
2. Copy the output
3. Import to Moxfield
4. Use their goldfish feature

### "I want to see total deck price"

1. Ask: `Export decks/my-deck.md to Moxfield`
2. Import to Moxfield
3. Moxfield shows total price automatically

Or ask directly: `What's the total price of decks/my-deck.md?`

### "I want to share this deck"

Export to either platform, then share the Moxfield/Archidekt link.

## Format Differences

| Feature | Moxfield | Archidekt |
|---------|----------|-----------|
| Format | Text | CSV |
| Import | Copy-paste | File upload |
| Commander section | Separate | Tag column |
| Set codes | Optional | Ignored (auto-detect) |
| Comments | Stripped | Not supported |

## Tips

- **Moxfield for quick sharing** - Text format is faster
- **Archidekt for organization** - CSV preserves more metadata
- **Both are free** - Try each and see which you prefer
- **Re-export easily** - Just ask Copilot again when deck changes

## Troubleshooting

### "Card names not recognized"

Some cards have special characters or formatting:
- **Double-faced cards:** `Delver of Secrets // Insectile Aberration`
- **Split cards:** `Fire // Ice`
- **Commas in names:** Wrapped in quotes in CSV

Copilot handles these automatically.

### "Import failed on platform"

1. Check the exported format matches platform
2. Look for special characters in card names
3. Verify all sections are properly formatted
4. Ask Copilot to regenerate the export

### "Missing card in export"

Make sure the card syntax in your deck file is correct:
- ✅ `4x Lightning Bolt`
- ✅ `4 Lightning Bolt`
- ❌ `Lightning Bolt (no quantity)`
