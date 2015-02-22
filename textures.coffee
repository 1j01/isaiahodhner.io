
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

document.body.appendChild(canvas)
canvas.style.position = "fixed"
canvas.style.left = "0"
canvas.style.top = "0"
canvas.style.pointerEvents = "none"



particles = []

class Particle
	
	spriteCanvas = document.createElement("canvas")
	spriteCtx = spriteCanvas.getContext("2d")
	
	sr = max_radius = 100 # sprite radius
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
		@r = max_radius * (1 - Math.random()/2)
		@life = 100 + Math.random() * 100
		@img.pattern ?= tempCtx.createPattern(@img, "repeat")
	
	draw: ->
		
		x = ~~(@x += @vx)
		y = ~~(@y += @vy)
		r = ~~(@r)
		a = @life / 50
		
		tempCtx.save()
		tempCtx.translate(-x, -y)
		tempCtx.fillStyle = @img.pattern
		tempCtx.fillRect(x, y, sr+sr, sr+sr)
		tempCtx.restore()
		
		tempCtx.globalCompositeOperation = "destination-atop"
		tempCtx.drawImage(
			# source (sprite)
			spriteCanvas, 0, 0, sr+sr, sr+sr
			# destination (on tempCanvas)
			(sr-r)/2, (sr-r)/2, r+r, r+r
		)
		tempCtx.globalCompositeOperation = "source-over"
		ctx.save()
		ctx.globalAlpha = a
		ctx.drawImage(tempCanvas, x-sr, y-sr)
		ctx.restore()
		

updateDimensions = ->
	if canvas.width isnt window.innerWidth
		canvas.width = window.innerWidth
	if canvas.height isnt window.innerHeight
		canvas.height = window.innerHeight

splatter = (img)->
	
	updateDimensions()
	
	particles = []
	for i in [0..30]
		rect = img.getBoundingClientRect()
		new Particle {
			img
			x: rect.left + rect.width * Math.random()
			y: rect.top + rect.height * Math.random()
		}
	
	animate()

scrollyness = 0

window.onresize =
document.body.onscroll = (e)->
	updateDimensions()
	scrollyness = 1 # @TODO: calculate amount scrolled
	animate()

animate = ->
	
	for particle, i in particles by -1
		particle.life -= 10
		if particle.life <= 0
			particles.splice(i, 1)
		else
			rect = particle.img.getBoundingClientRect()
			g = 2
			particle.vx += g if particle.x < rect.left
			particle.vy += g if particle.y < rect.top
			particle.vx -= g if particle.x > rect.right
			particle.vy -= g if particle.y > rect.bottom
			
			particle.draw()
	
	ctx.save()
	ctx.globalCompositeOperation = "destination-out"
	
	# Clear the canvas when scrolling
	# @TODO: better handling for mobile, where scroll events are only sent once scrolling stops
	scrollyness *= 0.9
	if scrollyness < 0.0001
		scrollyness = 0
	else
		ctx.fillStyle = "rgba(0, 0, 0, #{Math.min(scrollyness, 0.1)})"
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	# Clear the canvas on the header area
	rect = header.getBoundingClientRect()
	for ah in [0..30]
		ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
		ctx.fillRect(rect.left, rect.top + ah, rect.width, rect.height + ah/2)
	
	ctx.restore()
	
	if particles.length > 0 or scrollyness > 0.05
		requestAnimationFrame(animate)


tiles = textures.children
for tile in tiles
	do (tile)->
		img = tile.children[0]
		tile.style.cursor = "pointer"
		img.onclick = -> splatter(img)


