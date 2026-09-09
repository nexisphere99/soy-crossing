/* charpanel.js   collapsible right-hand character panel.
 *
 * A full-body image of whoever Manuel currently is, in a drawer that slides in
 * from the right. A tab on its left edge toggles it; the open/closed choice is
 * remembered (localStorage). On wide screens an open drawer reserves space so
 * the reading column stays centred; on mobile it just overlays and defaults to
 * closed.
 *
 * Art: game_files/img/full_body/<slug>.png   "manuel" by default; a transfer
 * body uses its profile's `slug`/`id` if it has one.
 */
(function () {
	var WIDE = 1200;
	var lastSrc = null;
	var built = false;

	function readPref() {
		try { return localStorage.getItem('soy.charpanel'); } catch (e) { return null; }
	}
	function writePref(v) {
		try { localStorage.setItem('soy.charpanel', v); } catch (e) {}
	}

	function applyReserve() {
		var el = document.getElementById('char-panel');
		var on = el
			&& el.classList.contains('open')
			&& !el.classList.contains('no-img')
			&& !el.hidden
			&& window.innerWidth >= WIDE;
		document.documentElement.classList.toggle('charpanel-reserve', !!on);
	}

	function setOpen(open, persist) {
		var el = document.getElementById('char-panel');
		if (!el) return;
		el.classList.toggle('open', open);
		var btn = el.querySelector('#char-toggle');
		if (btn) btn.setAttribute('aria-expanded', String(open));
		if (persist) writePref(open ? 'open' : 'closed');
		applyReserve();
	}

	function build() {
		var el = document.getElementById('char-panel');
		if (el) return el;

		el = document.createElement('aside');
		el.id = 'char-panel';
		el.setAttribute('aria-hidden', 'true');
		el.innerHTML =
			'<button id="char-toggle" type="button" aria-label="Toggle character panel" aria-expanded="false">' +
				'<span class="char-toggle-icon" aria-hidden="true">‹</span>' +
			'</button>' +
			'<div class="char-card"><div class="char-figure"></div></div>';
		document.body.appendChild(el);

		el.querySelector('#char-toggle').addEventListener('click', function () {
			setOpen(!el.classList.contains('open'), true);
		});

		var t;
		window.addEventListener('resize', function () {
			clearTimeout(t);
			t = setTimeout(applyReserve, 120);
		});

		if (!built) {
			built = true;
			var pref = readPref();
			setOpen(pref === 'open' || (pref == null && window.innerWidth >= WIDE), false);
		}
		return el;
	}

	function currentFigure() {
		if (SOY.playerFigure) {
			var f = SOY.playerFigure();
			return { slug: f.slug, name: f.slug === 'manuel' ? 'Manuel' : f.name };
		}
		return { slug: 'manuel', name: 'Manuel' };
	}

	function refresh() {
		var el = build();
		var v = State.variables;

		if (v.settings && v.settings.showImages === false) {
			el.hidden = true;
			lastSrc = null;
			applyReserve();
			return;
		}
		el.hidden = false;

		var fig = currentFigure();
		var src = 'game_files/img/full_body/' + fig.slug + '.png';
		if (src !== lastSrc) {
			lastSrc = src;
			el.classList.remove('no-img');
			el.querySelector('.char-figure').innerHTML =
				'<img src="' + src + '" alt="" onerror="' +
					"var p=document.getElementById('char-panel');" +
					"p.classList.add('no-img');" +
					"document.documentElement.classList.remove('charpanel-reserve')" +
				'">' +
				'<span class="char-name">' + fig.name + '</span>';
		}
		applyReserve();
	}

	jQuery(document).on(':storyready', refresh);
	jQuery(document).on(':passagedisplay', refresh);
})();
