// import { ArrowDownIcon, ArrowUpIcon, XIcon, FilterIcon, FilterRemoveIcon } from "@primer/octicons-react";
import * as React from "react";

/**
 * Entries with a defined domain (field/medium) and pattern (structure/phenomenon)
 * @TODO: both domain and pattern could be hierarchical paths, or I guess IDs which could have external hierarchy relationships defined,
 * or I guess maybe tags (lists of IDs) so an entry could show up multiple places.
 */
import data from "../table-of-babel-data.json";

/**
 * An expression of some structure/phenomenon/pattern in some field/medium/domain.
 * There may be multiple of these entries per cell in the table, if there are multiple examples.
 */
class TableOfBabelEntry extends React.Component {
	render() {
		const isAI = this.props.contributor === "AI";
		const className = "TableOfBabelEntry" + (isAI ? " ai-generated" : "");
		return <div className={className} title={isAI ? "This is an AI-generated suggestion. It may be inane, irrelevant, or incorrect." : ""}>
			{/* TODO: optional image */}
			<h3>{this.props.title}</h3>
			<p>{this.props.description}</p>
		</div>;
	}
}

class TableOfBabel extends React.Component {
	render() {
		const domains = [];
		const patterns = [];
		for (const entry of data.entries) {
			if (!domains.includes(entry.domain)) {
				domains.push(entry.domain);
			}
			if (!patterns.includes(entry.pattern)) {
				patterns.push(entry.pattern);
			}
		}
		return <div className="TableOfBabel">
			<div style={{ background: "#eee", color: "#444", padding: "0.5rem", borderRadius: "8px", marginBottom: "1rem" }}>
				⚠️
				Note: this is PLACEHOLDER content, generated with ChatGPT with the prompt "build an interdisciplinary reference chart, a table of structures/phenomena on one axis and fields of study/engineering (or media) on the other"
				followed by the prompt "Every cell should be a full sentence description of a concrete example" for the descriptions.
				While some of the content may be meaningful, much of it may be nonsensical or inane.
				(I think "Networks / Graphs" makes more sense as as medium than as a phenomenon, for example, and that's just in the <i>structure</i> of the table.)
			</div>
			
			<table>
				<thead>
					<tr>
						{/* TODO: try diagonal split to describe both rows and columns? using arrows for now */}
						{/* <th>→ Domain (Field / Medium)<br/>↓ Pattern (Structure / Phenomenon)</th> */}
						<th key="row-column-label">→ Domain<br/>↓ Pattern</th>
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
