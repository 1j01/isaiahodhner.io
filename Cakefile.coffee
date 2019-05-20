
fs = require 'fs'
glob = require 'glob'

conjunct = (array, conjunction)->
	if array.length > 1
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
				I've since started a project called <a href="https://github.com/1j01/pixelweaver">Pixelweaver</a>
				that allows for more types of doodles (3D, anyone?),
				gives control over time,
				all while saving reproducible programs in every exported image.
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
				<aside style="font-size: 1rem; margin-top: 2rem; opacity: 0.5;">
					(you can select the text in this header, even tho it's a drawing)
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

