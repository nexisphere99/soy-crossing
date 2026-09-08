# SHAPE OF YOU: CROSSING, DAY 2 CONTENT PACKAGE
## PART 4: CODE AGENT INTEGRATION PROMPT

---

## AGENT TASK

Integrate Day 2 narrative content into Twine/SugarCube 2.x .twee files. Day 2 introduces the TRANSFER SYSTEM, the most complex mechanical addition so far. Content exists in three markdown files (Part 1: Daily Life, Part 2: Course/Transfer, Part 3: NPC/Side Quests).

---

## PASSAGE FLOW, DAY 2 COMPLETE MAP

```
t0_day02_wake [day-start]
├── t0_day02_paco_morning_text (optional)
└── t0_day02_bus (required)
    └── t0_day02_facility_morning (MORNING, auto-advance time)

t0_day02_facility_morning
├── t0_day02_lecture_pretransfer (pre-transfer protocols)
├── t0_day02_lecture_gender (gender differential briefing)
├── t0_day02_transfer_wait (waiting period)
│   └── t0_day02_tommy_cafeteria (NPC: Tommy bonding)
├── t0_day02_transfer_room (AFTERNOON, enter transfer room)
├── t0_day02_transfer_begins (*** THE TRANSFER ***)
├── t0_day02_exercise_standing (guided exercise 1)
├── t0_day02_exercise_walking (guided exercise 2)
├── t0_day02_exercise_hands (guided exercise 3)
├── t0_day02_exercise_voice (guided exercise 4)
├── t0_day02_exercise_clothing (guided exercise 5)
├── t0_day02_detransfer (return to own body)
└── t0_day02_debrief (Rafael session)

t0_day02_evening_walk (EVENING, auto-advance time)
├── t0_day02_walk_noticing (ambient: noticing women's movements)
├── t0_day02_dannys (optional: ramen)
│   └── t0_day02_tommy_after (optional: Tommy at Danny's)
└── t0_day02_evening_home
    ├── t0_day02_evening_couch_sit (optional: sit with phantoms)
    ├── t0_day02_evening_phone (phone check)
    │   ├── t0_day02_lyla_call OR t0_day02_lyla_text_dodge
    │   └── t0_day02_paco_evening → call or text
    ├── t0_day02_senora_vidal (random: 50% chance)
    ├── t0_day02_shower_night (optional: shower body awareness)
    └── t0_day02_sleep (NIGHT, end of day)
        → t0_day03_wake
```

---

## NEW SYSTEM: TRANSFER SEQUENCE

The transfer is the core mechanical event of Day 2. It requires specific state changes in the Body system.

### Transfer State Machine

```javascript
// Add to body.js or as extension
SOY.Transfer = {
    // Pre-transfer check
    canTransfer: function() {
        var cal = State.variables.calendar;
        var lastMeal = State.variables.body.lastMealTime;
        // Must be 4+ hours since last meal
        return !SOY.Body.isTransferred();
    },

    // Execute transfer sequence
    begin: function(bodyId, bodyData) {
        SOY.Body.transfer(bodyId, bodyData);
        State.variables.body.transferStartTime = State.variables.calendar.timeSlot;
        State.variables.body.currentExercise = 0;
    },

    // Track exercise completion
    completeExercise: function(exerciseName) {
        var exercises = State.variables.body.exercisesCompleted || [];
        exercises.push(exerciseName);
        State.variables.body.exercisesCompleted = exercises;
        State.variables.body.currentExercise++;
    },

    // De-transfer with phantom generation
    end: function() {
        SOY.Body.deTransfer();
        State.variables.body.exercisesCompleted = [];
        State.variables.body.todayTransferred = true;
    }
};
```

### Clone Data: Flor (7-F)

```javascript
// Add to bodies.json or setup
setup.clones = setup.clones || {};
setup.clones['7f'] = {
    id: '7f',
    name: 'Flor',
    designation: 'Clone 7-F',
    height: "5'4\"",
    skinTone: 'light brown',
    hair: 'dark brown, wavy, shoulder-length',
    eyes: 'brown',
    cupSize: 'B',
    build: 'athletic-slim',
    hips: 'moderate',
    hands: 'small, short nails',
    details: 'moles across collarbones',
    neuralProfile: 'passive',
    description: 'Deliberately average. A body that feels like a body, not a statement.',
    module: 1
};
```

### Phantom System Extension

```javascript
// Extend body.js phantom system for Day 2
SOY.Body.generatePhantoms = function(bodyData) {
    var phantoms = [];

    // Chest phantom (always generated for female transfer)
    phantoms.push({
        type: 'chest_weight',
        description: 'Phantom softness at the chest. Expecting weight that is not there.',
        intensity: 3,
        source: bodyData.name,
        day: State.variables.calendar.day
    });

    // Hip phantom
    phantoms.push({
        type: 'hip_sway',
        description: 'Gait keeps adjusting for wider hips.',
        intensity: 2,
        source: bodyData.name,
        day: State.variables.calendar.day
    });

    // Hand phantom
    phantoms.push({
        type: 'hand_size',
        description: 'Hands feel too large. Expecting smaller, more precise fingers.',
        intensity: 2,
        source: bodyData.name,
        day: State.variables.calendar.day
    });

    // Voice phantom
    phantoms.push({
        type: 'voice_register',
        description: 'Own voice sounds deeper than expected.',
        intensity: 1,
        source: bodyData.name,
        day: State.variables.calendar.day
    });

    State.variables.body.phantoms = phantoms;
};
```

### Transfer Animation CSS

```css
/* Transfer effect, used during consciousness swap scenes */
.transfer-sequence {
    animation: transfer-warp 2s ease-in-out;
}

@keyframes transfer-warp {
    0%   { filter: blur(0); opacity: 1; transform: scale(1); }
    20%  { filter: blur(2px); opacity: 0.8; transform: scale(0.98); }
    40%  { filter: blur(6px); opacity: 0.4; transform: scale(0.95); }
    50%  { filter: blur(10px); opacity: 0.1; transform: scale(0.9); }
    60%  { filter: blur(6px); opacity: 0.4; transform: scale(0.95); }
    80%  { filter: blur(2px); opacity: 0.8; transform: scale(0.98); }
    100% { filter: blur(0); opacity: 1; transform: scale(1); }
}

/* De-transfer (reverse, faster) */
.detransfer-sequence {
    animation: detransfer-warp 1.2s ease-in-out;
}

@keyframes detransfer-warp {
    0%   { filter: blur(0); opacity: 1; }
    30%  { filter: blur(8px); opacity: 0.2; }
    50%  { filter: blur(4px); opacity: 0.5; }
    100% { filter: blur(0); opacity: 1; }
}

/* Body indicator transition */
.body-indicator.transitioning {
    animation: body-shift 1s ease-in-out;
    background: rgba(167, 139, 250, 0.15);
    color: var(--body-transfer);
    border-color: rgba(167, 139, 250, 0.3);
}
```

### Exercise Progress Widget

```twee
:: ExerciseProgress [widget]
<<widget "exerciseProgress">>
    <<set _total = 5>>
    <<set _done = State.variables.body.currentExercise || 0>>
    <div class="exercise-tracker">
        <span class="exercise-label">Transfer Exercises</span>
        <div class="exercise-bar">
            <<for _i = 0; _i < _total; _i++>>
                <span class="exercise-dot <<if _i < _done>>completed<</if>>"></span>
            <</for>>
        </div>
        <span class="exercise-count"><<= _done>>/<<= _total>></span>
    </div>
<</widget>>
```

```css
.exercise-tracker {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-xs) var(--space-sm);
    background: var(--bg-surface);
    border-radius: var(--radius-md);
    margin: var(--space-sm) 0;
}

.exercise-label {
    font-size: var(--text-xs);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.exercise-bar {
    display: flex;
    gap: 4px;
}

.exercise-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-default);
    transition: background 0.3s;
}

.exercise-dot.completed {
    background: var(--accent);
    box-shadow: 0 0 6px var(--accent-glow);
}

.exercise-count {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
}
```

---

## QUEST UPDATES FOR DAY 2

```javascript
// Register Day 2 quests in the wake passage
// t0_day02_wake [day-start]

// Update main quest
State.variables.quests.main.t0_day02 = {
    id: "first_transfer",
    title: "First Transfer",
    status: "active",
    objectives: [
        { id: "lecture", text: "Attend pre-transfer lecture", done: false },
        { id: "transfer", text: "Transfer into Clone 7-F", done: false },
        { id: "exercises", text: "Complete guided exercises", done: false },
        { id: "detransfer", text: "Return to your body", done: false },
        { id: "debrief", text: "Complete Rafael's debrief", done: false }
    ]
};

// New side quests
SOY.Quests.addSide({
    id: "sq_006_echo",
    title: "Body Echo",
    description: "Your body remembers shapes it tried on. Track the phantoms.",
    status: "active",
    recurring: true,
    passive: true, // No explicit completion, atmospheric tracking
    objectives: [
        { id: "first_phantom", text: "Notice your first phantom sensation", done: false }
    ]
});

SOY.Quests.addSide({
    id: "sq_007_tommy",
    title: "Tommy's Nerve",
    description: "Tommy invited you to compare notes after the transfer.",
    status: "active",
    recurring: false,
    objectives: [
        { id: "post_transfer", text: "Meet Tommy after your transfers", done: false }
    ]
});
```

---

## FILE ORGANIZATION FOR DAY 2

```
src/passages/tier0/
├── t0_day02_morning.twee      // wake, bus, morning texts
├── t0_day02_facility.twee     // lecture, transfer wait, tommy cafeteria
├── t0_day02_transfer.twee     // transfer room, transfer, all exercises, detransfer
├── t0_day02_debrief.twee      // Rafael session
├── t0_day02_evening.twee      // walk, home, couch, shower, sleep
├── t0_day02_phone.twee        // Lyla call/text, Paco evening, James text
├── t0_day02_npcs.twee         // Tommy at Danny's, Señora Vidal note, walk noticing
└── t0_day02_quests.twee       // Quest registration and tracking
```

---

## TESTING CHECKLIST, DAY 2

- [ ] Transfer sequence fires correctly (body state changes to '7f')
- [ ] Sidebar updates: body indicator switches from male (blue) to female (pink) during transfer
- [ ] Exercise progress widget displays and fills correctly
- [ ] De-transfer returns body state to 'self'
- [ ] Phantoms generate after de-transfer (4 phantom types)
- [ ] Phantom indicator appears in sidebar ("⟡ echoes")
- [ ] Phantoms decay by 1 intensity at end of day
- [ ] $flags.first_transfer_done = true after debrief
- [ ] $player.totalTransfers increments to 1
- [ ] Conditional content works (Lyla suspicion branching)
- [ ] Tommy Danny's invite flag propagates to evening options
- [ ] Transfer animation CSS applies during transfer/detransfer passages
- [ ] Fasting mechanic: player cannot eat after 11 AM if transfer scheduled
- [ ] Time advances correctly: morning > afternoon (transfer) > evening > night
