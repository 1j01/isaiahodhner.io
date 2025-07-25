import Head from "next/head";
import { useEffect, useRef } from "react";

export default function Custom404() {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		!function () { function t() { h = 0, a(2, function () { f = !0, a(4, function () { h = 50, a(4, function () { i(), h = 500, a(4, function () { t(), a(2, function () { i(), s.clearRect(0, 0, v.width, v.height), a(2, function () { i(), d = !d; }); }); }); }); }); }); } function a(t, a) { setTimeout(a, 1e3 * t); } function e(t, a) { setInterval(a, t); } function n() { return r() * h - h / 2; } function r() { return Math.random(); } function i() { var t = r() < .5 ? l : g; u !== t && (s.clearRect(0, 0, v.width, v.height), u = t); } var o = 60, c = 50, h = 0, f = !1, d = !1, l = ["                  ", " #  #  ####  #  # ", " #  #  #  #  #  # ", " #  #  #  #  #  # ", " ####  #  #  #### ", "    #  #  #     # ", "    #  #  #     # ", "    #  ####     # ", "                  "], g = ["                ", " ####           ", " #              ", " #              ", " #### #### #### ", " #    #    #    ", " #    #    #    ", " #### #    #    ", "                "], u = l, v = document.querySelector("canvas"); v.width = u[3].length * o + h, v.height = u.length * o + h/*,v.style.marginLeft=-v.width/2+"px",v.style.marginTop=-v.height/2+"px"*/; for (var s = v.getContext("2d"), m = s.createImageData(c, c), M = m.data, w = 0; w <= m.width; w += 4)for (var p = 0; p <= m.height; p += 4) { var y = 4 * (w + p * m.width); M[y + 0] = 255, M[y + 1] = 128, M[y + 2] = 0, M[y + 3] = 255; } for (var x = s.createImageData(c, c), M = x.data, w = 0; w <= x.width; w += 8)for (var p = 0; p <= x.height; p += 8) { var y = 4 * (w + p * m.width); M[y + 0] = 255, M[y + 1] = 128, M[y + 2] = 0, M[y + 3] = 255; } e(100, function () { for (var t = 0; t < u.length; t++)for (var a = 0; a < u[t].length; a++)" " !== u[t][a] && (s.putImageData(m, a * o + n(), t * o + n()), f && (s.fillStyle = "rgba(0,0,0," + r() * r() + ")", s.fillRect(a * o, t * o, c, c))); }), e(10, function () { if (d) for (var t = Math.ceil(3 * r()); t < u.length; t += Math.ceil(5 * r()))for (var a = Math.ceil(3 * r()); a < u[t].length; a += Math.ceil(5 * r()))if (" " !== u[t][a]) { var e = 50 * r(), i = 50 * r(); s.putImageData(m, a * o + n(), t * o + n(), e, i, e, i); } }), t(); }();
	}, []);
	return <>
		<Head><title>404</title></Head>
		<style global jsx>{`
			.page-main {
				background:#000;
				display:flex;
				justify-content:center;
				align-items:center;
			}
		`}</style>
		<canvas ref={canvasRef}><h1>404: Page Not Found</h1></canvas>
	</>;
}
