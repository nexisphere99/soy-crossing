/* phone.js   Phone/text message system */
window.SOY = window.SOY || {};

SOY.Phone = {
	init: function () {
		State.variables.phone = {
			messages: [],
			missedCalls: [],
			contacts: ['paco', 'lyla', 'james', 'mama', 'hector', 'diana', 'tommy', 'georgia']
		};
	},

	addMessage: function (from, text) {
		State.variables.phone.messages.push({
			from: from,
			text: text,
			day: State.variables.calendar.day,
			timeSlot: SOY.Time.currentSlot(),
			read: false
		});
	},

	getUnread: function () {
		return State.variables.phone.messages.filter(function (m) { return !m.read; });
	},

	addContact: function (contactId) {
		var contacts = State.variables.phone.contacts;
		if (contacts.indexOf(contactId) === -1) {
			contacts.push(contactId);
		}
	}
};
