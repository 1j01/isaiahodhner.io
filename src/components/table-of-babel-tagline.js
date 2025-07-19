import React from "react";

const taglines = [
	<>An interdisciplinary reference table.</>,
	<>“Please fill out this form.”</>,
	<>Advancing the sciences by completionism.</>,
	<>Unite all fields of science.</>,
	<>Infinite intersectional inspiration.</>,
	// Referencing Borges' Library of Babel
	<>Every possible combination exists.</>,
	// Referencing the Tower of Babel
	<>Building knowledge into the heavens.</>,
	// Referencing the Tower of Babel
	<>Building knowledge until we reach heaven.</>,
	// Referencing the fall of the Tower of Babel
	<>We've forgotten how to talk to each other. But now we have so many more ways to do so.</>,
	// lame, AI-inspired
	<>Bridges, not barriers.</>,
	// lame, AI-generated
	<>Connecting the dots.</>,
	// weird/provocative
	<>Welcome to the conceptual orgy. Get ready to have your mind blown.</>,
	// lame
	<>Analogy analogy analogy.</>,
	// lame
	<>An analogy is like a... (bridge.)</>,
	// AI-inspired
	<>From fragmentation to freedom.</>,
	// AI-inspired, referencing Wittgenstein
	<>The limits of our table are the limits of our world.</>,
	// weird/provocative, AI-generated
	<>Where science comes to make out with itself.</>,
	// AI-generated
	<>The combinatorial sublime.</>,
	// AI-inspired, referencing Ghostbusters
	<>Cross the Streams.</>,
	// AI-generated
	<>The latticework of human knowledge, made visible.</>,
	// lame, AI-generated
	<>Knowledge, cross-referenced.</>,
	// lame, AI-inspired
	<>Weaving the fabric of understanding.</>,
	// AI-inspired, referencing Alfred Korzybski
	<>The map is not the territory—but it’s a start.</>,
	<>An analogy galaxy.</>,
	<>A galaxy of analogies.</>,
	// slightly off, AI-generated
	<>The Matrix of Meaning.</>,
	// lame, AI-generated
	<>Mapping Knowledge Across the Boundaries.</>,
	// um... (AI-inspired, referencing Doctors Without Borders I guess)
	<>Knowledge without borders. Except those of a table.</>,
	// probably not going to reach into philosophy... (AI-generated)
	<>From Physics to Philosophy — All in One Grid.</>,
	// overly identity-based? AI-generated
	<>A Playground for Polymaths.</>,
	// referencing Infinite Solutions (Fatal Farm) - https://www.youtube.com/watch?v=dyii4nndOMM&list=PLgVdzgjXboJPkzer3OzWQVZwvofpYJ6ZN
	<>Infinite Solution<a href="https://www.youtube.com/watch?v=dyii4nndOMM&list=PLgVdzgjXboJPkzer3OzWQVZwvofpYJ6ZN">s</a>.</>,
	// a little quirky, AI-generated
	<>Think in Systems, Not in Silos.</>,
	// WIP
	<>It's been done before... in some way.</>,
	// WIP
	<>Someone's done it. If only Nature.</>,
	// WIP
	<>If Nature hasn't done it, someone has.</>,
	<>Boxes that help you think outside the box.</>,
	// lame, AI-generated
	<>Turn Curiosity into Connections.</>,
	// lame, totally flavorless/straightforward, AI-generated
	<>A Tool for Cross-Disciplinary Insight.</>,
	// not sure about relevance, AI-generated
	<>Find What’s Hidden in Plain Sight.</>,
	// bad, doesn't quite work, AI-generated
	<>A table-shaped mirror of the universe.</>,
	// AI-generated, referencing the tower of babel
	<>Stacking knowledge until it topples.</>,
	// AI-generated, referencing the tower of babel
	<>A structure too big to finish, too interesting to stop.</>,
	// not necessarily relevant, AI-generated, referencing the tower of babel
	<>Rebuilding Babel—this time with tooltips.</>,
	// extremely dry and academic, AI-generated
	<>An ontological spreadsheet for cross-domain inquiry.</>,
	// extremely dry and academic, AI-generated
	<>A UI for inter-field semantic diffusion.</>,
	// questionably meaningful, extremely dry and academic, AI-generated
	<>Taxonomic systems engineering, for ideas.</>,
	// AI-generated
	<>The periodic table of interdisciplinary knowledge.</>,
	<>How I learned to Stop Worrying and Love Schizophrenia.</>,
	// funny, AI-generated
	<>You’re going to need a bigger scroll wheel.</>,
	/* some more AI-generated taglines in the "🌐 Utopian / Techno-Optimist" vein:

		Link all knowledge. See what grows.

		Collaborate across contexts. Discover the in-between.

		Mapping the multidimensional conversation.

		The future of thought is interoperable.

		Recombinant insight, now in tabular form.
	*/
	// AI-inspired 
	<>Cross-context collaboration.</>,
	// lame, AI-generated
	<>Cross-pollination for the mind.</>,
	// weird/WIP
	<>Hopping across sciences like Frogger.</>,
	// <>Hopping across sciences like Frogger on a log, er...</>,
	// <>Hopping disciplines like a frog across lily pads.</>,
	// language!
	<>You're playing Checkers, but I'm playing Connect the Dots, mother****er.</>,
	<>You're playing Checkers, but I'm playing Connect Four. Admittedly, my movement is more limited.</>,
	// referencing Buzz Lightyear and the acronym ToB (admittedly weak with the small words that are first meant to be part of it and then not)
	<>To Ontology and Beyond!</>,
	// maybe overreaching...
	<>Pinterest for engineers/scientists.</>,
	<>An inspiration board for engineers.</>,
	// weird, lame
	<>Science slaps, dawg. Check dis out.</>,
	// weird, with arguably bad implications, AI-generated
	<>Science is a buffet. Take what you like.</>,
	// weird, AI-autocompleted
	<>Science slam poetry.</>,
	// lame, AI-generated
	<>Zero to infinity in one table.</>,
	// idk bro (bad)
	<>You can’t spell “wisdom” without “do”... or “is”.</>,
	// lame, AI-generated
	<>Where Knowledge Takes Shape.</>,
	<>Patterns in the patterns.</>,
	<>Constellations of concepts.{/* [curated] */}
	</>,
	/* Some more AI-generated taglines:
		
		You said:
		try to write a tagline for every letter of the alphabet

		ChatGPT said:
		Here’s a full A–Z of tagline-style lines, each starting with a different letter. Some are conceptual, some punchy, some weird—variety by design.

		🅰️ A – All fields. All formats. All at once.
		🅱️ B – Because everything connects to everything else.
		🇨 C – Cross the disciplines. Collapse the silos.
		🅳 D – Data meets desire. In a table.
		🅴 E – Everything is related. We just mapped it.
		🅵 F – Fill in the gaps between the knowns.
		🅶 G – Grid your loins.
		🅷 H – Here’s how physics talks to poetry.
		🅸 I – Intersection is where invention lives.
		🅹 J – Just add context.
		🅺 K – Knowledge isn’t linear. But this helps.
		🅻 L – Link the overlooked. Label the unknown.
		🅼 M – Mind the gaps—and map them.
		🅽 N – Nothing escapes the matrix.
		🅾️ O – One table. Infinite collisions.
		🅿️ P – Patterns emerge. Meaning follows.
		🆀 Q – Questions multiply in every direction.
		🆁 R – Rows and relations and revelations.
		🆂 S – Structure begets surprise.
		🆃 T – The table is the territory.
		🆄 U – Unlock hidden commonalities.
		🆅 V – Visualize thought. Across domains.
		🆆 W – What happens when no field stays in its lane?
		🆇 X – X marks the unexplored intersections.
		🆈 Y – You’re not the only field that matters.
		🆉 Z – Zoom in on the universal weird.
		Would you like these grouped by tone (e.g., academic, provocative, whimsical)? Or should I generate a version where every tagline still fits together into a coherent theme or progression?


		You said:
		Can you redo G? wth
		and T, and... just give me a fresh batch


		ChatGPT said:
		Absolutely. Here's a fresh A–Z set—cleaner, sharper, and more consistent in tone. This version keeps a mix of clever, conceptual, and usable lines, without going off the rails:

		🅰️ A – Across all domains, across all dimensions.
		🅱️ B – Build the bridge between disciplines.
		🅲 C – Connect concepts. Cross categories.
		🅳 D – Discover what's missing—and what’s not supposed to fit.
		🅴 E – Every field has something to teach the others.
		🅵 F – Find the patterns across the partitions.
		🅶 G – Gather the fragments. Make them speak.
		🅷 H – Hold knowledge lightly. Cross it freely.
		🅸 I – Intersections generate insight.
		🅹 J – Join the dots—across silos, not just within them.
		🅺 K – Knowledge is better when it overlaps.
		🅻 L – Layer perspectives. Reveal structure.
		🅼 M – Map the mess. Learn the logic.
		🅽 N – No field stands alone.
		🅾️ O – One chart. Many conversations.
		🅿️ P – Push past your discipline’s edge.
		🆀 Q – Question the categories. Question the gaps.
		🆁 R – Relate everything to everything else, intentionally.
		🆂 S – Structure your thinking. Then break it open.
		🆃 T – Translate across fields, not just within them.
		🆄 U – Unify what fragmentation left behind.
		🆅 V – View knowledge through a multidimensional lens.
		🆆 W – Weave together what the textbooks separate.
		🆇 X – X is the unknown. This is where to look.
		🆈 Y – Your field is not an island.
		🆉 Z – Zoom out until the grid starts to speak.
		Let me know if you want an A–Z set with a different tone (e.g. ironic, poetic, meme-ified) or focused around a single metaphor (navigation, ecosystems, language, architecture, etc.).
	*/
];

// TODO: make it randomly spin to select a tagline when clicked
// TODO: pick and choose the best ones to show, or at least disable the duds
export default function TableOfBabelTagline() {
	const [ index, setIndex ] = React.useState(0);
	return (
		<div className="TableOfBabelTagline" onClick={() => {
			setIndex((index + 1) % taglines.length);
		}} style={{ cursor: "pointer" }}>
			<div className="tagline">
				{taglines[index]}
			</div>
		</div>
	);
}