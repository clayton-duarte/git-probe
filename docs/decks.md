# Creating and Managing Decks

Decks are Markdown files in the `decks/` folder with a specific structure.

## Creating Your First Deck

### 1. Ask Copilot

Simply say: `Create a Commander deck with Meren of Clan Nel Toth`

Copilot will:
- Create the file with proper structure
- Add YAML frontmatter
- Set up sections
- Suggest staple cards

### 2. Manual Creation

Create `decks/my-deck.md`:

```yaml
---
name: "My Deck Name"
format: "Commander"
commander: "Meren of Clan Nel Toth"
colors: ["B", "G"]
description: "Graveyard recursion strategy"
---

## Maindeck
1x Sol Ring
1x Arcane Signet
1x Llanowar Elves
...
```

## Deck Structure

Every deck has:
- **YAML frontmatter** - Metadata (name, format, commander)
- **Maindeck section** - Main 60/99 cards
- **Optional sections** - Sideboard, Maybeboard, etc.

### Card Syntax

All of these work:
```markdown
4x Lightning Bolt    # Preferred
4 Lightning Bolt     # Also fine
Lightning Bolt x4    # Also fine
```

### Adding Comments

Use `#` for notes:
```markdown
4x Lightning Bolt  # Core removal spell
3x Shock  # TODO: Replace with more Bolts
```

## Editing Decks

### Swapping Cards

Just edit the file directly or ask Copilot:
- `Replace Shock with Lightning Bolt in my deck`
- `Add 2 more lands to the deck`
- `Remove the equipment package`

### Checking What You Own

Ask: `Which cards from this deck do I own?`

Copilot will compare to your collection and show:
- ✅ Owned cards (with quantities)
- ❌ Missing cards
- Completion percentage

## Organizing Decks

### Simple Decks
One file: `decks/burn.md`

### Complex Decks
Multiple files in a folder:
```
decks/commander-deck/
  main.md        # Front matter + maindeck
  sideboard.md   # Additional cards
  maybeboard.md  # Cards under consideration
```

**Why split files?**
- Organize large decks
- Separate what's in deck vs considering
- Easier to review specific sections

## Git Workflow

### Creating a Deck
```bash
git add decks/my-new-deck.md
git commit -m "feat(deck): add Golgari Midrange"
```

### Updating a Deck
```bash
git add decks/my-deck.md
git commit -m "refactor(deck): swap removal suite"
```

### See Deck History
```bash
# See all changes to this deck
git log --oneline decks/my-deck.md

# See what changed last time
git diff HEAD~1 decks/my-deck.md
```

## Examples

Check `decks/examples/` for:
- **simple-deck.md** - Red Deck Wins (60-card format)
- **commander-deck.md** - Meren EDH (100-card singleton)
- **multi-file-deck/** - Golgari Midrange (split across files)

## Common Workflows

### "Build a deck from cards I own"

1. Ask: `Show me all my red cards`
2. Review the list
3. Ask: `Create a red deck using these cards`
4. Copilot will build a deck using your collection

### "Test a decklist before buying cards"

1. Create the deck file
2. Ask: `Compare this deck to my collection`
3. See what you need to buy
4. Ask: `What's the price of missing cards?`
5. Copilot will query Scryfall for prices

### "Perfect a deck over time"

1. Create initial version
2. Commit it
3. Test and adjust
4. Commit changes with notes
5. Use `git log` to see evolution
