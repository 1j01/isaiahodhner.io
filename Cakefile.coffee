
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

