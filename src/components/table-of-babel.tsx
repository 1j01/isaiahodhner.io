// import { ArrowDownIcon, ArrowUpIcon, XIcon, FilterIcon, FilterRemoveIcon } from "@primer/octicons-react";
import * as React from "react";

import data from "../table-of-babel-data";
import type { TOBCategoryNode, TOBCellRect, TOBEntry } from "../table-of-babel-types";
import { parseCategories } from "../table-of-babel-preprocessing";

const domains = parseCategories(data.domainCategoryRelations, data.entries.map(entry => entry.domain), "Domains (Types of Media / Fields of Study)");
const patterns = parseCategories(data.patternCategoryRelations, data.entries.map(entry => entry.pattern), "Patterns (Structures / Phenomena)");

console.log({ domains, patterns });

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
const coordKey = (x, y) => `${x},${y}`;

function overlaps(a: TOBCellRect, b: TOBCellRect): boolean {
	return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function rectsEqual(a: TOBCellRect, b: TOBCellRect): boolean {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

function createCategoryLabels(category: TOBCategoryNode, x: number, y: number, totalLayers: number, flipAxes = false, cellRects: TOBCellRect[], cellRectsByCategory: Record<string, TOBCellRect> = {}) {
	const spanSize = category.spanSize;
	const subLayers = category.subLayers;

	if (spanSize < 1 || subLayers < 0) {
		throw new Error(`Category ${category.name} has invalid spanSize ${spanSize} or subLayers ${subLayers}`);
	}

	let cellRect: TOBCellRect = {
		x,
		y,
		width: spanSize,
		height: Object.keys(category.subcategories).length ? 1 : totalLayers - y,
		text: category.name
	};
	if (flipAxes) {
		[cellRect.x, cellRect.y] = [cellRect.y, cellRect.x];
		[cellRect.width, cellRect.height] = [cellRect.height, cellRect.width];
	}
	cellRects.push(cellRect);
	cellRectsByCategory[category.name] = cellRect;

	let nextX = x;
	for (const subcategory of Object.values(category.subcategories)) {
		createCategoryLabels(subcategory, nextX, y + 1, totalLayers, flipAxes, cellRects, cellRectsByCategory);
		nextX += subcategory.spanSize;
	}
}

class TableOfBabel extends React.Component {
	render() {
		const cellRects: TOBCellRect[] = [];
		const cellRectsByCategory: Record<string, TOBCellRect> = {};
		cellRects.push({
			x: 0,
			y: 0,
			width: patterns.subLayers + 1,
			height: domains.subLayers + 1,
			text: "GO SIT IN THE CORNER",
		});
		createCategoryLabels(domains, patterns.subLayers + 1, 0, domains.subLayers + 1, false, cellRects, cellRectsByCategory);
		createCategoryLabels(patterns, domains.subLayers + 1, 0, patterns.subLayers + 1, true, cellRects, cellRectsByCategory);

		for (const entry of data.entries) {
			const domainRect = cellRectsByCategory[entry.domain];
			const patternRect = cellRectsByCategory[entry.pattern];
			if (!domainRect || !patternRect) {
				throw new Error(`No cell rectangle found for entry with domain "${entry.domain}" and pattern "${entry.pattern}"`);
			}
			const cellRect: TOBCellRect = {
				x: domainRect.x,
				y: patternRect.y,
				width: domainRect.width,
				height: patternRect.height,
				// text: entry.title,
				text: <TableOfBabelEntry {...entry} />
			};
			// TODO: I might need to create "Other" categories before I can coherently layout the entries,
			// if there are any entries categorized directly under a super-category for which there are also entries for subcategories
			const overlappingCell = cellRects.find(rect => overlaps(rect, cellRect));
			if (overlappingCell) {
				if (rectsEqual(overlappingCell, cellRect)) {
					overlappingCell.text = (<>
						{overlappingCell.text}
						{cellRect.text}
					</>);
				} else {
					throw new Error(`Cell rectangle for entry overlaps with existing cell rectangle. Existing: ${JSON.stringify(overlappingCell)} vs New: ${JSON.stringify(cellRect)}`);
				}
			} else {
				cellRects.push(cellRect);
			}
		}

		const grid = new Map<string, TOBCellRect>();
		let gridWidth = 0;
		let gridHeight = 0;
		for (const rect of cellRects) {
			for (let y = rect.y; y < rect.y + rect.height; y++) {
				for (let x = rect.x; x < rect.x + rect.width; x++) {
					if (grid.has(coordKey(x, y))) {
						throw new Error(`Grid at (${x}, ${y}) has overlapping cell rectangle definitions: ${JSON.stringify(grid.get(coordKey(x, y)))} and ${JSON.stringify(rect)}`);
					}
					grid.set(coordKey(x, y), rect);
					gridWidth = Math.max(gridWidth, x + 1);
					gridHeight = Math.max(gridHeight, y + 1);
				}
			}
		}

		// Note: numerical keys aren't great for rerendering
		// TODO: semantically, should use th for headers, with scope="col" and scope="row"
		const trs: React.ReactElement[] = [];
		for (let y = 0; y < gridHeight; y++) {
			const tds: React.ReactElement[] = [];
			for (let x = 0; x < gridWidth; x++) {
				const key = coordKey(x, y);
				const cellRect = grid.get(key);
				if (!cellRect) {
					// throw new Error(`No cell rectangle defined for grid coordinate (${x}, ${y})`);
					tds.push(<td key={key} ></td>);
					continue;
				}
				if (cellRect.x !== x || cellRect.y !== y) {
					// Skip spanned cells
					continue;
				}
				tds.push(<td key={key} rowSpan={cellRect.height} colSpan={cellRect.width}>
					{cellRect.text}
				</td>);
			}
			trs.push(<tr key={y}>{tds}</tr>);
		}

		return <div className="TableOfBabel">
			<div style={{ background: "#eee", color: "#444", padding: "0.5rem", borderRadius: "8px", marginBottom: "1rem" }}>
				⚠️
				Note: this is mainly PLACEHOLDER content, generated with ChatGPT with the prompt "build an interdisciplinary reference chart, a table of structures/phenomena on one axis and fields of study/engineering (or media) on the other"
				followed by the prompt "Every cell should be a full sentence description of a concrete example" for the descriptions.
				While some of the content may be meaningful, much of it may be nonsensical or inane.
				(I think "Networks / Graphs" makes more sense as as medium than as a phenomenon, for example, and that's just in the <i>structure</i> of the table.)
			</div>

			<table>
				<tbody>
					{trs}
				</tbody>
			</table>
		</div>;
	}
}

export default TableOfBabel;
