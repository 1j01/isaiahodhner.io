import type { TOBCategoryNode, TOBCategoryRelation } from "./table-of-babel-types";

/**
 * For sanity, detect cycles in the category relations.
 * Throws an error if a cycle is detected.
 */
function detectCycles(relations: TOBCategoryRelation[], nodeByName: Record<string, TOBCategoryNode>) {
	// (AI generated code)

	// Build graph (for cycle detection)
	const adjacencyList = {};
	for (const name in nodeByName) {
		adjacencyList[name] = [];
	}
	for (const relation of relations) {
		adjacencyList[relation.super].push(relation.sub);
	}

	// Cycle detection using DFS
	const visited = new Set();
	const stack = new Set();

	function dfs(node) {
		if (stack.has(node)) {
			throw new Error(`circular dependency detected: ${Array.from(stack).join(' -> ')} -> ${node}`);
		}
		if (visited.has(node)) return;

		stack.add(node);
		for (const neighbor of adjacencyList[node]) {
			dfs(neighbor);
		}
		stack.delete(node);
		visited.add(node);
	}

	for (const node in adjacencyList) {
		if (!visited.has(node)) {
			dfs(node);
		}
	}
}

/**
 * Calculate structural information needed for table display.
 */
function calculateStructuralProperties(node: TOBCategoryNode) {
	const subcategories = Object.values(node.subcategories);
	for (const subcategory of subcategories) {
		calculateStructuralProperties(subcategory);
	}
	if (subcategories.length) {
		node.spanSize = subcategories.reduce((sum, sub) => sum + sub.spanSize, 0);
		node.subLayers = Math.max(...subcategories.map(sub => sub.subLayers)) + 1;
	} else {
		node.spanSize = 1;
		node.subLayers = 0;
	}
}

/**
 * Calculate a category tree from the relations and entry category names.
 */
export function parseCategories(relations: TOBCategoryRelation[], entryCategoryNames: string[], rootName: string) {
	const root: TOBCategoryNode = { name: rootName, subcategories: {}, spanSize: -1, subLayers: -1 };
	const nodeByName: Record<string, TOBCategoryNode> = {};

	// Add categories from relations
	for (const relation of relations) {
		if (!(relation.super in nodeByName)) {
			nodeByName[relation.super] = { name: relation.super, subcategories: {}, spanSize: -1, subLayers: -1 };
		}
		nodeByName[relation.sub] = { name: relation.sub, subcategories: {}, spanSize: -1, subLayers: -1 };
	}

	// Add categories from entries, that are not in the relations
	// These will be assumed to be top-level categories
	for (const categoryName of entryCategoryNames) {
		if (!(categoryName in nodeByName)) {
			nodeByName[categoryName] = { name: categoryName, subcategories: {}, spanSize: -1, subLayers: -1 };
		}
	}

	detectCycles(relations, nodeByName);

	// Build the tree structure
	const nonTopLevel = new Set();
	for (const relation of relations) {
		if (relation.super in nodeByName && relation.sub in nodeByName) {
			if (nodeByName[relation.super].subcategories[relation.sub]) {
				throw new Error("duplicate hierarchy relationship: " + JSON.stringify(relation));
			}
			nodeByName[relation.super].subcategories[relation.sub] = nodeByName[relation.sub];
			nonTopLevel.add(relation.sub);
		}
	}
	for (const categoryName in nodeByName) {
		if (!nonTopLevel.has(categoryName)) {
			root.subcategories[categoryName] = nodeByName[categoryName];
		}
	}

	calculateStructuralProperties(root);

	return root;
}
