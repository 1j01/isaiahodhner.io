
###
# NOTE: This should be kept in sync with https://github.com/multiism/multi-medium
#
# also this file has been MANUALLY compiled (once) for now
###

all_spanvases = []
selected_spanvas = null
the_input = null
savings = document.createElement "div"
savings.style.position = "fixed"
savings.style.top = "5px"
savings.style.right = "5px"
savings.style.background = "white"
savings.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.3)"
savings.style.borderRadius = "2px"
savings.style.padding = "4px"
save_button = document.createElement "button"
save_button.innerText = "Save"
save_button.addEventListener "click", (e)->
	datas =
		for spanvas in all_spanvases
			if spanvas.hasData() then serialize_strokes spanvas.getData().strokes else null
	label = document.createElement "label"
	label.innerHTML = "Paste the following into a <code>&lt;script&gt;</code>:<br>"
	textarea = document.createElement "textarea"
	textarea.value = "MultiMedium.setData(#{JSON.stringify datas});"
	textarea.style.width = "100%"
	textarea.style.boxSizing = "border-box"
	savings.removeChild save_button
	savings.appendChild label
	label.appendChild textarea
	textarea.select()
  return
savings.appendChild save_button

serialize_strokes = (strokes)->
	resolution = 1000
	for {points} in strokes
		a = []
		for point in points
			a.push(
				(~~(point.x * resolution)) / resolution
				(~~(point.y * resolution)) / resolution
			)
		a

deserialize_strokes = (strokes)->
	for coords in strokes
		points: for i in [0...coords.length] by 2
			{x: coords[i], y: coords[i+1]}

Spanvas = (word, data)->
	spanvas = document.createElement "span"
	spanvas.style.position = "relative"
	spanvas.className = "multi-medium-word"
	canvas = document.createElement "canvas"
	canvas.width = canvas.height = 0
	canvas.style.userSelect = "none"
	canvas.style.webkitUserSelect = "none"
	canvas.style.pointerEvents = "none"
	canvas.style.position = "absolute"
	canvas.style.left = "0"
	canvas.style.top = "0"
	
	spanvas.appendChild document.createTextNode word
	spanvas.appendChild canvas
	
	strokes = null
	style = null
	
	spanvas.deselect = ->
		spanvas.removeAttribute "tabIndex"
		spanvas.render()
		selected_spanvas = null
		the_input?.clear()
    return

  spanvas.select = ->
		selected_spanvas?.deselect()
		selected_spanvas = spanvas
		spanvas.render()
		the_input?.clear()
		spanvas.setAttribute "tabIndex", "0"
		# TODO: left/right/up/down caret-like movement for going between words (or at least left/right for previous/next word)
		spanvas.focus()
		spanvas.addEventListener "focusout", (e)->
			spanvas.deselect()
		, once: yes
    return

  spanvas.hasData = ->
		strokes?
	
	spanvas.getData = ->
		{strokes}
	
	spanvas.setData = (data)->
		{strokes} = data
		spanvas.render()
    return

  spanvas.setStyle = (new_style)->
		style = new_style
		spanvas.render()
    return

  original_width = null
	spanvas.render = ->
		rect = spanvas.getBoundingClientRect()
		original_width ?= rect.width
		canvas.style.display = "inline-block"
		ctx = canvas.getContext "2d"
		if strokes
			scale = rect.height
			
			weight = switch style?.fontWeight
				when "normal" then 400
				when "bold" then 700
				else style?.fontWeight ? 400
			
			line_width = 1 + (parseInt(weight) / 400 * scale / 30)
			
			max_x = 0
			min_x = Infinity
			max_y = 0
			min_y = Infinity
			for {points} in strokes
				for point in points
					max_x = Math.max(max_x, point.x)
					min_x = Math.min(min_x, point.x)
					max_y = Math.max(max_y, point.y)
					min_y = Math.min(min_y, point.y)
			
			padding = MultiMedium.getPadding(line_width)
			
			y_offset = ~~Math.min(0, min_y * scale)
			canvas.width = (max_x - min_x) * scale + padding * 2
			canvas.height = Math.max(rect.height, max_y * scale - y_offset + padding * 2)
			
			ctx.lineWidth = line_width
			ctx.strokeStyle = style?.color
			ctx.save()
			ctx.translate(-min_x * scale + padding, -y_offset + padding)
			MultiMedium.drawStrokes strokes, ctx, scale
			ctx.restore()
			
			spanvas.style.color = "transparent"
			canvas.style.left = "#{-padding}px"
			canvas.style.top = "#{y_offset - padding}px"
			
			canvas_text_width = canvas.width - padding * 2
			spanvas.style.letterSpacing = "#{Math.max(-8, (canvas_text_width - original_width) / word.length)}px"
		
		return
	
	setTimeout ->
		spanvas.setData data if data?.strokes
		json = localStorage["multi-medium:#{all_spanvases.indexOf spanvas}:strokes"]
		if json
			spanvas.setData {strokes: deserialize_strokes JSON.parse json}
    return

  all_spanvases.push spanvas
	spanvas


@MultiMedium = (text, handwriting_data)->
	element = document.createElement "span"
	words = text.split " "
	
	spanvases =
		for word, i in words
			data = handwriting_data?[i]
			if data
				strokes = deserialize_strokes data.strokes
			spanvas = Spanvas word, {strokes}
			element.appendChild spanvas
			unless i + 1 is words.length
				element.appendChild document.createTextNode " "
			spanvas
	
	render = ->
		style = getComputedStyle element
		for spanvas in spanvases
			spanvas.setStyle style
		return
	
	requestAnimationFrame render
	
	element

@MultiMedium.Input = ->
	element = document.createElement "div"
	element.className = "multi-medium-input"
	canvas = document.createElement "canvas"
	canvas.setAttribute "touch-action", "none"
	ctx = canvas.getContext "2d"
	element.appendChild canvas

	element_style = null
	update_dimensions = ->
		element_style = getComputedStyle element
		canvas_style = getComputedStyle canvas
		_ = (v)-> if isNaN v then 0 else parseInt v
		pl = _ element_style.paddingLeft
		pr = _ element_style.paddingRight
		pt = _ element_style.paddingTop
		pb = _ element_style.paddingBottom
		cpl = _ canvas_style.paddingLeft
		cpr = _ canvas_style.paddingRight
		cpt = _ canvas_style.paddingTop
		cpb = _ canvas_style.paddingBottom
		cml = _ canvas_style.marginLeft
		cmr = _ canvas_style.marginRight
		cmt = _ canvas_style.marginTop
		cmb = _ canvas_style.marginBottom
		cbl = _ canvas_style.borderLeft
		cbr = _ canvas_style.borderRight
		cbt = _ canvas_style.borderTop
		cbb = _ canvas_style.borderBottom
		canvas.width = element.clientWidth - pl - pr - cml - cmr - cpl - cpr - cbl - cbr
		canvas.height = element.clientHeight - pt - pb - cmt - cmb - cpt - cpb - cbt - cbb
		# WOW, THAT'S A LITTLE BIT ABSURD, DON'T YOU THINK?
		# can I not use scrollWidth/scrollHeight to remove at least some of those?
		# (this code is trying to handle extreme cases not present in the demo btw)
		# console.log "absurdity test", element.clientWidth, element.scrollWidth, canvas.width

		render()
		return

  pointers = {}
	strokes = []
	undoes = []
	redoes = []

	update = ->
		render()
		if selected_spanvas?
			selected_spanvas.setData {strokes}
			# @HACK
			document.body.appendChild savings
			savings.innerHTML = ""
			savings.appendChild save_button
			localStorage["multi-medium:#{all_spanvases.indexOf selected_spanvas}:strokes"] = JSON.stringify serialize_strokes strokes
    return

  clear = ->
		pointers = {}
		strokes = []
		undoes = []
		redoes = []
		render()
    return

  undo = ->
		if undoes.length
			redoes.push serialize_strokes strokes
			strokes = deserialize_strokes undoes.pop()
			update()
    return

  redo = ->
		if redoes.length
			undoes.push serialize_strokes strokes
			strokes = deserialize_strokes redoes.pop()
			update()
    return

  undoable = ->
		undoes.push serialize_strokes strokes
		redoes = []
    return

  render = ->
		baseline = canvas.height * 0.8
		ctx.clearRect 0, 0, canvas.width, canvas.height
		ctx.fillStyle = "rgba(100, 100, 100, 0.1)"
		ctx.font = "#{baseline}px sans-serif"
		selected_word = selected_spanvas?.textContent ? selected_spanvas?.innerText ? ""
		ctx.fillText selected_word, 20, baseline
		ctx.strokeStyle = element_style?.color
		ctx.lineWidth = 10
		MultiMedium.drawStrokes strokes, ctx, canvas.height
    return

  point_for = (e)->
		rect = canvas.getBoundingClientRect()
		canvas_style = getComputedStyle canvas
		cpl = parseInt canvas_style.paddingLeft
		cpt = parseInt canvas_style.paddingTop
		cpl = 0 if isNaN cpl
		cpt = 0 if isNaN cpt
		scale = canvas.height
		x: (e.clientX - rect.left - cpl) / scale
		y: (e.clientY - rect.top - cpt) / scale

	canvas.addEventListener "pointerdown", (e)->
		return if e.pointerType is "mouse" and e.button isnt 0
		e.preventDefault()
		undoable()
		stroke = points: [point_for e]
		pointers[e.pointerId] = {stroke, type: e.pointerType}
		strokes.push stroke
		update()
    return

  window.addEventListener "pointermove", (e)->
		pointer = pointers[e.pointerId]
		if pointer
			e.preventDefault()
			np = point_for e
			pp = pointer.stroke.points[pointer.stroke.points.length - 1]
			dx = np.x - pp.x
			dy = np.y - pp.y
			# @TODO: extend last point if the angle from the last point to np would be
			# very similar to the angle between the point before last and the last point?
			if Math.sqrt(dx*dx + dy*dy) > 0.02
				pointer.stroke.points.push np
				update()
    return

  window.addEventListener "pointerup", (e)->
		delete pointers[e.pointerId]
    return

  canvas.addEventListener "pointercancel", (e)->
		pointer = pointers[e.pointerId]
		if pointer
			strokes.splice strokes.indexOf(pointer.stroke), 1
		delete pointers[e.pointerId]
    return

  window.addEventListener "click", (e)->
		spanvas = e.target.closest(".multi-medium-word")
		spanvas?.select()
    return

  document.body.classList.add("multi-medium-edit-mode") # for cursor: pointer

	# @TODO: localize this event listener
	window.addEventListener "keydown", (e)->
		if e.ctrlKey and not (e.metaKey or e.altKey)
			if e.keyCode is 90 # Z
				if e.shiftKey then redo() else undo()
			if e.keyCode is 89 # Y
				redo()
    return

  requestAnimationFrame update_dimensions
	window.addEventListener "resize", update_dimensions

	requestAnimationFrame ->
		for spanvas in all_spanvases when not spanvas.hasData()
			spanvas.select()
			break
		return

  if the_input then alert "Multiple MultiMedium.Inputs aren't exactly supported (for a silly reason)"
	the_input = element
	the_input.clear = clear

	element

@MultiMedium.setData = (datas)->
	for data, i in datas
		all_spanvases[i].setData {strokes: deserialize_strokes(data)} if data
	return

@MultiMedium.rerender = ->
	# NOTE: MultiMedium.rerender is not needed when calling MultiMedium.setData

	# TODO: re-calculate original width of the text
	for spanvas in all_spanvases
		spanvas.render()
	return


# for override
@MultiMedium.drawStrokes = (strokes, ctx, scale=1)->
	ctx.lineJoin = "round"
	ctx.lineCap = "round"
	ctx.beginPath()
	for {points} in strokes
		ctx.moveTo(points[0].x*scale, points[0].y*scale)
		ctx.lineTo(points[0].x*scale, points[0].y*scale+0.01) if points.length is 1 # make single points visible
		ctx.lineTo(point.x*scale, point.y*scale) for point in points
	ctx.stroke()
  return

# for override
@MultiMedium.getPadding = (line_width)->
	line_width * 2
