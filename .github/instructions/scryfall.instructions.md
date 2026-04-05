---
applyTo: '**'
---

# Scryfall API

**Base URL:** `https://api.scryfall.com`  
**Rate Limit:** ~10 req/sec, add `sleep 0.1` for bulk

## Named Card Lookup

**Exact:**
```bash
curl -s "https://api.scryfall.com/cards/named?exact=Lightning+Bolt"
```

**Fuzzy:**
```bash
curl -s "https://api.scryfall.com/cards/named?fuzzy=baylen+haymaker"
```

## Advanced Search

**Endpoint:**
```bash
curl -s "https://api.scryfall.com/cards/search?q=QUERY"
```

### Query Syntax

| Operator | Example | Description |
|----------|---------|-------------|
| `o:` | `o:"create" o:"token"` | Oracle text contains |
| `t:` | `t:creature t:legendary` | Type line contains |
| `c:` | `c:red` or `c:r` | Color |
| `id:` | `id<=naya` | Color identity (for Commander) |
| `f:` | `f:commander` | Format legal |
| `usd:` | `usd<5` | Price filter |
| `mv:` | `mv<=3` | Mana value |
| `pow:` | `pow>=4` | Power |
| `is:` | `is:commander` | Special properties |
| `keyword:` | `keyword:haste` | Has keyword |

### Comparison Operators

`>`, `<`, `=`, `>=`, `<=`, `!=`

### Boolean Logic

- AND: Space between terms
- OR: Use `OR` keyword
- NOT: Prefix with `-`
- Group: Use parentheses `()`

## Common Searches

**Token creators in Naya under $5:**
```bash
curl -s "https://api.scryfall.com/cards/search?q=o%3A%22create%22+o%3A%22token%22+id%3C%3Dnaya+f%3Acommander+usd%3C5"
```

**Token doublers:**
```bash
curl -s "https://api.scryfall.com/cards/search?q=o%3A%22double%22+o%3A%22token%22+id%3C%3Dnaya+f%3Acommander"
```

**Haste enablers under $5:**
```bash
curl -s "https://api.scryfall.com/cards/search?q=o%3A%22creatures+you+control+have+haste%22+id%3C%3Dnaya+usd%3C5"
```

**Low CMC interaction:**
```bash
curl -s "https://api.scryfall.com/cards/search?q=%28o%3Adestroy+OR+o%3Aexile%29+t%3Ainstant+id%3C%3Dnaya+mv%3C%3D3+usd%3C2"
```

## Useful jq Filters

**Extract key fields:**
```bash
| jq '{name, mana_cost, type_line, oracle_text, prices: .prices.usd}'
```

**List top 10:**
```bash
| jq '[.data[] | {name, mana_cost, prices: .prices.usd}] | .[0:10]'
```

**Just names:**
```bash
| jq '.data[].name'
```

## URL Encoding

Spaces: `+` or `%20`  
Quotes: `%22`  
Colon: `%3A`
