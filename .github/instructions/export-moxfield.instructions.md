---
applyTo: '**'
---

# Export to Moxfield Format

## Format Structure

```
Commander:
1 Commander Name

Deck:
4 Card Name
3 Another Card

Sideboard:
2 Sideboard Card
```

## Rules

- One card per line: `quantity cardname`
- Quantity without 'x': `4 Lightning Bolt` not `4x`
- Commander in separate section
- Optional set codes: `1 Sol Ring (C21) 263`

## Conversion Steps

1. Read deck file (use deck-format instructions)
2. Extract front matter commander → `Commander:` section
3. Extract `## Maindeck` cards → `Deck:` section
4. Extract `## Sideboard` cards → `Sideboard:` section
5. Convert quantity format: `4x Card` → `4 Card`
6. Strip inline comments

## Special Cases

**Double-faced cards:**
```
1 Delver of Secrets // Insectile Aberration
```

**Split cards:**
```
1 Fire // Ice
```

## Output

Display formatted text for user to copy-paste to Moxfield's import page.
