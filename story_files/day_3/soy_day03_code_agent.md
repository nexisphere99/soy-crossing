# DAY 3 -- WEDNESDAY
## CODE AGENT PROMPT: Twine/SugarCube Integration
### Single-Day Content with Main + Side Objectives

---

## OVERVIEW

You are building Day 3 (Wednesday) of "Shape of You: Crossing" in Twine/SugarCube 2.x. This document provides the complete integration specification: passage flow, branching logic, system updates, quest tracking, and open-world design.

Refer to the three content files for scene prose:
- `soy_day03_daily_life.md` (morning, evening, night -- main quest framing)
- `soy_day03_course.md` (Module 2 ethics lecture + Katya transfer + scenarios -- main quest core)
- `soy_day03_npc_sidequests.md` (cafeteria, Lulu, Adriana, phone calls -- side quest content)

---

## FILE OUTPUT

Create one Twee file:

```
src/passages/tier0/t0_day03.twee
```

All Day 3 passages go in this file. Tag passages for the autosave system and content rating.

---

## PASSAGE LIST AND FLOW

The day follows a linear morning/facility track, then branches into open-world evening choices.

### MORNING (Linear -- Main Quest)

```
t0_day03_wake [day-start]
  │
  ├── Phone check: Mamá voice note, Paco text
  ├── Señora Vidal note discovery
  │
  → t0_day03_morning_apartment
    │
    → t0_day03_bus
      │
      → t0_day03_arrival
        │
        → t0_day03_pre_lecture
```

### FACILITY (Linear -- Main Quest)

```
t0_day03_lecture_ethics
  │
  ├── Section: "The body is not yours"
  ├── Section: Consent architecture
  ├── Section: Categories of violation
  ├── Section: Autonomic vs. volitional
  ├── Section: The Mirror Test
  ├── Section: Reporting obligations (post-lunch addendum)
  │
  → t0_day03_lunch_cafeteria [Side Quest: Tommy/Georgia bond]
    │
    → t0_day03_katya_pre_transfer
      │
      → t0_day03_transfer_katya
        │
        → t0_day03_scenario1_mirror
          │
          → t0_day03_scenario2_shower [mature]
            │
            → t0_day03_scenario3_knock
              │
              → t0_day03_debrief_rafael
```

### EVENING (Branching -- Open World)

```
t0_day03_evening_transition
  │
  → choice_day03_evening ─────────────────────────────┐
    │                                                   │
    ├── [Vega Bar] → t0_day03_vega_enter               │
    │     → t0_day03_vega_adriana_scene                │
    │     → t0_day03_evening_home_from_vega            │
    │                                                   │
    ├── [Lulu's] → t0_day03_lulu_stop                  │
    │     → choice_day03_post_lulu ──┐                 │
    │       ├── [Continue to Vega]    │                 │
    │       └── [Go home]             │                 │
    │                                                   │
    ├── [Tommy/Danny's] → t0_day03_tommy_dannys        │
    │     (only if $flags.tommy_danny_d2 == true)       │
    │                                                   │
    ├── [Walk] → t0_day03_evening_walk                 │
    │                                                   │
    └── [Home] → t0_day03_evening_home_direct          │
                                                        │
  ALL PATHS CONVERGE → t0_day03_phone_evening          │
    │                                                   │
    ├── Lyla text exchange                              │
    ├── James text exchange                             │
    ├── Paco call (if not already done in-person)       │
    │                                                   │
    → t0_day03_night_processing [intimate]
      │
      → t0_day03_sleep
```

---

## OPEN WORLD EVENING CHOICE PASSAGE

```twee
:: choice_day03_evening
<<set _available = SOY.Locations.getAvailable()>>
<<set _hasPhantoms = SOY.Body.hasPhantoms()>>

The facility door closes behind me. Ninth Street. Cold air. My body feels heavy and angular and mine, but the edges are blurred. Katya's ghost is running through my nervous system.

<<if _hasPhantoms>>
//The phantom sway is back. Hip memory from a body I left thirty minutes ago. My gait keeps adjusting for a pelvis that isn't there.//
<</if>>

I could go home. Chipi is waiting. The couch. A beer. Quiet.

But quiet is the last thing I need tonight.

<<if _available.indexOf('vega') !== -1>>
[[Head to Vega|t0_day03_vega_enter]] -- A bar I've been to twice with Paco. Latin music. Cheap mezcal. Noise.
<</if>>

[[Stop at Lulu's bodega|t0_day03_lulu_stop]] -- Milk. Empanadas. Life advice I didn't ask for.

<<if $flags.tommy_danny_d2>>
[[Text Tommy: "Danny's?"|t0_day03_tommy_dannys]] -- Ramen. Someone who gets it.
<</if>>

[[Go straight home|t0_day03_evening_home_direct]] -- Chipi. Beer. Processing.

[[Walk through the neighborhood|t0_day03_evening_walk]] -- Cold air. Room to think.
```

---

## VEGA BRANCH IMPLEMENTATION

```twee
:: t0_day03_vega_enter
<<set $npcs.adriana.met = true>>
<<set $npcs.adriana.relationship = 1>>
<<set $currentLocation = 'vega'>>
<<run SOY.Locations.travel('vega')>>
<<run SOY.Time.advance()>>
<<run SOY.Economy.spend(24, 'drinks')>>
<<run SOY.Economy.spend(8, 'drinks')>>

/* INSERT: Full Adriana first-meeting scene from npc_sidequests.md */
/* Scene begins mid-entry: "Vega's sign is a single word in red neon..." */
/* Scene ends with: "I keep walking." */

[[Walk home|t0_day03_evening_home_from_vega]]

:: t0_day03_evening_home_from_vega
<<set $currentLocation = 'apartment'>>
<<run SOY.Locations.travel('apartment')>>

/* INSERT: Walk-home prose from daily_life.md */
/* "The walk home is fourteen minutes..." */

→ automatically flows to t0_day03_phone_evening
```

---

## LULU BRANCH IMPLEMENTATION

```twee
:: t0_day03_lulu_stop
<<set $currentLocation = 'lulus'>>
<<run SOY.Locations.travel('lulus')>>
<<run SOY.Economy.spend(3.50, 'food')>>
<<set $npcs.lulu.relationship += 1>>
<<set $npcs.lulu.flags.empanada_count += 1>>

/* INSERT: Full Lulu bodega scene from npc_sidequests.md */
/* "I detour to Lulu's on the way..." through "POZOLE, MANUEL" */

The bell jingles behind me. Empanada in my jacket pocket. Milk in the bag.

[[Continue to Vega|t0_day03_vega_enter]] -- The bar is close. The night is young.
[[Go home|t0_day03_evening_home_direct]] -- Enough socializing for one day.
```

---

## PHONE SYSTEM TRIGGERS

```javascript
// === MORNING TRIGGERS (in t0_day03_wake) ===

// Mamá Wednesday voice note
<<run SOY.Phone.addMessage('mama', '🔊 Voice note (0:47): Church bells in background. Cousin from Zapopan moved to LA. Pretty, works at a bank. Gave her your number. "No me grites. Te quiero. Come bien."')>>

// Paco morning text
<<run SOY.Phone.addMessage('paco', 'Day 3. Ethics day. Don\'t let anyone touch your borrowed tits hermano 🫡')>>


// === EVENING TRIGGERS (in t0_day03_evening_transition) ===

// Lyla Wednesday check-in
<<run SOY.Phone.addMessage('lyla', 'Wednesday check-in. Are you alive?')>>

// James Thursday confirmation
<<run SOY.Phone.addMessage('james', 'Still on for tomorrow? Found the Thai place. Reviews are solid. My treat (don\'t argue).')>>


// === PHONE EVENING PASSAGE (t0_day03_phone_evening) ===
// This passage handles all text/call interactions at home.
// Player reads/responds to each thread in sequence.
// Lyla exchange: 4 theories, Friday declared, suspicion 4/5
// James exchange: Thursday 7 PM confirmed, mom casserole
// Paco call: full Day 3 report, Adriana reaction, "That woman is perceptive"
```

```twee
:: t0_day03_phone_evening
<<set _unread = SOY.Phone.getUnread()>>

/* Show phone overlay or inline text depending on UI preference */

<<if _unread.length > 0>>
The phone has been buzzing in my pocket for the last hour.
<</if>>

/* INSERT: Lyla text exchange from npc_sidequests.md */
/* INSERT: James text exchange from npc_sidequests.md */

<<if !$flags.paco_called_d3>>
/* INSERT: Paco call scene from npc_sidequests.md */
<<set $flags.paco_called_d3 = true>>
<</if>>

[[Put the phone down. Bed.|t0_day03_night_processing]]
```

---

## BODY STATE UPDATES

```javascript
// === PRE-TRANSFER (t0_day03_katya_pre_transfer) ===

<<run SOY.Body.transfer('7-K', {
    name: 'Katya',
    designation: '7-K',
    height: "5'7\"",
    skin: 'pale, warm undertones',
    hair: 'auburn, long, straight, past shoulders',
    eyes: 'blue-grey',
    cupSize: 'C',
    build: 'wider hips, fuller thighs, defined waist',
    neural: 'semi-active',
    responses: ['blush', 'temperature_nipple', 'flinch', 'heart_rate_elevation'],
    calibrationTime: 38
})>>


// === POST-TRANSFER (t0_day03_debrief_rafael) ===

<<run SOY.Body.deTransfer()>>

// Katya leaves stronger phantoms than Flor
<<run State.variables.body.phantoms.push({
    source: 'Katya',
    type: 'blush_memory',
    intensity: 3,
    day: State.variables.calendar.day
})>>
<<run State.variables.body.phantoms.push({
    source: 'Katya',
    type: 'temperature_sensitivity',
    intensity: 2,
    day: State.variables.calendar.day
})>>
<<run State.variables.body.phantoms.push({
    source: 'Katya',
    type: 'hip_sway',
    intensity: 2,
    day: State.variables.calendar.day
})>>

// Decay Flor's remaining phantoms
<<run SOY.Body.decayPhantoms()>>
```

---

## ECONOMY UPDATES

```javascript
// Day 3 possible expenses (depends on player choices):

// Bus fare: $2.75
<<run SOY.Economy.spend(2.75, 'transport')>>

// Lulu's milk (if visited): $3.50
<<run SOY.Economy.spend(3.50, 'food')>>

// Vega mezcal x2 + tip (if visited): $32
<<run SOY.Economy.spend(24, 'drinks')>>
<<run SOY.Economy.spend(8, 'drinks')>>

// Modelo at home: $2
<<run SOY.Economy.spend(2, 'food')>>

// Running balance after all possible expenses: ~$2,010-$2,047
// Minimum path (home direct): ~$2,045
// Maximum path (Lulu + Vega): ~$2,010
```

---

## QUEST AND FLAG UPDATES

```javascript
// === NEW FLAGS (set during Day 3) ===

<<set $flags.module2_started = true>>
<<set $flags.katya_transferred = true>>
<<set $flags.mirror_time = 4>>                // Manuel's mirror hesitation
<<set $flags.lyla_friday_declared = true>>     // Friday visit incoming
<<set $flags.adriana_met = false>>             // Set TRUE only if Vega visited

// Conditional flag:
// In t0_day03_vega_enter:
<<set $flags.adriana_met = true>>


// === QUEST TRACKER OBJECT ===
// Initialize if not exists, update for Day 3

<<if !$quests>><<set $quests = {}>><</if>>

// Main quest
<<set $quests.mq_module2 = {
    status: 'in_progress',
    day3: 'complete',
    day4: 'pending',
    scenarios_completed: ['mirror', 'shower', 'knock']
}>>

// Side quests
<<set $quests.sq001_visa = { status: 'active', days_remaining: 25, next: 'Day 5 Diana call' }>>
<<set $quests.sq002_lyla = { status: 'active', suspicion: 4, next: 'Day 5 Friday visit' }>>
<<set $quests.sq003_james = { status: 'active', next: 'Day 4 Thai dinner 7PM' }>>
<<set $quests.sq004_mama = { status: 'active', next: 'Cousin may text. Next Wednesday voice note.' }>>
<<set $quests.sq005_vidal = { status: 'active', note_count: 3, next: 'Day 5-6 in-person confrontation' }>>
<<set $quests.sq006_echo = { status: 'active', active_phantoms: ['blush(3)', 'temp(2)', 'sway(2)', 'chest(1)'] }>>
<<set $quests.sq007_tommy = { status: 'active', bond_level: 3, next: 'Day 4-5 Danny\'s outside facility' }>>
<<set $quests.sq008_georgia = { status: 'initiated', next: 'Ongoing gendered observations' }>>

// Conditional quest:
<<if $flags.adriana_met>>
<<set $quests.sq009_adriana = { status: 'initiated', stage: 'first_meeting', relationship: 1, next: 'Day 6/8 return to Vega' }>>
<</if>>

<<set $quests.sq010_paco_brazilian = { status: 'background', next: 'Periodic call updates' }>>
```

---

## CONTENT RATING IMPLEMENTATION

```twee
// Tag passages with content level:

:: t0_day03_scenario2_shower [mature]
// Changing clothes in Katya's body. Bra awareness. No nudity described
// but vulnerability and body-awareness are intense.

:: t0_day03_night_processing [intimate]
// Unfocused arousal in bed. Phantom sensations. NOT acted on.
// Wrap in settings check:

<<if $settings.showExplicit>>
  /* Full phantom processing: diffuse warmth, hip bone pressing,
     nervous system mapping Katya's sensations onto male body,
     arousal present but unresolved */
<<else>>
  The transfer echoes follow me to bed. Katya's body left fingerprints 
  in my nervous system that my own body tries to read and can't quite 
  translate. I lie in the dark, full of data I don't have categories for. 
  Sleep comes. Not peacefully. More like it shows up and insists.
<</if>>
```

---

## SIDEBAR STATE

```twee
:: StoryCaption [Day 3 specifics]

/* Time display updates with each advance() call */
Wednesday · MORNING → AFTERNOON → EVENING → NIGHT

/* Body indicator */
♂ Manuel           (morning, evening, night)
♀ Katya            (during facility transfer, ~2 hours)
♂ Manuel ⟡ echoes  (post-transfer, rest of day)

/* Money: updates with each spend() */
$2,010 - $2,047    (range depending on choices)

/* Location: updates with each travel() */
📍 Manuel's Apartment → SoY Facility → [Lulu's / Vega / Park / Home] → Apartment

/* Phone: unread count */
📱 4 unread → decreases as player reads in phone_evening passage
```

---

## OPEN WORLD DESIGN RULES FOR DAY 3

### Main Objectives (Mandatory)
1. ✅ Complete Module 2 ethics lecture
2. ✅ Complete Katya transfer + calibration
3. ✅ Complete Scenarios 1, 2, 3
4. ✅ Complete Rafael debrief
5. ✅ Process phone messages before sleep

### Side Objectives (Optional, Tracked)
1. ☐ Visit Vega bar (initiates SQ-009: Adriana's Orbit)
2. ☐ Visit Lulu's bodega (advances SQ relationship)
3. ☐ Text Tommy about Danny's (advances SQ-007)
4. ☐ Walk the neighborhood (body-echo processing scene)
5. ☐ Read Mamá's voice note
6. ☐ Respond to Paco's morning text
7. ☐ Read Señora Vidal's note

### Branching Rules
- **The evening choice is the primary open-world moment.** Morning and facility are linear.
- **Not all branches need visiting.** Game tracks what was seen via flags.
- **Adriana's first meeting is the highest-value optional content.** If skipped, it shifts to Day 6 (Saturday) with modified dialogue that accounts for not having met her yet.
- **Lulu chains into Vega.** The bodega stop + bar creates a natural two-stop evening.
- **Phone messages arrive regardless of evening choice.** Lyla/Paco/James exchanges happen at home.
- **Track NPC visit frequency.** If Vega visited on Day 3, Adriana references it next time. If skipped, first meeting adjusts.
- **All paths converge at t0_day03_phone_evening.** No matter where the player spends the evening, they end up at home with phone and bed.

### Scene Length Targets
| Passage | Words |
|---------|-------|
| Morning apartment | 800-1000 |
| Bus | 500-600 |
| Arrival + pre-lecture | 400-500 |
| Ethics lecture (full) | 1500-2000 |
| Lunch cafeteria | 800-1000 |
| Transfer + calibration | 600-800 |
| Scenario 1 (Mirror) | 500-600 |
| Scenario 2 (Shower) | 600-800 |
| Scenario 3 (Knock) | 400-500 |
| Rafael debrief | 800-1000 |
| Evening transition | 300-400 |
| Vega/Adriana (optional) | 1500-2000 |
| Lulu (optional) | 500-600 |
| Phone exchanges | 300-400 each |
| Night processing | 400-500 |

---
