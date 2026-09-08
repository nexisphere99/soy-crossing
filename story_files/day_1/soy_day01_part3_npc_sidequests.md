# SHAPE OF YOU: CROSSING, DAY 1 CONTENT PACKAGE
## PART 3: NPC & SIDE QUEST INTERACTIONS
### Conversations, Messages, Random Encounters, Relationship Seeds

---

## SIDE QUEST SYSTEM, DAY 1 ACTIVE QUESTS

### MAIN QUEST
**"First Day": Complete Day 1 at Shape of You Inc.**
- ✅ Arrive at facility
- ✅ Complete intake with Yuki
- ✅ Attend Elena's lecture
- ✅ Complete Rafael's psychological baseline
- → Return home

### SIDE QUESTS AVAILABLE

**SQ-001: "Feed the Machine"** (Recurring, Daily)
- Eat at least one meal. Track what Manuel eats. Skipping meals affects mood and energy next day.
- Today's options: Lulu's empanadas, cook at home, Danny's ramen (evening)
- Completion: Eat anything. Bonus: Cook a real meal.

**SQ-002: "Keeping Up Appearances"** (Multi-day, Lyla's Curiosity)
- Lyla wants to know about the new job. Manuel must deflect without losing her trust.
- Day 1: Respond to her morning text. Vague answers increase her suspicion meter.
- Tracker: $npcs.lyla.flags.suspicion (starts at 0, increases with vague answers)
- Resolution: Eventually she finds out (Day 11+); how she finds out depends on this tracker.

**SQ-003: "Guilt Dinner"** (Multi-day, James Friendship)
- James texts about dinner. Accept or decline. Accepting schedules Day 4 evening: James dinner.
- This dinner is a fixed narrative beat but declining delays it and reduces relationship.

**SQ-004: "The Bodega Saint"** (Recurring, Lulu Relationship)
- Visit Lulu's. She feeds Manuel. Asks intrusive questions. Dispenses advice.
- Each visit builds relationship. At level 5, she starts asking harder questions about the job.
- At level 7, she notices physical changes in how Manuel moves (post-transfer body echoes).

**SQ-005: "Mamá's Voice Notes"** (Recurring, Weekly)
- Mamá sends voice notes every Monday and Wednesday. Manuel can listen or ignore.
- Listening: +1 emotional health, -1 guilt. Ignoring: -1 emotional health, +1 guilt.
- At certain thresholds, she calls directly and Manuel must answer or face consequences.

---

## NPC ENCOUNTER: BUS STRANGER

### PASSAGE: t0_day01_bus_stranger

*(Random encounter; triggers if player chose specific bus route or lingered at the stop.)*

The woman at the bus stop is maybe sixty. Dominican, judging by the accent when she answers her phone. She's wearing a house dress under a puffer jacket and carrying a plastic bag from the pharmacy and she takes one look at me and says:

"You waiting for the 34?"

"Yeah."

"It's late."

"It's always late."

"Not always. Sometimes it's early and you miss it and that's worse." She adjusts the pharmacy bag. "Where you headed?"

"Ninth Street."

"Ninth Street." She says it like she's evaluating the street itself. "My daughter works near Ninth Street. Hair salon. You need a haircut."

"So I've been told."

"Your mother tells you."

"How did you..."

"Mothers always tell their sons. My son is forty-two and bald and I still tell him." She laughs. It's a big laugh, warm, the kind that comes from a lifetime of finding things funny that aren't.

The bus arrives. She gets on first. I follow. She sits near the front because her knees hurt and she tells me this without being asked. I sit in the middle. Through the window I can see her reflection adjusting her bag, settling in, living inside her day with the casual competence of someone who's done ten thousand days and doesn't find any of them remarkable.

I wonder if she's ever thought about what it would be like to be in a different body. I wonder if she'd trade hers. I wonder if she'd trade the bad knees for something else, something younger, and then miss the knees because they're hers.

The bus rattles on. She gets off at Seventh. I ride to Ninth.

*(No quest impact. No relationship. Just a stranger on a bus. The game needs these.)*

---

## NPC ENCOUNTER: SEÑORA VIDAL

### PASSAGE: t0_day01_senora_vidal

*(Triggers when Manuel arrives home; random chance, 40% on Day 1)*

The note is taped to my door.

White paper, folded once, written in blue pen in handwriting that's either elegant or furious, depending on your interpretation:

**"Manuel: Your music last night was too loud. I could hear it through the floor. Also the cat cries when you leave. You should get her a companion. Or come home earlier. /S. Vidal"**

I didn't play music last night. I haven't played music in two weeks. What she heard was probably the podcast I fell asleep to at 11 PM about distributed computing architectures, which I will grant is a form of cruelty but not the kind she's thinking of.

Señora Vidal is my downstairs neighbor. Dominican. Sixties. She communicates exclusively through notes and plates of food, which makes her either the best neighbor in the building or the most passive-aggressive, and I've spent three years trying to figure out which. The answer, I'm pretty sure, is both.

I pull the note off the door. Behind it, on the doormat, is a plate covered in aluminum foil. I peel back the corner. Arroz con pollo. Still warm.

<<if $flags.lulu_morning_visit>>
Between Lulu and Señora Vidal, the women in my life are determined to feed me into submission.
<<else>>
At least someone in this building thinks I'm worth feeding.
<</if>>

I take the plate inside. Chipi smells the chicken immediately and abandons her salmon with the speed of a creature whose loyalty is entirely caloric.

"This isn't for you," I tell her. She doesn't care. She headbutts my ankle.

I eat Señora Vidal's arroz con pollo at the table, in the chair that nobody else sits in, and it's good. Really good. The rice is perfect, not too soft, not too dry, seasoned with something I can't identify that makes it taste like someone's kitchen in Santo Domingo in 1987. I eat all of it. I put the empty plate by the door. Tomorrow I'll return it with a thank-you note and she'll leave another note complaining about the thank-you note being too short.

This is our relationship. It works.

<<set $npcs.senora_vidal = $npcs.senora_vidal || { relationship: 1, notes_received: 0, plates_received: 0 }>>
<<set $npcs.senora_vidal.notes_received += 1>>
<<set $npcs.senora_vidal.plates_received += 1>>
<<set $flags.ate_vidal_dinner = true>>

---

## NPC ENCOUNTER: DANNY'S RAMEN (Optional Evening)

### PASSAGE: t0_day01_dannys_option

*(Available if player chooses to go out instead of staying home after the bodega.)*

<<if visited("t0_day01_evening_bodega")>>

I should go home. I have empanadas and Modelo and a 340-page PDF to read and a cat who's keeping a detailed log of my absences.

But the apartment is going to be quiet and the quiet is going to fill up with Elena's voice and Rafael's questions and the number twenty-seven and I need noise. Specific noise. The kind that comes from a counter seat in a ramen shop with the K-pop turned up too loud.

Danny's is six blocks east. The neon sign in the window says "DANNY'S" in pink and "ラーメン" in blue and the door handle is always slightly greasy and the entire place smells like pork bone broth and sesame and whatever Danny's burning in the back that might be incense and might be a mistake.

<<link "Go to Danny's" "t0_day01_dannys_scene">><</link>>
<<link "Go home instead" "t0_day01_evening_home">><</link>>

<</if>>

---

### PASSAGE: t0_day01_dannys_scene

Danny's at 8 PM on a Monday is empty except for me, a couple sharing a bowl of tsukemen in the corner, and Danny himself behind the counter doing something violent to a pile of green onions with a knife that's bigger than seems necessary.

"Yo." Danny doesn't look up. He doesn't need to. He knows who walks through his door by the sound of their feet, or by some ramen-shop sixth sense that borders on supernatural. "Spicy miso?"

"Spicy miso."

"Extra chashu?"

"I can't afford extra chashu."

He looks up. Danny Cho is thirty years old and built like a middleweight boxer and has the face of someone who's heard every sad story in the neighborhood and responds to all of them the same way: with soup. His hair is black, pushed back under a bandana, and he's got a burn scar on his left forearm that he never explains and you learn not to ask about.

"Extra chashu," he says. Not a question this time. He turns to the stove.

The K-pop today is something high-energy with a beat that vibrates the counter. I sit in my usual spot, third stool from the left, the one with the wobble that I've memorized the rhythm of, and pull out my phone.

The Transfer Worker's Handbook PDF. 340 pages. Chapter 1: "Foundations of Neuroelectric Identity Mapping." I open it. Read the first paragraph. Read it again because none of it stuck. Read it a third time and this time some of it stays.

Danny slides the bowl across the counter. The broth is red-gold, oily, aromatic. The noodles are buried under a layer of bean sprouts and corn and two extra slices of chashu that he charged me nothing for because Danny has his own economy and sadness is legal tender.

"You look weird," he says. "Weirder than usual."

"New job."

"Doing what?"

"Research."

"Research." He picks up his knife. Returns to the green onions. "Last time you said 'research' you were applying to forty companies and eating here three nights a week and losing weight."

"This is different research."

"Different how?"

"I'll tell you when I figure it out."

He chops. I eat. The broth hits my stomach like a warm hand pressing flat against something tight, and the tightness loosens by a fraction. The noodles are perfect. Danny's noodles are always perfect because Danny approaches ramen the way Elena approaches consciousness transfer, with precision, without compromise, and with the unstated understanding that what he's doing matters even if nobody else in the room fully grasps why.

I eat everything. Drink the broth from the bowl. Danny watches approvingly. In Danny's ramen shop, an empty bowl is a compliment and a half-finished one is an insult.

"You're eating again," he says. "Good. Last month you were getting skinny. Skinny people make me nervous."

"I wasn't skinny."

"You were getting there." He wipes the counter. "Come back tomorrow. I'm trying a new tonkotsu recipe. You can be the guinea pig."

"I might be late. The job."

"I'm open till midnight. The broth doesn't care what time you show up."

I leave money on the counter. He pushes half of it back. We do this dance every time. I leave the money he pushed back as a tip instead, which is the only way I've found to pay Danny what his food is worth without offending him.

The walk home is cold. My stomach is full of soup and my head is full of everything else. A woman crosses the street ahead of me, long coat, quick stride, bag held close to her body, earbuds in. She walks the way women walk at night: fast, aware, taking up as little space as possible while covering as much ground as she can.

I've never noticed that before. The walking. The way the bag stays close.

Twenty-seven days. If I learn to notice everything about how a body moves through the world, if I can sit in a woman's body and feel what she feels and then come back and be normal about it, if I can do that, I get to stay.

I walk home. Cold air. Full stomach. K-pop lingering in my ears like a blessing I didn't ask for.

<<set $money.balance -= 14>>
<<set $money.expenses.food += 14>>
<<run SOY.NPCs.adjustRelationship('danny', 1)>>
<<set $npcs.danny.flags.chashu_bonus += 1>>

<<link "Head home" "t0_day01_evening_home">><</link>>

---

## NPC ENCOUNTER: LYLA TEXT CHAIN (Evening, Extended)

### PASSAGE: t0_day01_lyla_evening_texts

*(Triggers at home, evening, if player checks phone.)*

Lyla again. 9:34 PM.

**Lyla:** "So? The mysterious job? Is it a cult?"

Three options:

<<link "'It's not a cult'" "t0_day01_lyla_text_a">><</link>>
<<link "'Classified'" "t0_day01_lyla_text_b">><</link>>
<<link "Send her a photo of Chipi instead" "t0_day01_lyla_text_c">><</link>>

---

### PASSAGE: t0_day01_lyla_text_a

**Me:** "It's not a cult."

**Lyla:** "That's exactly what someone in a cult would say."

**Lyla:** "What do you actually do?"

**Me:** "Research. Biometric."

**Lyla:** "Manuel. That means nothing."

**Me:** "It means they study how bodies work. I'm a consultant."

**Lyla:** "That's the vaguest sentence you've ever said to me and I was present for your last performance review."

**Lyla:** "Fine. Keep your secrets. But if they make you wear robes, I need photos."

**Me:** 😂

**Lyla:** "I'm serious about the robes. My Instagram needs content."

<<set $npcs.lyla.flags.suspicion += 1>>
<<set $npcs.lyla.flags.theory_count += 1>>
<<goto "t0_day01_lyla_text_end">>

---

### PASSAGE: t0_day01_lyla_text_b

**Me:** "Classified."

**Lyla:** "CLASSIFIED? Manuel González, you are a backend developer from Guadalajara, not Jason Bourne."

**Lyla:** "What could POSSIBLY be classified about your new job?"

**Me:** "NDAs are real, Lyla."

**Lyla:** "NDAs. Sure. My startup has an NDA too and all we do is make scheduling software for dentists. Are you making scheduling software for dentists?"

**Me:** "I'm not making scheduling software for dentists."

**Lyla:** "Then WHAT"

**Me:** "I'll tell you when I can."

**Lyla:** "You're killing me. You know that? Literally killing me. I'm going to die of curiosity and you're going to have to explain to my mother that you let her daughter perish because you wouldn't tell her about your dumb job."

**Me:** "Your mother loves me."

**Lyla:** "My mother loves everyone. That's not the flex you think it is."

<<set $npcs.lyla.flags.suspicion += 2>>
<<set $npcs.lyla.flags.theory_count += 1>>
<<goto "t0_day01_lyla_text_end">>

---

### PASSAGE: t0_day01_lyla_text_c

I take a photo of Chipi. She's on the couch, lying on her back with all four paws in the air, looking like a small furry crime scene. I send it.

**Lyla:** "oh my GOD"

**Lyla:** "look at her belly"

**Lyla:** "I would die for that cat"

**Lyla:** "...wait. Don't think I didn't notice you dodging my question."

**Me:** "What question?"

**Lyla:** "THE JOB QUESTION, MANUEL."

**Me:** "It went well. I'll tell you more when there's more to tell."

**Lyla:** "Fine. But I'm giving you until Friday and then I'm showing up at your apartment with wine and I'm not leaving until you talk."

**Me:** "Friday works."

**Lyla:** "Friday works BECAUSE I'M NOT GIVING YOU A CHOICE. Goodnight, hot stuff. Tell Chipi I love her more than you."

<<set $npcs.lyla.flags.suspicion += 1>>
<<set $flags.lyla_friday_visit = true>>
<<goto "t0_day01_lyla_text_end">>

---

### PASSAGE: t0_day01_lyla_text_end

I put the phone down. Lyla is going to figure it out eventually. She's too smart and too stubborn and too invested in my life to let a vague answer stand for more than a week. The question isn't whether she finds out. The question is what she does when she does.

The answer to that question terrifies me more than anything Elena said today.

<<run SOY.NPCs.adjustRelationship('lyla', 1)>>

---

## NPC ENCOUNTER: JAMES TEXT EXCHANGE

### PASSAGE: t0_day01_james_text

*(Triggers at 9 PM, automatic phone notification.)*

**James:** "Dinner this week? I found a new Thai place. My treat."

<<link "Accept: 'Thursday?'" "t0_day01_james_accept">><</link>>
<<link "Rain check: 'This week is crazy, next week?'" "t0_day01_james_delay">><</link>>

---

### PASSAGE: t0_day01_james_accept

**Me:** "Thursday?"

**James:** "Done."

**James:** "Hope the new job is good, man. You deserve good things."

I stare at that text. "You deserve good things." James drops sentences like that into conversations the way other people drop loose change, without noticing, without expecting it back. He doesn't know it lands like a brick in my chest every time.

James survived the Brevity cuts. I didn't. He handles that fact by feeding me at restaurants I can't afford and telling me I deserve things I'm not sure I do. It's love, I think. The specific love of a man who can't stop apologizing for a thing he didn't do, expressed through pad thai.

<<set $flags.james_dinner_thursday = true>>
<<set $npcs.james.flags.guilt_dinners += 1>>
<<run SOY.NPCs.adjustRelationship('james', 1)>>

---

### PASSAGE: t0_day01_james_delay

**Me:** "This week is crazy with the new job. Next week?"

**James:** "Of course! Whenever works for you."

**James:** "No rush at all."

**James:** "Just let me know."

Three messages. Each one more accommodating than the last. James's guilt operates on an exponential curve. The more space I give him, the more he fills it with kindness, and the kindness makes me feel guilty for not accepting the kindness, and the whole thing is an ouroboros of two grown men being too nice to each other.

<<set $npcs.james.flags.guilt_dinners += 0>>
<<run SOY.NPCs.adjustRelationship('james', -1)>>
<<set $flags.james_dinner_delayed = true>>

---

## NPC ENCOUNTER: MAMÁ VOICE NOTE (Detailed)

### PASSAGE: t0_day01_mama_voicenote

*(Full voice note content; player chooses to listen or skip.)*

<<link "Play the voice note" "t0_day01_mama_play">><</link>>
<<link "Save it for later" "t0_day01_mama_skip">><</link>>

---

### PASSAGE: t0_day01_mama_play

I hold the phone to my ear. Low volume. The kitchen feels smaller when her voice is in it.

"Mijo, soy yo." As if anyone else leaves four-minute voice notes on a Monday. "I went to church this morning. Father Ordóñez gave a beautiful sermon about patience but I wasn't paying attention because Doña Carmen was wearing that hat again, the purple one, you remember? She looks like an eggplant. Don't tell anyone I said that."

I smile. My eyes sting.

"I lit a candle for you. A big one, the kind that costs twenty pesos, not the little ones. Your father says I spend too much on candles but your father also says the truck needs new brake pads so I told him to mind his brake pads and I'll mind my candles."

She laughs at her own joke. She always laughs at her own jokes.

"Tía Rosa was there. She says hello. She looks terrible, mijo. She's gained weight since the thing with her gallbladder but don't tell her I said that either. I said it in love. Everything I say is in love. Your father is fine, he's fixing the neighbor's truck again, the Hernández boy, the one with the earring. I told him to charge more but Ricardo González has never charged what he's worth and I've been telling him that for thirty years."

Pause. Breath. When she breathes on the voice notes I can hear the kitchen in Guadalajara behind her. The hum of the fridge, the ticking of the clock she's had since I was a baby, the faint sound of the street outside.

"I made pozole yesterday. I thought of you. I'll send you the recipe but you won't make it because you never make what I send you. That's okay. When you come home I'll make it for you."

When. Not if. She says "when" because in her universe there is no "if" about her son coming home. The possibility that I might not be able to come home doesn't exist in her reality and I can't bring myself to put it there.

"I love you, mijo. Call me backand when are you going to find a nice girl? You're twenty-five. When I was twenty-five I already had your brother. Your brother has a girlfriend now, did he tell you? Military girl. She looks stern but she laughs at his jokes so she must be either very smart or very patient."

"Bueno. Call me. Besos."

The voice note ends. The kitchen is quiet. Chipi is on the counter, watching me with the calm attention of a creature who has never heard a mother's voice on a phone and felt the distance between herself and home collapse into a thing so small it fits in your chest and so heavy it makes breathing hard.

I don't call back. Not tonight. I'll call tomorrow. Or Wednesday. Wednesday is her usual day. I'll call Wednesday and say "research, biometric" and she'll ask about a girlfriend and I'll say "pronto, mamá" and we'll both pretend.

<<set $flags.mama_voicenote_listened = true>>
<<set $player.guilt -= 1>>

---

### PASSAGE: t0_day01_mama_skip

I look at the notification. Her face in the tiny circle. Smiling. She's always smiling in photos.

Not tonight. I can't hold her voice in my head right now along with everything else. There's no room. The apartment is full of Elena's lecture and Rafael's questions and the number twenty-seven and the Transfer Worker's Handbook PDF sitting in my inbox like a bomb with a reading list.

I mark it as "listened." I haven't listened. The lie is small enough to not count. That's what I tell myself.

<<set $flags.mama_voicenote_listened = false>>
<<set $player.guilt += 1>>

---

## AMBIENT ENCOUNTER: THE HANDBOOK

### PASSAGE: t0_day01_handbook_reading

*(Optional; player can choose to read the handbook before bed.)*

I open the PDF on my phone. Lie on the bed. Chipi sits on my chest, which means I'm reading the screen at an angle past her head, which means I'm getting cat hair on my phone and not retaining much of anything, but I try.

**Chapter 1: Foundations of Neuroelectric Identity Mapping**

"*The human consciousness is not localized. While the brain serves as the primary processing center, the complete cognitive-emotional-somatic identity extends throughout the entire nervous system. A person's identity is as much in their fingertips as in their frontal lobe: touch memory, proprioceptive habit, the physical patterns of a lifetime of living in one specific body. Transfer technology maps all of it.*"

I read three pages. Chipi falls asleep on my chest. Her weight is warm and small and specific, maybe three kilograms of cat pressing me into the mattress. In a few hours she'll be the only thing pressing me into anything because I'll be in a transfer pod getting my consciousness pulled through a needle's eye into a body that weighs more than Chipi but less than me.

I close the PDF. Battery at 23%. Tomorrow.

I set the phone on the nightstand and lie there in the dark with the cat on my chest and the handbook half-read and the day sitting on top of me like a second blanket, heavy, warm, and impossible to kick off.

<<set $flags.handbook_read = true>>

---

## RELATIONSHIP TRACKER: DAY 1 END STATE

```
NPC STATUS, END OF DAY 1:

PACO:     Relationship 6/10 (+1) | Knows secret: YES | Last seen: Day 1
LYLA:     Relationship 5/10 (+1) | Knows secret: NO  | Suspicion: 1-2 | Last seen: Day 1
JAMES:    Relationship 4-5/10    | Knows secret: NO  | Dinner: Scheduled/Delayed
TOMMY:    Relationship 1/10 (+1) | Knows secret: YES (fellow trainee) | Met: Day 1
GEORGIA:  Relationship 1/10 (+1) | Knows secret: YES (fellow trainee) | Met: Day 1
LULU:     Relationship 3-4/10   | Knows secret: NO  | Empanadas: 1-2
DANNY:    Relationship 2-3/10   | Knows secret: NO  | Chashu bonus: 0-1
SEÑORA V: Relationship 1/10    | Notes: 1 | Plates: 0-1
ADRIANA:  NOT YET MET (Day 3)
ELENA:    Instructor, no relationship score (respect-based)
RAFAEL:   Evaluator, no relationship score (trust-based)
YUKI:     Admin, no relationship score (efficiency-based)

MAMÁ:     Voice note: Listened/Skipped
HÉCTOR:   No contact Day 1
```

---

## QUEST TRACKER: DAY 1 COMPLETION

```
MAIN QUEST:
  ✅ "First Day": Complete Day 1 at SoY
     - Arrived at facility
     - Completed intake
     - Attended lecture
     - Completed Rafael's assessment
     - Returned home

SIDE QUESTS:
  ✅/❌ SQ-001: "Feed the Machine" / Ate meal (tracked)
  🔄 SQ-002: "Keeping Up Appearances" / Lyla suspicion active
  ✅/❌ SQ-003: "Guilt Dinner" / James dinner accepted/delayed
  ✅/❌ SQ-004: "The Bodega Saint" / Visited/Skipped Lulu
  ✅/❌ SQ-005: "Mamá's Voice Notes" / Listened/Skipped

SEEDS PLANTED:
  → Lyla threatens Friday visit (if cat photo chosen)
  → James dinner scheduled for Day 4 (if accepted)
  → Tommy connection established
  → Georgia intrigued Manuel
  → Handbook partially read
  → Señora Vidal's arroz con pollo eaten (if triggered)
```

---

## CONTINUITY NOTES FOR DAY 2

```
WHAT MANUEL IS WEARING: Navy blue henley, dark jeans, boots
WHAT HE ATE: Toast (morning), empanadas (Lulu x2), rice & beans (home)
             Optional: Danny's spicy miso ramen, Señora Vidal's arroz con pollo
CHIPI STATUS: Fed salmon. Headbutted ankle. Slept on chest.
EMOTIONAL STATE: Anxious, determined, information-overloaded. No arousal. Too tense.
BODY STATE: Own body. No transfers yet. No phantoms. No echoes.
PHONE: Paco called (reported), Lyla texted (deflected), James texted (dinner),
       Mamá voice note (listened/skipped)
WEATHER: October cold. Grey morning. Purple-yellow sunset. Cold night.
MEZCAL TRACKER: None yet. Vega bar not visited. Adriana not met.
MONEY: Started $2,100. Spent $12 at Lulu's + optional $14 at Danny's.
       Balance: $2,088 or $2,074
```
