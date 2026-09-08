/* npcs.js   NPC state machine, relationship tracking */
window.SOY = window.SOY || {};

SOY.NPCs = {
	init: function () {
		State.variables.npcs = {
			adriana: {
				name: "Adriana", relationship: 0, met: false, knowsSecret: false,
				romance: false, lastSeen: 0, flags: {}, conversations: []
			},
			paco: {
				name: "Paco", relationship: 5, met: true, knowsSecret: true,
				lastSeen: 0, flags: {}, conversations: []
			},
			lyla: {
				name: "Lyla", relationship: 4, met: true, knowsSecret: false,
				lastSeen: 0, flags: { theory_count: 0, suspicion: 0 }, conversations: []
			},
			james: {
				name: "James", relationship: 4, met: true, knowsSecret: false,
				lastSeen: 0, flags: { guilt_dinners: 0 }, conversations: []
			},
			tommy: {
				name: "Tommy", relationship: 0, met: false, knowsSecret: true,
				lastSeen: 0, flags: {}, conversations: []
			},
			georgia: {
				name: "Georgia", relationship: 0, met: false, knowsSecret: true,
				lastSeen: 0, flags: {}, conversations: []
			},
			lulu: {
				name: "Lulu", relationship: 3, met: true, knowsSecret: false,
				lastSeen: 0, flags: { empanada_count: 0 }, conversations: []
			},
			danny: {
				name: "Danny", relationship: 2, met: true, knowsSecret: false,
				lastSeen: 0, flags: { chashu_bonus: 0 }, conversations: []
			}
		};
	},

	adjustRelationship: function (npcId, amount) {
		var npc = State.variables.npcs[npcId];
		if (npc) {
			npc.relationship = Math.max(0, Math.min(10, npc.relationship + amount));
			npc.lastSeen = State.variables.calendar.day;
		}
	},

	isAvailable: function (npcId) {
		var loc = State.variables.currentLocation;
		var locData = SOY.Locations.registry[loc];
		if (!locData) return false;
		return locData.npcs.indexOf(npcId) !== -1;
	},

	getRelationshipLabel: function (npcId) {
		var level = State.variables.npcs[npcId].relationship;
		if (level <= 1) return "Stranger";
		if (level <= 3) return "Acquaintance";
		if (level <= 5) return "Friend";
		if (level <= 7) return "Close Friend";
		if (level <= 8) return "Intimate";
		return "Partner";
	}
};
