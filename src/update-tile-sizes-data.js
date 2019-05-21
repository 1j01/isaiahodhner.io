import {projects} from "./projects";
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const updateTileSizesData = ()=> {
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

export default updateTileSizesData;
