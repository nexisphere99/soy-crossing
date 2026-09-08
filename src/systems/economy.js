/* economy.js   Money, course fees, rent, expenses */
window.SOY = window.SOY || {};

SOY.Economy = {
	init: function () {
		State.variables.money = {
			balance: 2100,
			rent: 1400,
			courseFee: 150,
			expenses: { food: 0, transport: 0, drinks: 0, other: 0 },
			income: [],
			nextRent: 30
		};
	},

	earn: function (amount, source) {
		State.variables.money.balance += amount;
		State.variables.money.income.push({
			amount: amount,
			source: source,
			day: State.variables.calendar.day
		});
	},

	spend: function (amount, category) {
		State.variables.money.balance -= amount;
		if (State.variables.money.expenses[category] !== undefined) {
			State.variables.money.expenses[category] += amount;
		}
	},

	canAfford: function (amount) {
		return State.variables.money.balance >= amount;
	},

	dailyCourseFee: function () {
		this.spend(State.variables.money.courseFee, 'other');
	}
};
