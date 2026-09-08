/* body.js   Body state (current body, phantom echoes, arousal) */
window.SOY = window.SOY || {};

SOY.Body = {
	init: function () {
		State.variables.body = {
			current: 'self',
			currentProfile: null,
			phantoms: [],
			arousal: 0,
			transferCount: 0,
			lastTransfer: null,
			todayTransferred: false
		};
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
		phantoms.push({
			source: bodyData.name,
			type: bodyData.cupSize,
			intensity: 3,
			day: State.variables.calendar.day
		});
		if (phantoms.length > 5) phantoms.shift();
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
