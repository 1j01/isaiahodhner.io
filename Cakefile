
fs = require 'fs'

tab = (str)-> str.replace(/\n/g, "\n\t")

boil = ({title, head, body})->
	"""
		<!doctype html>
		<html lang="en-us">
			<head>
				<meta charset="utf-8">
				#{tab tab "<title>#{title} — Isaiah Odhner</title>"}
				#{tab tab (head ? "")}
				<link rel="stylesheet" type="text/css" href="global.css">
				<script async src="global.js"></script>
			</head>
			<body>
				<header>
					<b>Hi, my name is</b>
					<h1>Isaiah Odhner</h1>
					<b>and this is my portfolio</b>
					<nav>
						<a href="/" data-local="index.html">Home</a>
						<a href="/textures" data-local="textures.html">Textures</a>
						<a href="#!?/myfullname@gmail.com">Kontact</a>
					</nav>
				</header>
				#{tab tab body}
			</body>
		</html>
	"""

task "sbuild", ->
	
	texture_imgs = (
		for fname in fs.readdirSync("images/textures")
			"""
				<article class='tile texture'>
					<img src='images/textures/#{fname}'>
				</article>
			"""
	).join "\n"
	
	fs.writeFileSync "textures.html", boil
		title: "Textures"
		body: """
			<p>
				These are some textures I made with code and a tool that I also made.
			</p>
			<div id="textures">
				#{tab texture_imgs}
			</div>
		"""
	
	projects =
		'Tiamblia':
			description: 'A notagame'
			repo: 'tiamblia'
		'BoxArt':
			description: '3d interactive box art generator'
			repo: 'boxart'
		'Babble':
			description: 'Sentence generator and more'
			repo: 'babble'
		'MultiFiddle':
			description: 'Minimalistic multilingual live code fiddling environment'
			repo: 'multifiddle'
		'Paint':
			description: 'Good old mspaint, but with unlimited undos/redos'
			repo: 'jspaint'
		'MyDE':
			description: 'My custom development environment (currently defunct)'
			repo: 'IDE'
		'One Bit Per Pixel':
			description: 'A notagame in pure B&W'
			repo: '1bpp'
		'MindMap':
			description: 'Map your mind without ugly boxes'
			repo: 'mind-map'
		'Guitar':
			description: 'Easily play and record tabs'
			repo: 'guitar'
		'MOS':
			description: 'Monochrome Operating System'
			repo: 'mos'
		'choon.js':
			description: 'Choon language interpreter built with the Web Audio API'
			repo: 'choon.js'
		'PesterChum':
			description: 'MS Paint Adventures chat client'
			repo: 'pesterchum'
		'GIF Maker':
			description: 'Make animated GIF images'
			repo: 'gif-maker'
		'Une: The Complete Multitool':
			description: 'An incomplete unitool for a game called 5UNE17A'
			repo: 'une'
	
	fs.writeFileSync "index.html", boil
		title: "Portfolio"
		body: (
			for project_name in Object.keys(projects)
				project = projects[project_name]
				"""
					<article><a href="http://github.com/1j01/#{project.repo}">
						<header>#{project_name}</header>
						<img width=256 height=256 src="images/projects/#{project.repo}.png">
						<footer>#{project.description}</footer>
					</a></article>
				"""
		).join "\n"

