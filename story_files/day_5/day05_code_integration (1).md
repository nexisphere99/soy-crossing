# DAY 5 — CODE AGENT INTEGRATION PROMPT
## For Converting Day 5 Content into Twine/SugarCube 2.x Passages

---

## OVERVIEW

You are integrating Day 5 (Friday, Visa Clock 23 days) into a Twine SugarCube 2.x open world interactive fiction game. Day 5 contains Module 3 content (Contract Theory + Renata transfer + Scenario 5: Medical Appointment), significant NPC side quests (Lyla interrogation fires, Diana's visa call, Tommy/Georgia bonding, Brett tracking, Adriana text thread), and a solo processing scene.

Refer to `game_architecture.md` for file structure, design system, systems code, passage naming conventions, and CSS. All code must be pure SugarCube 2.x macro syntax. No frameworks. No npm. No build tools beyond Tweego compilation.

---

## FILE OUTPUT REQUIRED

Create the following `.twee` files for Day 5:

### 1. `src/passages/tier0/t0_day05.twee`
Main routing passage for the day. Handles morning, facility redirect, evening branching, and sleep transition.

### 2. `src/passages/tier0/t0_day05_morning.twee`
Morning routine content. Includes:
- Wake scene (5:52 AM, phantom description, Chipi)
- Shower scene (body comparison, Renata anticipation)
- Getting dressed (gray henley, boots, olive jacket)
- Kitchen (Chipi vs grinder, Mrs. Okafor casserole, coffee)
- Phone check (Paco, Lyla chart preview, Mamá voice note)
- Señora Vidal note #5 and PLAYER CHOICE (3 options with relationship consequences)
- Bus scene (gospel driver, nurse observation, Tommy texts)
- Facility arrival (Yuki pins: book + speculum)

### 3. `src/passages/tier0/t0_day05_facility.twee`
Facility hub for the day. Routes to:
- Pre-lecture cafeteria (Tommy, Georgia gathering)
- Elena's contract theory lecture
- Contract negotiation practical (face-to-face with Elena-as-Maria)
- Transfer into Renata (calibration, clinical calibration)
- Scenario 5: The Medical Appointment (full exam scene)
- De-transfer
- Rafael debrief
- Post-facility corridor (Tommy suggests Danny's, Brett interaction choice)

### 4. `src/passages/tier0/t0_day05_evening.twee`
Evening routing. Includes:
- Leaving facility scene (phantom inventory, emotional processing)
- Diana's phone call (on bus)
- Home arrival (Chipi, decompression)
- Getting ready for Lyla
- PRE-LYLA PLAYER CHOICE (Lulu stop, go direct, text Adriana)
- Post-Lyla walk home
- Adriana text thread (conditional on pre-Lyla choice C)
- Home late, messages check
- Solo scene (slower, crying mixed with arousal)
- Sleep transition to Day 6

### 5. `src/passages/npcs/lyla/lyla_sq002_fire.twee`
The Lyla Friday interrogation. Full scene with THREE-WAY BRANCH:
- Option A: Deflection (reveal nothing, NDA excuse)
- Option B: Partial truth (consciousness transfer, female bodies, no scenarios)
- Option C: Full truth (everything including scenarios)
Each branch has distinct dialogue, reactions, and consequences.

### 6. `src/passages/npcs/tommy/tommy_day05.twee`
Tommy interactions: pre-lecture cafeteria, post-practical Danny's suggestion.

### 7. `src/passages/npcs/georgia/georgia_day05.twee`
Georgia Scenario 4 comparison conversation. Male body arousal vs female body arousal discussion.

### 8. `src/passages/npcs/brett/brett_day05.twee`  
Brett corridor interaction. Three-way player choice (walk past, offer Danny's, silent sit).

---

## VARIABLE UPDATES FOR DAY 5

Add to `src/init/variables.twee` or update in StoryInit:

```javascript
/* Day 5 specific state */
<<set $day5 = {
    senoraChoice: null,        // 'postit', 'knock', 'ignore'
    preLylaChoice: null,       // 'lulu', 'direct', 'textAdriana'
    lylaDisclosure: null,      // 'deflect', 'partial', 'full'
    brettChoice: null,         // 'walkpast', 'dannys', 'silentsit'
    danielaChoice: null,       // 'checknumber', 'delay', 'ignore'
    dianaCallComplete: false,
    scenarioFiveComplete: false,
    renataCalibration: 26,     // seconds
    spectrumProcessed: false   // solo scene completed
}>>
```

Update existing systems:

```javascript
/* Body system update after Renata transfer */
<<run SOY.Body.transfer('7-R', {
    name: 'Renata',
    designation: '7-R',
    height: "5'6\"",
    skin: 'golden-brown',
    hair: 'jet-black curly, past shoulders',
    eyes: 'dark brown, amber flecks',
    cupSize: 'D',
    build: 'strong curvy frame',
    hips: 'wide',
    neuralProfile: 'dynamic',
    notes: 'conditioned movement patterns, arousal indicators, hip sway, auto leg cross'
})>>

/* After de-transfer, add phantoms */
<<run SOY.Body.deTransfer()>>
/* Phantoms auto-added by deTransfer function */

/* Economy: Day 5 expenses */
<<run SOY.Economy.dailyCourseFee()>>  /* -$150 */
/* Bus: -$2.75 */
/* Wine bar: ~$24 (3 glasses) */
/* Lulu mints (if chosen): -$3 */

/* NPC relationship updates based on choices */
<<if $day5.lylaDisclosure === 'partial'>>
    <<run SOY.NPCs.adjustRelationship('lyla', 2)>>
<<elseif $day5.lylaDisclosure === 'full'>>
    <<run SOY.NPCs.adjustRelationship('lyla', 3)>>
<</if>>

<<run SOY.NPCs.adjustRelationship('tommy', 1)>>  /* Danny's suggestion */

/* Conditional Adriana update */
<<if $day5.preLylaChoice === 'textAdriana'>>
    <<run SOY.NPCs.adjustRelationship('adriana', 0.5)>>
    <<set $flags.adriana_text_initiated = true>>
<</if>>

/* Phone messages */
<<run SOY.Phone.addMessage('paco', "Hermano. Can't sleep. Keep thinking about what you said about the hand on the knee. Wild. Also Isabela sent me a voice note and she LAUGHED at one of my jokes.")>>
<<run SOY.Phone.addMessage('lyla', "TODAY IS THE DAY MANUEL. FRIDAY. WINE. NO ESCAPE. My theories have reached their final form. I have a CHART.")>>
<<run SOY.Phone.addMessage('paco', "HERMANO. Isabela video-called me. VIDEO. CALL. She was at the beach. In Florianópolis. In a BIKINI. I proposed.")>>
<<run SOY.Phone.addMessage('james', "Hope Friday is treating you right! Casserole holding up? Mom wants to know.")>>
```

---

## PASSAGE STRUCTURE EXAMPLE

### Main Day Router:

```twee
:: t0_day05 [day-start]
<<run SOY.Time.init()>>
<<set $calendar.day = 5>>
<<set $calendar.weekday = 5>>  /* Friday */
<<set $calendar.phase = 'course'>>
<<set $calendar.courseDay = 5>>

/* Decay yesterday's phantoms */
<<run SOY.Body.decayPhantoms()>>

<<goto "t0_day05_morning">>
```

### Morning with Choice:

```twee
:: t0_day05_morning
/* ... morning prose content ... */

/* Señora Vidal choice */
<div class="choice-block">
    The note is still in my hand. The plate is warm through the foil.

    <<link "Leave a Post-It on her door">>
        <<set $day5.senoraChoice = 'postit'>>
        <<run SOY.NPCs.adjustRelationship('senora_vidal', 1)>>
        <<goto "t0_day05_morning_senora_postit">>
    <</link>>

    <<link "Knock on her door">>
        <<set $day5.senoraChoice = 'knock'>>
        <<run SOY.NPCs.adjustRelationship('senora_vidal', 2)>>
        <<goto "t0_day05_morning_senora_knock">>
    <</link>>

    <<link "Take the plate, leave nothing">>
        <<set $day5.senoraChoice = 'ignore'>>
        <<goto "t0_day05_morning_bus">>
    <</link>>
</div>
```

### Facility Scene with Transfer:

```twee
:: t0_day05_transfer_renata
<<run SOY.Body.transfer('7-R', setup.bodies['7-R'])>>

<div class="transfer-effect">
    /* Transfer prose with CSS animation */
    Heat. Not the warm wave from Flor. Not the electric flush from Katya...
</div>

/* Post-transfer, body indicator in sidebar updates automatically */
/* Sidebar reads SOY.Body.isTransferred() and shows ♀ Renata */

/* ... calibration prose ... */

<<link "Proceed to Scenario 5">>
    <<goto "t0_day05_scenario5">>
<</link>>
```

### Branching Lyla Scene:

```twee
:: lyla_sq002_disclosure_choice
/* After wine and chart reveal */

<div class="choice-block choice-major">
    She's waiting. The chart is on the table. Five theories, all wrong. What do I tell her?

    <<link "The NDA protects the visa. I can't say more. (Deflect)">>
        <<set $day5.lylaDisclosure = 'deflect'>>
        <<goto "lyla_sq002_deflect">>
    <</link>>

    <<link "It's consciousness transfer. They put my brain in female clone bodies. (Partial truth)">>
        <<set $day5.lylaDisclosure = 'partial'>>
        <<run SOY.NPCs.adjustRelationship('lyla', 2)>>
        <<set $flags.lyla_knows = true>>
        <<goto "lyla_sq002_partial">>
    <</link>>

    <<link "Tell her everything. The bodies, the training, the speculum. (Full truth)">>
        <<set $day5.lylaDisclosure = 'full'>>
        <<run SOY.NPCs.adjustRelationship('lyla', 3)>>
        <<set $flags.lyla_knows = true>>
        <<set $flags.lyla_knows_details = true>>
        <<goto "lyla_sq002_full">>
    <</link>>
</div>
```

---

## CSS ADDITIONS FOR DAY 5

```css
/* Major choice indicator — used for story-altering decisions */
.choice-major {
    border-left: 3px solid var(--warning);
    padding-left: var(--space-md);
    margin: var(--space-lg) 0;
}

.choice-major::before {
    content: '⚖';
    display: block;
    font-size: var(--text-sm);
    color: var(--warning);
    margin-bottom: var(--space-xs);
    opacity: 0.7;
}

/* Medical scene styling — clinical, slightly cold */
.scene-medical {
    border-left: 2px solid var(--info);
    padding-left: var(--space-md);
    color: var(--text-primary);
    background: rgba(96, 165, 250, 0.03);
    padding: var(--space-md);
    border-radius: var(--radius-md);
}

/* Solo scene styling — intimate, warm */
.scene-solo {
    border-left: 2px solid var(--intimate);
    padding-left: var(--space-md);
    background: rgba(192, 132, 252, 0.03);
    padding: var(--space-md);
    border-radius: var(--radius-md);
}

/* Phone message notification */
.phone-notification {
    position: fixed;
    bottom: var(--space-md);
    right: var(--space-md);
    background: var(--bg-raised);
    border: 1px solid var(--accent);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    font-size: var(--text-sm);
    color: var(--text-accent);
    animation: slide-up 0.3s ease-out;
    z-index: 50;
    cursor: pointer;
}

@keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

/* Transfer warp specific to Renata (heavier, slower) */
.transfer-effect-renata {
    animation: transfer-warp-heavy 2s ease-in-out;
}

@keyframes transfer-warp-heavy {
    0%   { filter: blur(0); opacity: 1; transform: scale(1); }
    25%  { filter: blur(3px); opacity: 0.7; transform: scale(0.98); }
    50%  { filter: blur(8px); opacity: 0.2; transform: scale(0.95); }
    75%  { filter: blur(4px); opacity: 0.6; transform: scale(1.02); }
    100% { filter: blur(0); opacity: 1; transform: scale(1); }
}
```

---

## OBJECTIVE SYSTEM FOR DAY 5

### Main Objectives (Required to advance to Day 6):

```javascript
setup.day5Objectives = {
    main: [
        {
            id: 'attend_lecture',
            label: 'Attend Module 3 Contract Theory Lecture',
            complete: false,
            passage: 't0_day05_lecture'
        },
        {
            id: 'negotiate_contract',
            label: 'Negotiate the Medical Appointment Contract',
            complete: false,
            passage: 't0_day05_negotiation'
        },
        {
            id: 'transfer_renata',
            label: 'Transfer into Clone 7-R (Renata)',
            complete: false,
            passage: 't0_day05_transfer_renata'
        },
        {
            id: 'scenario_5',
            label: 'Complete Scenario 5: The Medical Appointment',
            complete: false,
            passage: 't0_day05_scenario5'
        },
        {
            id: 'rafael_debrief',
            label: 'Complete Rafael\'s Debrief',
            complete: false,
            passage: 't0_day05_debrief'
        },
        {
            id: 'diana_call',
            label: 'Take Diana\'s Call',
            complete: false,
            passage: 't0_day05_diana_call'
        }
    ],
    side: [
        {
            id: 'sq002_lyla',
            label: 'Friday drinks with Lyla',
            complete: false,
            required: true,  // This side quest fires on Day 5, can't skip
            passage: 'lyla_sq002_fire'
        },
        {
            id: 'sq005_senora',
            label: 'Respond to Señora Vidal',
            complete: false,
            required: false,
            passage: 't0_day05_morning_senora'
        },
        {
            id: 'sq007_tommy_invite',
            label: 'Accept Tommy\'s Danny\'s invitation',
            complete: false,
            required: false,
            passage: 'tommy_day05_dannys'
        },
        {
            id: 'sq008_georgia_compare',
            label: 'Compare Scenario 4 notes with Georgia',
            complete: false,
            required: false,
            passage: 'georgia_day05_compare'
        },
        {
            id: 'sq011_brett',
            label: 'Interact with Brett',
            complete: false,
            required: false,
            passage: 'brett_day05_corridor'
        },
        {
            id: 'sq009_adriana_text',
            label: 'Text Adriana',
            complete: false,
            required: false,
            passage: 't0_day05_adriana_text'
        },
        {
            id: 'sq004_daniela',
            label: 'Respond to Mamá about Daniela',
            complete: false,
            required: false,
            passage: 't0_day05_daniela_choice'
        }
    ]
};
```

### Objective Tracking Widget:

```twee
:: ObjectiveTracker [widget]
<<widget "showObjectives">>
<div class="objectives-panel">
    <h3>Day <<= $calendar.day>> — <<= SOY.Time.dayName()>></h3>
    <div class="objectives-main">
        <h4>Main</h4>
        <<for _obj range setup['day' + $calendar.day + 'Objectives'].main>>
            <div class="objective <<if _obj.complete>>complete<</if>>">
                <<if _obj.complete>>✓<<else>>○<</if>> <<= _obj.label>>
            </div>
        <</for>>
    </div>
    <div class="objectives-side">
        <h4>Side</h4>
        <<for _obj range setup['day' + $calendar.day + 'Objectives'].side>>
            <div class="objective <<if _obj.complete>>complete<</if>> <<if _obj.required>>required<</if>>">
                <<if _obj.complete>>✓<<else>>◇<</if>> <<= _obj.label>>
                <<if _obj.required>><span class="req-badge">!</span><</if>>
            </div>
        <</for>>
    </div>
</div>
<</widget>>
```

---

## DAY FLOW DIAGRAM

```
t0_day05 (router)
  └→ t0_day05_morning
       ├→ t0_day05_morning_senora_postit (choice A)
       ├→ t0_day05_morning_senora_knock (choice B)
       └→ t0_day05_morning_bus
            └→ t0_day05_facility_arrive
                 └→ t0_day05_cafeteria_prelecture
                      ├→ georgia_day05_compare (optional, lunch)
                      └→ t0_day05_lecture
                           └→ t0_day05_negotiation
                                └→ t0_day05_transfer_renata
                                     └→ t0_day05_calibration
                                          └→ t0_day05_scenario5
                                               └→ t0_day05_detransfer
                                                    └→ t0_day05_debrief
                                                         ├→ tommy_day05_dannys (corridor)
                                                         ├→ brett_day05_corridor (choice)
                                                         └→ t0_day05_evening
                                                              └→ t0_day05_diana_call (bus)
                                                                   └→ t0_day05_home_arrive
                                                                        └→ t0_day05_getting_ready
                                                                             ├→ t0_day05_lulu_stop (choice A)
                                                                             ├→ t0_day05_adriana_text (choice C)
                                                                             └→ lyla_sq002_fire
                                                                                  ├→ lyla_sq002_deflect
                                                                                  ├→ lyla_sq002_partial
                                                                                  └→ lyla_sq002_full
                                                                                       └→ t0_day05_walk_home
                                                                                            └→ t0_day05_home_late
                                                                                                 └→ t0_day05_solo
                                                                                                      └→ t0_day05_sleep → DAY 6
```

---

## INTEGRATION NOTES

1. **Tag all day-start passages** with `[day-start]` for autosave triggering per `Config.saves.autosave`.

2. **Sidebar updates automatically** via the `StoryCaption` widget reading `SOY.Body.isTransferred()`. During Renata transfer, sidebar shows `♀ Renata`. After de-transfer, shows `♂ Manuel` with `⟡ echoes`.

3. **Phone notifications** should trigger at scripted moments using a timed macro or passage tag. Paco's late-night texts arrive during the Lyla scene as ambient notifications.

4. **The Lyla disclosure choice is the biggest branching point of Tier 0 so far.** Option B (partial truth) is the canonical "intended" path for richest downstream content, but all three must be fully written and tracked. The `$flags.lyla_knows` boolean gates all future Lyla conversations.

5. **Content rating gates:** The solo scene and parts of Scenario 5 should be wrapped in `<<if $settings.showExplicit>>` / `<<else>>` fade-to-black blocks per the game architecture's content rating system.

6. **Transfer animation:** Use `.transfer-effect-renata` CSS class for the Renata transfer, which is slower and heavier than previous transfers to reflect higher body mass.

7. **The speculum scene** should use the `.scene-medical` CSS class for visual distinction. The solo scene uses `.scene-solo`.

8. **Objective completion** should fire via `<<run setup.day5Objectives.main[N].complete = true>>` at the appropriate passage entry points. The objective panel updates reactively.

---

*End of Code Integration Prompt — Day 5*
