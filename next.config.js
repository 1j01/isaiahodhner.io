import { createRequire } from "module";
const require = createRequire(import.meta.url);
export default {
	output: 'export',
	env: {
		tileSizesByProjectRepoNameJSON: JSON.stringify(require("./src/get-tile-sizes-data.cjs")()),
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.(".svg")
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},

			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ["@svgr/webpack"],
			}
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};
