const express = require('express');
const next = require('next');
const redirects = require('./redirects.cjs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
		const handler = (req, res) => {
			res.redirect(type, to.replace(":splat", req.params.splat || "") + req.url.match(/(\?|$).*/)[0]);
		};
		// console.log(`Setting up redirect from ${from} to ${to} with type ${type} and method ${method}`)
		from = from.replace(/http:/, "http\\:"); // escape colon for path-to-regexp for this one redirect which I think was meant to fix someone's broken link
		if (from.match(/\/\*$/)) {
			server[method](from.replace(/\/\*$/, ""), handler);
			server[method](from.replace(/\/\*$/, "/*splat"), handler); // has to be named since Express 5 https://github.com/pillarjs/path-to-regexp?tab=readme-ov-file#express--4x
		} else {
			server[method](from, handler);
		}
	});

	server.get('*splat', (req, res) => {
		return handle(req, res);
	});

	const port = process.env.PORT || 3000;
	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
