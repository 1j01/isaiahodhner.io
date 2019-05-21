const fs = require("fs");
const path = require("path");

const createDummyTileSizesData = ()=> {
	const tileSizesByProjectRepoName = {};
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

createDummyTileSizesData();
