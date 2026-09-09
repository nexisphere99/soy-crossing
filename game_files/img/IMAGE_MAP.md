# Day 1 image map

Drop the generated PNGs at these exact paths. Passages reference them by name
via `<<sceneImg "<subdir>/<name>">>` and `<<portrait "<name>">>`; missing files
collapse silently, so the game plays fine before art is in.

Prompts: `story_files/day_1/soy_day01_part5_image_prompts.md`.

## locations/   16:9

| File | Prompt | Used in |
|---|---|---|
| `locations/apartment-morning.png` | IMG-D1-001 Manuel's Apartment   Morning | `t0_day01_wake` |
| `locations/bus-ninth-street.png` | IMG-D1-002 Bus to Ninth Street | `t0_day01_bus` |
| `locations/soy-exterior.png` | IMG-D1-003 814 Ninth Street   Exterior | *(spare   facility establishing)* |
| `locations/soy-lobby.png` | IMG-D1-004 SoY Facility   Lobby | `t0_day01_facility_arrival` |
| `locations/room4-lecture.png` | IMG-D1-005 Room 4   Lecture Room | `t0_day01_lecture_room` |
| `locations/lulus-bodega.png` | IMG-D1-006 Lulu's Bodega   Evening | `t0_day01_lulu_morning`, `t0_day01_evening_bodega` |
| `locations/dannys-ramen.png` | IMG-D1-007 Danny's Ramen   Night | `t0_day01_dannys_scene` |

## portraits/   3:4, head-and-shoulders, negative space one side

| File | Prompt | Used in |
|---|---|---|
| `portraits/elena.png` | IMG-D1-008 Elena Cordero | `t0_day01_elena_entrance` |
| `portraits/rafael.png` | IMG-D1-009 Rafael Mende | `t0_day01_rafael_session` |
| `portraits/yuki.png` | IMG-D1-010 Yuki Tanaka | `t0_day01_facility_arrival` |
| `portraits/tommy.png` | IMG-D1-011 Tommy Watts | `t0_day01_break` |
| `portraits/georgia.png` | IMG-D1-012 Georgia Hayes | `t0_day01_cafeteria_wait` |
| `portraits/lulu.png` | IMG-D1-013 Lulu Medina | *(spare   bodega uses the location shot)* |
| `portraits/danny.png` | IMG-D1-014 Danny Cho | *(spare   Danny's uses the location shot)* |

## slides/   1:1 or 16:9, dark, glowing

| File | Prompt | Used in |
|---|---|---|
| `slides/neuroelectric-map.png` | IMG-D1-016 Neuroelectric Map   Full Body | `t0_day01_lecture_begin` |
| `slides/transfer-headset.png` | IMG-D1-015 Transfer Method   Type II Headset | `t0_day01_lecture_methods` |
| `slides/72-hour-window.png` | IMG-D1-017 72-Hour Window Chart | `t0_day01_lecture_science_2` |

## mood/   16:9

| File | Prompt | Used in |
|---|---|---|
| `mood/october-evening-walk.png` | IMG-D1-018 October Evening   Walking Home | `t0_day01_hub_evening` |
| `mood/apartment-night-couch.png` | IMG-D1-019 Apartment at Night   Couch with Cat | `t0_day01_evening_home`, `t0_day01_sleep` |

## ui/   1:1

| File | Prompt | Used in |
|---|---|---|
| `ui/phone-messages.png` | IMG-D1-020 Phone Screen   Text Messages | *(spare   phone passages use styled `.phone-message` blocks)* |

## avatars/   square, rendered as circles (dialogue bubbles)

Used by `<<say>>` / `<<txt>>` / `<<phone>>`. A missing file falls back to the
character's initial on a per-character colour, so these are optional polish.
Crop tight on the face; 256×256 is plenty.

`avatars/lulu.png` · `elena.png` · `rafael.png` · `yuki.png` · `tommy.png` ·
`georgia.png` · `brett.png` · `danny.png` · `paco.png` · `lyla.png` ·
`james.png` · `mamá.png` · `vidal.png` · `stranger.png`

Manuel's own lines render right-aligned with no avatar, so he needs none.

## backstory/   16:9 (optional; no prompt sheet, describe from the scene)

| File | Scene | Used in |
|---|---|---|
| `backstory/layoff-parking-lot.png` | Manuel alone with a cardboard box in a sunlit corporate parking lot, badge dead | `backstory_layoff` |
| `backstory/craftwork.png` | Coworking-space back corner at dusk, two paper coffee cups on a scuffed table | `backstory_craftwork` |

## full_body/ — tall (≈2:3 or 9:16), transparent or dark background

Shown in the fixed right-hand character panel (`charpanel.js`), visible only on
windows ≥ 1340px wide and when images are on. The panel fades the bottom edge
into the page, so bleed the figure off the bottom of the frame.

| File | Who |
|---|---|
| `full_body/manuel.png` | Manuel — navy henley, dark jeans, boots; tired, lean, unshaven |

A transfer body would use `full_body/<clone-slug>.png` (from its profile's `slug`/`id`).

## Manuel

| File | Where used |
|---|---|
| `full_body/manuel.png` | right-hand character panel (all passages, wide screens) |
| `portraits/manuel.png` | `<<face "manuel">>` in `t0_day01_mirror` |
| `avatars/manuel.png` | his `<<say "Me">>` bubbles (right side); `me`/`manuel` both slug to this |

---

# Day 2 image map

Prompts: `story_files/day_2/soy_day02_part5_image_prompts.md`.
Reused Day 1 art (no new file needed): `locations/apartment-morning.png`,
`locations/lulus-bodega.png`, `locations/bus-ninth-street.png`,
`locations/soy-lobby.png`, `locations/dannys-ramen.png`,
`mood/october-evening-walk.png`, `mood/apartment-night-couch.png`.

## locations/   16:9

| File | Prompt | Used in |
|---|---|---|
| `locations/transfer-room.png` | IMG-D2-001 Transfer Room | `t0_day02_transfer_room`, `t0_day02_transfer_begins` |

## portraits/   3:4 (Flor's hands is a detail crop, still fine at 3:4)

| File | Prompt | Used in |
|---|---|---|
| `portraits/flor.png` | IMG-D2-004 Clone 7-F "Flor", Resting / IMG-D2-005 Flor's Hands | `t0_day02_transfer_room` (`<<face "flor">>`), `t0_day02_exercise_hands` |

## slides/   1:1 or 16:9, dark, glowing

| File | Prompt | Used in |
|---|---|---|
| `slides/gender-differential.png` | IMG-D2-007 Gender Differential Diagram | `t0_day02_lecture_gender` |

## mood/   16:9 (transfer-warp is an abstract interstitial)

| File | Prompt | Used in |
|---|---|---|
| `mood/transfer-warp.png` | IMG-D2-009 The Transfer Moment (Abstract) | `t0_day02_transfer_begins`, `t0_day02_detransfer` |

## avatars/   square

| File | Who |
|---|---|
| `avatars/flor.png` | Clone 7-F — used for Manuel's own `<<say "Me">>` bubbles **while he is transferred into Flor** (`SOY.playerFigure()` swaps the player avatar). |

## portraits/ + full_body/   while transferred

| File | Where |
|---|---|
| `portraits/flor.png` | `<<face "flor">>` in `t0_day02_transfer_room` and `t0_day02_transfer_begins`; `<<scene "portraits/flor">>` in `t0_day02_exercise_hands` |
| `full_body/flor.png` | right-hand character panel — auto-switches from `manuel` to `flor` on transfer, back on de-transfer |

Clone 7-F look: grey cotton training top and shorts, athletic-slim, B-cup,
moles across the collarbones.

## spare Day 2 prompts (no passage wired yet)

IMG-D2-002 Headset close-up, IMG-D2-003 Evening walk / amber streetlights,
IMG-D2-006 Manuel's hands (contrast), IMG-D2-008 Four Prohibitions icon set,
IMG-D2-010 Apartment at night / post-transfer.
