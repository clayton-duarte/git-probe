# Working with Your Collection

Your Magic collection is stored in `ManaBox_Collection.csv` at the repository root.

## How It Works

1. **Manage collection in ManaBox app** - Add/remove cards, organize binders
2. **Export to CSV** - Use ManaBox's export feature
3. **Replace the file** - Drop new CSV in repo root (overwrite old one)
4. **Commit the change** - Git tracks what changed

## Updating Your Collection

When you've made changes in ManaBox:

```bash
# Review what changed
git diff ManaBox_Collection.csv

# Commit the update
git add ManaBox_Collection.csv
git commit -m "chore(collection): update from ManaBox export on 2026-04-05"
```

**Why track in Git?**
- See what cards you added/removed over time
- Revert mistakes
- Historical record of your collection
- Free backup

## Common Questions via Copilot

### "Do I own this card?"

Ask: `Do I have Lightning Bolt in my collection?`

Copilot will search the CSV and tell you:
- How many copies
- Which set(s)
- Which binder(s)
- Foil or normal

### "Show me cards from this set"

Ask: `Show me all my cards from Tarkir Dragonstorm`

Copilot will list your cards from that set with quantities.

### "Which cards in this deck do I own?"

Ask: `Compare decks/my-deck.md to my collection`

Copilot will:
- List owned cards (with quantities and locations)
- List missing cards
- Show completion percentage

### "What's the most expensive card I own?"

Ask: `What cards in my collection are worth the most?`

Copilot will query Scryfall for current prices and identify your valuable cards.

## Collection Insights

### See your collection grow over time

```bash
# See collection updates
git log --oneline ManaBox_Collection.csv

# See what changed in last update
git diff HEAD~1 ManaBox_Collection.csv
```

### Find specific cards

Ask Copilot:
- `Show me all foils in my collection`
- `What mythics do I have?`
- `Show me cards in my 'trade' binder`

## Tips

- **Update regularly** - Export from ManaBox after each session
- **Use meaningful binders** - Organize by purpose (deck, trade, bulk, etc.)
- **Commit often** - Track changes as they happen
- **Ask Copilot naturally** - It understands plain English questions
