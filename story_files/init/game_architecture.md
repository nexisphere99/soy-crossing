# Shape of You: Crossing   Game Architecture Document
## Twine / SugarCube 2.x | Open World Interactive Fiction

---

## PROJECT PHILOSOPHY

This is a narrative-first open world. The player lives Manuel's life day by day: training at SoY, doing jobs in female bodies, navigating friendships, building a romance with Adriana, processing identity shifts through solitude and sex. The "open world" means the player chooses how to spend free time, which NPCs to visit, which side encounters to pursue, and how to process what happens during the fixed training and job events.

The engine is Twine with SugarCube 2.x. No frameworks, no build tools, no npm. Just Twee files, JavaScript, CSS, and the SugarCube runtime. Everything ships as a single HTML file or a set of Twee source files compiled with Tweego.

---

## FILE STRUCTURE

```
soy-crossing/
├── build/
│   └── crossing.html              # Compiled output (single file)
│
├── src/
│   ├── story.twee                  # StoryTitle, StoryData, StoryInit
│   │
│   ├── init/
│   │   ├── variables.twee          # All $variable declarations in StoryInit
│   │   ├── macros.js               # Custom macros (speech, time, location)
│   │   ├── widgets.twee            # SugarCube widget passages
│   │   └── functions.js            # Helper functions (schedule, NPC state, body state)
│   │
│   ├── systems/
│   │   ├── time.js                 # Day/night cycle, calendar, scheduling
│   │   ├── locations.js            # Location registry, travel, availability
│   │   ├── npcs.js                 # NPC state machine, relationship tracking
│   │   ├── body.js                 # Body state (current body, phantom echoes, arousal)
│   │   ├── economy.js              # Money, course fees, rent, expenses
│   │   ├── phone.js                # Phone/text message system
│   │   └── journal.js              # Player journal/log (optional review)
│   │
│   ├── ui/
│   │   ├── sidebar.twee            # Custom sidebar (time, money, location, body status)
│   │   ├── phone-ui.twee           # Phone screen overlay
│   │   ├── map-ui.twee             # Location map overlay
│   │   └── stats-ui.twee           # Character stats overlay
│   │
│   ├── css/
│   │   ├── reset.css               # SugarCube UI override/reset
│   │   ├── tokens.css              # Design tokens (colors, type, spacing)
│   │   ├── layout.css              # Page layout, sidebar, overlays
│   │   ├── components.css          # Buttons, cards, dialogue boxes, phone UI
│   │   ├── typography.css          # Font loading, type scale, prose styling
│   │   ├── transitions.css         # Page transitions, fade effects
│   │   └── responsive.css          # Mobile/tablet breakpoints
│   │
│   ├── passages/
│   │   ├── common/
│   │   │   ├── morning.twee        # Generic morning routines (variable by day)
│   │   │   ├── evening.twee        # Generic evening at home
│   │   │   ├── sleep.twee          # End of day, transition to next
│   │   │   └── phone-calls.twee    # Incoming call handler passages
│   │   │
│   │   ├── locations/
│   │   │   ├── apartment.twee      # Manuel's apartment hub
│   │   │   ├── facility.twee       # SoY facility hub
│   │   │   ├── vega-bar.twee       # Vega bar (Adriana)
│   │   │   ├── dannys.twee         # Danny's ramen shop
│   │   │   ├── lulus-bodega.twee   # Lulu's bodega
│   │   │   ├── park.twee           # Neighborhood park
│   │   │   ├── mall.twee           # Shopping mall
│   │   │   ├── cafe.twee           # Various cafés
│   │   │   └── adrianas-apt.twee   # Adriana's apartment (unlocked via relationship)
│   │   │
│   │   ├── backstory/
│   │   │   └── backstory.twee      # Pre-game backstory (layoff through Paco meeting)
│   │   │
│   │   ├── tier0/
│   │   │   ├── t0_day01.twee       # Tier 0 Day 1
│   │   │   ├── t0_day02.twee       # through Day 11
│   │   │   └── ...
│   │   │
│   │   ├── tier1/
│   │   │   ├── course1/
│   │   │   │   ├── c1_day01.twee   # Course 1 training days
│   │   │   │   ├── c1_day02.twee
│   │   │   │   └── ...
│   │   │   ├── course2/
│   │   │   ├── course3/
│   │   │   ├── course4/
│   │   │   ├── course5/
│   │   │   ├── course6/
│   │   │   └── course7/
│   │   │
│   │   ├── jobs/
│   │   │   ├── job_001.twee        # Job 1: The Pap Smear
│   │   │   ├── job_002.twee        # Job 2: The Mammogram
│   │   │   └── ...                 # Through job_075.twee
│   │   │
│   │   ├── npcs/
│   │   │   ├── adriana/
│   │   │   │   ├── adriana_hub.twee      # Adriana interaction hub
│   │   │   │   ├── adriana_bar.twee      # Bar conversations
│   │   │   │   ├── adriana_date.twee     # Date scenes
│   │   │   │   ├── adriana_sex.twee      # Sex scenes
│   │   │   │   └── adriana_morning.twee  # Morning-after scenes
│   │   │   ├── paco/
│   │   │   ├── lyla/
│   │   │   ├── james/
│   │   │   ├── tommy/
│   │   │   ├── georgia/
│   │   │   ├── lulu/
│   │   │   ├── danny/
│   │   │   └── senora-vidal/
│   │   │
│   │   ├── solo/
│   │   │   ├── masturbation.twee   # Solo sex scenes (contextual variants)
│   │   │   └── processing.twee     # Non-sexual body processing scenes
│   │   │
│   │   └── events/
│   │       ├── random-encounters.twee  # Random NPC encounters by location
│   │       ├── phone-events.twee       # Timed phone calls/texts
│   │       └── weekend-activities.twee # Weekend activity options
│   │
│   └── data/
│       ├── npcs.json               # NPC data (names, stats, schedules)
│       ├── locations.json          # Location data (names, available times, NPCs)
│       ├── bodies.json             # Clone and host body profiles
│       ├── jobs.json               # Job registry (requirements, pay, ratings)
│       └── schedule.json           # Master calendar (course days, job days, weekends)
│
├── game_files/
│   ├── fonts/
│   │   ├── instrument-serif.woff2  # Display/heading font
│   │   └── inter.woff2             # Body text font
│   ├── img/
│   │   ├── locations/              # Location images
│   │   ├── npcs/                   # NPC portraits
│   │   ├── bodies/                 # Clone/host body reference images
│   │   └── ui/                     # UI elements, icons
│   └── audio/                      # Ambient audio (optional)
│
├── tweego.exe                      # Tweego compiler (or shell script)
├── build.sh                        # Build script
└── README.md
```

---

## DESIGN SYSTEM

### Color Palette

The visual identity is warm darkness. Not cyberpunk neon. Not clinical white. The space between a bar at midnight and a medical facility at dawn.

```css
:root {
    /* Base */
    --bg-deep:        #0C0A09;     /* Near-black warm, main background */
    --bg-surface:     #1C1917;     /* Card/panel surface */
    --bg-raised:      #292524;     /* Elevated elements, hover states */
    --bg-overlay:     rgba(12, 10, 9, 0.85); /* Modal/overlay backdrop */

    /* Text */
    --text-primary:   #F5F5F4;     /* Main body text, warm white */
    --text-secondary: #A8A29E;     /* Secondary text, descriptions */
    --text-muted:     #78716C;     /* Disabled, timestamps, meta */
    --text-accent:    #FBBF24;     /* Highlighted text, names, money */

    /* Accent   Mezcal amber */
    --accent:         #D97706;     /* Primary accent, links, active states */
    --accent-light:   #F59E0B;     /* Hover states, highlights */
    --accent-dim:     #92400E;     /* Pressed states, subtle accents */
    --accent-glow:    rgba(217, 119, 6, 0.15); /* Soft glow behind accent elements */

    /* Semantic */
    --health:         #34D399;     /* Health/positive indicators */
    --warning:        #FB923C;     /* Warnings, time pressure */
    --danger:         #F87171;     /* Danger, violations, alerts */
    --info:           #60A5FA;     /* Information, tips */
    --intimate:       #C084FC;     /* Sexual/intimate content indicators */

    /* Body state indicators */
    --body-male:      #60A5FA;     /* In own body */
    --body-female:    #F9A8D4;     /* In female body */
    --body-transfer:  #A78BFA;     /* During transfer animation */

    /* Borders */
    --border-subtle:  #292524;
    --border-default: #44403C;
    --border-strong:  #57534E;

    /* Spacing scale */
    --space-xs:  0.25rem;
    --space-sm:  0.5rem;
    --space-md:  1rem;
    --space-lg:  1.5rem;
    --space-xl:  2rem;
    --space-2xl: 3rem;
    --space-3xl: 4rem;

    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;

    /* Shadows */
    --shadow-sm:  0 1px 2px rgba(0,0,0,0.3);
    --shadow-md:  0 4px 12px rgba(0,0,0,0.4);
    --shadow-lg:  0 8px 24px rgba(0,0,0,0.5);
    --shadow-glow: 0 0 20px var(--accent-glow);
}
```

### Typography

```css
/* Display: Instrument Serif   warm, literary, slightly old-world */
/* Body: Inter   clean, readable, modern contrast to the serif */

@font-face {
    font-family: 'Instrument Serif';
    src: url('game_files/fonts/instrument-serif.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: 'Inter';
    src: url('game_files/fonts/inter.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
}

:root {
    --font-display: 'Instrument Serif', Georgia, serif;
    --font-body:    'Inter', system-ui, sans-serif;
    --font-mono:    'JetBrains Mono', monospace;

    /* Type scale */
    --text-xs:   0.75rem;    /* 12px   timestamps, meta */
    --text-sm:   0.875rem;   /* 14px   secondary text */
    --text-base: 1rem;       /* 16px   body text */
    --text-lg:   1.125rem;   /* 18px   lead text */
    --text-xl:   1.25rem;    /* 20px   section heads */
    --text-2xl:  1.5rem;     /* 24px   passage titles */
    --text-3xl:  2rem;       /* 32px   chapter titles */
    --text-4xl:  2.5rem;     /* 40px   display, splash */

    --leading-tight:  1.3;
    --leading-normal: 1.6;
    --leading-loose:  1.8;

    --measure: 65ch;  /* Max line length for prose */
}

body {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--text-primary);
    background: var(--bg-deep);
}

/* Prose passages   the main reading experience */
.passage {
    max-width: var(--measure);
    margin: 0 auto;
    padding: var(--space-lg) var(--space-md);
}

/* Passage titles use display serif */
h1, .passage-title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 400;
    color: var(--text-primary);
    margin-bottom: var(--space-lg);
    letter-spacing: -0.01em;
}
```

---

## CORE GAME SYSTEMS

### 1. Time System

The game runs on a day cycle with four time slots per day. The calendar drives which events are available.

```javascript
// time.js
window.SOY = window.SOY || {};

SOY.Time = {
    slots: ['morning', 'afternoon', 'evening', 'night'],
    
    init: function() {
        State.variables.calendar = {
            day: 1,           // Absolute day count from game start
            weekday: 5,       // 1=Mon through 7=Sun (game starts Friday)
            week: 1,
            timeSlot: 0,      // Index into slots array
            tier: 0,
            course: 0,
            phase: 'transition' // 'transition', 'course', 'job', 'weekend', 'rest'
        };
    },

    advance: function() {
        var cal = State.variables.calendar;
        cal.timeSlot++;
        if (cal.timeSlot >= this.slots.length) {
            cal.timeSlot = 0;
            cal.day++;
            cal.weekday = ((cal.weekday) % 7) + 1;
            if (cal.weekday === 1) cal.week++;
            this.updatePhase();
        }
    },

    currentSlot: function() {
        return this.slots[State.variables.calendar.timeSlot];
    },

    isWeekend: function() {
        var wd = State.variables.calendar.weekday;
        return wd === 6 || wd === 7;
    },

    dayName: function() {
        var names = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        return names[State.variables.calendar.weekday - 1];
    },

    updatePhase: function() {
        // Read from master schedule to determine today's phase
        var schedule = setup.masterSchedule;
        var today = schedule[State.variables.calendar.day];
        if (today) {
            State.variables.calendar.phase = today.phase;
            State.variables.calendar.courseDay = today.courseDay || null;
            State.variables.calendar.jobId = today.jobId || null;
        }
    }
};
```

### 2. Location System

Locations unlock over time. Each has available NPCs, activities, and time-slot restrictions.

```javascript
// locations.js
SOY.Locations = {
    registry: {
        apartment: {
            name: "Manuel's Apartment",
            available: ['morning','afternoon','evening','night'],
            npcs: ['chipi'],
            activities: ['cook','sleep','shower','phone','solo'],
            unlocked: true
        },
        facility: {
            name: "Shape of You Inc.",
            available: ['morning','afternoon'],
            npcs: ['elena','rafael','sarkis','yuki','tommy','georgia'],
            activities: ['course','job_prep','cafeteria'],
            unlocked: true
        },
        vega: {
            name: "Vega Bar",
            available: ['evening','night'],
            npcs: ['adriana'],
            activities: ['drink','talk','flirt'],
            unlocked: true
        },
        dannys: {
            name: "Danny's Ramen",
            available: ['afternoon','evening','night'],
            npcs: ['danny'],
            activities: ['eat','decompress'],
            unlocked: true
        },
        lulus: {
            name: "Lulu's Bodega",
            available: ['morning','afternoon','evening'],
            npcs: ['lulu'],
            activities: ['shop','talk'],
            unlocked: true
        },
        park: {
            name: "Neighborhood Park",
            available: ['morning','afternoon'],
            npcs: [],  // Random encounters possible
            activities: ['walk','read','people_watch'],
            unlocked: true
        },
        adriana_apt: {
            name: "Adriana's Apartment",
            available: ['evening','night','morning'],
            npcs: ['adriana','mezcal_cat'],
            activities: ['cook','talk','sex','sleep'],
            unlocked: false,  // Unlocks at relationship level 4
            unlockCondition: { npc: 'adriana', relationship: 4 }
        },
        mall: {
            name: "Shopping Mall",
            available: ['morning','afternoon','evening'],
            npcs: [],
            activities: ['shop','browse','eat'],
            unlocked: true
        },
        cafe: {
            name: "Coffee Shop",
            available: ['morning','afternoon','evening'],
            npcs: [],
            activities: ['coffee','read','work','meet'],
            unlocked: true
        }
    },

    getAvailable: function() {
        var slot = SOY.Time.currentSlot();
        var available = [];
        for (var key in this.registry) {
            var loc = this.registry[key];
            if (loc.unlocked && loc.available.indexOf(slot) !== -1) {
                available.push(key);
            }
        }
        return available;
    },

    travel: function(locationId) {
        State.variables.currentLocation = locationId;
    }
};
```

### 3. NPC Relationship System

Each NPC tracks relationship level, last interaction, and available conversation topics.

```javascript
// npcs.js
SOY.NPCs = {
    init: function() {
        State.variables.npcs = {
            adriana: {
                name: "Adriana",
                relationship: 0,  // 0-10 scale
                met: false,
                knowsSecret: false,
                romance: false,
                lastSeen: 0,      // Day number
                flags: {},
                conversations: []  // Available topic IDs
            },
            paco: {
                name: "Paco",
                relationship: 5,   // Starts high (existing friend)
                met: true,
                knowsSecret: true,  // He introduced Manuel to SoY
                lastSeen: 0,
                flags: {},
                conversations: []
            },
            lyla: {
                name: "Lyla",
                relationship: 4,
                met: true,
                knowsSecret: false,
                lastSeen: 0,
                flags: { theory_count: 0 },
                conversations: []
            },
            james: {
                name: "James",
                relationship: 4,
                met: true,
                knowsSecret: false,
                lastSeen: 0,
                flags: { guilt_dinners: 0 },
                conversations: []
            },
            tommy: {
                name: "Tommy",
                relationship: 0,
                met: false,  // Met during Tier 0
                knowsSecret: true,  // Fellow trainee
                lastSeen: 0,
                flags: {},
                conversations: []
            },
            georgia: {
                name: "Georgia",
                relationship: 0,
                met: false,
                knowsSecret: true,
                lastSeen: 0,
                flags: {},
                conversations: []
            },
            lulu: {
                name: "Lulu",
                relationship: 3,
                met: true,
                knowsSecret: false,
                lastSeen: 0,
                flags: { empanada_count: 0 },
                conversations: []
            },
            danny: {
                name: "Danny",
                relationship: 2,
                met: true,
                knowsSecret: false,
                lastSeen: 0,
                flags: { chashu_bonus: 0 },
                conversations: []
            }
        };
    },

    adjustRelationship: function(npcId, amount) {
        var npc = State.variables.npcs[npcId];
        if (npc) {
            npc.relationship = Math.max(0, Math.min(10, npc.relationship + amount));
            npc.lastSeen = State.variables.calendar.day;
        }
    },

    isAvailable: function(npcId) {
        var loc = State.variables.currentLocation;
        var locData = SOY.Locations.registry[loc];
        if (!locData) return false;
        return locData.npcs.indexOf(npcId) !== -1;
    },

    getRelationshipLabel: function(npcId) {
        var level = State.variables.npcs[npcId].relationship;
        if (level <= 1) return "Stranger";
        if (level <= 3) return "Acquaintance";
        if (level <= 5) return "Friend";
        if (level <= 7) return "Close Friend";
        if (level <= 8) return "Intimate";
        return "Partner";
    }
};
```

### 4. Body State System

Tracks which body Manuel is currently in, phantom sensations that carry over, and arousal state.

```javascript
// body.js
SOY.Body = {
    init: function() {
        State.variables.body = {
            current: 'self',        // 'self', clone ID, or host ID
            currentProfile: null,   // Full body data object when transferred
            phantoms: [],           // Lingering sensations from recent transfers
            arousal: 0,             // 0-100, decays over time
            transferCount: 0,       // Total lifetime transfers
            lastTransfer: null,     // Day of last transfer
            todayTransferred: false
        };
    },

    transfer: function(bodyId, bodyData) {
        var b = State.variables.body;
        b.current = bodyId;
        b.currentProfile = bodyData;
        b.transferCount++;
        b.lastTransfer = State.variables.calendar.day;
        b.todayTransferred = true;
    },

    deTransfer: function() {
        var b = State.variables.body;
        // Add phantom based on the body just left
        if (b.currentProfile) {
            this.addPhantom(b.currentProfile);
        }
        b.current = 'self';
        b.currentProfile = null;
    },

    addPhantom: function(bodyData) {
        var phantoms = State.variables.body.phantoms;
        phantoms.push({
            source: bodyData.name,
            type: bodyData.cupSize,  // What lingers: breast weight, hip memory, etc
            intensity: 3,            // Decays by 1 per day
            day: State.variables.calendar.day
        });
        // Cap at 5 active phantoms
        if (phantoms.length > 5) phantoms.shift();
    },

    decayPhantoms: function() {
        var phantoms = State.variables.body.phantoms;
        for (var i = phantoms.length - 1; i >= 0; i--) {
            phantoms[i].intensity--;
            if (phantoms[i].intensity <= 0) {
                phantoms.splice(i, 1);
            }
        }
    },

    isTransferred: function() {
        return State.variables.body.current !== 'self';
    },

    hasPhantoms: function() {
        return State.variables.body.phantoms.length > 0;
    }
};
```

### 5. Economy System

```javascript
// economy.js
SOY.Economy = {
    init: function() {
        State.variables.money = {
            balance: 2100,     // Starting balance
            rent: 1400,        // Monthly rent
            courseFee: 150,    // Per course day
            expenses: {
                food: 0,
                transport: 0,
                drinks: 0,
                other: 0
            },
            income: [],        // Job payment records
            nextRent: 30       // Days until rent due
        };
    },

    earn: function(amount, source) {
        State.variables.money.balance += amount;
        State.variables.money.income.push({
            amount: amount,
            source: source,
            day: State.variables.calendar.day
        });
    },

    spend: function(amount, category) {
        State.variables.money.balance -= amount;
        if (State.variables.money.expenses[category] !== undefined) {
            State.variables.money.expenses[category] += amount;
        }
    },

    canAfford: function(amount) {
        return State.variables.money.balance >= amount;
    },

    dailyCourseFee: function() {
        this.spend(150, 'other');
    }
};
```

### 6. Phone System

Texts and calls arrive at scripted moments or triggered by NPC relationship events.

```javascript
// phone.js
SOY.Phone = {
    init: function() {
        State.variables.phone = {
            messages: [],      // { from, text, day, timeSlot, read }
            missedCalls: [],
            contacts: ['paco','lyla','james','mama','hector','diana','tommy','georgia']
        };
    },

    addMessage: function(from, text) {
        State.variables.phone.messages.push({
            from: from,
            text: text,
            day: State.variables.calendar.day,
            timeSlot: SOY.Time.currentSlot(),
            read: false
        });
    },

    getUnread: function() {
        return State.variables.phone.messages.filter(function(m) { return !m.read; });
    },

    addContact: function(contactId) {
        var contacts = State.variables.phone.contacts;
        if (contacts.indexOf(contactId) === -1) {
            contacts.push(contactId);
        }
    }
};
```

---

## PASSAGE NAMING CONVENTION

```
Pattern: [context]_[identifier]_[scene]

Backstory:     backstory_layoff, backstory_paco, backstory_night
Tier 0:        t0_day01_morning, t0_day01_facility, t0_day01_evening
Course:        c1_day01_lecture, c1_day01_transfer, c1_day01_debrief
Job:           job_001_briefing, job_001_transfer, job_001_assignment, job_001_debrief
Location:      loc_vega_enter, loc_vega_bar, loc_vega_adriana
NPC:           npc_adriana_talk_01, npc_adriana_date_01, npc_adriana_sex_01
Solo:          solo_night_processing, solo_masturbation_01
Weekend:       weekend_w1_sat_morning, weekend_w1_sat_afternoon
Event:         event_random_park_jogger, event_phone_mama_wednesday
Choice:        choice_evening_where, choice_weekend_activity
```

---

## SUGARCUBE STORYINIT

```twee
:: StoryTitle
Shape of You: Crossing

:: StoryData
{
    "ifid": "D674C813-3E8D-4E89-B7C0-A93E6B1A35F0",
    "format": "SugarCube",
    "format-version": "2.37.3"
}

:: StoryInit
<<run SOY.Time.init()>>
<<run SOY.NPCs.init()>>
<<run SOY.Body.init()>>
<<run SOY.Economy.init()>>
<<run SOY.Phone.init()>>
<<run SOY.Locations.travel('apartment')>>

/* Player profile */
<<set $player = {
    name: "Manuel González",
    age: 25,
    origin: "Guadalajara, Mexico",
    visa: "H-1B (grace period)",
    visaSafe: false,
    tier: 0,
    courseProgress: { current: null, day: 0 },
    jobsCompleted: 0,
    totalTransfers: 0,
    identity: 50  /* 0 = fully male-identified, 100 = fully fluid. starts neutral */
}>>

/* Persistent flags */
<<set $flags = {
    lyla_knows: false,
    adriana_knows: false,
    james_knows: false,
    first_transfer_done: false,
    first_job_done: false,
    first_sex_job_done: false,
    first_kiss_adriana: false,
    first_sex_adriana: false,
    visa_receipt: false,
    mama_knows_adriana: false
}>>
```

---

## CUSTOM SIDEBAR (Twee Widget)

```twee
:: StoryCaption
<div class="sidebar-status">
    <div class="sidebar-time">
        <<= SOY.Time.dayName()>> · <<= SOY.Time.currentSlot().toUpperCase()>>
        <span class="sidebar-week">Week <<= State.variables.calendar.week>></span>
    </div>

    <div class="sidebar-body" data-body="<<= State.variables.body.current>>">
        <<if SOY.Body.isTransferred()>>
            <span class="body-indicator female">♀ <<= State.variables.body.currentProfile.name>></span>
        <<else>>
            <span class="body-indicator male">♂ Manuel</span>
            <<if SOY.Body.hasPhantoms()>>
                <span class="phantom-indicator">⟡ echoes</span>
            <</if>>
        <</if>>
    </div>

    <div class="sidebar-money">
        $<<= State.variables.money.balance.toLocaleString()>>
    </div>

    <div class="sidebar-location">
        📍 <<= SOY.Locations.registry[State.variables.currentLocation].name>>
    </div>

    <<if SOY.Phone.getUnread().length > 0>>
        <div class="sidebar-phone">
            📱 <<= SOY.Phone.getUnread().length>> unread
        </div>
    <</if>>
</div>
```

---

## OPEN WORLD EVENING CHOICE PATTERN

This is the core mechanic for free time. After fixed events (course or job), the player chooses how to spend the evening.

```twee
:: choice_evening_where
<<set _available = SOY.Locations.getAvailable()>>

The job is done. I'm back in my own body. The apartment is waiting but so is the rest of the city.

<<if _available.indexOf('vega') !== -1>>
    [[Head to Vega|loc_vega_enter]]   Mezcal and maybe Adriana.
<</if>>

<<if _available.indexOf('dannys') !== -1>>
    [[Danny's Ramen|loc_dannys_enter]]   Quiet counter. Loud K-pop.
<</if>>

[[Go home|loc_apartment_evening]]   Chipi. Couch. Quiet.

<<if _available.indexOf('park') !== -1 && SOY.Time.currentSlot() === 'evening'>>
    [[Walk through the park|loc_park_evening]]   Fresh air. Room to think.
<</if>>

<<if State.variables.npcs.adriana.romance && State.variables.npcs.adriana.relationship >= 6>>
    [[Text Adriana: "Can I come over?"|npc_adriana_text_evening]]
<</if>>

<<if State.variables.calendar.weekday <= 5>>
    /* Weeknight: can also call friends */
    [[Call Paco|npc_paco_call_evening]]
    [[Call Lyla|npc_lyla_call_evening]]
<</if>>
```

---

## KEY CSS COMPONENTS

### Prose Passage Styling

```css
/* The main reading experience   clean, warm, intimate */
#story {
    background: var(--bg-deep);
    min-height: 100vh;
}

.passage {
    max-width: var(--measure);
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-lg);
    font-size: var(--text-base);
    line-height: var(--leading-loose);
    color: var(--text-primary);
}

.passage p {
    margin-bottom: var(--space-md);
}

/* Dialogue styling */
.passage p:has(> .dialogue) {
    margin-left: var(--space-md);
    border-left: 2px solid var(--border-subtle);
    padding-left: var(--space-md);
}

/* Choice links */
.passage a[data-passage] {
    display: block;
    padding: var(--space-sm) var(--space-md);
    margin: var(--space-xs) 0;
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
}

.passage a[data-passage]:hover {
    border-color: var(--accent);
    background: var(--bg-raised);
}
```

### Body State Indicator

```css
/* Top bar indicator that shows current body */
.body-indicator {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    font-size: var(--text-sm);
    font-weight: 500;
}

.body-indicator.male {
    background: rgba(96, 165, 250, 0.15);
    color: var(--body-male);
    border: 1px solid rgba(96, 165, 250, 0.3);
}

.body-indicator.female {
    background: rgba(249, 168, 212, 0.15);
    color: var(--body-female);
    border: 1px solid rgba(249, 168, 212, 0.3);
}

.phantom-indicator {
    font-size: var(--text-xs);
    color: var(--intimate);
    animation: phantom-pulse 2s ease-in-out infinite;
}

@keyframes phantom-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}
```

### Phone UI Overlay

```css
.phone-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    max-height: 80vh;
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    z-index: 100;
}

.phone-header {
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-raised);
    border-bottom: 1px solid var(--border-subtle);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    display: flex;
    justify-content: space-between;
}

.phone-message {
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--border-subtle);
}

.phone-message .sender {
    font-size: var(--text-xs);
    color: var(--accent);
    margin-bottom: var(--space-xs);
}

.phone-message .text {
    font-size: var(--text-sm);
    color: var(--text-primary);
    line-height: var(--leading-normal);
}
```

### Page Transitions

```css
/* Smooth passage transitions */
.passage {
    animation: passage-in 0.4s ease-out;
}

@keyframes passage-in {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Transfer effect   used during consciousness swap scenes */
.transfer-effect {
    animation: transfer-warp 1.5s ease-in-out;
}

@keyframes transfer-warp {
    0%   { filter: blur(0); opacity: 1; }
    30%  { filter: blur(4px); opacity: 0.6; }
    50%  { filter: blur(8px); opacity: 0.3; }
    70%  { filter: blur(4px); opacity: 0.6; }
    100% { filter: blur(0); opacity: 1; }
}
```

---

## MASTER SCHEDULE DATA STRUCTURE

```javascript
// In setup (loaded during StoryInit)
setup.masterSchedule = {
    // Tier 0
    1:  { phase: 'course', tier: 0, courseDay: 1 },
    2:  { phase: 'course', tier: 0, courseDay: 2 },
    // ... through day 11

    // Transition
    12: { phase: 'rest' },
    13: { phase: 'weekend' },
    14: { phase: 'weekend' },

    // Tier 1 Course 1 + Jobs alternating
    15: { phase: 'course', tier: 1, course: 1, courseDay: 1 },
    16: { phase: 'job', tier: 1, jobId: 1 },
    17: { phase: 'course', tier: 1, course: 1, courseDay: 2 },
    18: { phase: 'job', tier: 1, jobId: 2 },
    19: { phase: 'course', tier: 1, course: 1, courseDay: 3 },
    20: { phase: 'weekend' },
    21: { phase: 'weekend' },
    22: { phase: 'job', tier: 1, jobId: 3 },
    23: { phase: 'course', tier: 1, course: 1, courseDay: 4 },
    // ... continues for entire game
};
```

---

## BUILD COMMAND

```bash
#!/bin/bash
# build.sh   Compile all Twee sources into single HTML
tweego -o build/crossing.html \
    src/story.twee \
    src/init/*.twee \
    src/init/*.js \
    src/systems/*.js \
    src/ui/*.twee \
    src/passages/**/*.twee \
    src/css/*.css
    
echo "Build complete: build/crossing.html"
```

---

## CONTENT RATING SYSTEM

Each passage can be tagged with a content rating that the player can configure in settings.

```twee
:: StoryInit [continued]
<<set $settings = {
    showExplicit: true,      // Toggle explicit sex scenes
    showViolence: true,      // Toggle violence/confrontation detail
    showMedical: true,       // Toggle medical procedure detail
    textSpeed: 'normal'      // 'slow', 'normal', 'fast'
}>>
```

```twee
:: Passage with explicit content
<<if $settings.showExplicit>>
    /* Full explicit scene */
    She pulls me closer and...
<<else>>
    /* Fade to black version */
    We move to the bedroom. The door closes. What happens next is ours alone.
    
    <<link "Continue to morning...">><<goto "next_morning">><</link>>
<</if>>
```

---

## SAVE SYSTEM NOTE

SugarCube handles saves natively. The game uses autosave at the start of each new day:

```javascript
Config.saves.autosave = ["day-start"];
Config.saves.slots = 8;

// Tag each day-start passage with "day-start" to trigger autosave
// :: t1_c1_day01_morning [day-start]
```

---

## RESPONSIVE DESIGN

```css
/* Mobile first   the game should work on phones */
@media (max-width: 640px) {
    .passage {
        padding: var(--space-md) var(--space-sm);
        font-size: var(--text-sm);
    }
    
    .sidebar-status {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--space-xs);
        font-size: var(--text-xs);
    }
    
    .phone-overlay {
        width: 90vw;
    }
}

@media (min-width: 641px) and (max-width: 1024px) {
    .passage {
        padding: var(--space-lg) var(--space-md);
    }
}

@media (min-width: 1025px) {
    /* Desktop: sidebar visible */
    #story {
        margin-left: 260px;
    }
}
```

---
