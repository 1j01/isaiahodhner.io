const glob = require("glob");
const path = require("path");

const getTileSizesData = () => {
	const tileSizesByProjectRepoName = {};
	const tileImagesFolder = path.resolve("public/images/projects");
	// Handling Windows is annoying
	// glob.sync(path.join(tileImagesFolder, `*.png`), { windowsPathsNoEscape: true })
	const img_paths = glob.sync("*.png", { cwd: tileImagesFolder, absolute: true });
	if (img_paths.length === 0) {
		throw new Error("No image paths found");
	}
	for (let img_path of img_paths) {
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
