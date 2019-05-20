/*
MANUALLY compiled (once) for now
 */

(function() {
	// TODO: animate the text itself! with an animation of writing it and having the visuals all sprout from that
	// I want it to be luscious but also legible,
	// so it might be easier to go for a top down view, like of a garden with bushes in it making up the text

	// also, eventually this should be done using the technology I'm envisioning, and ideally editable in the page
	// (like you start out you think it's just a cool animated header, but you can actually mess around and you're in a full-blown editor)
	// but I could try to get across some concepts / the potential power of a system where you can retroactively edit anything

	// I also have various ideas about how it could be presented in stages, like:
	// handwriting "MAKE" (physically),
	// then typing out "MAKING" (digitally),
	// and then handwriting "BETTER" digitally,
	// where all the luscious greenery effects come into play
	// and then going back and applying the effects to the first and second words
	// (maybe (implying or actually) automatically recognizing paths, with skeletonization)

	// TODO: Add some clouds! maybe. or change the perspective. then i could make interesting stuff on the ground instead.
	// TODO: Redraw the text with a tablet, rather than a touchpad - or at least a mouse!
	var Bird, animate, birds, canvas, choose, container, ctx, element, i, len, ref, text, word_ctxs;

	choose = function(a) {
		return a[~~(Math.random() * a.length)];
	};

	canvas = document.createElement("canvas");

	ctx = canvas.getContext("2d");

	container = document.querySelector(".mission");

	container.appendChild(canvas);

	container.style.position = "relative";

	canvas.style.position = "absolute";

	canvas.style.left = "0";

	canvas.style.top = "0";

	canvas.style.pointerEvents = "none";

	word_ctxs = [];

	// the MultiMedium thing is mostly just getting in the way at this point
	// I'd rather control the drawing entirely
	// but instead I'm collecting contexts
	MultiMedium.drawStrokes = function(strokes, ctx, scale = 1) {
		var angle, color, draw_branch, end_x, end_y, find_furthest_point_in_direction, find_random_point, i, j, k, l, len, len1, len2, m, num_little_branches, point, points, ref, ref1, results, weight;
		weight = ctx.lineWidth;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.beginPath();
		word_ctxs.push(ctx);
		ref = ["#4e321d", "#966643", "#733e17"];
		for (i = 0, len = ref.length; i < len; i++) {
			color = ref[i];
			ctx.strokeStyle = color;
			ctx.beginPath();
			for (j = 0, len1 = strokes.length; j < len1; j++) {
				({points} = strokes[j]);
				ctx.moveTo(points[0].x * scale, points[0].y * scale);
				if (points.length === 1) {
					ctx.lineTo(points[0].x * scale, points[0].y * scale + 0.01);
				}
				for (k = 0, len2 = points.length; k < len2; k++) {
					point = points[k];
					ctx.lineTo(point.x * scale + (Math.random() * 2 - 1) * weight / 2, point.y * scale + (Math.random() * 2 - 1) * weight / 3);
				}
			}
			ctx.stroke();
		}

		// num_splotchy_knots = if ctx is word_ctxs[1] then 60 else 5
		// for [0...num_splotchy_knots]
		// 	color = choose(["#4e321d", "#966643", "#733e17"])
		// 	stroke = choose(strokes)
		// 	if stroke?
		// 		{points} = stroke
		// 		if points.length
		// 			ctx.strokeStyle = color
		// 			ctx.beginPath()
		// 			ctx.moveTo(points[0].x*scale, points[0].y*scale)
		// 			ctx.lineTo(points[0].x*scale, points[0].y*scale+0.01) if points.length is 1
		// 			for point in points
		// 				if Math.random() < 0.3
		// 					ctx.moveTo(
		// 						point.x * scale
		// 						point.y * scale
		// 					)
		// 					ctx.lineTo(
		// 						point.x * scale + (Math.random() * 2 - 1) * weight/2
		// 						point.y * scale + (Math.random() * 2 - 1) * weight/3
		// 					)
		// 	ctx.stroke()
		find_random_point = function() {
			var stroke;
			// TODO: even distribution with varying numbers of points in each stroke (especially e.g. dotted 'i's)
			// (or we might want to base it on ImageData instead of the list of points)
			stroke = choose(strokes);
			if (stroke != null) {
				return choose(stroke.points);
			}
		};
		num_little_branches = ctx === word_ctxs[1] ? 600 : 50;
		for (l = 0, ref1 = num_little_branches; (0 <= ref1 ? l < ref1 : l > ref1); 0 <= ref1 ? l++ : l--) {
			color = choose(["#4e321d", "#966643", "#733e17"]);
			point = find_random_point();
			if (point != null) {
				ctx.strokeStyle = color;
				ctx.lineWidth = weight / 4;
				ctx.beginPath();
				ctx.moveTo(point.x * scale, point.y * scale);
				ctx.lineTo(end_x = point.x * scale + (Math.random() * 2 - 1) * weight / 2, end_y = point.y * scale + ((Math.random() * 2 - 1) * 5 - 3) * weight / 6);
				ctx.stroke();
				ctx.fillStyle = "green";
				ctx.beginPath();
				ctx.arc(end_x, end_y, weight / 4, 0, Math.PI * 2);
				ctx.fill();
			}
		}
		draw_branch = function(x, y, color, angle = Math.random() * Math.PI * 2, recursion_level = 0) {
			var m, relative_angle;
			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(angle);
			ctx.strokeStyle = color;
			ctx.lineWidth = weight / 4;
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(end_x = 0, end_y = Math.random() * 10);
			ctx.stroke();
			ctx.fillStyle = "green";
			ctx.beginPath();
			ctx.arc(end_x, end_y, weight / 4, 0, Math.PI * 2);
			if (recursion_level < 3) {
				for (var m = 0; m < 2; m++) {
					relative_angle = (Math.random() * 2 - 1) * 0.9;
					draw_branch(end_x, end_y, color, relative_angle, recursion_level + 1);
				}
			}
			ctx.fill();
			return ctx.restore();
		};
		find_furthest_point_in_direction = function(angle) {
			var furthest_dist, furthest_point, len3, len4, m, n, y;
			furthest_dist = -2e308;
			furthest_point = null;
			for (m = 0, len3 = strokes.length; m < len3; m++) {
				({points} = strokes[m]);
				for (n = 0, len4 = points.length; n < len4; n++) {
					point = points[n];
					// x = point.x * Math.cos(angle) - point.y * Math.sin(angle)
					y = point.y * Math.cos(angle) - point.x * Math.sin(angle);
					if (y > furthest_dist) {
						furthest_dist = y;
						furthest_point = point;
					}
				}
			}
			return furthest_point;
		};
		results = [];
		for (var m = 0; m < 2; m++) {
			color = "#733e17";
			angle = Math.PI * 2 * Math.random();
			point = find_furthest_point_in_direction(angle);
			if (point != null) {
				results.push(draw_branch(point.x * scale, point.y * scale, color, angle));
			} else {
				results.push(void 0);
			}
		}
		return results;
	};

	MultiMedium.getPadding = function(lineWidth) {
		return 50;
	};

	ref = document.querySelectorAll(".mission .word");
	for (i = 0, len = ref.length; i < len; i++) {
		element = ref[i];
		// @TODO: make it so it copies with spaces to the clipboard
		// (it copies with newlines, but if you paste it into the address bar of chrome for instance,
		// it comes out as all one word)
		text = element.innerText; // + " "
		// hm, can't do that, it tries to split it into multiple .multi-medium-word spanvases
		element.innerHTML = "";
		element.appendChild(new MultiMedium(text));
	}

	// document.body.appendChild new MultiMedium.Input
	MultiMedium.setData([[[0.226, 0.327, 0.22, 0.367, 0.22, 0.427, 0.22, 0.507, 0.22, 0.554, 0.22, 0.607, 0.22, 0.64, 0.213, 0.72, 0.213, 0.747, 0.213, 0.794, 0.213, 0.814, 0.213, 0.854, 0.213, 0.887, 0.213, 0.92, 0.213, 0.947], [0.193, 0.194, 0.22, 0.214, 0.233, 0.254, 0.253, 0.307, 0.28, 0.414, 0.286, 0.454, 0.313, 0.527, 0.333, 0.574, 0.36, 0.6, 0.38, 0.62, 0.4, 0.64, 0.433, 0.66, 0.466, 0.64, 0.493, 0.56, 0.52, 0.474, 0.553, 0.38, 0.613, 0.22, 0.653, 0.127, 0.68, 0.1, 0.7, 0.094, 0.706, 0.114, 0.713, 0.227, 0.713, 0.354, 0.713, 0.48, 0.713, 0.6, 0.713, 0.694, 0.713, 0.754], [1.266, 0.08, 1.233, 0.08, 1.206, 0.08, 1.153, 0.08, 1.113, 0.12, 1.073, 0.18, 1.033, 0.287, 1.012, 0.414, 1.012, 0.46, 1.012, 0.62, 1.012, 0.66, 1.012, 0.694, 1.012, 0.72], [1.126, 0.054, 1.153, 0.054, 1.213, 0.054, 1.24, 0.054, 1.3, 0.054, 1.346, 0.054, 1.373, 0.054, 1.406, 0.067, 1.433, 0.127, 1.453, 0.18, 1.453, 0.26, 1.46, 0.36, 1.46, 0.467, 1.466, 0.574, 1.466, 0.687, 1.466, 0.767, 1.473, 0.807], [1.02, 0.34, 1.086, 0.36, 1.113, 0.367, 1.186, 0.38, 1.253, 0.394, 1.366, 0.394, 1.4, 0.394, 1.486, 0.394, 1.546, 0.394, 1.593, 0.394, 1.613, 0.394], [2.025, 0.014, 2.025, 0.04, 2.005, 0.1, 1.993, 0.16, 1.993, 0.2, 1.973, 0.32, 1.96, 0.4, 1.933, 0.547, 1.906, 0.614, 1.88, 0.68, 1.873, 0.714, 1.86, 0.774], [2.333, 0.027, 2.333, 0.054, 2.333, 0.08, 2.333, 0.14, 2.333, 0.207, 2.22, 0.327, 2.173, 0.36, 2.126, 0.38, 2.053, 0.42, 2.005, 0.447, 1.986, 0.447, 1.98, 0.474, 1.986, 0.52, 2.005, 0.54, 2.06, 0.614, 2.1, 0.687, 2.133, 0.754, 2.16, 0.794, 2.186, 0.814, 2.22, 0.834, 2.253, 0.854, 2.273, 0.86], [3.02, 0.007, 2.993, 0.007, 2.92, 0.007, 2.873, 0.007, 2.82, 0.007, 2.746, 0.007, 2.706, 0.007, 2.62, 0.02, 2.6, 0.034, 2.593, 0.067, 2.58, 0.114, 2.573, 0.154, 2.56, 0.234, 2.553, 0.314, 2.54, 0.434, 2.533, 0.5, 2.533, 0.607, 2.533, 0.634, 2.533, 0.734, 2.533, 0.807, 2.533, 0.887, 2.533, 0.927, 2.533, 0.96, 2.533, 0.98, 2.533, 1, 2.646, 1, 2.753, 1, 2.866, 0.994, 2.886, 0.987, 2.9, 0.967], [2.56, 0.427, 2.613, 0.42, 2.646, 0.42, 2.74, 0.42, 2.866, 0.42, 2.92, 0.42, 2.98, 0.42, 3.006, 0.42]], [[0.293, 0.187, 0.293, 0.347, 0.293, 0.427, 0.293, 0.547, 0.293, 0.647, 0.293, 0.734, 0.293, 0.82, 0.293, 0.874], [0.386, 0.22, 0.446, 0.247, 0.54, 0.347, 0.613, 0.454, 0.633, 0.46, 0.706, 0.46, 0.786, 0.34, 0.866, 0.2, 0.933, 0.094, 0.96, 0.047, 0.98, 0.034, 0.986, 0.067, 1, 0.214, 1.006, 0.48, 1.006, 0.54, 1.006, 0.674, 1.006, 0.747, 1.006, 0.834, 1.006, 0.88, 1.006, 0.9], [1.66, 0.094, 1.64, 0.12, 1.566, 0.214, 1.493, 0.32, 1.44, 0.427, 1.413, 0.54, 1.393, 0.647, 1.38, 0.727, 1.373, 0.774, 1.373, 0.794], [1.76, 0.094, 1.793, 0.094, 1.86, 0.167, 1.886, 0.22, 1.906, 0.267, 1.913, 0.387, 1.913, 0.487, 1.913, 0.567, 1.913, 0.647, 1.913, 0.714, 1.913, 0.76, 1.913, 0.794], [1.46, 0.467, 1.5, 0.467, 1.626, 0.467, 1.76, 0.467, 1.806, 0.467, 1.886, 0.467, 1.906, 0.467], [2.293, 0.147, 2.293, 0.207, 2.293, 0.287, 2.293, 0.414, 2.273, 0.547, 2.266, 0.587, 2.233, 0.727, 2.22, 0.787, 2.213, 0.847, 2.206, 0.894], [2.72, 0.147, 2.72, 0.287, 2.693, 0.407, 2.633, 0.454, 2.486, 0.514, 2.386, 0.54, 2.34, 0.54, 2.32, 0.54, 2.306, 0.567, 2.4, 0.654, 2.526, 0.74, 2.606, 0.787, 2.66, 0.82, 2.68, 0.84, 2.7, 0.867], [3.18, 0.18, 3.18, 0.234, 3.18, 0.434, 3.18, 0.52, 3.18, 0.714, 3.18, 0.794, 3.18, 0.84], [2.893, 0.134, 3.14, 0.134, 3.3, 0.134, 3.413, 0.134, 3.486, 0.127, 3.526, 0.127], [2.833, 0.82, 2.846, 0.84, 3.093, 0.867, 3.213, 0.867, 3.393, 0.867, 3.44, 0.867], [3.733, 0.114, 3.733, 0.147, 3.733, 0.24, 3.733, 0.354, 3.733, 0.46, 3.733, 0.614, 3.733, 0.634, 3.733, 0.66, 3.733, 0.68, 3.733, 0.72, 3.733, 0.814, 3.733, 0.834], [3.746, 0.08, 3.78, 0.094, 3.826, 0.234, 3.913, 0.46, 3.966, 0.594, 4.006, 0.707, 4.033, 0.78, 4.053, 0.834, 4.073, 0.84, 4.073, 0.8, 4.1, 0.594, 4.12, 0.4, 4.126, 0.227, 4.126, 0.2], [4.953, 0.327, 4.953, 0.287, 4.933, 0.2, 4.906, 0.167, 4.84, 0.1, 4.766, 0.067, 4.693, 0.06, 4.586, 0.06, 4.506, 0.06, 4.44, 0.114, 4.386, 0.2, 4.373, 0.334, 4.373, 0.414, 4.373, 0.507, 4.373, 0.567, 4.373, 0.654, 4.373, 0.687, 4.4, 0.72, 4.426, 0.734, 4.48, 0.754, 4.513, 0.754, 4.586, 0.76, 4.606, 0.767, 4.66, 0.767, 4.706, 0.767, 4.766, 0.747, 4.826, 0.634, 4.84, 0.594], [4.706, 0.487, 4.726, 0.5, 4.853, 0.567, 4.92, 0.587, 4.953, 0.594, 4.98, 0.6]], [[0.206, 0.2, 0.206, 0.22, 0.206, 0.314, 0.206, 0.36, 0.206, 0.454, 0.206, 0.48, 0.206, 0.52, 0.206, 0.554, 0.206, 0.594, 0.206, 0.62, 0.206, 0.66, 0.206, 0.68, 0.206, 0.714, 0.206, 0.74], [0.213, 0.14, 0.24, 0.127, 0.32, 0.107, 0.346, 0.1, 0.4, 0.094, 0.426, 0.094, 0.453, 0.094, 0.486, 0.094, 0.513, 0.094, 0.54, 0.127, 0.546, 0.147, 0.56, 0.167, 0.566, 0.187, 0.566, 0.22, 0.566, 0.274, 0.566, 0.327, 0.566, 0.354, 0.566, 0.374, 0.526, 0.4, 0.493, 0.407, 0.473, 0.414, 0.453, 0.42, 0.406, 0.42, 0.386, 0.42, 0.36, 0.42, 0.333, 0.42, 0.293, 0.42, 0.273, 0.42, 0.24, 0.42, 0.266, 0.42, 0.32, 0.42, 0.346, 0.42, 0.386, 0.42, 0.413, 0.42, 0.446, 0.42, 0.473, 0.427, 0.513, 0.454, 0.526, 0.48, 0.533, 0.5, 0.533, 0.52, 0.533, 0.56, 0.533, 0.58, 0.533, 0.62, 0.526, 0.647, 0.5, 0.654, 0.46, 0.674, 0.433, 0.694, 0.4, 0.714, 0.366, 0.72, 0.313, 0.72, 0.293, 0.72, 0.26, 0.72, 0.24, 0.72], [1.08, 0.147, 1.02, 0.14, 0.986, 0.134, 0.946, 0.134, 0.913, 0.134, 0.86, 0.134, 0.84, 0.134, 0.813, 0.134, 0.793, 0.134, 0.78, 0.18, 0.78, 0.234, 0.78, 0.274, 0.78, 0.36, 0.78, 0.387, 0.78, 0.487, 0.773, 0.52, 0.766, 0.58, 0.766, 0.6, 0.766, 0.62, 0.76, 0.68, 0.753, 0.734, 0.753, 0.754, 0.753, 0.774, 0.766, 0.794, 0.806, 0.807, 0.92, 0.814, 0.946, 0.814, 0.986, 0.814, 1.013, 0.814], [0.793, 0.434, 0.846, 0.434, 0.886, 0.434, 0.933, 0.434, 1.013, 0.434, 1.04, 0.434, 1.06, 0.434, 1.08, 0.434], [1.28, 0.16, 1.346, 0.16, 1.433, 0.16, 1.493, 0.16, 1.533, 0.16, 1.56, 0.16, 1.58, 0.16, 1.606, 0.16, 1.626, 0.16, 1.666, 0.16, 1.726, 0.16, 1.753, 0.16, 1.773, 0.16], [1.513, 0.194, 1.506, 0.214, 1.5, 0.234, 1.493, 0.26, 1.48, 0.32, 1.473, 0.387, 1.466, 0.44, 1.46, 0.487, 1.46, 0.527, 1.46, 0.567, 1.46, 0.587, 1.46, 0.627, 1.46, 0.667, 1.46, 0.687, 1.46, 0.707, 1.46, 0.727, 1.46, 0.747, 1.46, 0.767], [1.98, 0.154, 2.006, 0.154, 2.146, 0.154, 2.173, 0.154, 2.193, 0.154, 2.226, 0.154, 2.266, 0.154, 2.286, 0.154, 2.32, 0.154, 2.346, 0.154], [2.193, 0.154, 2.193, 0.18, 2.193, 0.214, 2.193, 0.274, 2.193, 0.294, 2.193, 0.347, 2.193, 0.374, 2.193, 0.427, 2.193, 0.467, 2.193, 0.54, 2.193, 0.587, 2.186, 0.62, 2.18, 0.647, 2.173, 0.674, 2.16, 0.707], [2.886, 0.167, 2.82, 0.167, 2.746, 0.167, 2.66, 0.167, 2.606, 0.167, 2.586, 0.167, 2.56, 0.167, 2.56, 0.2, 2.56, 0.227, 2.56, 0.267, 2.56, 0.307, 2.56, 0.36, 2.56, 0.42, 2.56, 0.494, 2.56, 0.567, 2.56, 0.627, 2.56, 0.674, 2.56, 0.727, 2.56, 0.76, 2.606, 0.774, 2.64, 0.774, 2.686, 0.78, 2.706, 0.78, 2.726, 0.78, 2.76, 0.78, 2.806, 0.78, 2.84, 0.78, 2.86, 0.78], [2.566, 0.48, 2.6, 0.48, 2.62, 0.48, 2.66, 0.48, 2.693, 0.48, 2.72, 0.48, 2.766, 0.48, 2.813, 0.48, 2.86, 0.48, 2.88, 0.48], [3.146, 0.147, 3.146, 0.2, 3.146, 0.247, 3.146, 0.334, 3.146, 0.394, 3.146, 0.5, 3.146, 0.547, 3.146, 0.634, 3.146, 0.674, 3.146, 0.694, 3.146, 0.727, 3.146, 0.747], [3.146, 0.187, 3.146, 0.167, 3.166, 0.154, 3.213, 0.14, 3.253, 0.134, 3.286, 0.127, 3.313, 0.127, 3.36, 0.127, 3.406, 0.127, 3.48, 0.127, 3.5, 0.127, 3.52, 0.16, 3.526, 0.207, 3.533, 0.314, 3.533, 0.354, 3.533, 0.394, 3.533, 0.42, 3.513, 0.427, 3.473, 0.44, 3.433, 0.447, 3.393, 0.447, 3.36, 0.447, 3.32, 0.447, 3.28, 0.447, 3.253, 0.447, 3.213, 0.447, 3.186, 0.447, 3.213, 0.447, 3.346, 0.5, 3.366, 0.514, 3.386, 0.52, 3.406, 0.547, 3.44, 0.58, 3.46, 0.607, 3.48, 0.627, 3.506, 0.654, 3.54, 0.68, 3.573, 0.7, 3.6, 0.727, 3.613, 0.747]]]);

	word_ctxs = [];

	// console.log "clear word_ctxs after setData which should be just before the final set of drawStrokes calls, in a requestAnimationFrame used to get computed styles"
	Bird = class Bird {
		constructor(x1, y1) {
			this.x = x1;
			this.y = y1;
			this.vx = 0;
			this.vy = 0;
			this.target_x = 0;
			this.target_y = 0;
			// TODO: have the birds land on the text
			this.land_at_target = false;
			// TODO: plausible locomotion, probably 3D as well to make it easier to think about
			this.flapCyclePosition = Math.random();
			this.doAFlap = false;
		}

		step() {
			this.vx += (this.target_x - this.x) / 1000;
			this.vy += (this.target_y - this.y) / 1000;
			this.vx *= 0.9;
			this.vy *= 0.9;
			this.x += this.vx;
			this.y += this.vy;
			if (this.land_at_target) {
				if (Math.random() < 0.05) {
					this.target_x = this.x + ((Math.random() * 2) - 1) * 5;
					this.target_y = this.y - 5 - Math.random * 20;
				}
			} else {
				if (Math.random() < 0.05) {
					this.target_x = Math.random() * canvas.width;
					this.target_y = Math.random() * canvas.height;
				}
			}
			if (Math.abs(this.vx) + Math.abs(this.vy) > 1) {
				this.doAFlap = true;
				if (this.flapCyclePosition >= Math.PI * 2) {
					this.flapCyclePosition = 0;
				}
			} else {
				if (this.flapCyclePosition >= Math.PI * 2) {
					this.doAFlap = false;
				}
			}
			if (this.doAFlap) {
				return this.flapCyclePosition += Math.PI * 2 / 100;
			}
		}

		draw(ctx) {
			ctx.beginPath();
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.moveTo(0, 0);
			ctx.save();
			ctx.rotate(Math.sin(this.flapCyclePosition));
			ctx.lineTo(10, 0);
			ctx.restore();
			ctx.moveTo(0, 0);
			ctx.rotate(-Math.sin(this.flapCyclePosition));
			ctx.lineTo(-10, 0);
			ctx.stroke();
			return ctx.restore();
		}

	};

	birds = (function() {
		var j, results;
		results = [];
		for (var j = 0; j < 5; j++) {
			results.push(new Bird(-50, 400));
		}
		return results;
	})();

	animate = function() {
		var bird, height, j, k, len1, len2, width;
		width = container.clientWidth;
		height = container.clientHeight;
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width;
			canvas.height = height;
			MultiMedium.rerender();
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (j = 0, len1 = birds.length; j < len1; j++) {
			bird = birds[j];
			bird.step();
		}
		for (k = 0, len2 = birds.length; k < len2; k++) {
			bird = birds[k];
			bird.draw(ctx);
		}
		return requestAnimationFrame(animate);
	};

	requestAnimationFrame(animate);

}).call(this);
