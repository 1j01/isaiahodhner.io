import React from "react";
import Title from "../src/title";
import TableOfBabel from "../src/components/table-of-babel";
import TableOfBabelTagline from "../src/components/table-of-babel-tagline";

class TableOfBabelPage extends React.Component {
	render() {
		return <div className="TableOfBabelPage">
			<Title pageName="Table of Babel" />
			<style>{`
				.TableOfBabel {
					padding: 1rem;
					overflow: auto;
				}
				.TableOfBabel th {
					font-weight: bold;
					background:rgb(182, 217, 240);
					border-color: #999 !important;
					/*background: #0083A5;
					color: #fff;
					font-size: 1.1rem;
					border-color: #fff !important;*/
				}
				.TableOfBabel td,
				.TableOfBabel th {
					text-align: center;
					vertical-align: center;
					border: 1px solid #ccc;
					min-width: 100px;
					height: 50px;
				}
				.TableOfBabel td:empty {
					background: #ffffff42;
					border: 1px dashed #c8c7c7;
				}
				.TableOfBabel table {
					border-collapse: collapse;
				}
				.TableOfBabelPage > h2 {
					text-align: center;
					margin: 1rem 0;
					font-size: 2rem;
				}
				.TableOfBabelTagline {
					margin: 1rem 0;
					text-align: center;
					font-size: 1.2rem;
				}
				.TableOfBabelEntry:not(:last-child) {
					border-bottom: 1px solid #ccc;
				}
				.TableOfBabelPage .references {
					font-size: 0.8rem;
				}
				.TableOfBabelPage .flavor {
					font-size: 0.8rem;
					color: #666;
					font-style: italic;
				}
				.TableOfBabelPage .image {
					max-width: 100%;
				}
				.TableOfBabelPage .ai-generated {
					color: #888;
				}
			`}</style>
			<h2>Table of Babel</h2>
			<div className="tob-header">
				<TableOfBabelTagline />
				{/* <p>
					TODO: persistent, non-randomized, down-to-earth description of the table/project
				</p> */}
			</div>
			<TableOfBabel />
			<div className="textual-page-content" style={{ textAlign: "left" }}>
				<p>
					The columns are domains (fields of study or types of media), and the rows are patterns (structures or phenomena).
				</p>
				<p>
					At the intersection of each domain and pattern are examples of instances (applications or expressions) of that pattern in that domain.
				</p>
				<p>
					Principles:
				</p>
				<ul>
					<li><b>Density.</b> We want a dense grid. Adding more categories will inevitably make it sparser, even if it's more complete, but we can mitigate this by dynamically collapsing categories and spanning rows/columns. (If we're going to span rows or columns because there aren't any instances in adjacent subdomains, a nice visual cue could be to curve the borders toward the smaller row/column that it would otherwise occupy. Maybe label the category that it comes from, aligned with the label in the row/column heading, and have the borders curve off from that.)</li>
					<li>We want to <b>avoid redundancy.</b> If an expression applies to multiple intersections, it could either be duplicated, reference the other cell(s) with a little link, span the cells if they happen to be adjacent, or show a unique example if there are multiple to choose from, or some combination of those techniques. And we can try to curate the best examples for each intersection.</li>
					<li><b>Building connections.</b> We want people to form clear connections across domains, and to that end it would be great if we can design custom graphics that <i>match</i> each other as much as possible (with shared colors or layout, for instance). Ideally we could even have interactive graphics where you can hover over part of a graphic and it would highlight related aspects of other graphics. More basically though, it's important that, where possible, the instances use a meaningfully shared interpretation of the pattern. Categories like "Boundary Conditions" might be too broad and invite disparate interpretations. But even if the category name sounds broad, if we can curate a coherent set of examples it's all good. Although especially to support collaborators, we might want to maintain descriptions of the categories, with notes on what should be shared between examples.</li>
					<li><b>Collaboration.</b> Wiki-style editing would be great. Currently the data is stored in a <a href="https://github.com/1j01/isaiahodhner.io/blob/master/src/table-of-babel-data.tsx">TSX file</a> (Typescript with JSX), and you can <a href="https://github.com/1j01/isaiahodhner.io/fork">fork my website</a> and submit a pull request to add or edit entries.</li>
					<li><b>Inspiration. Accessibility. Flexibility.</b> It should be easy to browse and find new ideas. It should be something you can hang on your wall.</li>
					<li><b>Academic rigor.</b> We should try to include citations for everything, and avoid parroting theories as fact.</li>
				</ul>
				<p>
					This project was inspired by Braess' Paradox's implications across disparate domains.
					I think there are many more interdisciplinary connections to be made, and what-if questions to ask.
					For example, what if we could apply the concept of Braess' Paradox to fluid dynamics? Well it sounds like someone may be working on that with an inflatable bladder or something.
				</p>
				<p>
					By mapping this out, we can see not only what surprising things have been explored, but also what hasn't been explored yet,
					where advancements may be able to be made.
				</p>
			</div>
		</div>;
	}
}

export default TableOfBabelPage;
