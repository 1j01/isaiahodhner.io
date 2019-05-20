import Octicon, {Repo} from "@githubprimer/octicons-react";
import * as React from "react";

class ProjectsListing extends React.Component {
	render() {
		return <div className="tiles-container">{
			this.props.projects.map((project) => {
				let sizes;
				const image_url = project.image_url || `static/images/projects/${project.repo_name}.png`;
				const repo_url = project.repo_url || `https://github.com/1j01/${project.repo_name}`;
				const gh_pages_url = `https://1j01.github.io/${project.repo_name}/`;
				const url =
					project.url === 'repo'
						? repo_url
						: project.url || gh_pages_url;

				const bg = project.bg != null ? project.bg : "normal";
				if (project.image_url) {
					sizes = ["1x1"];
				} else {
					// TODO: get tile sizes working
					// if (typeof window === 'undefined') {
					// 	const fs = require("fs");
					// 	if (fs.existsSync(`images/projects/${project.repo_name}.png`)) { sizes = ["1x1"]; }
					// 	for (let img_path of glob.sync(`images/projects/${project.repo_name}-*.png`)) {
					// 		const m = img_path.match(/-(\d+x\d+)\./);
					// 		if (m) { sizes.push(m[1]); }
					// 	}
					// } else {
					sizes = ["1x1"];
					// }
				}

				return <article
					key={project.repo_name}
					itemScope
					itemType="http://schema.org/WebPage"
					data-bg={bg}
					data-sizes={sizes}
				>
					<a href={url} itemProp="url">
						<img itemProp="image" width="256" height="256" src={image_url}/>
					</a>
					<header itemProp="name">
						<a href={repo_url} className="repo" title="View repository on GitHub"><Octicon icon={Repo}/></a>
						<span>{project.title}</span>
					</header>
					<footer itemProp="description">{project.description}</footer>
				</article>;
			})
		}</div>;
	}
	componentDidMount() {
		const choose_from = a=> a[~~(Math.random() * a.length)];
		const last_of = a=> a[a.length - 1];

		const shuffle = (a)=> {
			let i = a.length;
			if (i === 0) { return; }
			while (--i) {
				const j = ~~(Math.random() * (i+1));
				[a[i], a[j]] = [a[j], a[i]];
			}
		};

		const debug = (...args)=> {
			// console.log(...args);
		};

		let margin = parseInt((getComputedStyle(document.querySelector("article"))).marginLeft);
		if (!isFinite(margin)) { margin = 0; }
		const spacing = 2 * margin;
		const tile_length_1 = 256;
		const tile_length_for = n=> (tile_length_1 * n) + (spacing * (n - 1));

		for (let article of document.querySelectorAll("article")) {
			((article)=> {
				const img = article.querySelector("img");
				img.src_1x1 = img.src;

				article.sizes = article.dataset.sizes.split(",").map((size)=> {
					let [w, h] = size.split("x");
					w = parseInt(w);
					h = parseInt(h);
					return [w, h];
				});

				return article.resize = (w, h)=> {
					img.src =
						(w === 1) && (h === 1)
							? img.src_1x1
							: img.src_1x1.replace(/\.png$/, `-${w}x${h}.png`);
					img.width = tile_length_for(w);
					img.height = tile_length_for(h);
				};
			})(article);
		}

		let tiles_per_row = 1;
		let previous_tiles_per_row = 1;

		const can_fit = (layout)=> {
			// debug("can_fit", {layout});
			let x = 0;
			for (let [w, h] of layout) {
				// debug(`${w} wide tile at ${x}?`);
				if ((w > 1) && ((x + w) > tiles_per_row)) { return false; }
				x += w;
				if (x >= tiles_per_row) { x = 0; }
			}
			// debug("no gaps so far, is the last row complete?", x);
			return x === 0;
		};

		const find_a_layout = ()=> {
			tiles_per_row = 1;
			while (true) {
				if ((margin + (tile_length_for(tiles_per_row + 1)) + margin) > document.body.clientWidth) { break; }
				tiles_per_row += 1;
				if (tiles_per_row >= 50) { break; }
			}

			if (tiles_per_row === previous_tiles_per_row) { return; }
			previous_tiles_per_row = tiles_per_row;

			debug(`${tiles_per_row} tiles per row`);

			const articles = Array.from(document.querySelectorAll("article"));
			debug({articles});

			debug("let's find a layout");
			debug("can we have everything at max size?"); // assuming the last size in the array is the biggest
			for (let j = 0; j <= 100; j++) {
				const layout = articles.map((article)=> last_of(article.sizes));
				if (can_fit(layout)) {
					debug("found a layout (without moving anything around; everything at max size)");
					for (let i = 0; i < articles.length; i++) {
						const article = articles[i];
						const [w, h] = layout[i];
						article.resize(w, h);
					}
					return;
				}
			}

			debug("no? okay, let's try some random sizes");
			for (let k = 0; k <= 100; k++) {
				const layout = articles.map((article)=> choose_from(article.sizes));
				if (can_fit(layout)) {
					debug("found a layout (without moving anything around)");
					for (let i = 0; i < articles.length; i++) {
						const article = articles[i];
						const [w, h] = layout[i];
						article.resize(w, h);
					}
					return;
				}
			}

			debug("couldn't find a layout in this order");
			debug("maybe we can rearange some things?");
			for (let i1 = 0; i1 <= 200; i1++) {
				shuffle(articles);
				const layout = articles.map((article)=> choose_from(article.sizes));
				if (can_fit(layout)) {
					debug("found a layout (will have to move some things)");
					for (let i = 0; i < articles.length; i++) {
						const article = articles[i];
						const [w, h] = layout[i];
						article.resize(w, h);
						article.parentElement.appendChild(article);
					}
					return;
				}
			}


			debug("no perfect layout found");
			debug("let's just use max sizes");
			const layout = articles.map((article)=> last_of(article.sizes));
			for (let i = 0; i < articles.length; i++) {
				const article = articles[i];
				const [w, h] = layout[i];
				article.resize(w, h);
			}
		}
		find_a_layout();

		// @TODO: dynamically (or statically) apply a maximum site width?

		window.addEventListener("resize", find_a_layout);
	}
}

export default ProjectsListing;
