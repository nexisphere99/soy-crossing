/* time.js   Day/night cycle, calendar, scheduling */
window.SOY = window.SOY || {};

SOY.Time = {
	slots: ['morning', 'afternoon', 'evening', 'night'],

	init: function () {
		State.variables.calendar = {
			day: 1,            // Absolute day count from game start
			weekday: 5,        // 1=Mon through 7=Sun (game starts Friday)
			week: 1,
			timeSlot: 0,       // Index into slots array
			tier: 0,
			course: 0,
			courseDay: null,
			jobId: null,
			phase: 'transition'
		};
	},

	advance: function () {
		var cal = State.variables.calendar;
		cal.timeSlot++;
		if (cal.timeSlot >= this.slots.length) {
			cal.timeSlot = 0;
			cal.day++;
			cal.weekday = (cal.weekday % 7) + 1;
			if (cal.weekday === 1) cal.week++;
			this.updatePhase();
		}
	},

	currentSlot: function () {
		return this.slots[State.variables.calendar.timeSlot];
	},

	// Advance forward until the day has reached (at least) slot index `n`.
	// Idempotent and re-entry safe: never advances past `n`, so it will not
	// roll the day over on its own.
	ensureSlot: function (n) {
		var cal = State.variables.calendar;
		while (cal.timeSlot < n) { this.advance(); }
	},

	isWeekend: function () {
		var wd = State.variables.calendar.weekday;
		return wd === 6 || wd === 7;
	},

	dayName: function () {
		var names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		return names[State.variables.calendar.weekday - 1];
	},

	updatePhase: function () {
		var schedule = setup.masterSchedule || {};
		var today = schedule[State.variables.calendar.day];
		if (today) {
			State.variables.calendar.phase = today.phase;
			State.variables.calendar.courseDay = today.courseDay || null;
			State.variables.calendar.jobId = today.jobId || null;
		}
	}
};
