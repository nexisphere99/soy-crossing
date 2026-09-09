/* config.js   SugarCube runtime configuration + static setup data */

Config.history.maxStates = 150;
Config.history.controls = true;
Config.passages.nobr = false;
Config.saves.maxAutoSaves = 1;
Config.saves.maxSlotSaves = 8;

/* let CSS `hyphens: auto` engage in justified prose */
try { document.documentElement.lang = document.documentElement.lang || 'en'; } catch (e) {}

/* Build version   shown under the title in the sidebar and on the splash. */
setup.version = '0.0.4';

/* Namespace bootstrap (systems files each guard this too) */
window.SOY = window.SOY || {};

/*
 * Master calendar. Only Tier 0 Day 1 is stubbed here; the full schedule
 * (courses, jobs, weekends) gets filled in when Tier 0 content lands.
 * SOY.Time.updatePhase() reads this and no-ops on missing days.
 */
setup.masterSchedule = {
	1: { phase: 'course', tier: 0, courseDay: 1 },
	2: { phase: 'course', tier: 0, courseDay: 2 },
	3: { phase: 'course', tier: 0, courseDay: 3 },
	4: { phase: 'course', tier: 0, courseDay: 4 },
	5: { phase: 'course', tier: 0, courseDay: 5 }
};

/*
 * Training clones. Each is a body profile passed to SOY.Body.transfer();
 * `slug` drives the portrait / full-body art and the sidebar name.
 */
setup.clones = {
	'7f': {
		id: '7f',
		slug: 'flor',
		name: 'Flor',
		designation: 'Clone 7-F',
		height: "5'4\"",
		skinTone: 'light brown',
		hair: 'dark brown, wavy, shoulder-length',
		eyes: 'brown',
		cupSize: 'B',
		build: 'athletic-slim',
		details: 'moles across the collarbones',
		neuralProfile: 'passive',
		module: 1
	},
	'7k': {
		id: '7k',
		slug: 'katya',
		name: 'Katya',
		designation: 'Clone 7-K',
		height: "5'7\"",
		skinTone: 'pale, warm undertones',
		hair: 'auburn, long, straight, past the shoulders',
		eyes: 'blue-grey',
		cupSize: 'C',
		build: 'wider hips, fuller thighs, defined waist',
		details: 'skin that shows blood easily',
		neuralProfile: 'semi-active',
		responses: ['blush', 'temperature', 'flinch', 'heart-rate'],
		module: 2,
		phantomSet: [
			{ type: 'chest_weight',           label: 'phantom weight at the chest, heavier than Flor',   intensity: 3 },
			{ type: 'blush_memory',           label: 'the memory of blood climbing to the face',          intensity: 3 },
			{ type: 'temperature_sensitivity', label: 'skin reading the air like weather',                intensity: 2 },
			{ type: 'hip_sway',               label: 'the sway, louder now, two bodies deep',             intensity: 2 }
		]
	},
	'7r': {
		id: '7r',
		slug: 'renata',
		name: 'Renata',
		designation: 'Clone 7-R',
		height: "5'6\"",
		skinTone: 'golden-brown',
		hair: 'jet-black, curly, past the shoulders',
		eyes: 'dark brown with amber flecks',
		cupSize: 'D',
		build: 'strong, curvy frame, wide hips',
		details: 'a body that occupies space without apology',
		neuralProfile: 'dynamic',
		responses: ['blush', 'breath-pattern', 'temperature-nipple', 'proximity-arousal', 'hip-sway', 'auto-leg-cross'],
		module: 3,
		phantomSet: [
			{ type: 'breast_weight_d',  label: 'heavy, forward-pulling weight on the chest, felt in the spine', intensity: 3 },
			{ type: 'hip_authority',    label: 'a gait that expects hips that spread when it sits',             intensity: 3 },
			{ type: 'speculum_stretch', label: 'an interior that was opened and is now closed',                 intensity: 3 },
			{ type: 'thigh_pressure',   label: 'legs that expect to touch when crossed',                        intensity: 2 }
		]
	}
};

/*
 * Visa countdown shown in the sidebar during the backstory.
 * Keyed by passage name; PassageReady applies it.
 */
setup.visaClock = {
	"Start":                     60,
	"backstory_layoff":          60,
	"backstory_night":           60,
	"backstory_search":          46,
	"backstory_family":          40,
	"backstory_diana":           37,
	"backstory_loneliness":      33,
	"backstory_threeinterviews": 32,
	"backstory_dataforge":       30,
	"backstory_craftwork":       28,
	"backstory_paco":            28,
	"backstory_decision":        28,
	"backstory_end":             28
};
