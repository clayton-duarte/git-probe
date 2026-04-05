---
applyTo: '{.github/instructions/**,docs/**}'
---

# Documentation Philosophy

## Two Consumers, Two Locations

| Consumer | Location | Purpose |
|----------|----------|---------|
| **Agent (AI)** | `.github/instructions/*.instructions.md` | Execute tasks without asking questions |
| **User (Human)** | `docs/*.md` | Understand, learn, troubleshoot, plan |

---

## Agent Instructions (`.github/instructions/`)

**Characteristics:**
- Terse (no prose, no "why")
- Structured (tables, lists, code blocks)
- Actionable (commands, templates, patterns)
- Scoped (use `applyTo` frontmatter)

**What Belongs:**

| ✅ Include | ❌ Exclude |
|-----------|-----------|
| Commands to run | Philosophy/rationale |
| Templates to copy | Step-by-step tutorials |
| Reference tables (schema, endpoints) | Recovery procedures |
| Decision rules ("if X, use Y") | Troubleshooting guides |
| Current state facts | Historical context |
| API references | Glossary definitions |

**Size:** Keep under 5KB. If larger, split by sub-topic or narrow scope.

**Frontmatter (Required):**
```yaml
---
applyTo: '<glob-pattern>'
---
```

---

## User Docs (`docs/`)

**Characteristics:**
- Explanatory prose (explains "why")
- Educational (teaches concepts)
- Complete (full context)
- Narrative (flows for human readers)

**What Belongs:**

| ✅ Include | ❌ Exclude |
|-----------|-----------|
| Architecture overviews | Raw reference tables |
| "Why we chose X" decisions | Templates to copy verbatim |
| Recovery runbooks | IP/port lists |
| Troubleshooting guides | API endpoint catalogs |
| Conceptual explanations | Commands without context |
| Diagrams and flows | Decision rules |
| Glossary | — |

---

## Overlap Policy

When topics need BOTH agent facts AND user explanations:

| Aspect | Agent File | User File |
|--------|-----------|-----------|
| Content | Concise reference table | Section explaining philosophy |
| Commands | Raw commands to run | When/why to use each command |
| Rules | Decision table | Rationale behind each rule |
| Structure | Template/example | Why this structure was chosen |

**Rule:** Agent file = concise reference. User file = full explanation.

---

## Scoping Guidelines

### Global (`applyTo: '**'`)
Only for truly universal facts (network, core infrastructure)

### Domain-Scoped (`applyTo: 'decks/**'`)
For domain-specific knowledge (deck format, collection queries)

### File-Pattern Scoped (`applyTo: '**/*.csv'`)
For cross-cutting concerns

---

## Review Checklist

When adding/editing documentation:

1. **Which consumer?** Agent needs facts, user needs understanding
2. **Right location?** `.github/instructions/` vs `docs/`
3. **Properly scoped?** Narrowest `applyTo` that works
4. **Right size?** Instructions <5KB, split if larger
5. **No overlap?** Don't duplicate between locations
