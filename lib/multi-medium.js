// NOTE: This should be kept in sync with https://github.com/multiism/multi-medium

// Changes:
// - added conditional so this module isn't executed on the server (Next.js uses isomorphic JS paradigm)
// - exposed all_spanvases for hacky cleanup
// - fixed behavior when zooming in/out

if (typeof window !== "undefined") {

let selected_spanvas = null;
let the_input = null;
const savings = document.createElement("div");
savings.style.position = "fixed";
savings.style.top = "5px";
savings.style.right = "5px";
savings.style.background = "white";
savings.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.3)";
savings.style.borderRadius = "2px";
savings.style.padding = "4px";
const save_button = document.createElement("button");
save_button.innerText = "Save";
save_button.addEventListener("click", (e)=> {
	const datas = MultiMedium.all_spanvases.map((spanvas)=>
		spanvas.hasData() ? serialize_strokes(spanvas.getData().strokes) : null
	);
	const label = document.createElement("label");
	label.innerHTML = "Paste the following into a <code>&lt;script&gt;</code>:<br>";
	const textarea = document.createElement("textarea");
	textarea.value = `MultiMedium.setData(${JSON.stringify(datas)});`;
	textarea.style.width = "100%";
	textarea.style.boxSizing = "border-box";
	savings.removeChild(save_button);
	savings.appendChild(label);
	label.appendChild(textarea);
	textarea.select();
});
savings.appendChild(save_button);

const serialize_strokes = (strokes)=> {
	const resolution = 1000;
	return strokes.map(({points})=> {
		const flattened_coords = [];
		for (let point of points) {
			flattened_coords.push(
				(~~(point.x * resolution)) / resolution,
				(~~(point.y * resolution)) / resolution
			);
		}
		return flattened_coords;
	});
};

const deserialize_strokes = (strokes)=>
	strokes.map((coords)=> {
		const points = [];
		for (let i = 0, end = coords.length; i < end; i += 2) {
			points.push({x: coords[i], y: coords[i+1]});
		}
		return {points};
	});

const Spanvas = (word, data)=> {
	const spanvas = document.createElement("span");
	spanvas.style.position = "relative";
	spanvas.className = "multi-medium-word";
	const canvas = document.createElement("canvas");
	canvas.width = 0;
	canvas.height = 0;
	canvas.style.userSelect = "none";
	canvas.style.webkitUserSelect = "none";
	canvas.style.pointerEvents = "none";
	canvas.style.position = "absolute";
	canvas.style.left = "0";
	canvas.style.top = "0";

	spanvas.appendChild(document.createTextNode(word));
	spanvas.appendChild(canvas);

	let strokes = null;
	let style = null;

	spanvas.deselect = ()=> {
		spanvas.removeAttribute("tabIndex");
		spanvas.render();
		selected_spanvas = null;
		if (the_input != null) {
			the_input.clear();
		}
	};

	spanvas.select = ()=> {
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
		spanvas.addEventListener("focusout", (e)=> { spanvas.deselect(); }, {once: true});
	};

	spanvas.hasData = () => strokes != null;

	spanvas.getData = () => ({strokes});

	spanvas.setData = (data)=> {
		strokes = data.strokes;
		spanvas.render();
	};

	spanvas.setStyle = (new_style)=> {
		style = new_style;
		spanvas.render();
	};

	spanvas.render = ()=> {
		spanvas.style.letterSpacing = ""; // so that the later letterSpacing calculation is idempotent
		const rect = spanvas.getBoundingClientRect();
		const original_width = original_width || rect.width;
		canvas.style.display = "inline-block";
		const ctx = canvas.getContext("2d");
		if (strokes) {
			const scale = rect.height;

			let weight = (style && style.fontWeight) || "normal";
			if (weight === "normal") { weight = 400; }
			if (weight === "bold") { weight = 700; }

			const line_width = 1 + (((parseInt(weight) / 400) * scale) / 30);

			let max_x = 0;
			let min_x = Infinity;
			let max_y = 0;
			let min_y = Infinity;
			for (let {points} of strokes) {
				for (let point of points) {
					max_x = Math.max(max_x, point.x);
					min_x = Math.min(min_x, point.x);
					max_y = Math.max(max_y, point.y);
					min_y = Math.min(min_y, point.y);
				}
			}

			const padding = MultiMedium.getPadding(line_width);

			const y_offset = ~~Math.min(0, min_y * scale);
			canvas.width = ((max_x - min_x) * scale) + (padding * 2);
			canvas.height = Math.max(rect.height, ((max_y * scale) - y_offset) + (padding * 2));

			ctx.lineWidth = line_width;
			if (style && style.color) {
				ctx.strokeStyle = style.color;
			}
			ctx.save();
			ctx.translate((-min_x * scale) + padding, -y_offset + padding);
			MultiMedium.drawStrokes(strokes, ctx, scale);
			ctx.restore();

			spanvas.style.color = "transparent";
			canvas.style.left = `${-padding}px`;
			canvas.style.top = `${y_offset - padding}px`;

			const canvas_text_width = canvas.width - (padding * 2);
			spanvas.style.letterSpacing = `${Math.max(-8, (canvas_text_width - original_width) / word.length)}px`;
		}
	};

	setTimeout(()=> {
		if (data && data.strokes) { spanvas.setData(data); }
		const json = localStorage[`multi-medium:${MultiMedium.all_spanvases.indexOf(spanvas)}:strokes`];
		if (json) {
			spanvas.setData({strokes: deserialize_strokes(JSON.parse(json))});
		}
	});

	MultiMedium.all_spanvases.push(spanvas);
	return spanvas;
};


const MultiMedium = (text, handwriting_data)=> {
	let spanvas;
	const element = document.createElement("span");
	const words = text.split(" ");

	const spanvases = [];
	for (let i = 0; i < words.length; i++) {
		let strokes;
		const word = words[i];
		if (handwriting_data && handwriting_data[i]) {
			strokes = deserialize_strokes(handwriting_data[i].strokes);
		}
		spanvas = Spanvas(word, {strokes});
		element.appendChild(spanvas);
		if (words.length !== (i + 1)) {
			element.appendChild(document.createTextNode(" "));
		}
		spanvases.push(spanvas);
	}

	const render = ()=> {
		const style = getComputedStyle(element);
		for (spanvas of spanvases) {
			spanvas.setStyle(style);
		}
	};

	requestAnimationFrame(render);

	return element;
};
MultiMedium.all_spanvases = [];

MultiMedium.Input = ()=> {
	const element = document.createElement("div");
	element.className = "multi-medium-input";
	const canvas = document.createElement("canvas");
	canvas.setAttribute("touch-action", "none");
	const ctx = canvas.getContext("2d");
	element.appendChild(canvas);

	let element_style = null;
	const update_dimensions = ()=> {
		element_style = getComputedStyle(element);
		const canvas_style = getComputedStyle(canvas);
		const _ = (v)=> isNaN(v) ? 0 : parseInt(v);
		const pl = _(element_style.paddingLeft);
		const pr = _(element_style.paddingRight);
		const pt = _(element_style.paddingTop);
		const pb = _(element_style.paddingBottom);
		const cpl = _(canvas_style.paddingLeft);
		const cpr = _(canvas_style.paddingRight);
		const cpt = _(canvas_style.paddingTop);
		const cpb = _(canvas_style.paddingBottom);
		const cml = _(canvas_style.marginLeft);
		const cmr = _(canvas_style.marginRight);
		const cmt = _(canvas_style.marginTop);
		const cmb = _(canvas_style.marginBottom);
		const cbl = _(canvas_style.borderLeft);
		const cbr = _(canvas_style.borderRight);
		const cbt = _(canvas_style.borderTop);
		const cbb = _(canvas_style.borderBottom);
		canvas.width = element.clientWidth - pl - pr - cml - cmr - cpl - cpr - cbl - cbr;
		canvas.height = element.clientHeight - pt - pb - cmt - cmb - cpt - cpb - cbt - cbb;
		// WOW, THAT'S A LITTLE BIT ABSURD, DON'T YOU THINK?
		// can I not use scrollWidth/scrollHeight to remove at least some of those?
		// (this code is trying to handle extreme cases not present in the demo btw)
		// console.log "absurdity test", element.clientWidth, element.scrollWidth, canvas.width

		render();
	};

	let pointers = {};
	let strokes = [];
	let undoes = [];
	let redoes = [];

	const update = ()=> {
		render();
		if (selected_spanvas != null) {
			selected_spanvas.setData({strokes});
			// @HACK
			document.body.appendChild(savings);
			savings.innerHTML = "";
			savings.appendChild(save_button);
			localStorage[`multi-medium:${MultiMedium.all_spanvases.indexOf(selected_spanvas)}:strokes`] = JSON.stringify(serialize_strokes(strokes));
		}
	};

	const clear = ()=> {
		pointers = {};
		strokes = [];
		undoes = [];
		redoes = [];
		render();
	};

	const undo = ()=> {
		if (undoes.length) {
			redoes.push(serialize_strokes(strokes));
			strokes = deserialize_strokes(undoes.pop());
			update();
		}
	};

	const redo = ()=> {
		if (redoes.length) {
			undoes.push(serialize_strokes(strokes));
			strokes = deserialize_strokes(redoes.pop());
			update();
		}
	};

	const undoable = ()=> {
		undoes.push(serialize_strokes(strokes));
		redoes = [];
	};

	const render = ()=> {
		const baseline = canvas.height * 0.8;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "rgba(100, 100, 100, 0.1)";
		ctx.font = `${baseline}px sans-serif`;
		const selected_word = selected_spanvas && (selected_spanvas.textContent || selected_spanvas.innerText) || "";
		ctx.fillText(selected_word, 20, baseline);
		if (element_style && element_style.color) {
			ctx.strokeStyle = element_style.color;
		}
		ctx.lineWidth = 10;
		MultiMedium.drawStrokes(strokes, ctx, canvas.height);
	};

	const point_for = (e)=> {
		const rect = canvas.getBoundingClientRect();
		const canvas_style = getComputedStyle(canvas);
		let cpl = parseInt(canvas_style.paddingLeft);
		let cpt = parseInt(canvas_style.paddingTop);
		if (isNaN(cpl)) { cpl = 0; }
		if (isNaN(cpt)) { cpt = 0; }
		const scale = canvas.height;
		return {
			x: (e.clientX - rect.left - cpl) / scale,
			y: (e.clientY - rect.top - cpt) / scale
		};
	};

	canvas.addEventListener("pointerdown", (e)=> {
		if ((e.pointerType === "mouse") && (e.button !== 0)) { return; }
		e.preventDefault();
		undoable();
		const stroke = {points: [point_for(e)]};
		pointers[e.pointerId] = {stroke, type: e.pointerType};
		strokes.push(stroke);
		update();
	});

	window.addEventListener("pointermove", (e)=> {
		const pointer = pointers[e.pointerId];
		if (pointer) {
			e.preventDefault();
			const np = point_for(e);
			const pp = pointer.stroke.points[pointer.stroke.points.length - 1];
			const dx = np.x - pp.x;
			const dy = np.y - pp.y;
			// @TODO: extend last point if the angle from the last point to np would be
			// very similar to the angle between the point before last and the last point?
			if (Math.sqrt((dx*dx) + (dy*dy)) > 0.02) {
				pointer.stroke.points.push(np);
				update();
			}
		}
	});

	window.addEventListener("pointerup", (e)=> {
		delete pointers[e.pointerId];
	});

	canvas.addEventListener("pointercancel", (e)=> {
		const pointer = pointers[e.pointerId];
		if (pointer) {
			strokes.splice(strokes.indexOf(pointer.stroke), 1);
		}
		delete pointers[e.pointerId];
	});

	window.addEventListener("click", (e)=> {
		const spanvas = e.target.closest(".multi-medium-word");
		if (spanvas != null) {
			spanvas.select();
		}
	});

	document.body.classList.add("multi-medium-edit-mode"); // for cursor: pointer

	// @TODO: localize this event listener
	window.addEventListener("keydown", (e)=> {
		if (e.ctrlKey && !(e.metaKey || e.altKey)) {
			if (e.keyCode === 90) { // Z
				if (e.shiftKey) { redo(); } else { undo(); }
			}
			if (e.keyCode === 89) { // Y
				redo();
			}
		}
	});

	requestAnimationFrame(update_dimensions);
	window.addEventListener("resize", update_dimensions);

	requestAnimationFrame(()=> {
		for (let spanvas of MultiMedium.all_spanvases) {
			if (!spanvas.hasData()) {
				spanvas.select();
				break;
			}
		}
	});

	if (the_input) { alert("Multiple MultiMedium.Inputs aren't exactly supported (for a silly reason)"); }
	the_input = element;
	the_input.clear = clear;

	return element;
};

MultiMedium.setData = (datas)=> {
	datas.forEach((data, i)=> {
		if (data) {
			MultiMedium.all_spanvases[i].setData({strokes: deserialize_strokes(data)});
		}
	});
};

MultiMedium.rerender = ()=> {
	// NOTE: MultiMedium.rerender is not needed when calling MultiMedium.setData

	// TODO: re-calculate original width of the text
	for (let spanvas of MultiMedium.all_spanvases) {
		spanvas.render();
	}
};


// for override
MultiMedium.drawStrokes = (strokes, ctx, scale=1)=> {
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.beginPath();
	for (let {points} of strokes) {
		ctx.moveTo(points[0].x*scale, points[0].y*scale);
		if (points.length === 1) { ctx.lineTo(points[0].x*scale, (points[0].y*scale)+0.01); } // make single points visible
		for (let point of points) { ctx.lineTo(point.x*scale, point.y*scale); }
	}
	ctx.stroke();
};

// for override
MultiMedium.getPadding = (line_width)=> line_width * 2;

window.MultiMedium = MultiMedium;
// export default MultiMedium;

}
