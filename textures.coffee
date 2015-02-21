
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

###
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
###

document.body.appendChild(canvas)
canvas.style.position = "fixed"
canvas.style.left = "0"
canvas.style.top = "0"
canvas.style.pointerEvents = "none"



particles = []

class Particle
	
	spriteCanvas = document.createElement("canvas")
	spriteCtx = spriteCanvas.getContext("2d")
	
	sr = 100 # sprite radius, which should be the maximum radius
	spriteCanvas.width = spriteCanvas.height = sr+sr
	rdl = spriteCtx.createRadialGradient(sr, sr, sr*0.5, sr, sr, sr*0.9)
	rdl.addColorStop(0, "rgba(0, 0, 0, 1)")
	rdl.addColorStop(1, "rgba(0, 0, 0, 0)")
	spriteCtx.fillStyle = rdl
	spriteCtx.beginPath()
	spriteCtx.arc(sr, sr, sr*0.9, 0, 2 * Math.PI)
	spriteCtx.fill()
	
	tempCanvas = document.createElement("canvas")
	tempCtx = tempCanvas.getContext("2d")
	tempCanvas.width = tempCanvas.height = sr+sr
	
	constructor: ({@img, @x, @y})->
		particles.push @
		@vx = (Math.random() * 2 - 1) * 59
		@vy = (Math.random() * 2 - 1) * 59
		@r = sr * (0.5 + Math.random() * 0.5)
		@life = 100 + Math.random() * 100
		@img.pattern ?= tempCtx.createPattern(@img, "repeat")
	
	draw: ->
		
		x = ~~(@x += @vx)
		y = ~~(@y += @vy)
		r = ~~(@r)
		
		#ctx.drawImage(particle.img, x+Math.random()*20, y+Math.random()*20, Math.random()*20, Math.random()*20)
		#ctx.drawImage(canvasToBecome, x-r, y-r, r+r, r+r, x-r, y-r, r+r, r+r)
		
		#tempCanvas.width = tempCanvas.height = r+r
		tempCtx.save()
		#tempCtx.translate(x, y)
		tempCtx.translate(-x, -y)
		tempCtx.fillStyle = @img.pattern
		#tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height) #(x-r, y-r, r+r, r+r)
		#tempCtx.fillRect(-x-r, -y-r, r+r, r+r)
		#tempCtx.fillRect(-x, -y, r+r, r+r)
		tempCtx.fillRect(x, y, sr+sr, sr+sr)
		tempCtx.restore()
		#drawImageSafe(tempCtx, canvasToBecome, x-r, y-r, r+r, r+r, r-r, r-r, r+r, r+r)
		
		tempCtx.globalCompositeOperation = "destination-atop"
		tempCtx.drawImage(
			# source (sprite)
			spriteCanvas, 0, 0, sr+sr, sr+sr
			# destination (on tempCanvas)
			(sr-r)/2, (sr-r)/2, r+r, r+r
		)
		tempCtx.globalCompositeOperation = "source-over"
		ctx.drawImage(tempCanvas, x-sr, y-sr)
		

scrollyness = 0
updateDimensions = ->
	if canvas.width isnt window.innerWidth
		canvas.width = window.innerWidth
	if canvas.height isnt window.innerHeight
		canvas.height = window.innerHeight

splatter = (img)->
	
	updateDimensions()
	
	# prevent infinite loop if image hasn't loaded
	#return unless img.naturalWidth and img.naturalHeight
	
	particles = []
	for i in [0..30]
		rect = img.getBoundingClientRect()
		new Particle {
			img
			x: rect.left + rect.width * Math.random()
			y: rect.top + rect.height * Math.random()
		}
	
	animate()

window.onresize =
document.body.onscroll = (e)->
	updateDimensions()
	scrollyness = 1 # @TODO: calculate amount scrolled
	animate()

animating = no
animate = ->
	animating = particles.length > 0 or scrollyness > 0.05
	return unless animating
	
	#ctx.fillStyle = "rgba(0, 100, 0, 0.05)"
	#ctx.fillRect(0,0,5000,5000)
	for particle, i in particles by -1
		particle.life -= 10
		if particle.life <= 0
			particles.splice(i, 1)
			continue # as in, don't continue executing statements in this iteration
		
		rect = particle.img.getBoundingClientRect()
		g = 2
		particle.vx += g if particle.x < rect.left
		particle.vy += g if particle.y < rect.top
		particle.vx -= g if particle.x > rect.right
		particle.vy -= g if particle.y > rect.bottom
		
		particle.draw()
		
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


