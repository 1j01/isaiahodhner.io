/*
MANUALLY compiled (once) for now
 */

(function() {
	/*
	 * NOTE: This should be kept in sync with https://github.com/multiism/multi-medium
	 */
	var Spanvas, all_spanvases, deserialize_strokes, save_button, savings, selected_spanvas, serialize_strokes, the_input;

	all_spanvases = [];

	selected_spanvas = null;

	the_input = null;

	savings = document.createElement("div");

	savings.style.position = "fixed";

	savings.style.top = "5px";

	savings.style.right = "5px";

	savings.style.background = "white";

	savings.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.3)";

	savings.style.borderRadius = "2px";

	savings.style.padding = "4px";

	save_button = document.createElement("button");

	save_button.innerText = "Save";

	save_button.addEventListener("click", function(e) {
		var datas, label, spanvas, textarea;
		datas = (function() {
			var j, len, results;
			results = [];
			for (j = 0, len = all_spanvases.length; j < len; j++) {
				spanvas = all_spanvases[j];
				if (spanvas.hasData()) {
					results.push(serialize_strokes(spanvas.getData().strokes));
				} else {
					results.push(null);
				}
			}
			return results;
		})();
		label = document.createElement("label");
		label.innerHTML = "Paste the following into a <code>&lt;script&gt;</code>:<br>";
		textarea = document.createElement("textarea");
		textarea.value = `MultiMedium.setData(${JSON.stringify(datas)});`;
		textarea.style.width = "100%";
		textarea.style.boxSizing = "border-box";
		savings.removeChild(save_button);
		savings.appendChild(label);
		label.appendChild(textarea);
		return textarea.select();
	});

	savings.appendChild(save_button);

	serialize_strokes = function(strokes) {
		var a, j, k, len, len1, point, points, resolution, results;
		resolution = 1000;
		results = [];
		for (j = 0, len = strokes.length; j < len; j++) {
			({points} = strokes[j]);
			a = [];
			for (k = 0, len1 = points.length; k < len1; k++) {
				point = points[k];
				a.push((~~(point.x * resolution)) / resolution, (~~(point.y * resolution)) / resolution);
			}
			results.push(a);
		}
		return results;
	};

	deserialize_strokes = function(strokes) {
		var coords, i, j, len, results;
		results = [];
		for (j = 0, len = strokes.length; j < len; j++) {
			coords = strokes[j];
			results.push({
				points: (function() {
					var k, ref, results1;
					results1 = [];
					for (i = k = 0, ref = coords.length; k < ref; i = k += 2) {
						results1.push({
							x: coords[i],
							y: coords[i + 1]
						});
					}
					return results1;
				})()
			});
		}
		return results;
	};

	Spanvas = function(word, data) {
		var canvas, original_width, spanvas, strokes, style;
		spanvas = document.createElement("span");
		spanvas.style.position = "relative";
		spanvas.className = "multi-medium-word";
		canvas = document.createElement("canvas");
		canvas.width = canvas.height = 0;
		canvas.style.userSelect = "none";
		canvas.style.webkitUserSelect = "none";
		canvas.style.pointerEvents = "none";
		canvas.style.position = "absolute";
		canvas.style.left = "0";
		canvas.style.top = "0";
		spanvas.appendChild(document.createTextNode(word));
		spanvas.appendChild(canvas);
		strokes = null;
		style = null;
		spanvas.deselect = function() {
			spanvas.removeAttribute("tabIndex");
			spanvas.render();
			selected_spanvas = null;
			return the_input != null ? the_input.clear() : void 0;
		};
		spanvas.select = function() {
			if (selected_spanvas != null) {
				selected_spanvas.deselect();
			}
			selected_spanvas = spanvas;
			spanvas.render();
			if (the_input != null) {
				the_input.clear();
			}
			spanvas.setAttribute("tabIndex", "0");
			// TODO: left/right/up/down caret-like movement for going between words (or at least left/right for previous/next word)
			spanvas.focus();
			return spanvas.addEventListener("focusout", function(e) {
				return spanvas.deselect();
			}, {
				once: true
			});
		};
		spanvas.hasData = function() {
			return strokes != null;
		};
		spanvas.getData = function() {
			return {strokes};
		};
		spanvas.setData = function(data) {
			({strokes} = data);
			return spanvas.render();
		};
		spanvas.setStyle = function(new_style) {
			style = new_style;
			return spanvas.render();
		};
		original_width = null;
		spanvas.render = function() {
			var canvas_text_width, ctx, j, k, len, len1, line_width, max_x, max_y, min_x, min_y, padding, point, points, rect, scale, weight, y_offset;
			rect = spanvas.getBoundingClientRect();
			if (original_width == null) {
				original_width = rect.width;
			}
			canvas.style.display = "inline-block";
			ctx = canvas.getContext("2d");
			if (strokes) {
				scale = rect.height;
				weight = (function() {
					var ref;
					switch (style != null ? style.fontWeight : void 0) {
						case "normal":
							return 400;
						case "bold":
							return 700;
						default:
							return (ref = style != null ? style.fontWeight : void 0) != null ? ref : 400;
					}
				})();
				line_width = 1 + (parseInt(weight) / 400 * scale / 30);
				max_x = 0;
				min_x = 2e308;
				max_y = 0;
				min_y = 2e308;
				for (j = 0, len = strokes.length; j < len; j++) {
					({points} = strokes[j]);
					for (k = 0, len1 = points.length; k < len1; k++) {
						point = points[k];
						max_x = Math.max(max_x, point.x);
						min_x = Math.min(min_x, point.x);
						max_y = Math.max(max_y, point.y);
						min_y = Math.min(min_y, point.y);
					}
				}
				padding = MultiMedium.getPadding(line_width);
				y_offset = ~~Math.min(0, min_y * scale);
				canvas.width = (max_x - min_x) * scale + padding * 2;
				canvas.height = Math.max(rect.height, max_y * scale - y_offset + padding * 2);
				ctx.lineWidth = line_width;
				ctx.strokeStyle = style != null ? style.color : void 0;
				ctx.save();
				ctx.translate(-min_x * scale + padding, -y_offset + padding);
				MultiMedium.drawStrokes(strokes, ctx, scale);
				ctx.restore();
				spanvas.style.color = "transparent";
				canvas.style.left = `${-padding}px`;
				canvas.style.top = `${y_offset - padding}px`;
				canvas_text_width = canvas.width - padding * 2;
				spanvas.style.letterSpacing = `${Math.max(-8, (canvas_text_width - original_width) / word.length)}px`;
			}
		};
		setTimeout(function() {
			var json;
			if (data != null ? data.strokes : void 0) {
				spanvas.setData(data);
			}
			json = localStorage[`multi-medium:${all_spanvases.indexOf(spanvas)}:strokes`];
			if (json) {
				return spanvas.setData({
					strokes: deserialize_strokes(JSON.parse(json))
				});
			}
		});
		all_spanvases.push(spanvas);
		return spanvas;
	};

	this.MultiMedium = function(text, handwriting_data) {
		var data, element, i, render, spanvas, spanvases, strokes, word, words;
		element = document.createElement("span");
		words = text.split(" ");
		spanvases = (function() {
			var j, len, results;
			results = [];
			for (i = j = 0, len = words.length; j < len; i = ++j) {
				word = words[i];
				data = handwriting_data != null ? handwriting_data[i] : void 0;
				if (data) {
					strokes = deserialize_strokes(data.strokes);
				}
				spanvas = Spanvas(word, {strokes});
				element.appendChild(spanvas);
				if (i + 1 !== words.length) {
					element.appendChild(document.createTextNode(" "));
				}
				results.push(spanvas);
			}
			return results;
		})();
		render = function() {
			var j, len, style;
			style = getComputedStyle(element);
			for (j = 0, len = spanvases.length; j < len; j++) {
				spanvas = spanvases[j];
				spanvas.setStyle(style);
			}
		};
		requestAnimationFrame(render);
		return element;
	};

	this.MultiMedium.Input = function() {
		var canvas, clear, ctx, element, element_style, point_for, pointers, redo, redoes, render, strokes, undo, undoable, undoes, update, update_dimensions;
		element = document.createElement("div");
		element.className = "multi-medium-input";
		canvas = document.createElement("canvas");
		canvas.setAttribute("touch-action", "none");
		ctx = canvas.getContext("2d");
		element.appendChild(canvas);
		element_style = null;
		update_dimensions = function() {
			var _, canvas_style, cbb, cbl, cbr, cbt, cmb, cml, cmr, cmt, cpb, cpl, cpr, cpt, pb, pl, pr, pt;
			element_style = getComputedStyle(element);
			canvas_style = getComputedStyle(canvas);
			_ = function(v) {
				if (isNaN(v)) {
					return 0;
				} else {
					return parseInt(v);
				}
			};
			pl = _(element_style.paddingLeft);
			pr = _(element_style.paddingRight);
			pt = _(element_style.paddingTop);
			pb = _(element_style.paddingBottom);
			cpl = _(canvas_style.paddingLeft);
			cpr = _(canvas_style.paddingRight);
			cpt = _(canvas_style.paddingTop);
			cpb = _(canvas_style.paddingBottom);
			cml = _(canvas_style.marginLeft);
			cmr = _(canvas_style.marginRight);
			cmt = _(canvas_style.marginTop);
			cmb = _(canvas_style.marginBottom);
			cbl = _(canvas_style.borderLeft);
			cbr = _(canvas_style.borderRight);
			cbt = _(canvas_style.borderTop);
			cbb = _(canvas_style.borderBottom);
			canvas.width = element.clientWidth - pl - pr - cml - cmr - cpl - cpr - cbl - cbr;
			canvas.height = element.clientHeight - pt - pb - cmt - cmb - cpt - cpb - cbt - cbb;
			// WOW, THAT'S A LITTLE BIT ABSURD, DON'T YOU THINK?
			// can I not use scrollWidth/scrollHeight to remove at least some of those?
			// (this code is trying to handle extreme cases not present in the demo btw)
			// console.log "absurdity test", element.clientWidth, element.scrollWidth, canvas.width
			return render();
		};
		pointers = {};
		strokes = [];
		undoes = [];
		redoes = [];
		update = function() {
			render();
			if (selected_spanvas != null) {
				selected_spanvas.setData({strokes});
				// @HACK
				document.body.appendChild(savings);
				savings.innerHTML = "";
				savings.appendChild(save_button);
				return localStorage[`multi-medium:${all_spanvases.indexOf(selected_spanvas)}:strokes`] = JSON.stringify(serialize_strokes(strokes));
			}
		};
		clear = function() {
			pointers = {};
			strokes = [];
			undoes = [];
			redoes = [];
			return render();
		};
		undo = function() {
			if (undoes.length) {
				redoes.push(serialize_strokes(strokes));
				strokes = deserialize_strokes(undoes.pop());
				return update();
			}
		};
		redo = function() {
			if (redoes.length) {
				undoes.push(serialize_strokes(strokes));
				strokes = deserialize_strokes(redoes.pop());
				return update();
			}
		};
		undoable = function() {
			undoes.push(serialize_strokes(strokes));
			return redoes = [];
		};
		render = function() {
			var baseline, ref, ref1, selected_word;
			baseline = canvas.height * 0.8;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgba(100, 100, 100, 0.1)";
			ctx.font = `${baseline}px sans-serif`;
			selected_word = (ref = (ref1 = selected_spanvas != null ? selected_spanvas.textContent : void 0) != null ? ref1 : selected_spanvas != null ? selected_spanvas.innerText : void 0) != null ? ref : "";
			ctx.fillText(selected_word, 20, baseline);
			ctx.strokeStyle = element_style != null ? element_style.color : void 0;
			ctx.lineWidth = 10;
			return MultiMedium.drawStrokes(strokes, ctx, canvas.height);
		};
		point_for = function(e) {
			var canvas_style, cpl, cpt, rect, scale;
			rect = canvas.getBoundingClientRect();
			canvas_style = getComputedStyle(canvas);
			cpl = parseInt(canvas_style.paddingLeft);
			cpt = parseInt(canvas_style.paddingTop);
			if (isNaN(cpl)) {
				cpl = 0;
			}
			if (isNaN(cpt)) {
				cpt = 0;
			}
			scale = canvas.height;
			return {
				x: (e.clientX - rect.left - cpl) / scale,
				y: (e.clientY - rect.top - cpt) / scale
			};
		};
		canvas.addEventListener("pointerdown", function(e) {
			var stroke;
			if (e.pointerType === "mouse" && e.button !== 0) {
				return;
			}
			e.preventDefault();
			undoable();
			stroke = {
				points: [point_for(e)]
			};
			pointers[e.pointerId] = {
				stroke,
				type: e.pointerType
			};
			strokes.push(stroke);
			return update();
		});
		window.addEventListener("pointermove", function(e) {
			var dx, dy, np, pointer, pp;
			pointer = pointers[e.pointerId];
			if (pointer) {
				e.preventDefault();
				np = point_for(e);
				pp = pointer.stroke.points[pointer.stroke.points.length - 1];
				dx = np.x - pp.x;
				dy = np.y - pp.y;
				// @TODO: extend last point if the angle from the last point to np would be
				// very similar to the angle between the point before last and the last point?
				if (Math.sqrt(dx * dx + dy * dy) > 0.02) {
					pointer.stroke.points.push(np);
					return update();
				}
			}
		});
		window.addEventListener("pointerup", function(e) {
			return delete pointers[e.pointerId];
		});
		canvas.addEventListener("pointercancel", function(e) {
			var pointer;
			pointer = pointers[e.pointerId];
			if (pointer) {
				strokes.splice(strokes.indexOf(pointer.stroke), 1);
			}
			return delete pointers[e.pointerId];
		});
		window.addEventListener("click", function(e) {
			var spanvas;
			spanvas = e.target.closest(".multi-medium-word");
			return spanvas != null ? spanvas.select() : void 0;
		});
		document.body.classList.add("multi-medium-edit-mode"); // for cursor: pointer

		// @TODO: localize this event listener
		window.addEventListener("keydown", function(e) {
			if (e.ctrlKey && !(e.metaKey || e.altKey)) {
				if (e.keyCode === 90) { // Z
					if (e.shiftKey) {
						redo();
					} else {
						undo();
					}
				}
				if (e.keyCode === 89) { // Y
					return redo();
				}
			}
		});
		requestAnimationFrame(update_dimensions);
		window.addEventListener("resize", update_dimensions);
		requestAnimationFrame(function() {
			var j, len, results, spanvas;
			results = [];
			for (j = 0, len = all_spanvases.length; j < len; j++) {
				spanvas = all_spanvases[j];
				if (!(!spanvas.hasData())) {
					continue;
				}
				spanvas.select();
				break;
			}
			return results;
		});
		if (the_input) {
			alert("Multiple MultiMedium.Inputs aren't exactly supported (for a silly reason)");
		}
		the_input = element;
		the_input.clear = clear;
		return element;
	};

	this.MultiMedium.setData = function(datas) {
		var data, i, j, len;
		for (i = j = 0, len = datas.length; j < len; i = ++j) {
			data = datas[i];
			if (data) {
				all_spanvases[i].setData({
					strokes: deserialize_strokes(data)
				});
			}
		}
	};

	this.MultiMedium.rerender = function() {
		var j, len, spanvas;
// NOTE: MultiMedium.rerender is not needed when calling MultiMedium.setData

// TODO: re-calculate original width of the text
		for (j = 0, len = all_spanvases.length; j < len; j++) {
			spanvas = all_spanvases[j];
			spanvas.render();
		}
	};

	// for override
	this.MultiMedium.drawStrokes = function(strokes, ctx, scale = 1) {
		var j, k, len, len1, point, points;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.beginPath();
		for (j = 0, len = strokes.length; j < len; j++) {
			({points} = strokes[j]);
			ctx.moveTo(points[0].x * scale, points[0].y * scale);
			if (points.length === 1) { // make single points visible
				ctx.lineTo(points[0].x * scale, points[0].y * scale + 0.01);
			}
			for (k = 0, len1 = points.length; k < len1; k++) {
				point = points[k];
				ctx.lineTo(point.x * scale, point.y * scale);
			}
		}
		return ctx.stroke();
	};

	// for override
	this.MultiMedium.getPadding = function(line_width) {
		return line_width * 2;
	};

}).call(this);
