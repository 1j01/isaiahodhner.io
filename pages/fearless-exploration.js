import React from "react";
// import Head from 'next/head';
import initDoodles from "../src/fearless-exploration-doodle";
import Title from "../src/title";

class ManifestoPage extends React.Component {
	render() {
		return <div className="Manifesto">
			<Title pageName="Fearless Exploration" />
			{/* Next.js warns about putting a stylesheet in <Head>,
			so I'll do something worse and put it in the body, to make it shut up.
			"Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="/manifesto.css"). Use Document instead.
			See more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component"
			*/}
			{/* <Head> */}
				<link rel="stylesheet" href="/manifesto.css"></link>
			{/* </Head> */}
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
					For now you can follow me on Twitter, <a href="https://twitter.com/isaiahodhner">@isaiahodhner</a>.
				</p>
			</div>
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
