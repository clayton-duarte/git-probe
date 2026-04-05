# Git-Probe

**A version-controlled, AI-augmented knowledge base for Magic: The Gathering collection management and deck construction.**

> Named after [Gitaxian Probe](https://scryfall.com/card/nph/35/gitaxian-probe), the iconic MTG card: "Look at target player's hand. Draw a card." Here, you look at your collection, discover new cards, and track everything with Git.

Git-Probe treats your repository as a database: your ManaBox collection export is the source of truth, deck ideas live as `.mtg` files, and Git tracks every change. Designed to be operated primarily through VS Code Copilot and a custom VSCode extension, enabling natural language queries like "Compare this deck to my collection" or "Find cheap token creators in Naya colors."

## Philosophy

- **Repo-as-Database** — Filesystem is the primary data store (CSV, MD, JSON)
- **Agent-Centric** — Operate via VS Code Copilot/Chat for natural interaction
- **Documentation-First** — Comprehensive specs enable incremental automation
- **Growth-Oriented** — Start simple with text files, evolve as needs arise

## Quick Start

1. **Drop your collection** — Export CSV from ManaBox, save as `ManaBox_Collection.csv` in the repo root
2. **Create decks** — Use the `.mtg` file format (see [`decks/examples/`](decks/examples/)) with YAML frontmatter and deck sections
3. **Ask Copilot** — "Compare my Baylen deck to my collection" or "Export this deck to Moxfield format"
4. **Install extension** (coming soon) — Enhanced `.mtg` syntax highlighting, hover providers, and Scryfall integration

## Current State

**Phase 1: Documentation & Specifications** ✅
- ✅ Comprehensive project plan and philosophy
- ✅ Complete `.mtg` deck format specification with examples  
- ✅ AI agent instructions split by domain (deck format, collection, exports, Scryfall)
- ✅ ManaBox CSV schema documentation
- ✅ Moxfield/Archidekt export format specs
- ✅ Scryfall API integration patterns and search strategies
- ✅ Real-world deck building validation (Baylen token deck example)

**Phase 2: VSCode Extension** 🚧
- 📋 Extension plan documented ([`docs/extension-plan.md`](docs/extension-plan.md))
- ⏳ Language support for `.mtg` files (syntax highlighting, hover, autocomplete)
- ⏳ Scryfall search integration with file-based search results
- ⏳ Collection ownership markers in search results
- ⏳ AI-assisted card evaluation and deck building workflows

## Documentation

**User Guides** (`docs/`) — Philosophy and how-to guides:
- [`docs/plan.md`](docs/plan.md) — Project philosophy and decision explanations
- [`docs/decks.md`](docs/decks.md) — Creating and managing deck files
- [`docs/scryfall.md`](docs/scryfall.md) — Card discovery and deck building with Scryfall API
- [`docs/collection.md`](docs/collection.md) — Working with your ManaBox collection
- [`docs/exports.md`](docs/exports.md) — Exporting decks to Moxfield/Archidekt
- [`docs/deck-building-lessons.md`](docs/deck-building-lessons.md) — Captured learnings and mistakes
- [`docs/extension-plan.md`](docs/extension-plan.md) — VSCode extension specification

**Agent Instructions** (`.github/instructions/`) — Domain-specific reference for AI:
- [`copilot-instructions.md`](.github/copilot-instructions.md) — Repository-wide overview
- [`deck-format.instructions.md`](.github/instructions/deck-format.instructions.md) — `.mtg` file syntax
- [`collection-query.instructions.md`](.github/instructions/collection-query.instructions.md) — CSV schema and query patterns
- [`scryfall.instructions.md`](.github/instructions/scryfall.instructions.md) — API endpoints and search syntax
- [`export-moxfield.instructions.md`](.github/instructions/export-moxfield.instructions.md) — Moxfield format spec
- [`export-archidekt.instructions.md`](.github/instructions/export-archidekt.instructions.md) — Archidekt CSV spec
- [`documentation.instructions.md`](.github/instructions/documentation.instructions.md) — Two-consumer documentation philosophy

## Example Workflows

**Card Discovery:**
```
Ask Copilot: "Find token doublers in Naya colors under $5"
Result: Receives Scryfall search results as a .mtg file with ownership markers
```

**Create a Commander deck:**
```
Ask Copilot: "Create a Golgari Commander deck with Meren of Clan Nel Toth as commander"
Result: Creates decks/meren-reanimator.mtg with YAML frontmatter and deck sections
```

**Compare deck to collection:**
```
Ask Copilot: "Which cards from decks/baylen-tokens.mtg do I own?"
Result: Queries ManaBox_Collection.csv and reports owned vs needed cards
```

**Export to Moxfield:**
```
Ask Copilot: "Export decks/baylen-tokens.mtg to Moxfield format"
Result: Converts YAML + sections to Moxfield's text import format
```

## VSCode Extension

Git-Probe includes a VSCode extension (built on top of [mtg-code](https://github.com/PixR2/mtg-code)) that enhances the deck building experience:

**Core Features:**
- **Syntax highlighting** for `.mtg` files with YAML frontmatter support
- **Hover providers** showing card images, oracle text, and prices from Scryfall
- **Autocomplete** for card names based on workspace context and Scryfall database
- **Collection markers** showing `[OWNED]` or `[NEED]` based on `ManaBox_Collection.csv`
- **Inline ownership indicators** displaying ✅/❌ markers next to card names in the editor

**Scryfall Integration:**
- Run advanced Scryfall searches directly from command palette
- Results saved as `.mtg` files with ownership markers and inline comments
- AI-friendly format enables natural language card evaluation via Copilot
- Git-trackable search history for iterative deck building

**Philosophy:**
File-based search results (not webview panels) for AI-friendliness, git-trackability, reviewability, editability, and shareability. This aligns with the documentation-first, repo-as-database philosophy.

See [`docs/extension-plan.md`](docs/extension-plan.md) for complete specification and implementation plan.

## Development

**Extension Development:**

This repository is both a Git-Probe project AND the VSCode extension (monorepo approach).

**Setup:**
```bash
npm install          # Install dependencies
npm run build        # Build extension
npm run watch        # Build and watch for changes
```

**Testing locally:**
1. Open this repository in VSCode
2. Press F5 or Run > Start Debugging
3. A new VSCode window opens with the extension loaded
4. Open any `.mtg` file to test syntax highlighting
5. Try commands: `Cmd+Shift+P` → "Git-Probe: Search for Cards"

**Project Structure:**
```
git-probe/
├── src/                    # Extension source code
│   ├── extension.ts        # Entry point
│   ├── providers/          # Hover, completion, etc.
│   ├── commands/           # Command implementations
│   ├── services/           # Scryfall, collection manager
│   └── parsers/            # Deck file parsing
├── syntaxes/               # TextMate grammar for .mtg files
├── .reference/mtg-code/    # Reference implementation (not committed)
├── decks/                  # Example decks + your decks
└── docs/                   # User documentation
```

**Reference Code:**

The `.reference/mtg-code/` folder contains the original mtg-code extension for reference. Use it as inspiration for:
- Hover provider implementation
- Scryfall API integration
- TextMate grammar patterns
- Card autocomplete logic

**Iteration Workflow:**

1. Make changes to `src/` files
2. Extension auto-rebuilds (if watch is running)
3. Reload extension window: `Cmd+R` in Extension Development Host
4. Test changes immediately
5. Commit when feature works

## Contributing

Deck ideas, DSL improvements, and automation scripts welcome! Follow semantic commit format: `<type>(<scope>): <message>`

## License

MIT
