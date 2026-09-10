# DAY 6 — SATURDAY
## Code Agent Integration Prompt
### Twine/SugarCube 2.x Implementation Guide

---

## OVERVIEW

Day 6 is a **fully open-world rest day** with no facility content. This is the first weekend day in the game. The player controls the entire schedule through choice passages. The structure is:

- **MORNING (fixed start):** Wake up, cleaning, shower/dress, Lulu's bodega
- **AFTERNOON (open choice):** 4-5 branching activities, player picks 1-2
- **EVENING (semi-fixed):** Danny's with Tommy at 7, then Vega with Paco at 9, with Adriana interaction
- **NIGHT (fixed end):** Walk home, texts, sleep

---

## PASSAGE MAP (Twee File: `t0_day06.twee`)

```
t0_day06_morning [day-start]
    │
    ├── t0_day06_phone_check (overlay)
    │
    ├── t0_day06_cleaning
    │   └── [hair tie choice]
    │
    ├── t0_day06_shower_dress
    │   └── [mirror choice]
    │
    ├── t0_day06_lulus_bodega
    │   ├── [gossip branch]
    │   ├── [job mention branch]
    │   └── [leave branch]
    │
    ├── t0_day06_apartment_afternoon
    │   ├── t0_day06_mama_call
    │   │   ├── [daniela_agree]
    │   │   ├── [daniela_delay]
    │   │   └── [adriana_mention]
    │   │
    │   ├── t0_day06_park_afternoon
    │   │   └── t0_day06_park_jogger (random)
    │   │
    │   ├── t0_day06_nap
    │   │   └── [dream sequence]
    │   │
    │   ├── t0_day06_handbook_study
    │   │   └── [journal update]
    │   │
    │   └── t0_day06_tommy_confirm (text)
    │
    ├── t0_day06_getting_ready_evening
    │   ├── [text adriana branch]
    │   ├── [señora vidal plate branch]
    │   └── [direct to danny's]
    │
    ├── t0_day06_transition_evening
    │
    ├── t0_day06_dannys_tommy (SQ-007)
    │
    ├── t0_day06_vega_paco (SQ-010)
    │   ├── [valentina_agree]
    │   ├── [valentina_delay]
    │   └── [adriana_mention_paco]
    │
    ├── t0_day06_vega_adriana (SQ-009)
    │   ├── [ask_last_name]
    │   ├── [ask_night_off → date unlock]
    │   └── [charming_exit]
    │
    ├── t0_day06_walk_home
    │   ├── [james text response]
    │   └── [lyla text response]
    │
    └── t0_day06_sleep
        ├── [think_monday]
        ├── [think_adriana]
        ├── [think_nothing]
        └── [think_mama]
```

---

## VARIABLE UPDATES (StoryInit additions for Day 6)

```javascript
// In t0_day06_morning passage header:
<<run SOY.Time.init()>>  // Already called, but confirm day=6
<<set $calendar.day = 6>>
<<set $calendar.weekday = 6>>  // Saturday
<<set $calendar.phase = "weekend">>

// Day 6 specific flags
<<set $day6 = {
    hairTie: "junk_drawer",  // "junk_drawer", "trash", "wrist"
    mirrorMoment: false,
    luluGossip: false,
    luluJobMention: false,
    mamaCallTaken: false,
    danielaResponse: "none",  // "agree", "delay", "adriana_mention"
    parkVisited: false,
    napTaken: false,
    handbookStudied: false,
    tommyConfirmed: true,     // Always true (pre-set from Day 5 text)
    adrianaTexted: false,
    vidalPlateReturned: false,
    vidalBacalaoAccepted: false,
    valentina: "none",        // "agree", "delay", "adriana_mention_paco"
    adrianaConvo: "none",     // "last_name", "night_off", "exit"
    jamesResponse: "none",
    lylaResponse: "none",
    sleepThought: "none"
}>>

// Phantom decay (Day 6 morning)
<<run SOY.Body.decayPhantoms()>>
// Day 6 phantom state after decay:
// D-cup weight: 2 (was 3)
// Hip authority: 2 (was 3)
// Speculum stretch: 2 (was 3)
// Thigh pressure: 1 (was 2)
// Partner-touch: 1 (was 2)
// Arousal-echo: 1 (was 2)
// Blush: 0 (expired)
// Hip sway: 2 (persistent, does not decay to 0)
```

---

## ECONOMY UPDATES

```javascript
// Day 6 spending
// No course fee (Saturday)
// Lulu's bodega: $27.40 groceries
// Danny's ramen: ~$18 (split check)
// Vega bar: ~$24 (rum + mezcal, 3 drinks)
// Cologne: already owned
// Total spend: ~$69.40

// Starting balance: ~$1,910 (from Day 5)
// End of Day 6 balance: ~$1,840

<<run SOY.Economy.spend(27.40, 'food')>>    // Lulu's
<<run SOY.Economy.spend(18, 'food')>>       // Danny's
<<run SOY.Economy.spend(24, 'drinks')>>     // Vega
```

---

## KEY IMPLEMENTATION PATTERNS

### 1. Open World Afternoon Choice Hub

The afternoon is the core open-world mechanic for weekend days. Present 4-5 options, player picks one, time advances, then evening begins.

```twee
:: t0_day06_apartment_afternoon
<<set $calendar.timeSlot = 1>> /* afternoon */

The apartment is clean. Chipi owns the bed. The empanadas are gone. The afternoon stretches out, unhurried, no schedule, no facility, no bodies to inhabit but my own.

<<if !$day6.mamaCallTaken>>
[[Call Mamá back|t0_day06_mama_call]] — She left a voice note. The candle. San José.
<</if>>

[[Walk to the park|t0_day06_park_afternoon]] — Fresh air. October leaves. People to watch.

[[Nap on the couch|t0_day06_nap]] — Chipi. The blue blanket. Two hours.

[[Read the Handbook, Chapters 4-6|t0_day06_handbook_study]] — Monday prep. Identity drift. Case law.

[[Text Tommy, confirm Danny's|t0_day06_tommy_confirm]] — 7 PM. Habanero ramen. He's buying.
```

### 2. Conditional Branching Based on Prior Choices

Adriana's scene varies based on Day 5 text thread and current-day choices:

```twee
:: t0_day06_vega_adriana
<<if $day6.adrianaTexted>>
    She sees me come in and the mezcal is already poured. "You texted. You showed up. Points for consistency."
<<elseif $flags.adriana_text_compose>>
    She sees me and something crosses her face. Recognition plus something else. "Saturday. You came back."
<<else>>
    She sees me between customers. A nod. The mezcal appears without conversation. Standard protocol for a regular.
<</if>>
```

### 3. Phone System Integration

Day 6 has heavy phone traffic. Use the phone overlay system:

```twee
:: t0_day06_phone_check
<<widget "day6PhoneCheck">>
    <<run SOY.Phone.addMessage('paco', 'hermano, vega tonight? i have rum. also isabela sent a bikini pic and i am legally obligated to show you')>>
    <<run SOY.Phone.addMessage('tommy', 'still on for danny\'s? 7 works. also I slept 6 hours straight last night. new record. renata only showed up once in the dream')>>
    <<run SOY.Phone.addMessage('james', 'Saturday bro! Mom made jollof rice. dropping some off at your place later if ur around')>>
    <<if $flags.lyla_knows_partial or $flags.lyla_knows_full>>
        <<run SOY.Phone.addMessage('lyla', 'morning body-swap boy. i read three articles about consciousness transfer last night. i have QUESTIONS. enjoy your saturday because monday i\'m coming for answers')>>
    <<else>>
        <<run SOY.Phone.addMessage('lyla', 'morning sunshine. the chart has been updated. you\'re now at 74% on theory 5. have a good day off from your MYSTERIOUS JOB')>>
    <</if>>
<</widget>>
```

### 4. Relationship Tracking Per Choice

```javascript
// After Tommy scene
<<run SOY.NPCs.adjustRelationship('tommy', 1)>>
<<set State.variables.npcs.tommy.flags.dannys_saturday = true>>
<<set State.variables.npcs.tommy.flags.speculum_discussed = true>>
<<set State.variables.npcs.tommy.flags.renata_authority = true>>

// After Adriana scene (varies by choice)
<<if $day6.adrianaConvo === "night_off">>
    <<run SOY.NPCs.adjustRelationship('adriana', 2)>>
    <<set State.variables.npcs.adriana.flags.monday_date = true>>
    <<set $flags.adriana_date_scheduled = true>>
<<elseif $day6.adrianaConvo === "last_name">>
    <<run SOY.NPCs.adjustRelationship('adriana', 1)>>
    <<set State.variables.npcs.adriana.flags.name_exchanged = true>>
<<else>>
    <<run SOY.NPCs.adjustRelationship('adriana', 1)>>
<</if>>

// After Paco/Valentina choice
<<if $day6.valentina === "agree">>
    <<set $flags.valentina_date_scheduled = true>>
    <<run SOY.NPCs.adjustRelationship('paco', 1)>>
<<elseif $day6.valentina === "adriana_mention_paco">>
    <<set State.variables.npcs.paco.flags.knows_adriana_interest = true>>
<</if>>
```

### 5. Quest Log Updates

```twee
:: t0_day06_sleep [quest-update]
/* Quest state changes at end of Day 6 */

<<set $quests.sq007 = "resolved">>   /* Tommy's Nerve */
<<set $quests.sq009_stage = ($day6.adrianaConvo === "night_off") ? "date_scheduled" : "orbit_tightening">>
<<set $quests.sq010_stage = ($day6.valentina === "agree") ? "valentina_scheduled" : "pending">>

<<if $day6.vidalPlateReturned>>
    <<set $quests.sq005_stage = "bacalao_accepted">>
<<else>>
    <<set $quests.sq005_stage = "note_6_received">>
<</if>>

<<if $day6.mamaCallTaken>>
    <<if $day6.danielaResponse === "agree">>
        <<set $quests.sq004_stage = "daniela_call_pending">>
    <<elseif $day6.danielaResponse === "adriana_mention">>
        <<set $quests.sq004_stage = "mama_knows_bar_girl">>
    <</if>>
<</if>>

<<if $day6.handbookStudied>>
    <<set $player.knowledgeBonus = ($player.knowledgeBonus || 0) + 1>>
<</if>>
```

---

## OBJECTIVE SYSTEM (Day 6)

### Main Objectives
```javascript
$objectives.main = [
    {
        id: "day6_rest",
        label: "Take the day off. No facility. No transfers. Just Saturday.",
        status: "active",
        completion: "auto" // Completes when day ends
    }
];
```

### Side Objectives (Tracked, Optional)
```javascript
$objectives.side = [
    {
        id: "sq007_tommy_danny",
        label: "Meet Tommy at Danny's Ramen at 7 PM",
        status: "active",
        completion: "passage:t0_day06_dannys_tommy"
    },
    {
        id: "sq010_paco_vega",
        label: "Drinks with Paco at Vega",
        status: "active",
        completion: "passage:t0_day06_vega_paco"
    },
    {
        id: "sq009_adriana",
        label: "Talk to Adriana at Vega",
        status: "active",
        completion: "passage:t0_day06_vega_adriana"
    },
    {
        id: "sq005_vidal_plate",
        label: "Return Señora Vidal's plate",
        status: "optional",
        completion: "choice:vidalPlateReturned"
    },
    {
        id: "sq004_mama_call",
        label: "Call Mamá back",
        status: "optional",
        completion: "choice:mamaCallTaken"
    },
    {
        id: "day6_clean",
        label: "Clean the apartment",
        status: "active",
        completion: "passage:t0_day06_cleaning"  // Always triggered
    },
    {
        id: "day6_groceries",
        label: "Buy groceries at Lulu's",
        status: "active",
        completion: "passage:t0_day06_lulus_bodega"  // Always triggered
    }
];
```

---

## TAGGING CONVENTIONS FOR DAY 6 PASSAGES

```
[day-start]         — t0_day06_morning (triggers autosave)
[weekend]           — all Day 6 passages
[apartment]         — home scenes
[bodega]            — Lulu's
[restaurant]        — Danny's
[bar]               — Vega
[npc-tommy]         — Tommy scenes
[npc-paco]          — Paco scenes
[npc-adriana]       — Adriana scenes
[npc-lulu]          — Lulu scenes
[npc-vidal]         — Señora Vidal scenes
[npc-mama]          — Mamá call
[phone]             — Phone check overlays
[choice-hub]        — Afternoon activity selection
[random-encounter]  — Park jogger, laundromat neighbor
[phantom]           — Scenes with body echo content
[romantic]          — Adriana advancement scenes
[sleep]             — End of day
```

---

## FILE OUTPUT

All Day 6 content goes into: `src/passages/tier0/t0_day06.twee`

The file should contain approximately 35-45 passages total, with the branching structure above. Each passage should be self-contained but reference shared state through `$day6` variables.

---

## TESTING NOTES

Key paths to test:
1. **Maximum engagement:** Mamá call + Adriana text + Vidal plate + park + Danny's + Vega + date request = longest playthrough
2. **Minimum engagement:** Skip Mamá, skip park, skip Vidal, go straight to Danny's + Vega + exit = shortest playthrough
3. **Handbook study path:** Reading + journal bonus verified for Monday
4. **Valentina vs Adriana fork:** If player agrees to Valentina AND asks Adriana out, flag both and handle conflict in Day 8
5. **Phantom decay verification:** Check that body.phantoms array updates correctly at morning init

---
