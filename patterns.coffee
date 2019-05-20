
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

class Particle

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
    return


updateDimensions = ->
  if canvas.width isnt window.innerWidth
    canvas.width = window.innerWidth
  if canvas.height isnt window.innerHeight
    canvas.height = window.innerHeight
  return

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
  return

scrollyness = 0

window.onresize =
  document.body.onscroll = (e)->
    updateDimensions()
    scrollyness = 1 # @TODO: calculate amount scrolled
    animate()
    return

perform_cleary_operation = (fn)->
  ctx.save()
  ctx.globalCompositeOperation = "destination-out"
  fn (x, y, w, h, a)->
    ctx.fillStyle = "rgba(0, 0, 0, #{a})"
    ctx.fillRect(x, y, w, h)
    return
  ctx.restore()
  return

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

  # Clear the canvas when scrolling
  # @TODO: better handling for mobile, where scroll events are only sent once scrolling stops
  scrollyness *= 0.9
  if scrollyness < 0.0001
    scrollyness = 0
  else
    perform_cleary_operation (clear)->
      clear(0, 0, canvas.width, canvas.height, Math.min(scrollyness, 0.1))
      return

  # Clear the canvas above the patterns area
  patterns_area_rect = patterns.getBoundingClientRect()
  perform_cleary_operation (clear)->
    for ah in [0..30]
      clear(0, 0, canvas.width, patterns_area_rect.top - ah/2, 0.04)
      bottom_y = patterns_area_rect.bottom + ah/2
      clear(0, bottom_y, canvas.width, canvas.height - bottom_y, 0.04)
    return

  if particles.length > 0 or scrollyness > 0.05
    requestAnimationFrame(animate)


tiles = patterns.children
tiles.map (tile)->
  img = tile.children[0]
  tile.style.cursor = "pointer"
  img.onclick = -> splatter(img)
  return
