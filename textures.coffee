
textures = document.getElementById("textures")
header = document.getElementsByTagName("header")[0]
return unless textures and header

canvas = document.createElement("canvas")
return unless (
	canvas.getContext and
	canvas.getBoundingClientRect and
	window.requestAnimationFrame and
	"pointerEvents" of canvas.style
)
ctx = canvas.getContext("2d")

drawImageSafe = (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh)->
	ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)

try
	# Firefox and IE don't allow out-of-bound source dimensions, which I rely on
	ctx.drawImage(canvas, -50, 50, 50, 50, 50, 50, 50, 50)
catch
	# This function probably isn't bullet-proof
	drawImageSafe = (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh)->
		sw += sx; sx = 0 if sx <= 0
		sh += sy; sy = 0 if sy <= 0
		sw = Math.max(img.width - sx, 0) if sx + sw > img.width
		sh = Math.max(img.height - sy, 0) if sy + sh > img.height
		try ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
		#catch e then console.log e

canvasToBecome = document.createElement("canvas")
ctxToBecome = canvasToBecome.getContext("2d")

tempCanvas = document.createElement("canvas")
tempCtx = tempCanvas.getContext("2d")

document.body.appendChild(canvas)
canvas.style.position = "fixed"
canvas.style.left = "0"
canvas.style.top = "0"
canvas.style.pointerEvents = "none"

omgz = []
scrollyness = 0
updateDimensions = ->
	if canvas.width isnt window.innerWidth
		canvas.width = window.innerWidth
		canvasToBecome.width = window.innerWidth
	if canvas.height isnt window.innerHeight
		canvas.height = window.innerHeight
		canvasToBecome.height = window.innerHeight

splatter = (img)->
	
	updateDimensions()
	
	# prevent infinite loop if image hasn't loaded
	return unless img.naturalWidth and img.naturalHeight
	
	ctxToBecome.clearRect(0, 0, canvasToBecome.width, canvasToBecome.height)
	for x in [0..canvasToBecome.width] by img.naturalWidth
		for y in [0..canvasToBecome.height] by img.naturalHeight
			ctxToBecome.drawImage(img, x, y)
	
	omgz = []
	for i in [0..30]
		rect = img.getBoundingClientRect()
		omg =
			x: rect.left + rect.width * Math.random()
			y: rect.top + rect.height * Math.random()
			vx: (Math.random() * 2 - 1) * 59
			vy: (Math.random() * 2 - 1) * 59
			r: 50 + Math.random() * 50
			life: 100 + Math.random() * 100
			img: img
		
		omgz.push(omg)
	
	animate()

window.onresize =
document.body.onscroll = (e)->
	updateDimensions()
	scrollyness = 1
	animate()

animating = no
animate = ->
	animating = omgz.length > 0 or scrollyness > 0.05
	return unless animating
	
	#ctx.fillStyle = "rgba(0, 100, 0, 0.05)"
	#ctx.fillRect(0,0,5000,5000)
	for omg, i in omgz by -1
		omg.life -= 10
		if omg.life <= 0
			omgz.splice(i, 1)
			continue # as in, don't continue executing statements in this iteration
		
		rect = omg.img.getBoundingClientRect()
		g = 2
		omg.vx += g if x < rect.left
		omg.vy += g if y < rect.top
		omg.vx -= g if x > rect.right
		omg.vy -= g if y > rect.bottom
		
		x = ~~(omg.x += omg.vx)
		y = ~~(omg.y += omg.vy)
		r = ~~(omg.r)
		
		#ctx.drawImage(omg.img, x+Math.random()*20, y+Math.random()*20, Math.random()*20, Math.random()*20)
		#ctx.drawImage(canvasToBecome, x-r, y-r, r+r, r+r, x-r, y-r, r+r, r+r)
		
		tempCanvas.width = tempCanvas.height = r+r
		drawImageSafe(tempCtx, canvasToBecome, x-r, y-r, r+r, r+r, r-r, r-r, r+r, r+r)
		
		# @TODO: support transparent textures because I have some and
		# they show up... different...-ly looking
		tempCtx.globalCompositeOperation = "destination-atop"
		tempCtx.beginPath()
		tempCtx.arc(r, r, r*0.9, 0, 2 * Math.PI)
		
		if "USE GRADIENT"
			# @TODO: reuse gradient??
			# or cache a rendered black-to-white gradient on a canvas
			rdl = tempCtx.createRadialGradient(r, r, r*0.5, r, r, r*0.9)
			rdl.addColorStop(0, "rgba(0, 0, 0, 1)")
			rdl.addColorStop(1, "rgba(0, 0, 0, 0)")
			tempCtx.fillStyle = rdl
		else if "USE SHADOW"
			tempCtx.shadowBlur = r*0.1
			tempCtx.shadowColor = "white"
			tempCtx.fillStyle = "white"
		
		tempCtx.fill()
		
		tempCtx.globalCompositeOperation = "source-over"
		ctx.drawImage(tempCanvas, x-r, y-r)
		
		#ctx.globalCompositeOperation = "source-atop"
		#ctx.drawImage(canvasToBecome, 0, 0)
		ctx.globalCompositeOperation = "source-over"
	
	
	ctx.save()
	ctx.globalCompositeOperation = "destination-out"
	
	scrollyness *= 0.9
	if scrollyness < 0.0001
		scrollyness = 0
	else
		ctx.fillStyle = "rgba(0, 0, 0, #{Math.min(scrollyness, 0.1)})"
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	rect = header.getBoundingClientRect()
	for ah in [0..30]
		ctx.fillStyle = "rgba(0, 0, 0, " + (0.1-ah/450) + ")"
		ctx.fillRect(rect.left, rect.top + ah, rect.width, rect.height + ah)
	
	
	ctx.restore()
	
	requestAnimationFrame(animate)


tiles = textures.children
for tile in tiles
	do (tile)->
		img = tile.children[0]
		tile.style.cursor = "pointer"
		img.onclick = -> splatter(img)


