import Link from "next/link";

function HomePage() {
	return <div className="textual-page-content">
		<p>
			Hi, my name is <b>Isaiah Odhner</b>.
		</p>
		<p>
			I'm a programmer and designer,
			interested in <a href="https://progrium.com/wiki/Generativity/">generativity</a>{" "}
			(particularly with regards to technology, altho I'm not opposed to the more general concept),
			and making powerful creative tools
			(which I don't consider myself to have done yet; <a href="https://jspaint.app">jspaint</a> is pretty basic,
			as far as image editors go)
		</p>
		<p>
			This website is primarily a portfolio of many (but not all) of my projects.
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
			(I should put up a gallery sometime.)
		</p>
		<p>
			*uh, the <a href="https://soundcloud.com/isaiah-odhner">exception</a>{" "}
			that <a href="https://en.wikipedia.org/wiki/Exception_that_proves_the_rule">proves the rule</a>...
		</p>
	</div>;
}

export default HomePage;
