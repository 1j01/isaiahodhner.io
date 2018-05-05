	
choose_from = (a)-> a[~~(Math.random() * a.length)]
last_of = (a)-> a[a.length - 1]

shuffle = (a) ->
	i = a.length
	return if i is 0
	while --i
		j = ~~(Math.random() * (i+1))
		[a[i], a[j]] = [a[j], a[i]]

debug = (args...)->
	# console.log args...


margin = parseInt (getComputedStyle document.querySelector "article").marginLeft
margin = 0 unless isFinite(margin)
spacing = 2 * margin
tile_length_1 = 256
tile_length_for = (n)-> tile_length_1 * n + spacing * (n - 1)


for article in document.querySelectorAll "article"
	img = article.querySelector "img"
	do (img, article)->
		img.src_1x1 = img.src
		
		article.sizes = 
			for size in article.dataset.sizes.split ","
				[w, h] = size.split "x"
				w = parseInt w
				h = parseInt h
				[w, h]
		
		article.resize = (w, h)->
			src =
				if w is 1 and h is 1
					img.src_1x1
				else
					img.src_1x1.replace ".png", "-#{w}x#{h}.png"
			img.src = src
			img.width = tile_length_for w
			img.height = tile_length_for h
			
		
	# do (article, img)->


tiles_per_row = 1
previous_tiles_per_row = 1

can_fit = (layout)->
	# debug "can_fit", {layout}
	x = 0
	for [w, h] in layout
		# debug "#{w} wide tile at #{x}?"
		return no if (w > 1) and (x + w > tiles_per_row)
		x += w
		x = 0 if x >= tiles_per_row
	# debug "no gaps so far, is the last row complete?", x
	x is 0

do find_a_layout = ->
	tiles_per_row = 1
	loop
		break if margin + (tile_length_for tiles_per_row + 1) + margin > document.body.clientWidth
		tiles_per_row += 1
		break if tiles_per_row >= 50
	
	
	return if tiles_per_row is previous_tiles_per_row
	previous_tiles_per_row = tiles_per_row
	
	debug "#{tiles_per_row} tiles per row"
	
	articles = document.querySelectorAll "article"
	
	
	debug "let's find a layout"
	debug "can we have everything at max size?" # assuming the last size in the array is the biggest
	for [0..100]
		layout = (last_of sizes for {sizes} in articles)
		if can_fit layout
			debug "found a layout (without moving anything around; everything at max size)"
			for article, i in articles
				[w, h] = layout[i]
				article.resize w, h
			return
	
	debug "no? okay, let's try some random sizes"
	for [0..100]
		layout = (choose_from sizes for {sizes} in articles)
		if can_fit layout
			debug "found a layout (without moving anything around)"
			for article, i in articles
				[w, h] = layout[i]
				article.resize w, h
			return
	
	debug "couldn't find a layout in this order"
	debug "maybe we can rearange some things?"
	for [0..200]
		shuffle articles
		layout = (choose_from sizes for {sizes} in articles)
		if can_fit layout
			debug "found a layout (will have to move some things)"
			for article, i in articles
				[w, h] = layout[i]
				article.resize w, h
				article.parentElement.appendChild article
			return
	
	
	debug "no perfect layout found"
	debug "let's just use max sizes"
	layout = (last_of sizes for {sizes} in articles)
	for article, i in articles
		[w, h] = layout[i]
		article.resize w, h
	
	# @TODO: dynamically (or statically) apply a maximum site width?

window.addEventListener "resize", find_a_layout
