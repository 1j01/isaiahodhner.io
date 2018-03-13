
var fs = require('fs');
var path = require('path');
var public_dir = '';
var exts = ['html'];
module.exports = function (req, res, next) {
	if (req.method !== 'GET' && req.method !== 'HEAD') {
		return next();
	}
	if (req.url !== '/' && path.extname(req.url) === '') {
		var url_path = req.url.replace('/', '');
		var i = 0;
		var check = function () {
			fs.exists(public_dir + url_path + '.' + exts[i], function (exists) {
				if (exists) {
					req.url += '.' + exts[i];
					next();
				} else {
					if (++i >= exts.length) {
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
