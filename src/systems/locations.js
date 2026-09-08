/* locations.js   Location registry, travel, availability */
window.SOY = window.SOY || {};

SOY.Locations = {
	registry: {
		apartment: {
			name: "Manuel's Apartment",
			available: ['morning', 'afternoon', 'evening', 'night'],
			npcs: ['chipi'],
			activities: ['cook', 'sleep', 'shower', 'phone', 'solo'],
			unlocked: true
		},
		facility: {
			name: "Shape of You Inc.",
			available: ['morning', 'afternoon'],
			npcs: ['elena', 'rafael', 'sarkis', 'yuki', 'tommy', 'georgia'],
			activities: ['course', 'job_prep', 'cafeteria'],
			unlocked: true
		},
		vega: {
			name: "Vega Bar",
			available: ['evening', 'night'],
			npcs: ['adriana'],
			activities: ['drink', 'talk', 'flirt'],
			unlocked: true
		},
		dannys: {
			name: "Danny's Ramen",
			available: ['afternoon', 'evening', 'night'],
			npcs: ['danny'],
			activities: ['eat', 'decompress'],
			unlocked: true
		},
		lulus: {
			name: "Lulu's Bodega",
			available: ['morning', 'afternoon', 'evening'],
			npcs: ['lulu'],
			activities: ['shop', 'talk'],
			unlocked: true
		},
		park: {
			name: "Neighborhood Park",
			available: ['morning', 'afternoon'],
			npcs: [],
			activities: ['walk', 'read', 'people_watch'],
			unlocked: true
		},
		adriana_apt: {
			name: "Adriana's Apartment",
			available: ['evening', 'night', 'morning'],
			npcs: ['adriana', 'mezcal_cat'],
			activities: ['cook', 'talk', 'sex', 'sleep'],
			unlocked: false,
			unlockCondition: { npc: 'adriana', relationship: 4 }
		},
		mall: {
			name: "Shopping Mall",
			available: ['morning', 'afternoon', 'evening'],
			npcs: [],
			activities: ['shop', 'browse', 'eat'],
			unlocked: true
		},
		cafe: {
			name: "Coffee Shop",
			available: ['morning', 'afternoon', 'evening'],
			npcs: [],
			activities: ['coffee', 'read', 'work', 'meet'],
			unlocked: true
		},
		street: {
			name: "Ninth Street",
			available: ['morning', 'afternoon', 'evening', 'night'],
			npcs: [],
			activities: ['walk'],
			unlocked: true
		}
	},

	getAvailable: function () {
		var slot = SOY.Time.currentSlot();
		var available = [];
		for (var key in this.registry) {
			if (!Object.prototype.hasOwnProperty.call(this.registry, key)) continue;
			var loc = this.registry[key];
			if (loc.unlocked && loc.available.indexOf(slot) !== -1) {
				available.push(key);
			}
		}
		return available;
	},

	travel: function (locationId) {
		State.variables.currentLocation = locationId;
	}
};
