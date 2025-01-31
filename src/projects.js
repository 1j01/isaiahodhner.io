export const apps = [
	{
		repo_name: '98',
		title: '98.js',
		description: 'Windows 98 desktop remake',
		url: "https://98.js.org"
	},
	{
		repo_name: 'jspaint',
		title: 'JS Paint',
		// description: 'Classic MS Paint, revived +Transparency +Unlimited Undos',
		// description: 'MS Paint but it runs in the browser',
		// description: 'MS Paint but it runs in the browser +Transparency +Unlimited Undos',
		// as much as I like undo history features, the "unlimited" part is a bit of a lie
		// since it crashes after a while.
		// Mopaint has better undo history, saved to local storage.
		description: 'MS Paint but it runs in the browser +transparency +voice control',
		url: "https://jspaint.app"
	},
	{
		repo_name: 'textual-paint',
		title: 'Textual Paint',
		description: 'MS Paint but it runs in the terminal',
		url: "https://pypi.org/project/textual-paint/"
	},
	{
		repo_name: 'true-random-movie',
		title: 'True Random Movie',
		// description: 'Find something to watch, from over 32 thousand films'
		// description: 'Spinner with 32K+ films'
		// description: 'Spin the wheel of 32K+ films'
		description: <>Spin the wheel of <abbr title="over thirty-two thousand">32K+</abbr> films</>,
	},
	{
		repo_name: 'midi-recorder',
		title: 'MIDI Recorder',
		description: <>The easiest way to record <abbr title="musical instrument digital interface">MIDI</abbr></>,
		url: "https://midi-recorder.web.app"
	},
	{
		repo_name: 'wavey',
		title: 'Wavey',
		description: <>Proof-of-concept online <abbr title="digital audio workstation">DAW</abbr></>,
		url: 'https://audio-editor.web.app'
	},
	{
		repo_name: 'tri-chromatic-keyboard',
		title: 'Tri-Chromatic Keyboard',
		description: 'A more symmetrical piano'
	},
	{
		repo_name: 'guitar',
		title: 'Guitar',
		description: 'Easily play and record tabs',
		bg: "light"
	},
	{
		repo_name: 'midiflip',
		title: 'MidiFlip',
		description: <>Mathematical <abbr title="musical instrument digital interface">MIDI</abbr> manipulation</>,
		bg: "light"
	},
	{
		repo_name: 'nonsensical',
		title: 'Nonsensical',
		description: 'An English sentence generator made for #ProcJam',
		url: "https://1j01.itch.io/nonsensical",
		bg: "light"
	},
	// {
	// 	repo_name: 'project-nexus',
	// 	title: 'Project Nexus',
	// 	description: 'A hub for all your coding projects',
	// 	url: 'repo'
	// },
	// {
	// 	repo_name: 'multifiddle',
	// 	title: 'MultiFiddle',
	// 	description: 'Minimalist multiplayer live code fiddling environment',
	// 	url: "https://multifiddle.ml"
	// },
	{
		repo_name: 'mind-map',
		title: 'MindMap',
		description: 'Map your mind without ugly boxes',
		bg: "light"
	},
	{
		repo_name: 'transpairency',
		title: <>Trans<em>pair</em>ency</>,
		description: <>Transparency from two opaque images (black and white <abbr title="backgrounds">BGs</abbr>)</>,
		bg: "light"
	},
	// {
	// 	repo_name: 'boxart',
	// 	title: 'BoxArt',
	// 	description: '3D drag & drop box art generator'
	// },
	// {
	// 	repo_name: 'gif-maker'
	// 	title: 'GIF Maker'
	// 	description: 'Make animated GIFs'
	// }
	{
		repo_name: 'fliptimer',
		title: 'FlipTimer',
		description: 'A simple countdown timer',
		bg: "light"
	},
	// an app and library
	// should add choon.js to https://ascii-to-midi.web.app/
	// and add playback to https://midi-recorder.web.app/
	// if this is interesting at all
	// {
	// 	repo_name: 'choon.js'
	// 	title: 'Choon.js'
	// 	description: 'Choon language interpreter built with the Web Audio API'
	// }
	// an app and library
	// already added to https://midi-recorder.web.app/
	// {
	// 	repo_name: 'rtttl.js'
	// 	title: 'RTTTL.js'
	// 	description: 'Play a bunch of ringtones'
	// }
	// not exactly an app; a demo of a library
	// {
	// 	repo_name: 'font-detective'
	// 	title: 'Font Detective'
	// 	description: 'Detects fonts in browser'
	// 	bg: "light"
	// }
	// an app
	// {
	// 	repo_name: 'pesterchum'
	// 	title: 'PesterChum'
	// 	description: 'Chat client from Homestuck'
	// 	url: 'repo'
	// }
	// an app
	// {
	// 	repo_name: 'she-has-what?'
	// 	title: 'She Has What?'
	// 	description: 'Doc Scratch Reaction GIF Generator'
	// }
	// an extension, not an app
	// {
	// 	repo_name: 'sbahjifier'
	// 	title: 'SBAHJifier'
	// 	description: 'Make any page look like SWEET BRO AND HELLA JEFF'
	// 	url: 'https://chrome.google.com/webstore/detail/sbahjifier/gejobhmmpioknjihlhemplpfchbnbpin'
	// }
	{
		repo_name: 'pixelweaver',
		title: 'Pixelweaver',
		url: 'repo',
		description: 'Reproducible Procedural Art'
	},
	{
		repo_name: 'mopaint',
		title: 'Mopaint',
		// description: <>Break down the boundary between programming and art.<br/>Eliminate fear of data loss.<br/>Reproducible Procedural Art 2</>
		// description: <>Break down the boundary between programming and art.<br/>Refactor brush strokes.<br/>Reproducible Procedural Art 2</>
		// description: <>Break down the boundary between programming and art.<br/>Reproducible Procedural Art 2</>,
		// description: 'Reproducible Procedural Human Art'
		// description: 'Reproducible Human Art'
		// description: 'Human Art with Program-based Documents'
		// description: 'A new zen in art'
		// description: 'Unlocking a new type of zen in art making'
		// description: 'Unleashing/Realizing a new type of zen in art making'
		// The power to change anything you have in your document after the fact (to undo, to change your mind,)
		// is basically the kind of power & zen unlocked with computers (and e.g. MacPaint, vis-à-vis https://archive.org/details/mac_Zen_the_Art_of_Macintosh1986)
		// but a difference in degree/extent/completeness becomes a difference in kind
		// Anyways, very little of my vision is realized in the app yet, so...
		// description: "Symmetry drawing app",
		description: "Draw with symmetry, undo freely",
		url: 'https://mopaint.app/'
	}
];
export const games = [
	{
		repo_name: 'snakeshift',
		title: 'Snakeshift',
		description: 'Negative space puzzle game',
		bg: "dark"
	},
	{
		repo_name: 'chess-mashup',
		title: 'Chess Mashup',
		description: '3D chess game and variants',
		bg: "dark"
	},
	{
		repo_name: 'columns',
		title: 'Columns',
		description: 'A #BadBoxArt jam game',
		bg: "light"
	},
	{
		repo_name: 'tiamblia-game',
		title: 'Tiamblia',
		description: 'Archery meditation'
	},
	{
		repo_name: 'slugg',
		title: 'SLUGG',
		description: 'A dystopian trainhopping up-going parkour game-to-be'
	},
	{
		repo_name: 'janitorial-android',
		title: 'Janitorial Android',
		description: 'LEGO Junkbot remake'
	},
	{
		repo_name: 'pbj-sandbox',
		title: 'PBJ Sandbox',
		// description: 'Wobbly physics sandbox w/ sound'
		// description: 'Jelly physics simulation w/ sound'
		description: 'Point-based jelly physics playground with dynamic audio'
	},
	{
		repo_name: 'polywogg',
		title: 'Polywogg',
		description: 'Sword fighting game'
	},
	{
		repo_name: 'mos',
		title: 'MOS',
		description: 'Monochrome Operating System'
	},
	// {
	// 	repo_name: '1bpp'
	// 	title: 'One Bit Per Pixel'
	// 	description: 'A B&W platformer-to-be'
	// }
	{
		repo_name: 'board-game',
		title: 'Chance',
		// description: 'A board game?'
		description: 'Nonexistent board game'
	},
	{
		repo_name: 'une',
		title: 'UNE: The Complete Multitool',
		description: 'An incomplete unitool for a game called 5UNE17A'
	},
	{
		repo_name: 'stick-mangler',
		title: 'Stick Mangler',
		description: 'Not Stick Ranger'
	},
	{
		repo_name: 'pool',
		title: 'Jussom Billiards',
		description: 'Just playing around with physics'
	},
	{
		repo_name: 'dat-boi',
		title: 'Dat Boi',
		description: 'Here comes dat boi!',
		bg: "light"
	},
	{
		repo_name: 'pipes',
		title: 'Pipes',
		description: '3D pipes screensaver remake'
	},
	{
		repo_name: 'patterns',
		title: 'Patterns',
		description: 'Procedurally generated patterns',
		url: 'patterns',
		repo_url: 'https://github.com/1j01/isaiahodhner.io'
	},
];
export const projects = [...apps, ...games];
