/* charpanel.js — the right-hand character panel.
 *
 * A full-body image of whoever Manuel currently is, pinned to the right edge.
 * Injected once into <body>, refreshed after each passage, and only when the
 * figure actually changes (so no flicker). Purely decorative: pointer-events
 * off, hidden on narrow screens (CSS), hidden when images are off or the file
 * is missing.
 *
 * Art: game_files/img/full_body/<slug>.png  — "manuel" by default; a transfer
 * body uses its profile's `slug`/`id` if it has one.
 */
(function () {
	var lastSrc = null;

	function panelEl() {
		var el = document.getElementById('char-panel');
		if (!el) {
			el = document.createElement('div');
			el.id = 'char-panel';
			el.setAttribute('aria-hidden', 'true');
			document.body.appendChild(el);
		}
		return el;
	}

	function currentFigure() {
		var v = State.variables;
		if (SOY.Body && SOY.Body.isTransferred && SOY.Body.isTransferred()) {
			var p = (v.body && v.body.currentProfile) || {};
			return { slug: p.slug || p.id || 'clone', name: p.name || 'Transferred' };
		}
		return { slug: 'manuel', name: 'Manuel' };
	}

	function refresh() {
		var el = panelEl();
		var v = State.variables;

		if (v.settings && v.settings.showImages === false) {
			el.hidden = true;
			lastSrc = null;
			return;
		}

		var fig = currentFigure();
		var src = 'game_files/img/full_body/' + fig.slug + '.png';
		if (src === lastSrc) { el.hidden = false; return; }
		lastSrc = src;

		el.hidden = false;
		el.classList.remove('no-img');
		el.innerHTML =
			'<img src="' + src + '" alt="" ' +
			'onerror="document.getElementById(\'char-panel\').classList.add(\'no-img\')">' +
			'<span class="char-name">' + fig.name + '</span>';
	}

	jQuery(document).on(':storyready', refresh);
	jQuery(document).on(':passagedisplay', refresh);
})();
