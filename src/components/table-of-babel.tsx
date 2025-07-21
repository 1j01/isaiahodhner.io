// import { ArrowDownIcon, ArrowUpIcon, XIcon, FilterIcon, FilterRemoveIcon } from "@primer/octicons-react";
import * as React from "react";

import data from "../table-of-babel-data";
import type { TOBEntry } from "../table-of-babel-types";
// import { parseCategories } from "../table-of-babel-preprocessing";

// const domains = parseCategories(data.domainCategoryRelations, data.entries.map(entry => entry.domain), "Domains (Types of Media / Fields of Study)");
// const patterns = parseCategories(data.patternCategoryRelations, data.entries.map(entry => entry.pattern), "Patterns (Structures / Phenomena)");

// console.log({ domains, patterns });

/**
 * An expression of some structure/phenomenon/pattern in some field/medium/domain.
 * There may be multiple of these entries per cell in the table, if there are multiple examples.
 */
class TableOfBabelEntry extends React.Component<TOBEntry> {
	render() {
		const entry = this.props;
		const isAI = entry.contributor === "AI";
		const className = "TableOfBabelEntry" + (isAI ? " ai-generated" : "");
		return <div className={className} title={isAI ? "This is an AI-generated suggestion. It may be inane, irrelevant, or incorrect." : ""}>
			{entry.image && <img className="image" src={entry.image} alt="" />}
			<h3>{entry.title}</h3>
			<p>{entry.description}</p>
			{entry.link && <p className="references"><a href={entry.link} target="_blank" rel="noopener noreferrer">Reference</a></p>}
			{entry.flavor && <p className="flavor">{entry.flavor}</p>}
		</div>;
	}
}

// const entryKey = ({ pattern, domain }) => `${pattern} in ${domain}`;
// const coordKey = (x, y) => `${x},${y}`;



class TableOfBabel extends React.Component {
	render() {
		const domains: string[] = [];
		const patterns: string[] = [];
		for (const entry of data.entries) {
			if (!domains.includes(entry.domain)) {
				domains.push(entry.domain);
			}
			if (!patterns.includes(entry.pattern)) {
				patterns.push(entry.pattern);
			}
		}
		// const grid = [];
		return <div className="TableOfBabel">
			<div style={{ background: "#eee", color: "#444", padding: "0.5rem", borderRadius: "8px", marginBottom: "1rem" }}>
				⚠️
				Note: this is mainly PLACEHOLDER content, generated with ChatGPT with the prompt "build an interdisciplinary reference chart, a table of structures/phenomena on one axis and fields of study/engineering (or media) on the other"
				followed by the prompt "Every cell should be a full sentence description of a concrete example" for the descriptions.
				While some of the content may be meaningful, much of it may be nonsensical or inane.
				(I think "Networks / Graphs" makes more sense as as medium than as a phenomenon, for example, and that's just in the <i>structure</i> of the table.)
			</div>

			<table>
				<thead>
					<tr>
						{/* TODO: try diagonal split to describe both rows and columns? using arrows for now */}
						{/* <th>→ Domain (Field / Medium)<br/>↓ Pattern (Structure / Phenomenon)</th> */}
						<th key="row-column-label">→ Domain<br />↓ Pattern</th>
						{domains.map((domain, i) => <th key={domain}>{domain}</th>)}
					</tr>
				</thead>
				<tbody>
					{/* TODO: vet this AI-generated code, it looks really inefficient */}
					{patterns.map((pattern, i) => (
						<tr key={pattern}>
							<td key="row-label" className="table-row-label"><strong>{pattern}</strong></td>
							{domains.map((domain, j) => (
								<td key={domain}>
									{data.entries
										.filter(entry => entry.pattern === pattern && entry.domain === domain)
										.map(entry => (
											<TableOfBabelEntry key={entry.title} {...entry} />
										))}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>;
	}
}

export default TableOfBabel;
