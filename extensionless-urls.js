var fs = require('fs');
var path = require('path');
var rootDirectory = '';
var extensions = ['html'];
module.exports = function (req, res, next) {
	if (req.method !== 'GET' && req.method !== 'HEAD') {
		return next();
	}
	if (req.url !== '/' && path.extname(req.url) === '') {
		var requestedPath = req.url.replace('/', '');
		var i = 0;
		var check = function () {
			fs.exists(rootDirectory + requestedPath + '.' + extensions[i], function (exists) {
				if (exists) {
					req.url += '.' + extensions[i];
					next();
				} else {
					if (++i >= extensions.length) {
						next();
					} else {
						check();
					}
				}
			});
		};
		check();
	} else {
		next();
	}
};
