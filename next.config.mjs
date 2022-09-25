import getTileSizesData from './src/get-tile-sizes-data.js';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	env: {
		tileSizesByProjectRepoName: getTileSizesData(),
	},
};

export default nextConfig;
