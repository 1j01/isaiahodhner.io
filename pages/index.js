import Link from "next/link";

function HomePage() {
	return <div className="textual-page-content">
		<img src="images/avatar.png" alt="Avatar" style={{ width: "300px", maxWidth: "80%", filter: "drop-shadow(0px 25px 100px #00a1ff)" }} />
		<h3 style={{ fontSize: "4em", fontWeight: "100", marginBottom: 0, textShadow: "0px 25px 70px #00a1ff" }}>
			Hi, I'm Isaiah
		</h3>
		<h4 style={{ fontSize: "2em", fontWeight: "100" }}>
			Programmer and pianist
		</h4>
		<h5 style={{ fontSize: "1rem", fontWeight: "normal" }}>
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
		<p>
			I'm most well known for <a href="https://jspaint.app/about">JS Paint</a>, a detailed recreation of Microsoft Paint as a web app, with extra features.
		</p>
		<p>
			I've also created a whole desktop environment around it, called <a href="https://98.js.org">98.js</a>, housing many other Windows 98 software remakes.
		</p>
		<p>
			I'm interested in accessibility for people who can't use a mouse, with projects like <a href="https://trackymouse.js.org/">Tracky Mouse</a>,
			which I've also integrated into JS Paint.
		</p>
		<p>
			{/* My dream is to empower artists by improving the backbone that software is built on */}
			My dream is to empower people by improving the very models that software is built upon, inventing based on the principle of
			{" "}<Link href="/fearless-exploration">Fearless Exploration</Link>.
		</p>
		{/* <p>
			For instance, people shouldn't have to lose their work if they accidentally close a tab, or if they undo and do anything other than redo.
			This implies auto-save and non-linear history, respectively, but we can go much further.
		</p>
		<p>
			<a href="https://mopaint.app">Mopaint</a> is a proof of concept of a program you can close and reopen, preserving not just the current state, but the history,
			and you can get back to any state even if you undo and do something else, because the history is non-linear.
			(JS Paint currently has non-linear history but doesn't auto-save the history.)
		</p> */}
	</div>;
}

export default HomePage;
