# DAY 4   CODE AGENT INTEGRATION PROMPT
## Instructions for integrating Day 4 content into SugarCube 2.x Twine game

---

## OVERVIEW

Day 4 (Thursday, Module 2 Day 4) is a **linear morning + branching evening** structure. The course content (legal lecture + Scenario 4) is the fixed main quest. The evening opens into player choice between locations and NPC interactions. The day ends with a mandatory solo processing scene at home.

---

## PASSAGE MAP & FLOW

```
t0_day04_wake [day-start]
    │
    ├── t0_day04_shower
    ├── t0_day04_dress
    ├── t0_day04_breakfast
    ├── t0_day04_leave (Señora Vidal note)
    └── t0_day04_bus
            │
            ▼
    t0_day04_facility_arrive
            │
            ▼
    t0_day04_lecture_legal ──► t0_day04_lecture_cases ──► t0_day04_lecture_telemetry ──► t0_day04_lecture_rights
            │
            ▼
    t0_day04_pre_transfer
            │
            ▼
    t0_day04_transfer_katya ──► t0_day04_scenario4_couch ──► t0_day04_scenario4_partner
            │
            ▼
    t0_day04_detransfer ──► t0_day04_debrief_rafael
            │
            ▼
    t0_day04_evening_choice ◄── BRANCHING HUB
        │
        ├──► t0_day04_apartment_afternoon (go home early, decompress)
        │       └── t0_day04_james_dinner (triggered at 7 PM)
        │
        ├──► t0_day04_walk_neighborhood (park bench scene)
        │       └── t0_day04_james_dinner
        │
        └──► t0_day04_dannys_afternoon (optional Danny scene)
                └── t0_day04_james_dinner
                
    t0_day04_james_dinner ──► t0_day04_james_dinner_02 ──► t0_day04_james_dinner_03
            │
            ▼
    t0_day04_paco_call (walk home, phone call)
            │
            ▼
    t0_day04_home_late
            │
            ▼
    t0_day04_couch ──► t0_day04_bed_transition ──► t0_day04_solo
            │
            ▼
    t0_day04_sleep ──► [DAY 5]
```

---

## VARIABLE UPDATES

```javascript
// StoryInit or beginning of t0_day04_wake
// These fire at day start:

<<run SOY.Time.init()>> // already initialized
<<set $calendar.day = 4>>
<<set $calendar.weekday = 4>> // Thursday
<<set $calendar.phase = 'course'>>
<<set $calendar.courseDay = 4>>

// Body echo decay from Day 3
<<run SOY.Body.decayPhantoms()>>
// After decay, active phantoms: blush(2), temp(1), sway(1), chest(0 removed)

// New flag
<<set $flags.scenario4_complete = false>>
<<set $flags.first_solo_done = false>>
<<set $flags.james_dinner_done = false>>
<<set $flags.vidal_note_responded = false>>

// Money tracking
<<set $money.balance -= 2.75>> // bus fare
```

### Post-Scenario 4 Updates (in `t0_day04_detransfer`)
```javascript
<<set $flags.scenario4_complete = true>>
<<set $body.transferCount += 1>> // now 3 total (Flor, Katya x2)
<<set $body.todayTransferred = true>>

// Add new phantoms from Scenario 4
<<run SOY.Body.addPhantom({
    name: "Katya",
    type: "partner_touch",
    detail: "knee warmth, arousal residual",
    intensity: 3
})>>
<<run SOY.Body.addPhantom({
    name: "Katya",
    type: "arousal_echo",
    detail: "diffuse female arousal pattern",
    intensity: 3
})>>
```

### Evening Updates
```javascript
// After James dinner
<<set $flags.james_dinner_done = true>>
<<run SOY.NPCs.adjustRelationship('james', 1)>>
<<set $npcs.james.flags.guilt_dinners += 1>>
<<set $npcs.james.lastSeen = 4>>
<<run SOY.Economy.spend(0, 'food')>> // James paid

// If player left note for Señora Vidal
<<if $flags.vidal_note_responded>>
    <<run SOY.NPCs.adjustRelationship('senora_vidal', 1)>>
    <<set $npcs.senora_vidal.flags.notes_received = 1>>
<</if>>

// If player visited Danny's
<<if $flags.visited_dannys_day4>>
    <<run SOY.NPCs.adjustRelationship('danny', 1)>>
    <<run SOY.Economy.spend(10, 'food')>>
<</if>>

// Solo scene
<<set $flags.first_solo_done = true>>
<<set $body.arousal = 0>> // reset after processing
```

---

## PHONE MESSAGES (Timed Delivery)

```javascript
// Morning messages - deliver in t0_day04_breakfast
<<run SOY.Phone.addMessage('paco', 
    'Day 4 hermano. Legal day. They gonna tell you about the guy who jerked off in someone else\'s body and went to prison. Fun stuff. Chin up')>>
<<run SOY.Phone.addMessage('paco', 
    'Also the Brazilian sent me a gym video. She\'s doing hip thrusts. I am going to marry this woman')>>
<<run SOY.Phone.addMessage('lyla', 
    'Morning sunshine ☀️ reminder that tomorrow is FRIDAY and we are getting DRINKS and you are telling me what the MYSTERIOUS JOB is or I\'m waterboarding you with cheap wine. Non-negotiable.')>>

// Afternoon - deliver after facility
<<run SOY.Phone.addMessage('james', 
    'Still on for 7? Found the place. Siam Corner. My coworker says the pad thai is transcendent.')>>
<<run SOY.Phone.addMessage('james', 
    'Also fair warning, my mom made another casserole. You cannot say no.')>>

// Evening - deliver during dinner or after
<<run SOY.Phone.addVoiceNote('mama', 
    'Mijo, I talked to your tía Carmen and she says Daniela is settling in nicely in Queens. She works at a bank, Manuel. A BANK...',
    43)>> // 43 seconds

// Late evening - deliver after Paco call
<<run SOY.Phone.addMessage('lyla', 
    'T-minus 18 hours until Friday Interrogation. Current theory evolution: pharma test subject AND cult. Sleep well, lab rat.')>>
<<run SOY.Phone.addMessage('james', 
    'Really glad we hung out tonight man. The new gig sounds intense but I can tell it\'s good for you. Don\'t be a stranger.')>>
```

---

## CONTENT TOGGLE IMPLEMENTATION

```twee
:: t0_day04_solo
<<if $settings.showExplicit>>
    /* Insert full explicit solo scene from day04_daily_life.md */
    I don't fight it...
    [FULL EXPLICIT CONTENT]
<<else>>
    /* Insert fade-to-black version */
    I don't fight it. My hand finds its way under the waistband...
    [FADE VERSION]
<</if>>
```

---

## EVENING CHOICE HUB IMPLEMENTATION

```twee
:: t0_day04_evening_choice
<<set _available = SOY.Locations.getAvailable()>>
<<set $calendar.timeSlot = 2>> /* evening */

I walk out of the facility at 4:15. James dinner is at 7. I have almost three hours.

<<if _available.indexOf('apartment') !== -1>>
    [[Go home and decompress|t0_day04_apartment_afternoon]]   Chipi. Couch. Quiet.
<</if>>

[[Walk through the neighborhood|t0_day04_walk_neighborhood]]   Cold air. Room to think.

<<if _available.indexOf('dannys') !== -1>>
    [[Stop at Danny's|t0_day04_dannys_afternoon]]   Quick bowl. Quiet company.
<</if>>

/* Lulu's is available but Manuel walked past in the narrative. Optional: */
<<if _available.indexOf('lulus') !== -1>>
    [[Duck into Lulu's bodega|t0_day04_lulus_quick]]   Milk. Empanadas. Interrogation.
<</if>>

/* All paths converge at James dinner at 7 PM */
```

---

## SEÑORA VIDAL CHOICE POINT

```twee
:: t0_day04_leave
/* After reading note #4 */

<<set $flags.vidal_note_day4 = true>>

I fold the note and put it in my jacket pocket with the others.

[[Leave a thank-you note on her door|t0_day04_vidal_respond_note]]
[[Head out without responding|t0_day04_bus]]

:: t0_day04_vidal_respond_note
<<set $flags.vidal_note_responded = true>>
<<run SOY.NPCs.adjustRelationship('senora_vidal', 1)>>

/* Post-It note scene */
I find a Post-It in my kitchen drawer...
[SCENE CONTENT]

<<goto "t0_day04_bus">>
```

---

## SIDEBAR STATE FOR DAY 4

```
DAY 4   THURSDAY
Morning: ♂ Manuel | $2,097 (approx) | 📍 Apartment
Facility: ♀ Katya (during scenario) → ♂ Manuel | 📍 SoY Facility
Evening: ♂ Manuel | 📍 [Player choice] → Siam Corner → Apartment
Night: ♂ Manuel | ⟡ echoes (partner_touch, arousal) | 📍 Apartment
```

---

## OBJECTIVES SYSTEM

### Main Objectives (Day 4)
```javascript
<<set $objectives.main = [
    {
        id: "legal_lecture",
        text: "Attend Elena's legal framework lecture",
        complete: false,
        passage: "t0_day04_lecture_legal"
    },
    {
        id: "scenario4",
        text: "Complete Scenario 4: The Partner",
        complete: false,
        passage: "t0_day04_scenario4_partner"
    },
    {
        id: "debrief_rafael",
        text: "Debrief with Rafael",
        complete: false,
        passage: "t0_day04_debrief_rafael"
    }
]>>
```

### Side Objectives (Day 4)
```javascript
<<set $objectives.side = [
    {
        id: "james_dinner",
        text: "Meet James at Siam Corner (7 PM)",
        complete: false,
        mandatory: true, // triggers regardless of evening choice
        passage: "t0_day04_james_dinner"
    },
    {
        id: "vidal_respond",
        text: "Respond to Señora Vidal's note",
        complete: false,
        mandatory: false,
        passage: "t0_day04_vidal_respond_note"
    },
    {
        id: "evening_explore",
        text: "Spend the afternoon before dinner",
        complete: false,
        mandatory: false,
        choices: ["apartment", "walk", "dannys", "lulus"]
    },
    {
        id: "call_paco",
        text: "Call Paco on the walk home",
        complete: false,
        mandatory: true, // fires automatically
        passage: "t0_day04_paco_call"
    }
]>>
```

### Objective Completion Triggers
```javascript
// In each relevant passage, mark objectives complete:
// e.g., in t0_day04_lecture_legal:
<<run $objectives.main.find(o => o.id === "legal_lecture").complete = true>>

// In t0_day04_scenario4_partner:
<<run $objectives.main.find(o => o.id === "scenario4").complete = true>>
```

---

## PASSAGE TAGS

```
t0_day04_wake           [day-start]
t0_day04_facility_arrive [facility]
t0_day04_lecture_*       [facility] [lecture]
t0_day04_transfer_katya  [facility] [transfer]
t0_day04_scenario4_*     [facility] [transfer] [scenario]
t0_day04_debrief_rafael  [facility] [debrief]
t0_day04_evening_choice  [evening] [choice-hub]
t0_day04_walk_*          [evening] [optional]
t0_day04_dannys_*        [evening] [optional] [npc-danny]
t0_day04_james_dinner*   [evening] [npc-james] [mandatory]
t0_day04_paco_call       [evening] [npc-paco] [mandatory]
t0_day04_home_late       [night]
t0_day04_solo            [night] [explicit-toggle]
t0_day04_sleep           [night] [day-end]
```

---

## FILE OUTPUT

When compiling, Day 4 content goes into:

```
src/passages/tier0/t0_day04.twee
```

All passages for the day live in this single file. Phone messages are triggered via `<<run SOY.Phone.addMessage()>>` at the appropriate passage. The evening choice hub uses `<<if>>` blocks to show available locations based on time slot.

---

## TESTING CHECKLIST

- [ ] Day starts with autosave tag `[day-start]`
- [ ] Phantom decay runs on wake (Day 3 phantoms reduce)
- [ ] Lecture passages are linear (no branching during course)
- [ ] Transfer into Katya updates body state correctly
- [ ] Scenario 4 triggers new phantom additions on de-transfer
- [ ] Evening choice hub shows all available locations
- [ ] All evening paths converge at James dinner
- [ ] James dinner advances relationship +1
- [ ] Paco call fires after dinner walk
- [ ] Phone messages arrive at correct times
- [ ] Solo scene respects `$settings.showExplicit` toggle
- [ ] End of day resets `$body.todayTransferred` and sets arousal to 0
- [ ] Señora Vidal choice tracks in flags
- [ ] Objectives system marks complete at correct passages
- [ ] Day ends with sleep passage leading to Day 5

---
