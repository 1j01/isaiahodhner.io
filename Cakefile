
fs = require 'fs'
path = require 'path'
glob = require 'glob'
octicons = require 'octicons'

twitter_icon = """<svg style="height: 1em; padding: 0 5px; vertical-align: middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path fill="none" d="M0 0h72v72H0z"/><path class="icon" fill="currentColor" d="M68.812 15.14c-2.348 1.04-4.87 1.744-7.52 2.06 2.704-1.62 4.78-4.186 5.757-7.243-2.53 1.5-5.33 2.592-8.314 3.176C56.35 10.59 52.948 9 49.182 9c-7.23 0-13.092 5.86-13.092 13.093 0 1.026.118 2.02.338 2.98C25.543 24.527 15.9 19.318 9.44 11.396c-1.125 1.936-1.77 4.184-1.77 6.58 0 4.543 2.312 8.552 5.824 10.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163 0 6.345 4.513 11.638 10.504 12.84-1.1.298-2.256.457-3.45.457-.845 0-1.666-.078-2.464-.23 1.667 5.2 6.5 8.985 12.23 9.09-4.482 3.51-10.13 5.605-16.26 5.605-1.055 0-2.096-.06-3.122-.184 5.794 3.717 12.676 5.882 20.067 5.882 24.083 0 37.25-19.95 37.25-37.25 0-.565-.013-1.133-.038-1.693 2.558-1.847 4.778-4.15 6.532-6.774z"/></svg>"""

tab = (str)->
	# Indent the output. Because I care.
	str.replace(/\n/g, '\n\t')

boil = ({title, head, main})->
	# Boilerplate and stuff.
	# A Template, really. But I like 'boiling', like I'm cooking webpages. (Before serving them.)
	is_front_page = not title
	is_mission_page = title is "Make Making Better"
	show_mission_big = is_front_page #or is_mission_page
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
					<!--<h3 class="boring-sort-of-'role'-description--(not really who i am as a person..)">Node.js & web developer & designer</h3>-->
					#{if is_mission_page then "" else """
					<nav>
						<h2 class="mission#{if show_mission_big then " big" else ""}">
							<a href="/make-making-better">
								<span class="word">MAKE</span>
								<strong class="word">MAKING</strong>
								<span class="word">BETTER</span>
							</a>
						</h2>
						<a href="https://twitter.com/isaiahodhner">#{twitter_icon}Follow me on Twitter</a> <!-- for project announcements, art, etc. -->
						<br><br>
						<a href="mailto:isaiahodhner@gmail.com">#{octicons.mail.toSVG()}Send me some Email</a> <!-- (no need to be all formal!) -->
						<br><br>
						<!--<a href="https://github.com/1j01">#{octicons["mark-github"].toSVG()}Check me out on GitHub</a>
						<br><br>-->
						<a href="/apps">Apps</a>
						<a href="/games">Games</a>
						<a href="https://github.com/1j01">#{octicons["mark-github"].toSVG()}More on GitHub</a>
						<br><br>
					</nav>
					"""}
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
	# aka "piano artist" icyww (sometimes shortened to "pianartist")

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
	log_divisibles Object.keys(projects).length, "project tiles", "(before tiles are spanned)"
	
	display_projects = (projects, title)->
		articles_for_projects = (
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
			<div style="padding: 5rem"> <!-- so it's not ridiculously scrunched at the bottom - especially after that huge header thing! -->
				<p>
					Hi, my name is <b>Isaiah Odhner</b>.
				</p>
				<p>
					I'm a programmer and designer and whatnot,
					but more importantly <i>I see the world for how I want to change it.</i>
				</p>
				<p>
					This website is primarily a portfolio, of many of my projects.
					Probably not even half of them.. or a third.
					I have a lot of projects.
				</p>
				<p>
					I've made several <a href='/apps'>web apps</a>, as well as
					<a href='/games'>games and experiments</a>, and some
					libraries, tools, and other stuff (which you can find <a href='https://github.com/1j01'>on GitHub</a>).
				</p>
				<p>I like making music, so several of my projects are geared towards that.</p>
				<p>I like making procedural art sometimes, such as <a href='/patterns'>these patterns</a>.</p>
				<p>
					None of the projects on this website fully represent what I can do when I actually focus on something.
					I'm always starting projects and switching between them.
					I've put a considerable amount of work into a few of them, but not as much as I'd like.
					I could work on any one of them and end up with something really refined.
				</p>
				<p>
					...But projects aren't inherently worth persuing.
					<!--
					Do I really need to make a mind mapping app? I have a <em>vision</em> for a cool one, all minimalistic and shit, with realtime collaboration, and all of that, but
					to be honest, pencil and paper or an indented text file work pretty well.
					Do I need to make MultiFiddle? Well, JSFiddle has a lot of problems, especially with CoffeeScript, some serious issues with indentation that just make it unusable.
					But they've improved it a lot recently (<em>not those problems *ahem*</em>), and (but) maybe I could go <em>work there</em> instead, and help improve it in ways that I care about.
					-->
				</p>
				<p>I've recently realized what I want to do with my life, for the fairly-long-term:
				<a href="/make-making-better">Make <strong>Making</strong> Better</a></p>
			</div>
		"""
	
	fs.writeFileSync 'make-making-better.html', boil
		title: "Make Making Better"
		head: """
			<script src="lib/multi-medium.coffee" type="text/coffeescript"></script>
			<script src="make-make-making-better-look-better.coffee" type="text/coffeescript"></script>
			<!--<script src="make-making-better-multi-medium-data.js"></script>-->
			<link rel="stylesheet" href="make-making-better-multi-medium.css">
		"""
		main: """
			<h2 class="mission big on-mission-page" style="position: relative">
				<!--<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"></svg>-->
				<span class="word">MAKE</span>
				<strong class="word">MAKING</strong>
				<span class="word">BETTER</span>
				<aside style="font-family: monospace; font-size: 1rem; margin-top: 2rem;">
					@TODO: This begs to be made colorful, and animated. Dynamic!
					<br><br>
					P.S. This was drawn with a touchpad, okay? :)
				</aside>
			</h2>
			<div style="padding: 5rem"> <!-- so it's not ridiculously scrunched at the bottom - especially after that huge header thing! -->
				<p>
					I want to <strong>improve creative software</strong>.
					I have a lot of ideas about how to do this.
				</p>
				<p>
					I'll be writing a manifesto, which I'll put here, or at least link to it (maybe I'll put it on Medium?).
					Also, I plan on starting a Patreon page.
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

