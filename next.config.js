module.exports = {
	env: {
		tileSizesByProjectRepoNameJSON: JSON.stringify(require("./src/get-tile-sizes-data")()),
	}
};
