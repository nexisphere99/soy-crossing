/* config.js   SugarCube runtime configuration + static setup data */

Config.history.maxStates = 150;
Config.history.controls = true;
Config.passages.nobr = false;
Config.saves.maxAutoSaves = 1;
Config.saves.maxSlotSaves = 8;

/* let CSS `hyphens: auto` engage in justified prose */
try { document.documentElement.lang = document.documentElement.lang || 'en'; } catch (e) {}

/* Build version — shown under the title in the sidebar and on the splash. */
setup.version = '0.0.1';

/* Namespace bootstrap (systems files each guard this too) */
window.SOY = window.SOY || {};

/*
 * Master calendar. Only Tier 0 Day 1 is stubbed here; the full schedule
 * (courses, jobs, weekends) gets filled in when Tier 0 content lands.
 * SOY.Time.updatePhase() reads this and no-ops on missing days.
 */
setup.masterSchedule = {
	1: { phase: 'course', tier: 0, courseDay: 1 }
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
