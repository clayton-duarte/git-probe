# Deck Building Lessons

Insights and mistakes from building decks with Scryfall searches.

## Lesson 1: Synergy ≠ Impact

**Date:** 2026-04-05  
**Deck:** Baylen, the Haymaker (Academy Manufactor build)

### The Mistake

Found **Battered Golem** ($0.40) and got excited:
- Untaps when you cast artifact spell
- With Academy Manufactor: 1 Treasure → 3 artifacts → Golem untaps!
- "Can reuse Baylen's tap ability!"

### Why It's Wrong

Battered Golem just untaps. It doesn't:
- Draw cards
- Deal damage
- Create tokens
- Advance the gameplan

**The synergy exists but doesn't help win the game.**

### The Lesson

When evaluating synergies, always ask:
1. **Does this create value?** (cards, damage, tokens, mana)
2. **Does this advance my win condition?**
3. **Is the synergy worth a deck slot?**

Cool interactions ≠ Good cards

---

## Lesson 2: Smart Searches Beat Obvious Ones

**Strategy:** Build around Academy Manufactor (turns each Food/Clue/Treasure into all 3)

### ❌ Obvious Search
`o:"double" o:"token"` → Finds token doublers

**Results:** Expensive cards ($23-$57)  
**Problem:** Misses the actual strategy (Manufactor already multiplies)

### ✅ Smart Searches

**What we actually needed:**

1. **Cards that create the fuel** (Food/Clue/Treasure)
   ```
   o:"create" o:"Food" id<=naya f:commander usd<5
   o:"create" o:"Treasure" id<=naya f:commander usd<3
   ```
   **Results:** 86 Food creators, 156 Treasure creators

2. **Cards that profit from artifact tokens**
   ```
   (o:"Whenever an artifact" OR o:"Whenever one or more artifacts") id<=naya f:commander usd<5
   ```
   **Key finds:**
   - Reckless Fireweaver ($0.45) - Damage per artifact
   - Ingenious Artillerist ($0.50) - Damage OR Treasures per artifact
   
   **Impact:** With Manufactor, 1 token = 3 artifacts = 3 damage!

3. **Cards that convert tokens to value**
   ```
   (o:"Sacrifice an artifact" OR o:"sacrifice artifacts") id<=naya f:commander usd<3
   ```
   **Key finds:**
   - Oswald Fiddlebender ($1.84) - Sacrifice → Tutor
   - Throne of Geth ($0.97) - Sacrifice → Proliferate
   - Demand Answers ($0.36) - Sacrifice → Draw

### The Lesson

**Think about what the strategy needs, not what the keywords are:**
- Token doublers? → No, Manufactor already multiplies
- Token creators? → Yes, but which types? (Food/Clue/Treasure)
- Payoffs? → Yes, cards that trigger on artifacts entering
- Value conversion? → Yes, sacrifice outlets for when tokens pile up

**Search for the roles, not the obvious synergies.**

---

## Lesson 3: Price Sorting Reveals Budget Options

### The Query
`order:usd` - Sort by price (cheapest first)

### Why It Matters

- **Reckless Fireweaver:** $0.45 (budget)
- **Purphoros, God of the Forge:** $15+ (expensive)
- **Both do similar things** (damage when creatures/artifacts enter)

Sorting by price shows you the budget version first, then you can decide if the expensive version is worth upgrading to.

### The Lesson

Always search with price filters AND price sorting:
- `usd<3 order:usd` - See cheapest options first
- `usd>=3 usd<10 order:usd` - See mid-tier upgrades
- No price filter + `order:edhrec` - See most-played cards (usually more expensive)

---

## Lesson 4: Multiple Queries > One Perfect Query

### What Worked

Instead of one massive query, we did:
1. Food token creators (86 results)
2. Treasure token creators (156 results)
3. Artifact ETB triggers (28 results)
4. Artifact sacrifice outlets (78 results)

### Why This Works Better

- Each search is focused and easy to browse
- Results are relevant (not diluted by OR conditions)
- Can refine each search independently
- Easier to compare within categories

### The Lesson

Break complex strategies into multiple searches:
- Token creators
- Token payoffs
- Support cards
- Removal/interaction

Don't try to find everything in one query.

---

## Lesson 5: Read the Whole Card

### The Trap

Seeing one line of a card's text that looks good, without reading the rest.

**Example scenarios to watch for:**

1. **Conditional abilities**
   - "At the beginning of combat" ≠ "When this attacks"
   - "You may" ≠ "Opponent must"

2. **Hidden costs**
   - "Sacrifice a creature"
   - "Pay 2 life"
   - "Only as a sorcery"

3. **Restrictions**
   - "Nontoken creature"
   - "Once each turn"
   - "From your hand"

### The Lesson

When you find a card via search, read the FULL oracle text before adding it to the deck.

Scryfall searches match keywords, but the full card might not fit your strategy.

---

## Questions to Ask Every Card

Before adding a card to a deck:

1. **What does this do?** (Full oracle text)
2. **When does this help?** (Early game? Late game? Specific situations?)
3. **Does this advance my game plan?** (Not just "is it good")
4. **What does this replace?** (Deck slots are limited)
5. **Can I afford it?** (Budget constraints)
6. **Do I own it?** (Check collection first)

If you can't answer all 6, you probably shouldn't add it yet.

---

## Useful Search Patterns

### By Strategy Type

**Token strategies:**
- Creators: `o:"create" o:"token"`
- Doublers: `(o:"double" OR o:"twice that many") o:"token"`
- Payoffs: `o:"Whenever" o:"token"`

**Artifact strategies:**
- Creators: `o:"create" o:"artifact" OR t:artifact`
- Enters triggers: `o:"Whenever" o:"artifact"`
- Sacrifice outlets: `o:"Sacrifice" o:"artifact"`
- Cost reduction: `o:"cost" o:"less" o:"artifact"`

**Graveyard strategies:**
- Fill yard: `o:"mill" OR o:"discard" OR o:"sacrifice"`
- Recursion: `o:"return" o:"graveyard"`
- Flashback/jump-start: `keyword:flashback OR keyword:jump-start`

### By Budget

- Under $1: `usd<1`
- Under $5: `usd<5`
- $5-10 range: `usd>=5 usd<10`

### By Card Type

- Just creatures: `t:creature`
- Just instants/sorceries: `(t:instant OR t:sorcery)`
- Exclude creatures: `-t:creature`

### By Power Level

- EDHREC popular: `order:edhrec`
- Budget staples: `usd<3 order:edhrec`

---

## Next Time

Before starting a deck:
1. **Define the win condition** - How does this deck actually win?
2. **Identify the roles** - What categories of cards do I need?
3. **Search by role** - One search per category
4. **Evaluate impact** - Does this card help me win?
5. **Check collection** - Do I already own options?
6. **Build gradually** - Don't try to finish in one session

Deck building is iterative. Start with a plan, test, refine, repeat.
