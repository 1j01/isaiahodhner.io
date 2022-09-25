import { readFileSync, writeFileSync } from "node:fs";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import redirects from "./src/redirects.mjs";

// Update firebase.json's hosting.redirects field with data from redirects.mjs

// Relevant docs:
// https://firebase.google.com/docs/hosting/full-config#capture_url_segments_for_redirects

const firebaseConfigPath = path.join(__dirname, "firebase.json");
const firebaseConfig = JSON.parse(readFileSync(firebaseConfigPath, "utf8"));
firebaseConfig.hosting.redirects = redirects.flatMap((redirect) =>
	[{
		source: redirect.from.replace(/\/\*$/, ""),
		destination: redirect.to.replace(/:splat$/, ""),
		type: 301,
	}, {
		source: redirect.from.replace(/\/\*$/, "/:splat*"),
		destination: redirect.to,
		type: 301,
	}]
);
writeFileSync(firebaseConfigPath, JSON.stringify(firebaseConfig, null, "\t"), "utf8");
