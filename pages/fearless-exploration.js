import React from "react";
import initDoodles from "../src/fearless-exploration-doodle";
import Title from "../src/title";
import WhyTheDividePoster from "../public/images/fearless-exploration/why-the-divide-v8.svg";

class ManifestoPage extends React.Component {
	render() {
		return <div className="Manifesto">
			<Title pageName="Fearless Exploration"/>
			<style>{`
				.hide-on-manifesto-page {
					display: none;
				}
				.multi-medium-input {
					background: white;
					color: #444;
					font-family: sans-serif;
					max-width: 70em;
					margin: 0 auto;
					height: 150px;
					position: fixed;
					z-index: 2;
					left: 0;
					right: 0;
					bottom: 0;
					margin-bottom: 0.4cm;
					box-shadow: 0 0 50px #fff;
					border: 1px dashed rgba(0, 0, 0, 0.5);
					border-radius: 8px;
				}
				.multi-medium-word:focus {
					outline: none;
					border-radius: 3px;
					box-shadow: 0 0 2px 3px #FFFFFF, 0 0 4px 5px #FFC7C7, 0 0 100px 5px #FF77BB;
					z-index: 1;
				}
				.multi-medium-word {
					text-shadow: none;
				}
			`}</style>
			<h2 className="principle big on-manifesto-page" style={{position: "relative"}}>
				<span className="word">FEARLESS</span>{" "}
				<span className="word">EXPLORATION</span>{" "}
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
					I'll be writing a manifesto, which I'll put here, or at least link to it / redirect.
					I also plan on starting a Patreon page.
					For now you can follow me on <abbr title="The service formerly known as Twitter">Ex-Twitter</abbr>, <a href="https://twitter.com/isaiahodhner">@isaiahodhner</a>.
				</p>
			</div>
			<p>
				Here's a teaser poster:
			</p>
			<div className="poster">
				{/* <img src="/images/fearless-exploration/why-the-divide-v4.svg" alt="Why the Divide?"/> */}
				<WhyTheDividePoster/>
			</div>
			{/* <div className="textual-page-content" style={{ textAlign: "left" }}>
				<p>
					Why the Divide?
				</p>

				Dynamic/Procedural/Live/Non-Destructive:
				<ul>
					<li>Filters/Effects/Modifiers</li>
					<li>Clipping Masks</li>
					<li>Clones</li>
					<li>Editable Objects</li>
					<li>repetition is easy</li>
					<li>indirect editing often complicates UI; usually you're editing objects like groups, paths, path nodes, or even procedural node graphs like Geometry Nodes or Shader Nodes in blender - each with their own paradigms - or going fully abstract with textual code</li>
				</ul>
						
				Static/Manual/One-Off/Destructive:
				<ul>
					<li>Selection Manipulation</li>
					<li>Tool Actions</li>
					<li>Menu Actions</li>
					<li>Copy/Paste</li>
					<li>specialization is easy</li>
					<li>direct editing often simplifies UI</li>
				</ul>
			</div> */}
		</div>;
	}
	componentDidMount() {
		this.cleanupDoodles = initDoodles();
	}
	componentWillUnmount() {
		this.cleanupDoodles();
	}
}

export default ManifestoPage;
