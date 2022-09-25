/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	env: {
		tileSizesByProjectRepoName: require("./src/get-tile-sizes-data")(),
	},
};

module.exports = nextConfig;
