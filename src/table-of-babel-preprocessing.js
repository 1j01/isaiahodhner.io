
export function parseCategories(relations, entryCategoryNames, rootName) {
	const root = { name: rootName, subcategories: {}, spanSize: -1 };
	const nodeByName = {};

	// Add categories from relations
	for (const relation of relations) {
		if (!(relation.super in nodeByName)) {
			nodeByName[relation.super] = { name: relation.super, subcategories: {}, spanSize: -1 };
		}
		nodeByName[relation.sub] = {
			name: relation.sub, subcategories: {}, spanSize: -1
		};
	}

	// Add categories from entries, that are not in the relations
	// These will be assumed to be top-level categories
	for (const categoryName of entryCategoryNames) {
		if (!(categoryName in nodeByName)) {
			nodeByName[categoryName] = { name: categoryName, subcategories: {}, spanSize: -1 };
		}
	}

	// Build graph (for cycle detection)
	// (AI generated code)
	const adjacencyList = {};
	for (const name in nodeByName) {
		adjacencyList[name] = [];
	}
	for (const relation of relations) {
		adjacencyList[relation.super].push(relation.sub);
	}

	// Cycle detection using DFS
	// (AI generated code)
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

	// Calculate table span sizes, recursively
	function calculateSpanSizes(node) {
		const subcategories = Object.values(node.subcategories);
		for (const subcategory of subcategories) {
			calculateSpanSizes(subcategory);
		}
		if (subcategories.length) {
			node.spanSize = subcategories.reduce((sum, sub) => sum + sub.spanSize, 0);
		} else {
			node.spanSize = 1;
		}
	}
	calculateSpanSizes(root);

	return root;
}
