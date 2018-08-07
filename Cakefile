
fs = require 'fs'
glob = require 'glob'
octicons = require 'octicons'

twitter_icon = """<svg class="icon icon-twitter" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M68.812 15.14a26.189 26.189 0 0 1-7.52 2.06 13.125 13.125 0 0 0 5.757-7.243 26.133 26.133 0 0 1-8.314 3.176A13.066 13.066 0 0 0 49.182 9c-7.23 0-13.092 5.86-13.092 13.093 0 1.026.118 2.02.338 2.98C25.543 24.527 15.9 19.318 9.44 11.396a13.057 13.057 0 0 0-1.77 6.58c0 4.543 2.312 8.552 5.824 10.9a13.05 13.05 0 0 1-5.93-1.64c-.002.056-.002.11-.002.163 0 6.345 4.513 11.638 10.504 12.84-1.1.298-2.256.457-3.45.457-.845 0-1.666-.078-2.464-.23 1.667 5.2 6.5 8.985 12.23 9.09a26.29 26.29 0 0 1-16.26 5.605c-1.055 0-2.096-.06-3.122-.184a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.25-19.95 37.25-37.25 0-.565-.013-1.133-.038-1.693a26.61 26.61 0 0 0 6.532-6.774z"/></svg>"""
email_icon = """<svg class="icon icon-email" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.211 485.211"><path d="M485.211 363.906c0 10.637-2.992 20.498-7.785 29.174L324.225 221.67l151.54-132.584c5.895 9.355 9.446 20.344 9.446 32.219v242.601zM242.606 252.793l210.863-184.5c-8.653-4.737-18.397-7.642-28.908-7.642H60.651c-10.524 0-20.271 2.905-28.889 7.642l210.844 184.5zm58.787-11.162l-48.809 42.734a15.145 15.145 0 0 1-9.978 3.729c-3.57 0-7.125-1.242-9.98-3.729l-48.82-42.736L28.667 415.23c9.299 5.834 20.197 9.329 31.983 9.329h363.911c11.784 0 22.687-3.495 31.983-9.329L301.393 241.631zM9.448 89.085C3.554 98.44 0 109.429 0 121.305v242.602c0 10.637 2.978 20.498 7.789 29.174l153.183-171.44L9.448 89.085z"/></svg>"""

tab = (str)->
	# Indent the output. Because I care.
	str.replace(/\n/g, '\n\t')

boil = ({title, head, main})->
	# Boilerplate and stuff.
	# A Template, really. But I like 'boiling', like I'm cooking webpages. (Before serving them.)
	is_front_page = not title
	is_mission_page = title is "Make Making Better"
	show_mission_big = no # is_front_page
	# (the `.mission` is displayed separately on the mission page)
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
					#{if is_mission_page then "" else """
					<nav>
						<h2 class="mission#{if show_mission_big then " big" else ""}">
							<a href="/make-making-better">
								<span class="word">MAKE</span>
								<strong class="word">MAKING</strong>
								<span class="word">BETTER</span>
								<div class="subtitle link-indicator">A manifesto (to come)</div>
							</a>
						</h2>
						<a href="https://twitter.com/isaiahodhner">#{twitter_icon}Follow me on Twitter</a>
						<br><br>
						<a href="mailto:isaiahodhner@gmail.com">#{email_icon}Send me some Email</a>
						<br><br>
						<a href="/apps">Apps</a>
						<a href="/games">Games</a>
						<a href="https://github.com/1j01">#{octicons["mark-github"].toSVG()}More on GitHub</a>
					</nav>
					"""}
				</header>
				<main>
					#{tab tab tab main}
				</main>
				<footer>
					<p>
						This website's source code is <a href="https://github.com/1j01/isaiahodhner.ml">on GitHub</a>.
						Feel free to <a href="https://github.com/1j01/isaiahodhner.ml/issues/new">open any issues</a> there, or just <a href="mailto:isaiahodhner@gmail.com">send me an email</a>
					</p>
					<p>
						Icons from <a href="https://octicons.github.com/">Octicons</a>, <a href="https://opensource.org/licenses/MIT">MIT-licensed</a>, and
						<a href="https://www.flaticon.com/authors/simpleicon" title="SimpleIcon">SimpleIcon</a>, <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a>
					</p>
				</footer>
				<script src="lib/coffee-script.js"></script>
			</body>
		</html>
	"""

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
			<h1>Patterns</h1>
			<p>
				These are some repeating patterns and textures I made with code (and a tool that I made (with code)).
				Some of them aren't seamless because I hadn't worked out all the kinks in my implementation of a wrapping canvas.
				<!--, an abstraction over the Canvas2D API that proxies all draw calls by translating to different positions and drawing it multiple times.
				[is this accurate? i don't quite remember, i'm not confident enough atm to add that information here;
				also it bothers me that I'm mentioning a tool that I made without linking to it or the source code;
				so I should go find that] -->
				I also only have the code to reproduce a few of these.
			</p>
			<p>
				I've since started a project called <a href="https://github.com/1j01/pixel-weaver">Pixel Weaver</a>
				that allows for more types of doodles (3D, anyone?),
				gives control over time,
				all while saving reproducible programs in every exported screenshot.
			</p>
			<div class="tiles-container" id="patterns">
				#{tab pattern_images}
			</div>
		"""
	
	projects = require "./projects"
	
	display_projects = (projects, title)->
		log_divisibles Object.keys(projects).length, "#{title} project tiles", "(before tiles are spanned)"
	
		articles_for_projects = (
			for project in projects
				
				image_url = project.image_url ? "images/projects/#{project.repo_name}.png"
				repo_url = project.repo_url ? "https://github.com/1j01/#{project.repo_name}"
				gh_pages_url = "https://1j01.github.io/#{project.repo_name}/"
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
							<a href="#{repo_url}" class="repo" title="View repository on GitHub">#{octicons.repo.toSVG()}</a>
							<span>#{project.title}</span>
						</header>
						<footer itemprop="description">#{project.description}</footer>
					</article>
				"""
		).join ''
		
		boil
			title: title
			head: '<script src="project-tiles.coffee" type="text/coffeescript"></script>'
			main: """
				<div class="tiles-container">
					#{tab articles_for_projects}
				</div>
			"""
	
	fs.writeFileSync 'index.html', boil
		main: """
			<div class="textual-page-content">
				<p>
					Hi, my name is <b>Isaiah Odhner</b>.
				</p>
				<p>
					I'm a programmer and designer, interested in <a href="https://progrium.com/wiki/Generativity/">generativity</a>, and making powerful creative tools.
				</p>
				<p>
					This website is primarily a portfolio of many of my projects.
				</p>
				<p>
					I've made several <a href='/apps'>web apps</a>, as well as
					<a href='/games'>games and experiments</a>, and some
					libraries and tools and such, which you can find <a href='https://github.com/1j01'>on GitHub</a>.
				</p>
				<p>I like making music, so several of my projects are geared towards that.</p>
				<p>I like making procedural art sometimes, such as <a href='/patterns'>these patterns</a>. I should put up a gallery sometime.</p>
				<p>
					With several of my projects, I've put in a considerable amount of work, but not enough to make them actually useful.
					I could work on any one of them and end up with something really refined, but it's a matter of prioritization.
				</p>
			</div>
		"""
	
	fs.writeFileSync 'make-making-better.html', boil
		title: "Make Making Better"
		head: """
			<script src="lib/multi-medium.coffee" type="text/coffeescript"></script>
			<script src="make-make-making-better-look-better.coffee" type="text/coffeescript"></script>
			<link rel="stylesheet" href="make-making-better-multi-medium.css">
		"""
		main: """
			<h2 class="mission big on-mission-page" style="position: relative">
				<span class="word">MAKE</span>
				<strong class="word">MAKING</strong>
				<span class="word">BETTER</span>
				<aside style="font-family: monospace; font-size: 1rem; margin-top: 2rem;">
					@TODO: Have the birds land on the text.
					Animate the text itself!
					Add some clouds!
					Redraw the text with a tablet rather than a touchpad.
				</aside>
			</h2>
			<div class="textual-page-content">
				<p>
					I want to <strong>improve creative software</strong>.
					I have a lot of ideas about how to do this.
				</p>
				<p>
					I'll be writing a manifesto, which I'll put here, or at least link to it (maybe I'll put it on Medium?).
					I also plan on starting a Patreon page.
					For now you can follow me on Twitter, <a href="https://twitter.com/isaiahodhner">@isaiahodhner</a>.
				</p>
			</div>
		"""
	
	fs.writeFileSync 'apps.html', display_projects(projects.apps, "Apps")
	fs.writeFileSync 'games.html', display_projects(projects.games, "Games and Experiments")


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

