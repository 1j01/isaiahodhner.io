
fs = require 'fs'
path = require 'path'
glob = require 'glob'
octicons = require 'octicons'

tab = (str)->
	# Indent the output. Because I care.
	str.replace(/\n/g, '\n\t')

boil = ({title, head, main})->
	# Boilerplate and stuff.
	# A Template, really. But I like 'boiling', like I'm cooking webpages. (Before serving them.)
	"""
		<!doctype html>
		<html lang="en-US">
			<head>
				<meta charset="utf-8">
				<meta name="author" content="Isaiah Odhner">
				<meta name="description" content="Isaiah Odhner's portfolio website">
				<meta name="keywords" content="Isaiah Odhner, 1j0, 1j01">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta name="theme-color" content="#0083A5">
				<title>#{if title then "#{title} — " else ""}Isaiah Odhner</title>
				<link rel="icon" sizes="any" type="image/svg+xml" href="images/icons/favicon.svg">
				<link rel="icon" sizes="16x16" type="image/x-icon" href="images/icons/favicon.ico">
				<link rel="icon" sizes="16x16" type="image/png" href="images/icons/favicon.png">
				<link rel="stylesheet" type="text/css" href="portfolio.css">
				#{tab tab (head ? "")}
			</head>
			<body>
				<header>
					<h1><a href="/">Isaiah Odhner</a></h1>
					<h2>Node.js & web developer & designer</h2>
					<nav>
						<a href="/apps">Apps</a>
						<a href="/games">Games</a>
						<a href="https://github.com/1j01">#{octicons["mark-github"].toSVG()}GitHub</a>
						<a href="mailto:isaiahodhner@gmail.com">#{octicons.mail.toSVG()}Contact</a>
					</nav>
				</header>
				<main>
					#{tab tab tab main}
				</main>
				<footer></footer>
				<script src="lib/coffee-script.js"></script>
			</body>
		</html>
	"""
	# <h2>Node.js & web developer & designer<br/>& game developer & wannabe entrepreneur<br/>& a little bit of a "piano musician"</h2>
	# aka "piano artist" icyww

conjunct = (array, conjunction)->
	if array.length > 0
		[most..., last] = array
		"#{most.join(", ")} #{conjunction} #{last}"
	else
		array[0]

log_divisibles = (n, unit, more_info...)->
	nondivisibles = []
	divisibles = []
	(if n / i is n // i then divisibles else nondivisibles).push i for i in [1..10]
	console.log "
		#{n} #{unit},
		divisible by #{conjunct(divisibles, "and")},
		but not by #{conjunct(nondivisibles, "or")}
	", more_info...

task 'boil', 'Build the website, boiling the pages.', ->
	
	pattern_fnames = glob.sync 'images/patterns/*.png'
	
	log_divisibles pattern_fnames.length, "pattern tiles"
	
	pattern_images = (
		for fname in pattern_fnames
			"""
				<article itemscope itemtype="http://schema.org/ImageObject">
					<img src="#{fname}" itemprop="contentURL">
				</article>
			"""
	).join ''
	
	fs.writeFileSync 'patterns.html', boil
		title: 'Patterns'
		head: '<script src="patterns.coffee" type="text/coffeescript"></script>'
		main: """
			<p>
				These are some patterns I made with code and a tool that made with code.
			</p>
			<div id="patterns">
				#{tab pattern_images}
			</div>
		"""
	
	projects = require "./projects"
	log_divisibles Object.keys(projects).length, "project tiles", "(before tiles are spanned)"
	
	display_projects = (projects)->
		boil
			head: '<script src="project-tiles.coffee" type="text/coffeescript"></script>'
			main: (
				
				for project in projects
					
					image_url = project.image_url ? "images/projects/#{project.repo_name}.png"
					repo_url = project.repo_url ? "https://github.com/1j01/#{project.repo_name}"
					gh_pages_url = "http://isaiahodhner.ml/#{project.repo_name}/"
					url =
						if project.url is 'repo'
							repo_url
						else
							project.url ? gh_pages_url
					
					bg = project.bg ? "normal"
					if project.image_url
						sizes = ["1x1"]
					else
						sizes = ["1x1"] if fs.existsSync "images/projects/#{project.repo_name}.png"
						for img_path in glob.sync "images/projects/#{project.repo_name}-*.png"
							m = img_path.match /-(\d+x\d+)\./
							sizes.push m[1] if m
						
					"""
						<article itemscope itemtype="http://schema.org/WebPage" data-bg="#{bg}" data-sizes="#{sizes}">
							<a href="#{url}" itemprop="url">
								<img itemprop="image" width=256 height=256 src="#{image_url}">
							</a>
							<header itemprop="name">
								<a href="#{repo_url}" class="repo" title="View repository on GitHub">#{octicons.repo.toSVG()}</span></a>
								<span>#{project.title}</span>
							</header>
							<footer itemprop="description">#{project.description}</footer>
						</article>
					"""
					
			).join ''
	
	fs.writeFileSync 'index.html', boil
		main: "
			<p>I have too many projects. I make <a href='/apps'>web apps</a> and <a href='/games'>games</a>, and
			<a href='https://github.com/1j01'>libraries, tools, and other stuff</a>.</p>
			<p>I like making <a href='/patterns'>procedural art</a>.
			I play piano, and I have a <a href='https://soundcloud.com/isaiah-odhner'>SoundCloud</a> account, no relation.</p>
		"
	fs.writeFileSync 'apps.html', display_projects(projects.apps)
	fs.writeFileSync 'games.html', display_projects(projects.games)


task 'optimages', 'Optimize all the images.', ->
	
	optimage = require 'optimage'
	
	glob '**/*.png', (err, files)->
		if err
			console.error err
		else
			do fn = (i = 0)->
				next = ->
					if i + 1 < files.length
						fn i + 1
				
				f = files[i]
				
				if f.match /node_modules/
					do next
				else
					optimage {
						inputFile: f
						outputFile: f
					}, (err, res)->
						
						if err
							console.error "#{f} ::: ERROR"
							console.error err
							console.error "\n"
						else
							if (res.stderr.indexOf 'already optimized') isnt -1 or res.saved < 10
								console.log "#{f} ::: already optimized"
							else
								console.log "#{f} ::: saved #{res.saved} bytes"
						
						do next

task 'sbuild', '(invokes boil) invoked by Ctrl+B in Sublime Text', -> invoke 'boil'
task 'build', '(invokes boil)', -> invoke 'boil'

