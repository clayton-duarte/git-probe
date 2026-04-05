# Scryfall API Usage

Use curl for on-demand card data. No caching in MVP.

**Base URL:** `https://api.scryfall.com`

## Card Search

**Exact name:**
```bash
curl -s "https://api.scryfall.com/cards/named?exact=Lightning+Bolt"
```

**Fuzzy search:**
```bash
curl -s "https://api.scryfall.com/cards/named?fuzzy=lightning+bolt"
```

## Response Format

```json
{
  "name": "Lightning Bolt",
  "mana_cost": "{R}",
  "type_line": "Instant",
  "oracle_text": "Lightning Bolt deals 3 damage...",
  "prices": {
    "usd": "0.25",
    "usd_foil": "2.00"
  },
  "set": "m10",
  "set_name": "Magic 2010",
  "collector_number": "146",
  "legalities": {
    "standard": "not_legal",
    "modern": "legal",
    "commander": "legal"
  }
}
```

## Common Queries

**Price lookup:**
```bash
curl -s "https://api.scryfall.com/cards/named?exact=Mana+Crypt" | jq '.prices.usd'
```

**Legality check:**
```bash
curl -s "https://api.scryfall.com/cards/named?exact=Black+Lotus" | jq '.legalities.commander'
```

## Rate Limiting

- Scryfall allows ~10 requests/second
- Add 100ms delay for bulk requests: `sleep 0.1`

## When to Use

- Missing card prices for deck comparison
- Legality verification
- Card oracle text lookup
- Set information needed
