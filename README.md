# Git-Probe

**A version-controlled, AI-augmented knowledge base for Magic: The Gathering collection management and deck construction.**

Git-Probe treats your repository as a database: your ManaBox collection export is the source of truth, deck ideas live as markdown files, and Git tracks every change. Designed to be operated primarily through VS Code Copilot, enabling natural language queries like "Compare this deck to my collection" or "Show me all my cards from Tarkir Dragonstorm."

## Philosophy

- **Repo-as-Database** — Filesystem is the primary data store (CSV, MD, JSON)
- **Agent-Centric** — Operate via VS Code Copilot/Chat for natural interaction
- **Documentation-First** — Comprehensive specs enable incremental automation
- **Growth-Oriented** — Start simple with text files, evolve as needs arise

## Quick Start

1. **Drop your collection** — Export CSV from ManaBox, save as `ManaBox_Collection.csv` in the repo root
2. **Create decks** — Use the deck DSL (see `decks/examples/`) to create markdown deck files
3. **Ask Copilot** — "Compare my Golgari deck to my collection" or "Export this deck to Moxfield format"

## Current State (MVP)

The MVP focuses on **documentation and specifications** rather than automation:

- ✅ Comprehensive project plan and design decisions
- ✅ Complete deck DSL specification with examples  
- ✅ AI agent instructions for Copilot integration
- ✅ ManaBox CSV schema documentation
- ✅ Moxfield/Archidekt export format specs
- ⏳ Scripts and tooling (built incrementally as needed)

## Documentation

- [`docs/plan.md`](docs/plan.md) — Complete project plan and roadmap
- [`docs/deck-dsl.md`](docs/deck-dsl.md) — Deck format specification
- [`docs/collection-usage.md`](docs/collection-usage.md) — Working with your collection
- [`docs/export-formats.md`](docs/export-formats.md) — Export to Moxfield/Archidekt
- [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — AI agent guidelines

## Example Workflows

**Create a Commander deck:**
```
Ask Copilot: "Create a Golgari Commander deck with Meren of Clan Nel Toth as commander"
```

**Compare deck to collection:**
```
Ask Copilot: "Which cards from decks/my-deck.md do I own?"
```

**Export to Moxfield:**
```
Ask Copilot: "Export decks/my-deck.md to Moxfield format"
```

## Contributing

Deck ideas, DSL improvements, and automation scripts welcome! Follow semantic commit format: `<type>(<scope>): <message>`

## License

MIT
