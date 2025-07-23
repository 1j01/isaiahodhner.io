import { ReactElement } from "react";
import type { TOBCategoryRelation } from "./table-of-babel-data";

/**
 * Expresses a hierarchical relationship.
 */
export interface TOBCategoryRelation {
	sub: string;
	super: string;
}

/**
 * Pointless structure that could just be multiple module exports.
 * Holdover from storing data in a JSON file.
 */
export interface TOBData {
	patternCategoryRelations: TOBCategoryRelation[];
	domainCategoryRelations: TOBCategoryRelation[];
	entries: TOBEntry[];
}


/**
 * An entry with a defined domain (field/medium) and pattern (structure/phenomenon)
 * 
 * @TODO both domain and pattern could be hierarchical paths,
 * or I guess IDs which could have external hierarchy relationships defined,
 * or I guess maybe tags (lists of IDs) so an entry could show up multiple places...
 */
export interface TOBEntry {
	pattern: string;
	domain: string;
	title: string;
	description: string | ReactElement;
	flavor?: string | ReactElement;
	editorNote?: string;
	link?: string;
	image?: string | ReactElement;
	contributor: string;
}

/**
 * A node in the category tree.
 */
export interface TOBCategoryNode {
	name: string;
	/** Child nodes, keyed by name. */
	subcategories: Record<string, TOBCategoryNode>;
	/** The number of rows or columns this category spans in the table. Formally, this is the leaf node count of the subtree including this node. */
	spanSize: number;
	/** The number of layers of subcategories beneath this node. The formal term is "vertex height", but here it should be axis agnostic for clarity. */
	subLayers: number;
}

export interface TOBCellRect {
	x: number;
	y: number;
	width: number;
	height: number;
	text: ReactElement | string;
	headerScope?: "row" | "col";
}
