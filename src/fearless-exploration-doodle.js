import "../lib/multi-medium";
import fearlessExplorationStrokeData from "./fearless-exploration-stroke-data";

// TODO: animate the text itself! with an animation of writing it and having the visuals all sprout from that
// I want it to be luscious but also legible,
// so it might be easier to go for a top down view, like of a garden with bushes in it making up the text

// also, eventually this should be done using the technology I'm envisioning, and ideally editable in the page
// (like you start out you think it's just a cool animated header, but you can actually mess around and you're in a full-blown editor)
// but I could try to get across some concepts / the potential power of a system where you can retroactively edit anything

// I also have various ideas about how it could be presented in stages, like:
// handwriting then typing out then handwriting digitally,
// where all the luscious greenery effects come into play
// and then going back and applying the effects to the first and second words
// (maybe (implying or actually) automatically recognizing paths, with skeletonization)

// TODO: Add some clouds! maybe. or change the perspective. then i could make interesting stuff on the ground instead.
// TODO: Redraw the text with a tablet rather than a mouse?

const initDoodle = () => {
	const choose = a=> a[~~(Math.random() * a.length)];

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const container = document.querySelector(".principle.big");
	container.appendChild(canvas);
	container.style.position = "relative";
	canvas.style.position = "absolute";
	canvas.style.left = "0";
	canvas.style.top = "0";
	canvas.style.pointerEvents = "none";

	let word_ctxs = [];
	// the MultiMedium thing is mostly just getting in the way at this point
	// I'd rather control the drawing entirely
	// but instead I'm collecting contexts
	MultiMedium.drawStrokes = function(strokes, ctx, scale){
		let color, end_x, end_y, point, points, stroke;
		if (scale == null) { scale = 1; }
		const weight = ctx.lineWidth;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";

		ctx.beginPath();
		word_ctxs.push(ctx);
		ctx.save();
		ctx.translate(0, 9);
		for (color of ["green", "#04a327"]) {
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.translate(0, -6);
			for ({points} of strokes) {
				ctx.moveTo(points[0].x*scale, points[0].y*scale);
				if (points.length === 1) { ctx.lineTo(points[0].x*scale, (points[0].y*scale)+0.01); }
				for (point of points) {
					ctx.lineTo(
						(point.x * scale) + ((((Math.random() * 2) - 1) * weight)/2),
						(point.y * scale) + ((((Math.random() * 2) - 1) * weight)/3)
					);
				}
			}
			ctx.stroke();
		}
		ctx.restore();

		// const num_splotchy_knots = ctx === word_ctxs[1] ? 60 : 5;
		// for (let i = 0, end = num_splotchy_knots, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
		// 	color = choose(["#4e321d", "#966643", "#733e17"]);
		// 	stroke = choose(strokes);
		// 	if (stroke != null) {
		// 		({points} = stroke);
		// 		if (points.length) {
		// 			ctx.strokeStyle = color;
		// 			ctx.beginPath();
		// 			ctx.moveTo(points[0].x*scale, points[0].y*scale);
		// 			if (points.length === 1) { ctx.lineTo(points[0].x*scale, (points[0].y*scale)+0.01); }
		// 			for (point of points) {
		// 				if (Math.random() < 0.3) {
		// 					ctx.moveTo(
		// 						point.x * scale,
		// 						point.y * scale
		// 					);
		// 					ctx.lineTo(
		// 						(point.x * scale) + ((((Math.random() * 2) - 1) * weight)/2),
		// 						(point.y * scale) + ((((Math.random() * 2) - 1) * weight)/3)
		// 					);
		// 				}
		// 			}
		// 		}
		// 	}
		// 	ctx.stroke();
		// }

		const find_random_point = function() {
			// TODO: even distribution with varying numbers of points in each stroke (especially e.g. dotted 'i's)
			// (or we might want to base it on ImageData instead of the list of points)
			stroke = choose(strokes);
			if (stroke != null) {
				return choose(stroke.points);
			}
		};

		const num_leaves = 2000;
		for (let j = 0; j < num_leaves; j++) {
			color = choose(["#01b528", "#46e502", "#b7ea00"]);
			point = find_random_point();
			if (point != null) {
				ctx.strokeStyle = color;
				ctx.lineWidth = weight / 4;
				ctx.beginPath();
				ctx.moveTo(
					point.x * scale,
					point.y * scale
				);
				ctx.lineTo(
					(end_x = (point.x * scale) + ((((Math.random() * 2) - 1) * weight) / 2)),
					(end_y = (point.y * scale) + ((((((Math.random() * 2) - 1) * 5) - 3) * weight) / 6))
				);
				ctx.stroke();
				ctx.fillStyle = "green";
				ctx.beginPath();
				ctx.arc(end_x, end_y, weight / 4, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		// const num_little_branches = ctx === word_ctxs[1] ? 600 : 50;
		// for (let j = 0; j < num_little_branches; j++) {
		// 	color = choose(["#4e321d", "#966643", "#733e17"]);
		// 	point = find_random_point();
		// 	if (point != null) {
		// 		ctx.strokeStyle = color;
		// 		ctx.lineWidth = weight / 4;
		// 		ctx.beginPath();
		// 		ctx.moveTo(
		// 			point.x * scale,
		// 			point.y * scale
		// 		);
		// 		ctx.lineTo(
		// 			(end_x = (point.x * scale) + ((((Math.random() * 2) - 1) * weight) / 2)),
		// 			(end_y = (point.y * scale) + ((((((Math.random() * 2) - 1) * 5) - 3) * weight) / 6))
		// 		);
		// 		ctx.stroke();
		// 		ctx.fillStyle = "green";
		// 		ctx.beginPath();
		// 		ctx.arc(end_x, end_y, weight / 4, 0, Math.PI * 2);
		// 		ctx.fill();
		// 	}
		// }

		// const draw_branch = function(x, y, color, angle, recursion_level){
		// 	if (angle == null) { angle = Math.random()*Math.PI*2; }
		// 	if (recursion_level == null) { recursion_level = 0; }
		// 	ctx.save();
		// 	ctx.translate(x, y);
		// 	ctx.rotate(angle);

		// 	ctx.strokeStyle = color;
		// 	ctx.lineWidth = weight / 4;
		// 	ctx.beginPath();
		// 	ctx.moveTo(0, 0);
		// 	ctx.lineTo(
		// 		(end_x = 0),
		// 		(end_y = Math.random() * 10)
		// 	);
		// 	ctx.stroke();
		// 	ctx.fillStyle = "green";
		// 	ctx.beginPath();
		// 	ctx.arc(end_x, end_y, weight / 4, 0, Math.PI * 2);
		// 	if (recursion_level < 3) {
		// 		for (let k = 0; k < 2; k++) {
		// 			const relative_angle = ((Math.random() * 2) - 1) * 0.9;
		// 			draw_branch(end_x, end_y, color, relative_angle, recursion_level + 1);
		// 		}
		// 	}

		// 	ctx.fill();

		// 	ctx.restore();
		// };

		const find_furthest_point_in_direction = function(angle){
			let furthest_dist = -Infinity;
			let furthest_point = null;
			for ({points} of strokes) {
				for (point of points) {
					// x = point.x * Math.cos(angle) - point.y * Math.sin(angle)
					const y = (point.y * Math.cos(angle)) - (point.x * Math.sin(angle));
					if (y > furthest_dist) {
						furthest_dist = y;
						furthest_point = point;
					}
				}
			}
			return furthest_point;
		};

		// for (let k = 0; k < 2; k++) {
		// 	color = "#733e17";
		// 	const angle = Math.PI * 2 * Math.random();
		// 	point = find_furthest_point_in_direction(angle);
		// 	if (point != null) {
		// 		draw_branch(
		// 			point.x * scale,
		// 			point.y * scale,
		// 			color,
		// 			angle
		// 		);
		// 	}
		// }

	};

	MultiMedium.getPadding = lineWidth=> 50;

	for (let element of document.querySelectorAll("main .principle .word")) {
		// @TODO: make it so it copies with spaces to the clipboard
		// (it copies with newlines, but if you paste it into the address bar of chrome for instance,
		// it comes out as all one word)
		const text = element.innerText; // + " "
		// hm, can't do that, it tries to split it into multiple .multi-medium-word spanvases
		element.innerHTML = "";
		element.appendChild(new MultiMedium(text));
	}

	// document.body.appendChild(new MultiMedium.Input());

	MultiMedium.setData(fearlessExplorationStrokeData);

	word_ctxs = [];
	// console.log("clear word_ctxs after setData which should be just before the final set of drawStrokes calls, in a requestAnimationFrame used to get computed styles");


	class Bird {
		constructor(x, y){
			this.x = x;
			this.y = y;
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
					this.target_x = this.x + (((Math.random() * 2) - 1) * 5);
					this.target_y = this.y - 5 - (Math.random * 20);
				}
			} else {
				if (Math.random() < 0.05) {
					this.target_x = Math.random() * canvas.width;
					this.target_y = Math.random() * canvas.height;
				}
			}

			if ((Math.abs(this.vx) + Math.abs(this.vy)) > 1) {
				this.doAFlap = true;
				if (this.flapCyclePosition >= (Math.PI * 2)) {
					this.flapCyclePosition = 0;
				}
			} else {
				if (this.flapCyclePosition >= (Math.PI * 2)) {
					this.doAFlap = false;
				}
			}
			if (this.doAFlap) {
				return this.flapCyclePosition += (Math.PI * 2) / 100;
			}
		}
		draw(ctx){
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
	}


	const birds = ([0, 1, 2, 3, 4].map((i) => new Bird(-50, 400)));

	let animation_frame_id;
	const animate = function() {
		let bird;
		const width = container.clientWidth;
		const height = container.clientHeight;
		if ((canvas.width !== width) || (canvas.height !== height)) {
			canvas.width = width;
			canvas.height = height;
			MultiMedium.rerender();
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (bird of birds) { bird.step(); }
		for (bird of birds) { bird.draw(ctx); }

		animation_frame_id = requestAnimationFrame(animate);
	};

	animation_frame_id = requestAnimationFrame(animate);

	return ()=> {
		cancelAnimationFrame(animation_frame_id);
		MultiMedium.all_spanvases = []; // @HACK! TODO: proper cleanup
	}
};

export default initDoodle;
