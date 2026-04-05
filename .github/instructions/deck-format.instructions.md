---
applyTo: "decks/**/*.md"
---

# Deck File Format

Deck files are Markdown with YAML front matter.

## Structure

```yaml
---
name: "Deck Name"           # Required
format: "Commander"          # Required (Standard, Modern, Commander, etc.)
commander: "Card Name"       # Optional (for Commander)
colors: ["B", "G"]          # Optional (W, U, B, R, G)
description: "Brief text"   # Optional
---

## Maindeck
4x Lightning Bolt
3x Counterspell
20x Island

## Sideboard
3x Surgical Extraction

## Maybeboard
2x Force of Will  # Considering
```

## Card Syntax

All valid:
- `4x Lightning Bolt` (preferred)
- `4 Lightning Bolt`
- `Lightning Bolt x4`

Single card: `1x Sol Ring` or just `Sol Ring`

With set codes (optional): `4x Lightning Bolt (M10)`

Comments: Use `#` for notes

## Sections

- `## Maindeck` — Required
- `## Sideboard` — Optional
- `## Maybeboard` — Optional
- `## Commander` — Optional (alternative to front matter)
- Custom sections allowed (e.g., `## Creatures`, `## Lands`)

## Multi-File Decks

Complex decks can split across files in a directory:
```
decks/my-deck/
  main.md       # Front matter + maindeck
  sideboard.md  # Sideboard cards
  maybeboard.md # Cards under consideration
```

## When Creating Decks

1. Start with front matter (copy from examples)
2. Add required fields: name, format
3. Create `## Maindeck` section
4. Use clear comments for reasoning
5. Commit with: `feat(deck): add [deck name]`

See `decks/examples/` for reference.
