/* functions.js   helpers used by widgets and passages */
window.SOY = window.SOY || {};

/*
 * Sidebar visa countdown. Built as an HTML string because SugarCube does not
 * evaluate macros inside raw HTML attributes, so the urgency class has to be
 * baked into the markup here.
 */
setup.visaHTML = function (days) {
	var n = Number(days);
	var level = n <= 30 ? ' danger' : (n <= 45 ? ' warn' : '');
	return '<div class="visa' + level + '">'
		+ '<span class="n">' + n + '</span>'
		+ '<span class="l">days on the clock</span>'
		+ '</div>';
};

/* Relationship label passthrough for prose/widgets. */
setup.rel = function (npcId) {
	return SOY.NPCs.getRelationshipLabel(npcId);
};

/* Random encounter rolls. */
SOY.Random = {
	// true `chance`% of the time (0-100)
	check: function (chance) {
		return Math.random() * 100 < chance;
	}
};
