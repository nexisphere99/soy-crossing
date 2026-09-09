/* body.js   Body state (current body, phantom echoes, arousal) */
window.SOY = window.SOY || {};

SOY.Body = {
	EXERCISES: ['standing', 'walking', 'hands', 'voice', 'clothing'],

	init: function () {
		State.variables.body = {
			current: 'self',
			currentProfile: null,
			phantoms: [],
			exercises: [],
			arousal: 0,
			transferCount: 0,
			lastTransfer: null,
			todayTransferred: false
		};
	},

	/* Marks one guided transfer exercise done (idempotent). */
	completeExercise: function (name) {
		var b = State.variables.body;
		if (!b.exercises) b.exercises = [];
		if (b.exercises.indexOf(name) === -1) b.exercises.push(name);
	},

	/* Fresh start for a new transfer session. */
	resetExercises: function () {
		State.variables.body.exercises = [];
	},

	transfer: function (bodyId, bodyData) {
		var b = State.variables.body;
		b.current = bodyId;
		b.currentProfile = bodyData;
		b.transferCount++;
		b.lastTransfer = State.variables.calendar.day;
		b.todayTransferred = true;
	},

	deTransfer: function () {
		var b = State.variables.body;
		if (b.currentProfile) {
			this.addPhantom(b.currentProfile);
		}
		b.current = 'self';
		b.currentProfile = null;
	},

	addPhantom: function (bodyData) {
		var phantoms = State.variables.body.phantoms;
		var day = State.variables.calendar.day;
		var src = bodyData.name;
		var set = [
			{ type: 'chest_weight',  label: 'phantom weight at the chest',   intensity: 3 },
			{ type: 'hip_sway',      label: 'gait adjusting for wider hips', intensity: 2 },
			{ type: 'hand_size',     label: 'hands feel too large',          intensity: 2 },
			{ type: 'voice_register', label: 'own voice sounds too deep',    intensity: 1 }
		];
		set.forEach(function (p) {
			phantoms.push({ source: src, type: p.type, label: p.label, intensity: p.intensity, day: day });
		});
		while (phantoms.length > 8) phantoms.shift();
	},

	decayPhantoms: function () {
		var phantoms = State.variables.body.phantoms;
		for (var i = phantoms.length - 1; i >= 0; i--) {
			phantoms[i].intensity--;
			if (phantoms[i].intensity <= 0) {
				phantoms.splice(i, 1);
			}
		}
	},

	isTransferred: function () {
		return State.variables.body.current !== 'self';
	},

	hasPhantoms: function () {
		return State.variables.body.phantoms.length > 0;
	}
};
