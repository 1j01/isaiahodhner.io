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
				.TableOfBabel .table-row-label,
				.TableOfBabel th {
					font-weight: bold;
				}
				.TableOfBabel td,
				.TableOfBabel th {
					text-align: center;
					vertical-align: center;
					border: 1px solid #ccc;
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
				<TableOfBabelTagline/>
				{/* <p>
					TODO: persistent, non-randomized, down-to-earth description of the table/project
				</p> */}
			</div>
			<TableOfBabel/>
		</div>;
	}
}

export default TableOfBabelPage;
