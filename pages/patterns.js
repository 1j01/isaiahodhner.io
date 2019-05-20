import * as React from "react";

class Patterns extends React.Component {
	render() {
		// const glob = require("glob");
		// const pattern_fnames = glob.sync('images/patterns/*.png')
		// TODO: less patterns
		const pattern_fnames =
			["100.png","101.png","102.png","104.png","105 GOLDEN BALLS.png","105 MORE GOLDEN BALLS.png","106.png","107.png","11.png","15 edit.png","16.png","25.png","27 (time passes).png","28.png","29.png","2a03ee5b-5ac5-42e2-832f-cd777cec9997.png","3.png","30 edit.png","30.png"
			,"31.png","32 edit.png","32.png","33 edit 2.png","33 edit.png","33.png","34.png","35 edit (made worse).png","36.png","37.png","4.png","40 edit 3.png","40 edit.png","40.png","41 edit.png","41.png","42 edit.png","42.png","43-psedit-2.png","43-psedit.png","43.png","45.png","5 edit.png","5-psedit.png","5.png","51.png","52 edit 2.png","52 edit.png","52.png","53 edit.png","53-psedit.png","53.png","54.png","55.png","56.png","57.png","58.png","59.png","6.png","60 edit.png","60.png","61.png","63.png","64 edit (ice).png","64 edit (snow).png","64 edit (snow2).png","64 edit.png","64.png","66.png","67 (time).png","68.png","69.png","6ea9af3c-a9d3-4d7b-8390-fabb44f8dfcc.png","7 edit.png","7.png","70.png","71.png","72.png","73.png","74.png","75.png","76.png","77.png","8 edit.png","80.5.png","81.png","82.png",
			"82e79a7e-f577-4a63-8961-3008fc3588fe.png","85-psedit.png","85.png","86.png","860560cf-2e9a-4bd5-8322-a1faba28300f.png","87.png","88.png","89.png","9 edit.png","9.png","90.png","91.png","92.png","93.png","94.png","96.png","97.png","98.png","compositeoperation issues 2.png","compositeoperation issues.png","d52.png","download (1).png","download (12).png","download (3).png","download (4).png","download (5).png","download (6).png","download (8).png","download.png","fabb44f8dfcc.png","live edit (2).png","live edit.png","tiley-bright.png","tiley.png"];
		// log_divisibles(pattern_fnames.length, "pattern tiles");

		const pattern_images = pattern_fnames.map((fname)=>
			<article
				key={fname}
				itemScope
				itemType="http://schema.org/ImageObject"
			>
				<img src={`static/images/patterns/${fname}`} itemProp="contentURL"/>
			</article>
		);

		return <div>
			<h1 className="page-title">Patterns</h1>
			<p>
				These are some repeating patterns and textures I made with code (and a tool that I made (with code)).
				Some of them aren't seamless because I hadn't worked out all the kinks in my implementation of a wrapping
				canvas.
				{/*, an abstraction over the Canvas2D API that proxies all draw calls by translating to different positions and drawing it multiple times.*/}
				{/*[is this accurate? i don't quite remember, i'm not confident enough atm to add that information here;*/}
				{/*also it bothers me that I'm mentioning a tool that I made without linking to it or the source code;*/}
				{/*so I should go find that] */}
				I also only have the code to reproduce a few of these.
			</p>
			<p>
				I've since started a project called <a href="https://github.com/1j01/pixelweaver">Pixelweaver</a>{" "}
				that allows for more types of doodles (3D, anyone?),
				gives control over time,
				all while saving reproducible programs in every exported image.
			</p>
			<div className="tiles-container" id="patterns">
				{pattern_images}
			</div>
		</div>;
	}
	componentDidMount() {
		const canvas = document.createElement("canvas");
		if (
			!canvas.getContext ||
			!canvas.getBoundingClientRect ||
			!window.requestAnimationFrame ||
			!("pointerEvents" in canvas.style)
		) { return; }
		const ctx = canvas.getContext("2d");

		document.body.appendChild(canvas);
		canvas.style.position = "fixed";
		canvas.style.left = "0";
		canvas.style.top = "0";
		canvas.style.pointerEvents = "none";



		let particles = [];

		const spriteCanvas = document.createElement("canvas");
		const spriteCtx = spriteCanvas.getContext("2d");
		const max_radius = 100;
		const sr = max_radius; // sprite radius
		spriteCanvas.width = (spriteCanvas.height = sr+sr);
		const rdl = spriteCtx.createRadialGradient(sr, sr, sr*0.5, sr, sr, sr*0.9);
		rdl.addColorStop(0, "rgba(0, 0, 0, 1)");
		rdl.addColorStop(1, "rgba(0, 0, 0, 0)");
		spriteCtx.fillStyle = rdl;
		spriteCtx.beginPath();
		spriteCtx.arc(sr, sr, sr*0.9, 0, 2 * Math.PI);
		spriteCtx.fill();

		const tempCanvas = document.createElement("canvas");
		const tempCtx = tempCanvas.getContext("2d");
		tempCanvas.width = (tempCanvas.height = sr+sr);

		class Particle {

			constructor({img, x, y}){
				this.img = img;
				this.x = x;
				this.y = y;
				particles.push(this);
				this.vx = ((Math.random() * 2) - 1) * 59;
				this.vy = ((Math.random() * 2) - 1) * 59;
				this.r = max_radius * (1 - (Math.random()/2));
				this.life = 100 + (Math.random() * 100);
				if (!this.img.pattern) {
					this.img.pattern = tempCtx.createPattern(this.img, "repeat");
				}
			}

			draw() {

				const x = ~~(this.x += this.vx);
				const y = ~~(this.y += this.vy);
				const r = ~~(this.r);
				const a = this.life / 50;

				tempCtx.save();
				tempCtx.translate(-x, -y);
				tempCtx.fillStyle = this.img.pattern;
				tempCtx.fillRect(x, y, sr+sr, sr+sr);
				tempCtx.restore();

				tempCtx.globalCompositeOperation = "destination-atop";
				tempCtx.drawImage(
					// source (sprite)
					spriteCanvas, 0, 0, sr+sr, sr+sr,
					// destination (on tempCanvas)
					(sr-r)/2, (sr-r)/2, r+r, r+r
				);
				tempCtx.globalCompositeOperation = "source-over";
				ctx.save();
				ctx.globalAlpha = a;
				ctx.drawImage(tempCanvas, x-sr, y-sr);
				ctx.restore();
			}
		}


		const updateDimensions = ()=> {
			if (canvas.width !== window.innerWidth) {
				canvas.width = window.innerWidth;
			}
			if (canvas.height !== window.innerHeight) {
				canvas.height = window.innerHeight;
			}
		};

		const splatter = (img)=> {

			updateDimensions();

			particles = [];
			for (let i = 0; i <= 30; i++) {
				const rect = img.getBoundingClientRect();
				new Particle({
					img,
					x: rect.left + (rect.width * Math.random()),
					y: rect.top + (rect.height * Math.random())
				});
			}

			animate();
		};

		let scrollyness = 0;

		this.resizeAndScrollHandler = (e)=> {
			updateDimensions();
			scrollyness = 1; // @TODO: calculate amount scrolled
			animate();
		};

		window.addEventListener("resize", this.resizeAndScrollHandler);
		document.body.addEventListener("scroll", this.resizeAndScrollHandler);

		const perform_cleary_operation = (fn)=> {
			ctx.save();
			ctx.globalCompositeOperation = "destination-out";
			fn((x, y, w, h, a)=> {
				ctx.fillStyle = `rgba(0, 0, 0, ${a})`;
				ctx.fillRect(x, y, w, h);
			});
			ctx.restore();
		};

		const animate = ()=> {

			for (let i = particles.length - 1; i >= 0; i--) {
				const particle = particles[i];
				particle.life -= 10;
				if (particle.life <= 0) {
					particles.splice(i, 1);
				} else {
					const rect = particle.img.getBoundingClientRect();
					const g = 2;
					if (particle.x < rect.left) { particle.vx += g; }
					if (particle.y < rect.top) { particle.vy += g; }
					if (particle.x > rect.right) { particle.vx -= g; }
					if (particle.y > rect.bottom) { particle.vy -= g; }

					particle.draw();
				}
			}

			// Clear the canvas when scrolling
			// @TODO: better handling for mobile, where scroll events are only sent once scrolling stops
			scrollyness *= 0.9;
			if (scrollyness < 0.0001) {
				scrollyness = 0;
			} else {
				perform_cleary_operation((clear)=> {
					clear(0, 0, canvas.width, canvas.height, Math.min(scrollyness, 0.1));
				});
			}

			// Clear the canvas above the patterns area
			const patterns_area_rect = patterns.getBoundingClientRect();
			perform_cleary_operation((clear)=> {
				for (let ah = 0; ah <= 30; ah++) {
					clear(0, 0, canvas.width, patterns_area_rect.top - (ah/2), 0.04);
					const bottom_y = patterns_area_rect.bottom + (ah/2);
					clear(0, bottom_y, canvas.width, canvas.height - bottom_y, 0.04);
				}
			});

			if ((particles.length > 0) || (scrollyness > 0.05)) {
				requestAnimationFrame(animate);
			}
		};
		const tiles = Array.from(patterns.children);
		tiles.map((tile)=> {
			const img = tile.children[0];
			tile.style.cursor = "pointer";
			img.onclick = () => splatter(img);
		});
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeAndScrollHandler);
		document.body.removeEventListener("scroll", this.resizeAndScrollHandler);
	}
}

export default Patterns;
