# Shape of You: Crossing

Twine / SugarCube 2.x open-world interactive fiction. Full design in
[story_files/game_architecture.md](story_files/game_architecture.md).

## Status

Playable from the layoff through the **end of Tier 0, Day 1**. The backstory's
final night hands off to `t0_day01_wake`; Day 1 ends at `t0_day02_wake`
(a stub   Module 1, Day 2 isn't written).

- **Backstory**   layoff → the door on Ninth Street; dialogue-driven
  (Diana, Howard/Valerie, Paco) rendered as call/chat bubbles.
- **Day 1**   wake / mirror / bus / facility (Yuki intake, Elena's lecture,
  Rafael's baseline) / evening (Lulu's, Danny's, Señora Vidal, home) /
  phone (Lyla, James, Mamá, Paco) / sleep → Day 2.
- **Hubs**   `t0_day01_hub_morning`, `t0_day01_hub_evening`, and the
  `t0_day01_evening_home` sub-hub. Choices gate on `visited()` and time slot.
- **Objectives**   sidebar button opens a modal with the main quest and the
  daily quests. Done objectives are struck through; the next one is flagged
  with its location, and that same line shows in the sidebar.
- **Systems**   time (4 slots/day, day rolls over at sleep), money
  (Lulu's −$12, Danny's −$14), NPC relationships, random encounters
  (bus stranger 30%, Señora Vidal 40%), quest tracking.

## Build

Requires [Tweego](https://www.motoslave.net/tweego/) with the `sugarcube-2`
(2.37.3) format installed.

```bash
./build.sh                    # -> build/crossing.html
TWEEGO=/path/to/tweego ./build.sh
```

Open `build/crossing.html` in any browser. The file is fully self-contained  
fonts are embedded, nothing is fetched at runtime.

> **After a rebuild, use RESTART (or a new tab).** SugarCube keeps the current
> playthrough in `sessionStorage`, so a plain refresh restores the old state.
> `SOY.ensureState()` backfills anything a schema change added, but RESTART is
> the clean path.

## Dialogue components

Conversations use macros rather than quoted prose, so each speaker reads
distinctly (see `src/init/dialogue.js`):

```
<<say "Lulu">>¡Mijo! You're up early for a man with no job.<</say>>
<<say "Me">>I have a job. Starting today.<</say>>

<<phone "Lyla">>
<<txt "Lyla">>Is it a cult?<</txt>>
<<txt "Me">>It's not a cult.<</txt>>
<</phone>>
```

- `<<say>>`   in-person line. NPCs get an avatar and a name label on the left;
  `"Me"` renders right-aligned in amber. Elena's bubbles run cool blue,
  Rafael's warm green.
- `<<txt>>` inside `<<phone "Who">>`   a framed SMS thread; incoming grey,
  outgoing amber.
- Consecutive lines from one speaker (no prose between) drop the label and
  avatar automatically.
- Avatars come from `game_files/img/avatars/<key>.png`. Missing ones fall back
  to an initial on a per-character colour, so it looks finished without art.

- Manuel's own `<<say "Me">>` lines carry a small avatar on the right.

### Character panel

A fixed full-body image of whoever Manuel currently is, pinned to the right
edge (`src/init/charpanel.js` + `08-charpanel.css`). A framed card in the bottom-right corner, shown only on windows ≥ 1380px
and when images are on; #story reserves the panel's width on the right so the
passage stays centred. Art: `game_files/img/full_body/<slug>.png` (`manuel` by default;
a transfer body uses its profile's `slug`/`id`).

Other authoring helpers: `<<scene "locations/x">>`, `<<face "elena">>`,
`<<opt "passage" "Label" "hint">>`, `<<questRender>>`.

## Art

Drop PNGs into `game_files/img/<subdir>/`   paths and prompts are listed in
[game_files/img/IMAGE_MAP.md](game_files/img/IMAGE_MAP.md). Missing files
collapse silently. `$settings.showImages` toggles all imagery.

Avatars are the one addition to that map: `game_files/img/avatars/lulu.png`,
`elena.png`, `rafael.png`, `yuki.png`, `tommy.png`, `georgia.png`, `danny.png`,
`paco.png`, `lyla.png`, `james.png`, `mama.png`, `brett.png`, `vidal.png`,
`stranger.png`, `diana.png`, `hector.png`, `valerie.png`, `howard.png`  
square, they render as circles.

## Fonts

`src/css/01-fonts.css` is generated, not hand-edited: it inlines the latin
woff2 subsets from `game_files/fonts/`. Regenerate with:

```bash
python3 tools/embed-fonts.py
```

## Source layout

```
src/
├── story.twee            StoryData / StoryInit / PassageReady
├── head.html             extra <head> tags
├── init/
│   ├── config.js         Config.*, setup.masterSchedule, setup.visaClock
│   ├── state.js          SOY.ensureState()   init + self-heal (predisplay)
│   ├── functions.js      setup.visaHTML, SOY.Random
│   ├── dialogue.js       <<say>> <<txt>> <<phone>> <<objectivesDialog>>, avatars
│   ├── charpanel.js      right-hand full-body character panel
│   ├── render.js         postrender: trims stray <br> from macro headers
│   └── widgets.twee      <<scene>> <<face>> <<opt>> <<questRender>>
├── systems/              SOY.Time / Locations / NPCs / Body / Economy / Phone / Quests
├── ui/sidebar.twee       StoryCaption   backstory caption / Tier 0 HUD
├── css/                  01-fonts → 07-responsive, bundled in order
└── passages/
    ├── backstory/backstory.twee
    └── tier0/day01/       morning · facility · evening · phone · extra
```

Backstory and Day 1 prose are the source text verbatim, with quoted dialogue
wrapped in `<<say>>` / `<<txt>>` and choices in `<<opt>>`. Backstory from
`story_files/backstory_single_v3.md`, Day 1 from
`story_files/day_1/soy_day01_part1..3`.
