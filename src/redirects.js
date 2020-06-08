
// import {projects} from "./projects.js";

// const redirects = [];
// for (const project of projects) {
// 	if (project.url == null || project.url.match(/^http/)) {
// 		to_url = project.url || `https://1j01.github.io/${project.repo_name}`;
// 		to_url_without_trailing_slash = to_url.replace(/\/$/, "");
// 		redirects.push(`/${project.repo_name}/* ${to_url_without_trailing_slash}/:splat`);
// 	}
// }

// console.log(redirects.join("\n"));

const redirects = [
	{from: "/make-making-better", to: "/fearless-exploration"},
	{from: "/make-making-better/*", to: "/fearless-exploration"},
	{from: "/98/*", to: "https://98.js.org/:splat"},
	{from: "/jspaint/*", to: "https://jspaint.app/:splat"},
	{from: "/wavey/*", to: "https://audio-editor.web.app/:splat"},
	{from: "/tri-chromatic-keyboard/*", to: "https://1j01.github.io/tri-chromatic-keyboard/:splat"},
	{from: "/guitar/*", to: "https://1j01.github.io/guitar/:splat"},
	{from: "/midiflip/*", to: "https://1j01.github.io/midiflip/:splat"},
	{from: "/nonsensical/*", to: "https://1j01.itch.io/nonsensical/"},
	{from: "/multifiddle/*", to: "https://multifiddle.ml/:splat"},
	{from: "/mind-map/*", to: "https://1j01.github.io/mind-map/:splat"},
	{from: "/transpairency/*", to: "https://1j01.github.io/transpairency/:splat"},
	{from: "/boxart/*", to: "https://1j01.github.io/boxart/:splat"},
	{from: "/countdown.ml/*", to: "https://1j01.github.io/fliptimer/:splat"},
	{from: "/fliptimer/*", to: "https://1j01.github.io/fliptimer/:splat"},
	{from: "/tiamblia-original/*", to: "https://1j01.github.io/tiamblia-original/:splat"},
	{from: "/slugg/*", to: "https://1j01.github.io/slugg/:splat"},
	{from: "/columns/*", to: "https://1j01.github.io/columns/:splat"},
	{from: "/mos/*", to: "https://1j01.github.io/mos/:splat"},
	{from: "/1bpp/*", to: "https://1j01.github.io/1bpp/:splat"},
	{from: "/board-game/*", to: "https://1j01.github.io/board-game/:splat"},
	{from: "/une/*", to: "https://1j01.github.io/une/:splat"},
	{from: "/stick-mangler/*", to: "https://1j01.github.io/stick-mangler/:splat"},
	{from: "/pool/*", to: "https://1j01.github.io/pool/:splat"},
	{from: "/dat-boi/*", to: "https://1j01.github.io/dat-boi/:splat"},
	{from: "/pipes/http:/*", to: "https://1j01.github.io/pipes/"},
	{from: "/pipes/*", to: "https://1j01.github.io/pipes/:splat"},
	{from: "/ooplie/*", to: "https://1j01.github.io/ooplie/:splat"},
];

// relevant docs:
// https://firebase.google.com/docs/hosting/full-config#capture_url_segments_for_redirects

const fs = require("fs");
const path = require("path");
const firebaseConfigPath = path.join(__dirname, "../firebase.json");
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf8"));
firebaseConfig.hosting.redirects = redirects.flatMap((redirect)=>
	redirect.from.match(/\/\*$/) ? 
	[{
		source: redirect.from.replace(/\/\*$/, ""),
		destination: redirect.to.replace(/:splat$/, ""),
		type: 301,
	}, {
		source: redirect.from.replace(/\/\*$/, "/:splat*"),
		destination: redirect.to,
		type: 301,
	}]
	:
	[{
		source: redirect.from,
		destination: redirect.to,
		type: 301,
	}]
)
fs.writeFileSync(firebaseConfigPath, JSON.stringify(firebaseConfig, null, "\t"), "utf8");

module.exports = redirects;
