/* render.js   passage output tidy-up.
 *
 * Gameplay passages open with a stack of <<set>>/<<run>>/<<scene>> lines. With
 * Config.passages.nobr = false (needed for the prose paragraphs) each of those
 * lines leaves a <br>, so the reader gets a wall of blank space before the
 * text. This trims leading breaks, strips breaks hugging block components, and
 * collapses long runs   so passages can keep a readable macro header without a
 * visual gap.
 */
postrender['tidy-breaks'] = function (content) {
	var isBlank = function (n) {
		return n.nodeName === 'BR' || (n.nodeType === 3 && !/\S/.test(n.textContent));
	};

	// leading breaks
	while (content.firstChild && isBlank(content.firstChild)) {
		content.removeChild(content.firstChild);
	}
	// trailing breaks
	while (content.lastChild && isBlank(content.lastChild)) {
		content.removeChild(content.lastChild);
	}

	// blocks that carry their own margins shouldn't also collect <br>s
	var blocks = '.scene, figure.portrait, .line, .msg, .thread, .card, .opt, .day-recap, .qb';
	Array.prototype.forEach.call(content.querySelectorAll(blocks), function (el) {
		['previousSibling', 'nextSibling'].forEach(function (dir) {
			var sib = el[dir];
			while (sib && isBlank(sib)) {
				var nxt = sib[dir];
				sib.parentNode.removeChild(sib);
				sib = nxt;
			}
		});
	});

	// collapse runs of 3+ <br> down to 2
	var run = [];
	var flush = function () {
		for (var i = 2; i < run.length; i++) run[i].remove();
		run = [];
	};
	Array.prototype.slice.call(content.childNodes).forEach(function (node) {
		if (node.nodeName === 'BR') run.push(node);
		else if (node.nodeType === 3 && !/\S/.test(node.textContent)) { /* keep run alive */ }
		else flush();
	});
	flush();
};
