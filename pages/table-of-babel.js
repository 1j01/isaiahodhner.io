import React from "react";
import Title from "../src/title";
import TableOfBabel from "../src/components/table-of-babel";
import TableOfBabelTagline from "../src/components/table-of-babel-tagline";

class TableOfBabelPage extends React.Component {
	render() {
		return <div className="TableOfBabelPage">
			<Title pageName="Table of Babel" />
			{/* <style>{`
			`}</style> */}
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
