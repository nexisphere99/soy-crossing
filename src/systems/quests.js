/* quests.js   main-quest objectives + daily side quests
 *
 * $quests = {
 *   main: { <key>: { id, title, status, objectives:[{id,text,where,done}] } },
 *   side: [ { id, title, description, status, objectives:[{id,text,done}] } ]
 * }
 * status: 'active' | 'complete' | 'failed'
 */
window.SOY = window.SOY || {};

SOY.Quests = {
	init: function () {
		State.variables.quests = { main: {}, side: [] };
	},

	/* Registers the Day 1 main quest + its daily side quests (once). */
	registerDay1: function () {
		this.addMain('t0_day01', {
			id: 'first_day',
			title: 'First Day',
			status: 'active',
			objectives: [
				{ id: 'arrive',   text: 'Get to Shape of You Inc.',          where: '814 Ninth Street',  done: false },
				{ id: 'intake',   text: 'Clear intake with Yuki',            where: 'SoY lobby',         done: false },
				{ id: 'lecture',  text: "Sit Elena's fundamentals lecture",  where: 'Room 4',            done: false },
				{ id: 'baseline', text: "Complete Rafael's psych baseline",  where: "Rafael's office",   done: false },
				{ id: 'go_home',  text: 'Get home before you fall over',     where: 'The apartment',     done: false }
			]
		});

		this.addSide({
			id: 'sq_001_feed', title: 'Feed the Machine',
			description: 'Eat a real meal today.',
			status: 'active',
			objectives: [{ id: 'eat', text: 'Eat something', done: false }]
		});
		this.addSide({
			id: 'sq_002_lyla', title: 'Keeping Up Appearances',
			description: 'Answer Lyla without giving up the truth.',
			status: 'active',
			objectives: [{ id: 'respond', text: 'Reply to Lyla', done: false }]
		});
		this.addSide({
			id: 'sq_003_james', title: 'Guilt Dinner',
			description: 'Deal with James and the dinner invite.',
			status: 'active',
			objectives: [{ id: 'respond', text: 'Reply to James', done: false }]
		});
		this.addSide({
			id: 'sq_004_bodega', title: 'The Bodega Saint',
			description: "Look in on Lulu. She'll feed you and ask questions.",
			status: 'active',
			objectives: [{ id: 'visit', text: "Visit Lulu's", done: false }]
		});
		this.addSide({
			id: 'sq_005_mama', title: "Mamá's Voice Note",
			description: "Monday's voice note is waiting.",
			status: 'active',
			objectives: [{ id: 'respond', text: 'Listen to it or save it', done: false }]
		});
	},

	/* Registers the Day 2 main quest + refreshes the daily side quests. */
	registerDay2: function () {
		this.addMain('t0_day02', {
			id: 'first_transfer',
			title: 'First Transfer',
			status: 'active',
			objectives: [
				{ id: 'lecture',    text: 'Sit the pre-transfer lecture',       where: 'Room 4',          done: false },
				{ id: 'transfer',   text: 'Transfer into Clone 7-F',            where: 'The transfer room', done: false },
				{ id: 'exercises',  text: 'Complete the guided exercises',      where: 'The transfer room', done: false },
				{ id: 'detransfer', text: 'Return to your own body',            where: 'The transfer room', done: false },
				{ id: 'debrief',    text: "Debrief with Rafael",                where: "Rafael's office",  done: false },
				{ id: 'go_home',    text: 'Get home and let the day close',     where: 'The apartment',    done: false }
			]
		});

		// new day, fresh daily board
		State.variables.quests.side = [];
		this.addSide({
			id: 'sq_001_feed', title: 'Feed the Machine',
			description: 'Eat before the 11 AM fast. Then eat again tonight.',
			status: 'active',
			objectives: [{ id: 'eat', text: 'Eat something', done: false }]
		});
		this.addSide({
			id: 'sq_002_lyla', title: 'Keeping Up Appearances',
			description: 'Lyla is done being patient. Handle her.',
			status: 'active',
			objectives: [{ id: 'respond', text: 'Deal with Lyla', done: false }]
		});
		this.addSide({
			id: 'sq_003_james', title: 'Guilt Dinner',
			description: 'Confirm or push the dinner with James.',
			status: 'active',
			objectives: [{ id: 'respond', text: 'Reply to James', done: false }]
		});
		this.addSide({
			id: 'sq_006_echo', title: 'Body Echo',
			description: 'Your body remembers a shape it wore. Notice it.',
			status: 'active',
			objectives: [{ id: 'first_phantom', text: 'Notice your first phantom', done: false }]
		});
		this.addSide({
			id: 'sq_007_tommy', title: "Tommy's Nerve",
			description: 'Tommy wants to compare notes after the transfer.',
			status: 'active',
			objectives: [{ id: 'post_transfer', text: 'Meet Tommy after the transfer', done: false }]
		});
	},

	addMain: function (key, quest) {
		State.variables.quests.main[key] = quest;
	},

	addSide: function (quest) {
		var side = State.variables.quests.side;
		if (!side.some(function (q) { return q.id === quest.id; })) side.push(quest);
	},

	activeMain: function () {
		var m = State.variables.quests.main;
		for (var k in m) {
			if (Object.prototype.hasOwnProperty.call(m, k) && m[k].status === 'active') return m[k];
		}
		return null;
	},

	completedMain: function () {
		var m = State.variables.quests.main, last = null;
		for (var k in m) {
			if (Object.prototype.hasOwnProperty.call(m, k) && m[k].status === 'complete') last = m[k];
		}
		return last;
	},

	/* Marks a main-quest objective done; auto-completes the quest when all are done. */
	complete: function (key, objId) {
		var q = State.variables.quests.main[key];
		if (!q) return;
		var o = q.objectives.find(function (x) { return x.id === objId; });
		if (o) o.done = true;
		if (q.objectives.every(function (x) { return x.done; })) q.status = 'complete';
	},

	/* Marks a side-quest objective (or the whole quest) done. */
	completeSide: function (id, objId) {
		var q = State.variables.quests.side.find(function (x) { return x.id === id; });
		if (!q) return;
		if (objId && q.objectives) {
			var o = q.objectives.find(function (x) { return x.id === objId; });
			if (o) o.done = true;
		}
		if (!q.objectives || q.objectives.every(function (x) { return x.done; })) q.status = 'complete';
	},

	/* The next unfinished objective of the active main quest, or null. */
	nextObjective: function () {
		var q = this.activeMain();
		if (!q) return null;
		return q.objectives.find(function (x) { return !x.done; }) || null;
	}
};
