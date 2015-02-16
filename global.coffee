
tau = Math.PI * 2

greeny = no

flamingIcon = (ctx)->
	
	for i in [0..200]
		s = Math.random() * 4 + 3
		x = Math.random() * (16 - s * 2) + s
		y = Math.random() * (16 - s * 2) + s
		s = y / 4
		
		g = ctx.createRadialGradient(x, y, 0, x, y, s)
		
		if greeny
			hue = Math.random() * (120 - 50) + 50 # [80..120]
		else
			hue = Math.random() * 70 # [0..70]
		
		g.addColorStop 0, "hsla(#{hue},100%,50%,1)"
		g.addColorStop 0.8, "hsla(#{hue},100%,50%,0.3)"
		g.addColorStop 1, "rgba(255,255,255,0)"
		ctx.fillStyle = g
		ctx.arc(x, y, s, 0, tau, no)
		ctx.fill()
	
	for i in [0..15]
		s = Math.random() * 1.5
		x = Math.random() * (16 - s - s) + s
		y = Math.random() * (16 - s - s) + s
		g = ctx.createRadialGradient(x, y, 0, x, y, s)
		g.addColorStop 0, "black"
		if greeny
			g.addColorStop 0.8, "rgba(155,255,0,1)"
		else
			g.addColorStop 0.8, "rgba(255,120,0,1)"
		
		g.addColorStop 1, "rgba(0,0,0,0)"
		ctx.fillStyle = g
		ctx.arc(x, y, s, 0, tau, no)
		ctx.fill()


generatePageIcon = (draw)->
	# If there is no <link rel="[shortcut] icon">, generate one.
	
	unless document.querySelector 'link[rel~=icon]'
		
		l = document.createElement 'link'
		document.head.appendChild l
		l.rel = 'icon'
		
		c = document.createElement 'canvas'
		c.width = c.height = 16
		draw c.getContext '2d'
		l.href = c.toDataURL()

if module?
	module.exports = flamingIcon
else
	generatePageIcon flamingIcon
