
fs = require 'fs'

tab = (str)-> str.replace(/\n/g, '\n\t')

boil = ({title, head, body})->
	"""
		<!doctype html>
		<html lang="en-US">
			<head>
				<meta charset="utf-8">
				#{tab tab "<title>#{title} — Isaiah Odhner</title>"}
				#{tab tab (head ? "")}
				<meta name="author" content="Isaiah Odhner">
				<meta name="description" content="Isaiah Odhner's portfolio website">
				<meta name="keywords" content="Isaiah Odhner, 1j0, 1j01">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" type="text/css" href="portfolio.css">
				<script async src="portfolio.js"></script>
				<script async src="global.js"></script>
			</head>
			<body>
				<header>
					<b>Hi, my <span id="magic">name</span> is</b>
					<h1 id="name">Isaiah Odhner</h1>
					<b>and this is my portfolio</b>
					<nav>
						<a href="/" data-local="index.html">Home</a>
						<a href="/textures" data-local="textures.html">Textures</a>
						<a href="#!?/myfullnamehere@gmail.com">Contact</a>
					</nav>
				</header>
				#{tab tab body}
			</body>
		</html>
	"""

task 'sbuild', ->
	
	texture_images = (
		for fname in fs.readdirSync('images/textures')
			"""
				<article itemscope itemtype="http://schema.org/ImageObject">
					<img src="images/textures/#{fname}" itemprop="contentURL">
				</article>
			"""
	).join '\n'
	
	fs.writeFileSync 'textures.html', boil
		title: 'Textures'
		body: """
			<p>
				These are some textures I made with code and a tool that I also made.
			</p>
			<div id="textures">
				#{tab texture_images}
			</div>
		"""
	
	projects =
		'tiamblia':
			name: 'Tiamblia'
			description: 'A notagame'
		'boxart':
			name: 'BoxArt'
			description: '3d interactive box art generator'
		'babble':
			name: 'Babble'
			description: 'Sentence generator and more'
		'multifiddle':
			name: 'MultiFiddle'
			description: 'Minimalistic multilingual live code fiddling environment'
		'jspaint':
			name: 'Paint'
			description: 'Good old mspaint, but with unlimited undos/redos'
		'IDE':
			name: 'MyDE'
			description: 'My custom development environment (currently defunct)'
			url: 'repo'
		'1bpp':
			name: 'One Bit Per Pixel'
			description: 'A notagame in pure B&W'
			url: 'repo'
		'mind-map':
			name: 'MindMap'
			description: 'Map your mind without ugly boxes'
		'guitar':
			name: 'Guitar'
			description: 'Easily play and record tabs'
		'mos':
			name: 'MOS'
			description: 'Monochrome Operating System'
		'choon.js':
			name: 'Choon.js'
			description: 'Choon language interpreter built with the Web Audio API'
		'pesterchum':
			name: 'PesterChum'
			description: 'MS Paint Adventures chat client'
			url: 'repo'
		'gif-maker':
			name: 'GIF Maker'
			description: 'Make animated GIF images'
		'une':
			name: 'UNE: The Complete Multitool'
			description: 'An incomplete unitool for a game called 5UNE17A'
		'pool':
			name: 'Jussom Billiards'
			description: 'Just playing around with physics'
		'pipes':
			name: 'Pipes'
			description: '3d pipes screensaver remake'
	
	fs.writeFileSync 'index.html', boil
		title: 'Portfolio'
		body: (
			for key, project of projects
				
				url =
					if project.url is 'repo'
						"http://github.com/1j01/#{key}"
					else
						project.url ? "http://1j01.github.io/#{key}/"
				
				"""
					<article itemscope itemtype="http://schema.org/WebPage">
						<a href="#{url}" itemprop="url">
							<header itemprop="name">#{project.name}</header>
							<img itemprop="image" width=256 height=256 src="images/projects/#{key}.png">
							<footer itemprop="description">#{project.description}</footer>
						</a>
					</article>
				"""
				
		).join '\n'

