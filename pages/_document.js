// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, {Html, Head, Main, NextScript} from 'next/document';
import {projects} from "../src/projects";
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const updateTileSizes = ()=> {
	const tileSizesByProjectRepoName = {};
	const tileImagesFolder = path.resolve("static/images/projects");
	for (let project of projects) {
		const sizes = [];
		if (fs.existsSync(path.join(tileImagesFolder, `${project.repo_name}.png`))) {
			sizes.push("1x1");
		}
		for (let img_path of glob.sync(path.join(tileImagesFolder, `${project.repo_name}-*.png`))) {
			const match = img_path.match(/-(\d+x\d+)\./);
			if (match) {
				sizes.push(match[1]);
			}
		}
		tileSizesByProjectRepoName[project.repo_name] = sizes;
	}

	const tempFolder = path.resolve("./temp");
	try {
		fs.mkdirSync(tempFolder)
	} catch(e) {
		if (e.code !== "EEXIST") {
			throw e;
		}
	}
	const outFile = path.join(tempFolder, "tile-sizes-by-project-repo-name.json");
	fs.writeFileSync(outFile, JSON.stringify(tileSizesByProjectRepoName), "utf8");
	console.log("wrote", outFile);
};

updateTileSizes();

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en-US">
				<Head>
					<meta name="author" content="Isaiah Odhner"/>
					<meta name="description" content="Isaiah Odhner's portfolio website"/>
					<meta name="keywords" content="Isaiah Odhner, 1j0, 1j01"/>
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<meta name="theme-color" content="#0083A5"/>
					{/*TODO (in App) */}
					{/*<title>{title ? `${title} — ` : ""}Isaiah Odhner</title>*/}
					<link rel="icon" sizes="any" type="image/svg+xml" href="/static/images/icons/favicon.svg"/>
					<link rel="icon" sizes="16x16" type="image/x-icon" href="/static/images/icons/favicon.ico"/>
					<link rel="icon" sizes="16x16" type="image/png" href="/static/images/icons/favicon.png"/>
					<link rel="stylesheet" type="text/css" href="/static/portfolio.css"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
