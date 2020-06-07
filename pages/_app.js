import Octicon, {MarkGithub} from "@githubprimer/octicons-react";
import App from 'next/app';
import Link from "next/link";
import Title from "../src/title";
import React from "react";

const twitter_icon = (<svg className="icon icon-twitter" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M68.812 15.14a26.189 26.189 0 0 1-7.52 2.06 13.125 13.125 0 0 0 5.757-7.243 26.133 26.133 0 0 1-8.314 3.176A13.066 13.066 0 0 0 49.182 9c-7.23 0-13.092 5.86-13.092 13.093 0 1.026.118 2.02.338 2.98C25.543 24.527 15.9 19.318 9.44 11.396a13.057 13.057 0 0 0-1.77 6.58c0 4.543 2.312 8.552 5.824 10.9a13.05 13.05 0 0 1-5.93-1.64c-.002.056-.002.11-.002.163 0 6.345 4.513 11.638 10.504 12.84-1.1.298-2.256.457-3.45.457-.845 0-1.666-.078-2.464-.23 1.667 5.2 6.5 8.985 12.23 9.09a26.29 26.29 0 0 1-16.26 5.605c-1.055 0-2.096-.06-3.122-.184a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.25-19.95 37.25-37.25 0-.565-.013-1.133-.038-1.693a26.61 26.61 0 0 0 6.532-6.774z"/></svg>);
const email_icon = (<svg className="icon icon-email" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.211 485.211"><path d="M485.211 363.906c0 10.637-2.992 20.498-7.785 29.174L324.225 221.67l151.54-132.584c5.895 9.355 9.446 20.344 9.446 32.219v242.601zM242.606 252.793l210.863-184.5c-8.653-4.737-18.397-7.642-28.908-7.642H60.651c-10.524 0-20.271 2.905-28.889 7.642l210.844 184.5zm58.787-11.162l-48.809 42.734a15.145 15.145 0 0 1-9.978 3.729c-3.57 0-7.125-1.242-9.98-3.729l-48.82-42.736L28.667 415.23c9.299 5.834 20.197 9.329 31.983 9.329h363.911c11.784 0 22.687-3.495 31.983-9.329L301.393 241.631zM9.448 89.085C3.554 98.44 0 109.429 0 121.305v242.602c0 10.637 2.978 20.498 7.789 29.174l153.183-171.44L9.448 89.085z"/></svg>);

class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;
		const title = null; // (TODO)
		// const is_front_page = !title;
		const is_mission_page = title === "Make Making Better";
		const show_mission_big = false; // is_front_page;

		return <>
			<Title/>
			<header className="page-header">
				<h1><Link href="/"><a>Isaiah Odhner</a></Link></h1>
				{is_mission_page ? null :
					<nav>
						<h2 className={`mission${show_mission_big ? " big" : ""}`}>
							what’s the big ideal?

							{/*<Link href="/make-making-better"><a>*/}
							{/*	<span className="word">MAKE</span>*/}
							{/*	<strong className="word">MAKING</strong>*/}
							{/*	<span className="word">BETTER</span>*/}
							{/*	<div className="subtitle link-indicator">A manifesto (to come)</div>*/}
							{/*</a></Link>*/}

						</h2>
						<a href="mailto:isaiahodhner@gmail.com">{email_icon}Email</a>{" "}
						<a href="https://twitter.com/isaiahodhner">{twitter_icon}Twitter</a>
						<br/><br/>
						<Link href="/apps"><a>Web Apps</a></Link>{" "}
						<Link href="/games"><a>Games & Experiments</a></Link>
						<br/><br/>
						<a href="https://github.com/1j01"><Octicon icon={MarkGithub}/>More on GitHub</a>
					</nav>
				}
			</header>
			<main className="page-main">
				<Component {...pageProps}/>
			</main>
			<footer className="page-footer">
				<p>
					This website's source code is <a href="https://github.com/1j01/isaiahodhner.io">on GitHub</a>.
					Feel free to <a href="https://github.com/1j01/isaiahodhner.io/issues/new">open any
					issues</a> there, or just <a href="mailto:isaiahodhner@gmail.com">send me an email</a>
				</p>
				<p>
					Icons from
					{" "}<a href="https://octicons.github.com/">Octicons</a>,
					{" "}<a href="https://opensource.org/licenses/MIT">MIT-licensed</a>, and
					{" "}<a href="https://www.flaticon.com/authors/simpleicon" title="SimpleIcon">SimpleIcon</a>,
					{" "}<a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a>
				</p>
			</footer>
		</>;
	}
}

export default MyApp;