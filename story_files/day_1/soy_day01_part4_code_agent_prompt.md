# SHAPE OF YOU: CROSSING   DAY 1 CONTENT PACKAGE
## PART 4: CODE AGENT INTEGRATION PROMPT
### Instructions for Converting Day 1 Content into Twine/SugarCube .twee Files

---

## AGENT TASK

You are integrating Day 1 narrative content into a Twine/SugarCube 2.x game. The content exists in three markdown files (Part 1: Daily Life, Part 2: Course, Part 3: NPC/Side Quests). Your job is to produce properly formatted .twee passage files that compile with Tweego into a single playable HTML.

---

## ARCHITECTURE REFERENCE

Follow the file structure, systems, and conventions from `game_architecture.md`. Key points:

- **Passage naming:** `t0_day01_[scene]` for Tier 0 Day 1 passages
- **Time system:** Call `SOY.Time.advance()` when moving between time slots (morning→afternoon→evening→night)
- **Location system:** Call `SOY.Locations.travel('location_id')` when Manuel moves between locations
- **NPC system:** Call `SOY.NPCs.adjustRelationship('npc_id', amount)` after meaningful interactions
- **Body system:** Day 1 has no transfers. `SOY.Body.isTransferred()` returns false all day
- **Economy:** Call `SOY.Economy.spend(amount, category)` for purchases
- **Phone:** Call `SOY.Phone.addMessage(from, text)` for incoming messages

---

## PASSAGE FLOW   DAY 1 COMPLETE MAP

```
t0_day01_wake [day-start]
├── t0_day01_phone_morning (optional: check texts)
├── t0_day01_mirror (shower/dress   required)
├── t0_day01_lulu_morning (optional: visit bodega)
└── t0_day01_bus (required   travel to facility)
    └── t0_day01_bus_stranger (random: 30% chance)

t0_day01_facility_arrival (MORNING   auto-advances time)
├── t0_day01_lecture_room (enter Room 4)
├── t0_day01_cohort_intro (meet candidates)
├── t0_day01_elena_entrance (Elena arrives)
├── t0_day01_lecture_begin (Module 1 lecture starts)
│   ├── t0_day01_lecture_methods (Transfer methods)
│   ├── t0_day01_lecture_questions (Q&A   interactive)
│   ├── t0_day01_lecture_science_2 (Compatibility, 72hr window)
│   └── t0_day01_lecture_clones (Clones vs Hosts)
├── t0_day01_break (break   meet Tommy)
│   └── t0_day01_cafeteria_wait (optional: meet Georgia)
└── t0_day01_rafael_intro (AFTERNOON   auto-advances time)
    └── t0_day01_rafael_session (90min psych eval)

t0_day01_evening_bodega (EVENING   auto-advances time)
└── t0_day01_evening_home
    ├── t0_day01_evening_cook (optional: cook rice & beans)
    ├── t0_day01_evening_phone (check messages)
    │   ├── t0_day01_james_text → accept/delay
    │   ├── t0_day01_mama_voicenote → listen/skip
    │   └── t0_day01_lyla_evening_texts → 3 response options
    ├── t0_day01_paco_call (required: call Paco)
    ├── t0_day01_dannys_option (optional: go to Danny's)
    │   └── t0_day01_dannys_scene
    ├── t0_day01_senora_vidal (random: 40% chance)
    ├── t0_day01_evening_couch (optional: second beer)
    ├── t0_day01_handbook_reading (optional: read PDF)
    └── t0_day01_sleep (NIGHT   required end of day)
        → t0_day02_wake
```

---

## TWEE FORMATTING RULES

### Passage Headers
```twee
:: passage_name [optional-tags]
```

Tags to use:
- `[day-start]`   triggers autosave
- `[facility]`   sets location context
- `[home]`   sets location context
- `[phone]`   phone UI overlay

### Variable Access
```twee
<<set $variable = value>>
<<if $condition>>content<</if>>
<<link "Display text" "target_passage">><<set $var = val>><</link>>
```

### Dialogue Macro (Custom   define in macros.js)
```javascript
// macros.js   Speech macro
Macro.add('say', {
    tags: null,
    handler: function() {
        var speaker = this.args[0];
        var mood = this.args.length > 1 ? this.args[1] : '';
        var text = this.payload[0].contents.trim();
        var output = '<div class="dialogue" data-speaker="' + speaker + '">';
        output += '<span class="speaker-name">' + speaker + '</span>';
        output += '<p class="speech">' + text + '</p>';
        output += '</div>';
        $(this.output).wiki(output);
    }
});
```

Usage in passages:
```twee
<<say "Elena">>The body is a vessel. Consciousness is the pilot. The vessel has its own momentum.<</say>>

<<say "Paco">>Hermano. This is either the wildest thing you've ever done or the smartest.<</say>>
```

### Phone Message Widget
```twee
:: PhoneMessage [widget]
<<widget "phoneMsg">>
    <<set _from = $args[0]>>
    <<set _text = $args[1]>>
    <div class="phone-message">
        <span class="sender"><<= _from>></span>
        <p class="text"><<= _text>></p>
    </div>
<</widget>>
```

### Time Transition Widget
```twee
:: TimeTransition [widget]
<<widget "timeSkip">>
    <<set _label = $args[0]>>
    <div class="time-transition">
        <span class="time-label"><<= _label>></span>
    </div>
    <<run SOY.Time.advance()>>
<</widget>>
```

---

## OBJECTIVE SYSTEM INTEGRATION

### Main Quest Tracking
```javascript
// In StoryInit or variables.twee
<<set $quests = {
    main: {
        t0_day01: {
            id: "first_day",
            title: "First Day",
            status: "active",  // active, complete, failed
            objectives: [
                { id: "arrive", text: "Arrive at Shape of You Inc.", done: false },
                { id: "intake", text: "Complete intake with Yuki", done: false },
                { id: "lecture", text: "Attend Elena's lecture", done: false },
                { id: "baseline", text: "Complete Rafael's psychological baseline", done: false },
                { id: "go_home", text: "Return home", done: false }
            ]
        }
    },
    side: []
}>>
```

### Objective Completion Macro
```javascript
Macro.add('completeObj', {
    handler: function() {
        var questId = this.args[0];
        var objId = this.args[1];
        var quest = State.variables.quests.main[questId];
        if (quest) {
            var obj = quest.objectives.find(function(o) { return o.id === objId; });
            if (obj) {
                obj.done = true;
                // Check if all objectives complete
                var allDone = quest.objectives.every(function(o) { return o.done; });
                if (allDone) quest.status = 'complete';
            }
        }
    }
});
```

Usage:
```twee
:: t0_day01_facility_arrival [facility]
<<completeObj "t0_day01" "arrive">>
/* ... passage content ... */
```

### Side Quest Registration
```javascript
// Function to add side quests dynamically
SOY.Quests = {
    addSide: function(quest) {
        State.variables.quests.side.push(quest);
    },
    
    completeSide: function(questId) {
        var q = State.variables.quests.side.find(function(s) { return s.id === questId; });
        if (q) q.status = 'complete';
    },
    
    updateSide: function(questId, objectiveId) {
        var q = State.variables.quests.side.find(function(s) { return s.id === questId; });
        if (q) {
            var obj = q.objectives.find(function(o) { return o.id === objectiveId; });
            if (obj) obj.done = true;
        }
    }
};
```

### Day 1 Side Quests (register in StoryInit or Day 1 start)
```twee
:: t0_day01_wake [day-start]
<<run SOY.Quests.addSide({
    id: "sq_001_feed",
    title: "Feed the Machine",
    description: "Eat at least one real meal today.",
    status: "active",
    recurring: true,
    objectives: [
        { id: "eat", text: "Eat something", done: false }
    ]
})>>

<<run SOY.Quests.addSide({
    id: "sq_002_lyla",
    title: "Keeping Up Appearances",
    description: "Respond to Lyla without revealing the truth about SoY.",
    status: "active",
    recurring: false,
    objectives: [
        { id: "respond", text: "Reply to Lyla's texts", done: false }
    ]
})>>

<<run SOY.Quests.addSide({
    id: "sq_003_james",
    title: "Guilt Dinner",
    description: "James wants to take you to dinner. Accept or delay.",
    status: "active",
    recurring: false,
    objectives: [
        { id: "respond", text: "Reply to James", done: false }
    ]
})>>
```

---

## SIDEBAR QUEST DISPLAY WIDGET

```twee
:: QuestSidebar [widget]
<<widget "questDisplay">>
<div class="quest-panel">
    <h3>OBJECTIVES</h3>
    
    <<set _mainQuest = null>>
    <<for _key, _q range $quests.main>>
        <<if _q.status === "active">>
            <<set _mainQuest = _q>>
        <</if>>
    <</for>>
    
    <<if _mainQuest>>
    <div class="quest-main">
        <span class="quest-title"><<= _mainQuest.title>></span>
        <<for _obj range _mainQuest.objectives>>
            <div class="quest-obj <<if _obj.done>>done<</if>>">
                <<if _obj.done>>✓<<else>>○<</if>> <<= _obj.text>>
            </div>
        <</for>>
    </div>
    <</if>>
    
    <<set _activeSide = $quests.side.filter(function(q) { return q.status === 'active'; })>>
    <<if _activeSide.length > 0>>
    <div class="quest-side">
        <span class="quest-subtitle">Side Objectives</span>
        <<for _sq range _activeSide>>
            <div class="quest-side-item">
                <<= _sq.title>>
            </div>
        <</for>>
    </div>
    <</if>>
</div>
<</widget>>
```

### Quest Panel CSS
```css
.quest-panel {
    padding: var(--space-sm);
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    margin-top: var(--space-md);
}

.quest-panel h3 {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: var(--space-sm);
}

.quest-title {
    font-size: var(--text-sm);
    color: var(--accent-light);
    font-weight: 600;
    display: block;
    margin-bottom: var(--space-xs);
}

.quest-obj {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    padding: 2px 0;
}

.quest-obj.done {
    color: var(--health);
    text-decoration: line-through;
    opacity: 0.6;
}

.quest-subtitle {
    font-size: var(--text-xs);
    color: var(--text-muted);
    margin-top: var(--space-sm);
    display: block;
}

.quest-side-item {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    padding: 2px 0;
    padding-left: var(--space-sm);
    border-left: 2px solid var(--accent-dim);
}
```

---

## RANDOM ENCOUNTER SYSTEM

```javascript
// In functions.js
SOY.Random = {
    // Check if a random encounter fires (percentage chance)
    check: function(chance) {
        return Math.random() * 100 < chance;
    },
    
    // Get available encounters for current location and time
    getEncounters: function() {
        var loc = State.variables.currentLocation;
        var slot = SOY.Time.currentSlot();
        var day = State.variables.calendar.day;
        
        var encounters = [];
        
        // Day 1 specific encounters
        if (day === 1) {
            if (loc === 'street' && slot === 'morning') {
                if (this.check(30)) encounters.push('t0_day01_bus_stranger');
            }
            if (loc === 'apartment' && slot === 'evening') {
                if (this.check(40)) encounters.push('t0_day01_senora_vidal');
            }
        }
        
        return encounters;
    }
};
```

---

## COMPILATION NOTES

### File Organization for Day 1
```
src/passages/tier0/
├── t0_day01_morning.twee      ← wake, mirror, bus, lulu morning
├── t0_day01_facility.twee     ← arrival, lecture, break, rafael
├── t0_day01_evening.twee      ← bodega, home, cook, couch, sleep
├── t0_day01_phone.twee        ← all text/call passages
├── t0_day01_npcs.twee         ← danny, señora vidal, bus stranger
└── t0_day01_quests.twee       ← quest registration and tracking
```

### Build Command
```bash
tweego -o build/crossing.html \
    src/story.twee \
    src/init/*.twee src/init/*.js \
    src/systems/*.js \
    src/ui/*.twee \
    src/css/*.css \
    src/passages/tier0/t0_day01_*.twee
```

### Testing Checklist
- [ ] All passage links resolve (no broken `<<goto>>` or `[[link]]` targets)
- [ ] Time advances correctly: morning → afternoon (facility) → evening (home) → night (sleep)
- [ ] Money deducts properly at Lulu's ($12) and Danny's ($14)
- [ ] NPC relationships update after interactions
- [ ] Quest objectives mark complete at correct passages
- [ ] Sidebar displays current time, location, money, and quest status
- [ ] Random encounters fire at correct probabilities
- [ ] Conditional content works (e.g., Lulu morning visit affects evening dialogue)
- [ ] Phone messages appear in correct order
- [ ] Day 1 ends at sleep passage and transitions to Day 2
