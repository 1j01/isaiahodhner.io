/* TODO:
	<script src="lib/multi-medium.coffee" type="text/coffeescript"></script>
	<script src="make-make-making-better-look-better.coffee" type="text/coffeescript"></script>
	<link rel="stylesheet" href="make-making-better-multi-medium.css">
 */
function Manifesto() {
	return <>
		<h2 className="mission big on-mission-page" style={{position: "relative"}}>
			<span className="word">MAKE</span>{" "}
			<strong className="word">MAKING</strong>{" "}
			<span className="word">BETTER</span>{" "}
			<aside style={{fontSize: "1rem", marginTop: "2rem", opacity: 0.5}}>
				(you can select the text in this header, even tho it's a drawing)
			</aside>
		</h2>
		<div className="textual-page-content">
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
	</>;
}

export default Manifesto;
