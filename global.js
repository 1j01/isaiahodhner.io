(function(){
	
	var tau = Math.PI * 2;
	
	var greeny = false;
	
	function flamingIcon(ctx) {
		for (var i = 0; i < 200; i++) {
			var s = Math.random() * 4 + 3;
			var x = Math.random() * (16 - s * 2) + s;
			var y = Math.random() * (16 - s * 2) + s;
			s = y / 4;
			
			var g = ctx.createRadialGradient(x, y, 0, x, y, s);
			
			var hue;
			if (greeny) {
				hue = Math.random() * (120 - 50) + 50; //{80..120}
			} else {
				hue = Math.random() * 70; //{0..70}
			}
			g.addColorStop(0, "hsla(" + hue + ",100%,50%,1)");
			g.addColorStop(0.8, "hsla(" + hue + ",100%,50%,0.3)");
			//g.addColorStop(0.8, 'rgba(0,0,0,0.3)');
			//g.addColorStop(0.8, 'rgba(255,255,255,0.3)');
			//g.addColorStop(1, Math.random()<0.2?'rgba(0,255,255,0.5)':'transparent');
			g.addColorStop(1, 'rgba(255,255,255,0)');
			ctx.fillStyle = g;
			ctx.arc(x, y, s, 0, tau, false);
			ctx.fill();
		}
		for (var i = 0; i < 15; i++) {
			var s = Math.random() * 1.5;
			var x = Math.random() * (16 - s - s) + s;
			var y = Math.random() * (16 - s - s) + s;
			var g = ctx.createRadialGradient(x, y, 0, x, y, s);
			g.addColorStop(0, "black");
			if (greeny) {
				g.addColorStop(0.8, "rgba(155,255,0,1)");
			} else {
				g.addColorStop(0.8, "rgba(255,120,0,1)");
			}
			g.addColorStop(1, 'rgba(0,0,0,0)');
			ctx.fillStyle = g;
			ctx.arc(x, y, s, 0, tau, false);
			ctx.fill();
		}
	}
	
	function generatePageIcon(i) {
		//If there is no <link rel="icon"> (or <link rel="shortcut icon">), generate one.
		
		if (!!! document.querySelector("link[rel~=icon]")) {
			
			var l = document.createElement("link");
			document.head.appendChild(l);
			l.rel = "icon";
			
			var c = document.createElement('canvas');
			c.width = 16;
			c.height = 16;
			i(c.getContext("2d"));
			l.href = c.toDataURL();
			
		}
	}
	
	if (typeof module !== "undefined") {
		module.exports = flamingIcon;
	} else {
		generatePageIcon(flamingIcon);
	}
	
})();