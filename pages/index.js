import Link from "next/link";

function HomePage() {
	return <div className="textual-page-content">
		<h3 style={{ fontSize: "4em", fontWeight: "100", marginBottom: 0 }}>
			Hi, I'm Isaiah
		</h3>
		<h4 style={{ fontSize: "2em", fontWeight: "100"}}>
			Programmer and pianist
		</h4>
		<h5 style={{ fontSize: "1rem", fontWeight: "normal", position: "relative", left: 89, top: -20 }}>
			(Music not shared yet)
		</h5>
		{/* <p>In short, I press keys all day.</p> */}
		{/*
		<p>
			I'm a programmer and designer,
			interested in <a href="https://progrium.com/wiki/Generativity/">generativity</a>{" "},
			and making powerful creative tools
			(which I don't consider myself to have done yet to be clear; <a href="https://jspaint.app">jspaint</a> is pretty basic,
			as far as image editors go)
		</p>
		<p>
			This website is primarily a portfolio of some of my projects.
		</p>
		<p>
			I've made several <Link href="/apps"><a>web apps</a></Link>, as well as{" "}
			<Link href="/games"><a>games and experiments</a></Link>, and some
			libraries and such, which you can find <a href='https://github.com/1j01'>on GitHub</a>.
		</p>
		<p>
			I like making music, so several of my projects are geared towards that.
			I don't have any of my music shared online,* but I'd like to at some point.
			I'd like to live-stream some piano (programming too!), maybe join a band...
		</p>
		<p>
			I like making procedural art sometimes, such as <Link href="/patterns"><a>these patterns</a></Link>.
			(I should put up a gallery sometime (other than that one).)
		</p>
		<p>
			*uh, the <a href="https://soundcloud.com/isaiah-odhner">exception</a>{" "}
			that <a href="https://en.wikipedia.org/wiki/Exception_that_proves_the_rule">proves the rule</a>...
		</p>
		*/}
	</div>;
}

export default HomePage;
