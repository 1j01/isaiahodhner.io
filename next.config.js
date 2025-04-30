module.exports = {
	output: 'export',
	env: {
		tileSizesByProjectRepoNameJSON: JSON.stringify(require("./src/get-tile-sizes-data")()),
	}
};
