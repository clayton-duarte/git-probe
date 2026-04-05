# Using Scryfall for Deck Building

Scryfall is a powerful search engine for finding Magic cards. Use it to research card synergies, check prices, and discover cards you didn't know existed.

## Why Scryfall?

- **Comprehensive database** - Every Magic card ever printed
- **Advanced search** - Filter by any card property
- **Current prices** - Updated market values
- **Free API** - No authentication needed
- **Well-documented** - Extensive search syntax

## Basic Searches

### Looking Up a Specific Card

Ask Copilot: `Look up Baylen, the Haymaker on Scryfall`

Copilot will fetch:
- Mana cost
- Card type
- Oracle text
- Current price
- Format legality

This helps you understand what a card does and whether it's affordable.

### Finding Similar Cards

After looking up your commander, search for synergies:

**Example:** Building a Baylen, the Haymaker deck
- Baylen taps tokens for abilities
- We need cards that create lots of tokens
- Preferably affordable cards
- Legal in Commander format

## Advanced Searches

### Multi-Criteria Filtering

You can combine multiple requirements:

**Find token creators in your colors under $5:**
- `o:"create" o:"token"` - Oracle text mentions creating tokens
- `id<=naya` - Color identity fits Naya (R/G/W) commander
- `f:commander` - Legal in Commander format
- `usd<5` - Under $5

**Results include:**
- Beast Within ($0.68)
- Generous Gift ($1.23)
- Tireless Provisioner ($2.60)
- Scute Swarm ($4.86)

### Price-Based Discovery

**Find budget-friendly staples:**
```
Token doublers in Naya colors, sorted by price
```

This reveals:
- Expensive but powerful: Anointed Procession ($57.75)
- Middle ground: Parallel Lives ($23.16)
- Budget alternative: Look for effects that create more tokens

### Synergy Hunting

**What works well with Baylen?**

Since Baylen taps tokens, we need:

1. **Token creators** - More tokens = more activations
   - Search: `o:"create" o:"token" id<=naya usd<3`

2. **Haste enablers** - Use tokens immediately
   - Search: `o:"creatures you control have haste" id<=naya usd<5`
   - Results: Anger ($1.00), Fires of Yavimaya ($0.67), Barbarian Class ($0.31)

3. **Token doublers** - Multiply your value
   - Search: `o:"double" o:"token" id<=naya`
   - Results show pricing range from $23 to $57

4. **Untap effects** - Reuse tap abilities
   - Search: `o:"untap" id<=naya`

## Real-World Workflow

### Step 1: Research Your Commander

```
Look up [commander name] on Scryfall
```

Copilot fetches the card and shows you:
- What colors you can use
- What the card does
- Current price

### Step 2: Identify What You Need

Based on your commander's abilities, list requirements:
- "Creates tokens" → Need token generators
- "Draws cards" → Need card draw
- "Gains life" → Need lifegain sources

### Step 3: Search for Synergies

Ask Copilot to search for specific effects:
```
Find cheap token creators in Naya colors for Commander
```

Copilot builds the search query and shows results sorted by EDHREC popularity or price.

### Step 4: Check What You Own

After finding cards you want, ask:
```
Do I own any of these cards? [list card names]
```

Copilot checks your collection CSV.

### Step 5: Price Check Missing Cards

For cards you don't own:
```
What's the total cost for [card names]?
```

Copilot sums up the prices to help budget your purchase.

## Search Tips

### Start Broad, Then Narrow

1. **Too many results?** Add filters:
   - Price: `usd<5`
   - Mana value: `mv<=3`
   - Card type: `t:creature`

2. **Too few results?** Remove filters:
   - Drop price constraints
   - Widen color identity
   - Use fuzzy text search instead of exact quotes

### Use EDHREC Sorting

Add `order:edhrec` to searches to see most-played cards first. These are proven synergies the community recommends.

### Check Multiple Price Points

Search three times with different budgets:
1. `usd<2` - Budget options
2. `usd>=2 usd<10` - Medium investment
3. `usd>=10` - Premium choices

This helps you understand the pricing tiers for effects you need.

## Common Mistakes

### Quoting Issues

❌ Wrong: `o:create token`  
✅ Right: `o:"create" o:"token"` or `o:"create token"`

Use quotes when searching for phrases with spaces.

### Color Identity vs Color

- `c:white` - Card IS white
- `id:white` - Card can go IN white Commander deck

For Commander, use `id:` (color identity).

### Missing URL Encoding

When building URLs manually, encode:
- Spaces → `+`
- Quotes → `%22`
- Colons → `%3A`

But Copilot handles this automatically.

## Example: Complete Deck Build

**Goal:** Build Baylen, the Haymaker on a $100 budget

1. **Look up commander** ($0.45)
2.  **Find token creators** under $3 (20 cards ≈ $40)
3. **Add haste enablers** under $2 (3 cards ≈ $4)
4. **Add card draw** under $5 (5 cards ≈ $15)
5. **Add removal** under $2 (10 cards ≈ $15)
6. **Add lands** under $2 (35 lands ≈ $25)

Total: ~$99.45

Use Scryfall to find cards in each category, then check your collection to see what you already own.

## When to Use Web vs API

**Use Scryfall.com website when:**
- Browsing and exploring
- Visual card browsing
- Building sample decklists on their platform

**Use API via Copilot when:**
- Building decks in Git-Probe
- Checking specific cards quickly
- Comparing prices for multiple cards
- Integrating with your collection data

Both access the same database, choose based on your workflow.
