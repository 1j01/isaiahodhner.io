
fs = require 'fs'
path = require 'path'

after = (ms, fn)-> setTimeout(fn, ms)
every = (ms, fn)-> setInterval(fn, ms)

# Edit a tiled version of a pattern in photoshop

cd = fs.realpathSync "."
temp = "#{cd}/temp"
try fs.mkdirSync temp

gm = require 'gm'
cp = require 'child_process'
readline = require 'readline'
optimage = require 'optimage'

rl = readline.createInterface
	input: process.stdin
	output: process.stdout

rl.setPrompt "> "
rl.question "Please enter the filename (extension optional) of an image in 1j01.github.io/images/patterns/", (f)->
	f = f.replace ".png", ""
	rl.close()
	
	PsDir = "C:/Program Files (x86)/Adobe/Adobe Photoshop CS2"
	Photoshop = "#{PsDir}/Photoshop.exe"
	ImageReady = "#{PsDir}/ImageReady.exe"
	
	originalFilePath = path.normalize "#{cd}/images/patterns/#{f}.png"
	tiledFilePath = path.normalize "#{temp}/#{f}-tiled.png"
	newFilePath = path.normalize "#{cd}/images/patterns/#{f}-psedit.png"
	
	console.log "Editing a tiled version of #{originalFilePath}"
	
	fs.exists originalFilePath, (exists)->
		if not exists
			console.error "ERROR: #{originalFilePath} does not exist."
		else
			
			img = gm()
			
			# Tile the pattern (there might be an option (-tile) for this, but whatever: the documentation is terrible and this works)
			w = h = 512
			for x in [0...3]
				for y in [0...3]
					img.in '-page', "+#{x*w}+#{y*h}"
					img.in originalFilePath
			
			# Merge the images as a matrix
			img.mosaic()
			
			# Write the file
			img.write tiledFilePath, (err)->
				if err
					console.error """
					
					
					Is GraphicsMagic installed and in the path and computer restarted and stuff?
					You need the Q8 version btw.
					
					
					"""
					return console.error err
				
				# Sometimes gm calls back without having written a file, maybe this helps. Probably not.
				after 50, ->
					
					fs.chmod tiledFilePath, 0o777, (err)->
						if err
							console.error "chmod 777 ::: ERROR"
							return console.error err
						
						cp.spawn Photoshop, [tiledFilePath], cwd: (require 'path').dirname(tiledFilePath)
						
						fs.watch tiledFilePath, ->
							gm()
							.in(tiledFilePath)
							.crop(w, h, w, h) # (width, height, x, y)!? :(
							.write newFilePath, (err)->
								if err
									console.error "gm.write() error"
									return console.error err
								else
									# regenerate patterns.html in case there's a new pattern
									invoke 'boil'
									# optimize the new image
									optimage {
										inputFile: newFilePath
										outputFile: newFilePath
									}, (err, res)->
										
										if err
											console.error "Optimizing #{newFilePath} ::: ERROR"
											console.error err
											console.error "\n"
										else
											if (res.stderr.indexOf 'already optimized') isnt -1 # or res.saved < 10
												console.log "Optimizing #{newFilePath} ::: already optimized??"
											else
												console.log "Optimizing #{newFilePath} ::: saved #{res.saved} bytes"
