/* dialogue.js   styled conversation components.
 *
 *   <<say "Lulu">>...<</say>>        in-person line, NPC (avatar, left)
 *   <<say "Me">>...<</say>>          in-person line, Manuel (right, no avatar)
 *   <<txt "Lyla">>...<</txt>>        phone message, incoming
 *   <<txt "Me">>...<</txt>>          phone message, outgoing
 *   <<phone "Lyla">> ...msgs... <</phone>>   frames a text thread
 *
 * Speakers not in setup.speakers still work   the avatar falls back to an
 * initial on a colour derived from the name, so nothing needs registering.
 * Consecutive lines from the same speaker (with no prose between) drop the
 * name and avatar so a back-and-forth reads as a conversation.
 */
window.SOY = window.SOY || {};

setup.speakers = {
	me:        { name: 'Manuel',         hue: 32,  slug: 'manuel' },
	manuel:    { name: 'Manuel',         hue: 32,  slug: 'manuel' },
	lulu:      { name: 'Lulu',           hue: 24  },
	elena:     { name: 'Elena Cordero',  hue: 210 },
	rafael:    { name: 'Rafael Mende',   hue: 150 },
	yuki:      { name: 'Yuki Tanaka',    hue: 264 },
	tommy:     { name: 'Tommy',          hue: 12  },
	georgia:   { name: 'Georgia',        hue: 288 },
	brett:     { name: 'Brett',          hue: 96  },
	danny:     { name: 'Danny',          hue: 6   },
	paco:      { name: 'Paco',           hue: 44  },
	lyla:      { name: 'Lyla',           hue: 330 },
	james:     { name: 'James',          hue: 186 },
	'mamá':    { name: 'Mamá',           hue: 348, slug: 'mama' },
	mama:      { name: 'Mamá',           hue: 348, slug: 'mama' },
	vidal:     { name: 'Señora Vidal',   hue: 300 },
	stranger:  { name: 'The woman',      hue: 200 },
	/* backstory voices */
	diana:     { name: 'Diana',          hue: 172 },
	'héctor':  { name: 'Héctor',         hue: 18,  slug: 'hector' },
	hector:    { name: 'Héctor',         hue: 18,  slug: 'hector' },
	valerie:   { name: 'Valerie',        hue: 198 },
	howard:    { name: 'Howard Kessler', hue: 216 },
	recruiter: { name: 'The recruiter',  hue: 228 },
	manager:   { name: 'The manager',    hue: 220 }
};

SOY.hueFor = function (str) {
	var h = 0, s = String(str || '');
	for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
	return h;
};

SOY.isPlayerSpeaker = function (key) {
	return key === 'me' || key === 'manuel' || key === 'i' || key === 'manuel gonzález';
};

SOY.avatarHTML = function (key, name) {
	var sp = setup.speakers[key] || {};
	var hue = sp.hue != null ? sp.hue : SOY.hueFor(name || key);
	var label = (name || sp.name || key || '?').trim();
	var initial = label.charAt(0).toUpperCase() || '?';
	var slug = sp.slug || key.replace(/[^a-z0-9_-]/g, '');
	var src = 'game_files/img/avatars/' + slug + '.png';
	return '<span class="avatar" style="--hue:' + hue + '">'
		+ '<img src="' + src + '" alt="" '
		+ 'onload="this.parentNode.classList.add(\'has-img\')" '
		+ 'onerror="this.remove()">'
		+ '<b>' + initial + '</b></span>';
};

(function () {
	// Is the last thing rendered into `host` a line/msg from the same speaker?
	function isContinuation(host, cls, key) {
		try {
			var n = host && host.lastChild;
			while (n && (n.nodeType === 3 || n.nodeName === 'BR')) n = n.previousSibling;
			return !!(n && n.classList
				&& n.classList.contains(cls)
				&& n.getAttribute('data-who') === key);
		} catch (e) {
			return false;
		}
	}

	function build(host, rawSpeaker, payload, kind) {
		var raw = String(rawSpeaker || '').trim();
		var key = raw.toLowerCase();
		var sp = setup.speakers[key] || {};
		var name = sp.name || raw;
		var me = SOY.isPlayerSpeaker(key);
		var text = (payload || '').trim();
		var hue = sp.hue != null ? sp.hue : SOY.hueFor(name || key);
		var cls = kind === 'txt' ? 'msg' : 'line';
		var cont = isContinuation(host, cls, key);

		var wrap = jQuery('<div>')
			.addClass(kind === 'txt'
				? 'msg ' + (me ? 'msg-out' : 'msg-in')
				: 'line ' + (me ? 'line-me' : 'line-npc'))
			.attr('data-who', key)
			.css('--hue', hue);
		if (cont) wrap.addClass('is-cont');

		var body = jQuery('<div class="line-body">');
		if (!cont && !me) {
			body.append(jQuery('<span>')
				.addClass(kind === 'txt' ? 'msg-who' : 'line-who')
				.text(name));
		}
		var bubble = jQuery('<div class="bubble">');
		bubble.wiki(text);
		body.append(bubble);

		if (kind === 'txt') {
			wrap.append(body);
		} else {
			/* in-person lines get an avatar on their own side */
			var av = cont
				? jQuery('<span class="avatar-space">')
				: jQuery(SOY.avatarHTML(key, name));
			if (me) { wrap.append(body).append(av); }
			else    { wrap.append(av).append(body); }
		}
		return wrap;
	}

	Macro.add('say', {
		tags: null,
		handler: function () {
			build(this.output, this.args[0], this.payload[0].contents, 'say').appendTo(this.output);
		}
	});

	Macro.add('txt', {
		tags: null,
		handler: function () {
			build(this.output, this.args[0], this.payload[0].contents, 'txt').appendTo(this.output);
		}
	});

	Macro.add('phone', {
		tags: null,
		handler: function () {
			var who = String(this.args[0] || '').trim();
			var key = who.toLowerCase();
			var name = (setup.speakers[key] || {}).name || who || 'Messages';
			var $frame = jQuery('<div class="thread">');
			jQuery('<div class="thread-head">')
				.append(SOY.avatarHTML(key, name))
				.append(jQuery('<span>').text(name))
				.appendTo($frame);
			var $body = jQuery('<div class="thread-body">');
			$body.wiki((this.payload[0].contents || '').trim());
			$body.appendTo($frame);
			$frame.appendTo(this.output);
		}
	});
})();

/* <<objectivesDialog>>   opens the objectives panel as a modal */
Macro.add('objectivesDialog', {
	handler: function () {
		Dialog.setup('Objectives', 'objectives-dialog');
		Dialog.wiki('<<questRender>>');
		Dialog.open();
	}
});
