const glob = require("glob");
const path = require("path");

const getTileSizesData = ()=> {
	const tileSizesByProjectRepoName = {};
	const tileImagesFolder = path.resolve("static/images/projects");
	for (let img_path of glob.sync(path.join(tileImagesFolder, `*.png`))) {
		const match = img_path.match(/[/\\]([^/\\]+)-(\d+x\d+)\.png/);
		if (match) {
			const [, repoName, size] = match;
			tileSizesByProjectRepoName[repoName] = tileSizesByProjectRepoName[repoName] || [];
			tileSizesByProjectRepoName[repoName].push(size);
		} else {
			const match = img_path.match(/[/\\]([^/\\]+)\.png/);
			if (match) {
				const [, repoName] = match;
				tileSizesByProjectRepoName[repoName] = tileSizesByProjectRepoName[repoName] || [];
				tileSizesByProjectRepoName[repoName].push("1x1");
			} else {
				console.log("getTileSizesData - I'm confused about " + img_path);
			}
		}
	}
	return tileSizesByProjectRepoName;
};
module.exports = getTileSizesData;
