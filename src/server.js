const express = require('express')
const next = require('next')
const redirects = require('./redirects.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const escapeRegExp = (string)=>
	string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // $& means the whole matched string

app.prepare().then(() => {
	const server = express()

	redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
		const handler = (req, res) => {
			res.redirect(type, to.replace(":splat", req.params[0] || "") + req.url.match(/(\?|$).*/)[0])
		}
		server[method](from, handler)
		if (from.match(/\/\*$/)) {
			server[method](from.replace(/\/\*$/, ""), handler)
		}
	})

	server.get('*', (req, res) => {
		return handle(req, res)
	})

	const port = process.env.PORT || 3000;
	server.listen(port, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
