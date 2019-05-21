// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import PropTypes from 'prop-types';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {projects} from "../src/projects";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		const fs = require("fs");
		const glob = require("glob");
		const tileSizesByProjectRepoName = {};
		for (let project of projects) {
			let sizes = [];
			if (fs.existsSync(`static/images/projects/${project.repo_name}.png`)) { sizes = ["1x1"]; }
			for (let img_path of glob.sync(`static/images/projects/${project.repo_name}-*.png`)) {
				const m = img_path.match(/-(\d+x\d+)\./);
				if (m) { sizes.push(m[1]); }
			}
			tileSizesByProjectRepoName[project.repo_name] = sizes;
		}
		console.log({tileSizesByProjectRepoName});
		// return {tileSizesByProjectRepoName, ...initialProps};

		const tempFolder = require("path").resolve("./temp");
		try {
			fs.mkdirSync(tempFolder)
		} catch(e) {
			if (e.code !== "EEXIST") {
				throw e;
			}
		}
		const outFile = require("path").join(tempFolder, "tile-sizes-by-project-repo-name.json");
		// console.log(outFile);
		fs.writeFileSync(outFile, JSON.stringify(tileSizesByProjectRepoName), "utf8");
		return initialProps;
	}
	// static childContextTypes = {
	// 	tileSizesByProjectRepoName: PropTypes.object.isRequired,
	// 	...Document.childContextTypes
	// };
	// getChildContext() {
	// 	const {tileSizesByProjectRepoName} = this.props;
	// 	const ctx = super.getChildContext();
	// 	console.log(ctx);
	// 	return {tileSizesByProjectRepoName, ...ctx};
	// }
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
