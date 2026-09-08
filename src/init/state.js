/* state.js   single source of truth for initial story state.
 *
 * Both StoryInit and a predisplay hook call SOY.ensureState(). The hook makes
 * the game self-heal: if a browser session was saved under an older state
 * schema (a dev rebuild, a mid-development refresh), the missing pieces are
 * filled in before the passage renders instead of throwing.
 */
window.SOY = window.SOY || {};

SOY.defaultPlayer = function () {
	return {
		name: 'Manuel González',
		age: 25,
		origin: 'Guadalajara, Mexico',
		visa: 'H-1B (grace period)',
		visaSafe: false,
		tier: 0,
		courseProgress: { current: null, day: 0 },
		jobsCompleted: 0,
		totalTransfers: 0,
		identity: 50,
		guilt: 0,
		energy: 100
	};
};

SOY.defaultFlags = function () {
	return {
		lyla_knows: false, adriana_knows: false, james_knows: false,
		first_transfer_done: false, first_job_done: false, first_sex_job_done: false,
		first_kiss_adriana: false, first_sex_adriana: false,
		visa_receipt: false, mama_knows_adriana: false
	};
};

SOY.defaultSettings = function () {
	return {
		showExplicit: true,
		showViolence: true,
		showMedical: true,
		showImages: true,
		textSpeed: 'normal'
	};
};

SOY.ensureState = function () {
	var v = State.variables;

	if (!v.calendar)        SOY.Time.init();
	if (!v.npcs)            SOY.NPCs.init();
	if (!v.body)            SOY.Body.init();
	if (!v.money)           SOY.Economy.init();
	if (!v.phone)           SOY.Phone.init();
	if (!v.quests)          SOY.Quests.init();
	if (!v.currentLocation) SOY.Locations.travel('apartment');

	if (!v.player)   v.player   = SOY.defaultPlayer();
	if (!v.flags)    v.flags    = SOY.defaultFlags();
	if (!v.settings) v.settings = SOY.defaultSettings();

	// backfill any settings keys added since this session was saved
	var ds = SOY.defaultSettings();
	Object.keys(ds).forEach(function (k) {
		if (v.settings[k] === undefined) v.settings[k] = ds[k];
	});

	if (v.phase == null)    v.phase = 'backstory';
	if (v.visaDays == null) v.visaDays = 60;

	// if a session is already inside Tier 0 but predates the quest system,
	// register the Day 1 quests so the HUD has something to show
	if (v.phase === 'tier0' && v.quests && !v.quests.main.t0_day01) {
		SOY.Quests.registerDay1();
	}
};

predisplay['soy-ensure-state'] = function () {
	SOY.ensureState();
};
