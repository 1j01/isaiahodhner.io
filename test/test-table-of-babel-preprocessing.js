import { expect } from 'chai';
import { parseCategories } from "../src/table-of-babel-preprocessing.js";

describe('parseCategories', () => {
	it('handles empty case', () => {
		const tree = parseCategories([], [], 'root');

		expect(tree).to.deep.equal({
			name: 'root',
			subcategories: {},
			spanSize: 1
		});
	});

	it('builds a simple hierarchy', () => {
		const relations = [
			{ super: 'A', sub: 'B' },
			{ super: 'A', sub: 'C' },
			{ super: 'B', sub: 'D' }
		];
		const tree = parseCategories(relations, [], 'root');

		// expect(tree.name).to.equal('root');
		// expect(tree.subcategories).to.have.property('A');
		// expect(tree.subcategories.A.subcategories).to.have.property('B');
		// expect(tree.subcategories.A.subcategories).to.have.property('C');
		// expect(tree.subcategories.A.subcategories.B.subcategories).to.have.property('D');

		// Span size checks
		// expect(tree.spanSize).to.equal(2);
		// expect(tree.subcategories.A.spanSize).to.equal(2);
		// expect(tree.subcategories.A.subcategories.B.spanSize).to.equal(1);
		// expect(tree.subcategories.A.subcategories.C.spanSize).to.equal(1);

		expect(tree).to.deep.equal({
			name: 'root',
			subcategories: {
				A: {
					name: 'A',
					subcategories: {
						B: {
							name: 'B',
							subcategories: {
								D: { name: 'D', subcategories: {}, spanSize: 1 }
							},
							spanSize: 1
						},
						C: { name: 'C', subcategories: {}, spanSize: 1 }
					},
					spanSize: 2
				}
			},
			spanSize: 2
		});
	});

	it('handles unordered relations', () => {
		const relations = [
			{ super: 'B', sub: 'C' },
			{ super: 'A', sub: 'B' }
		];
		const tree = parseCategories(relations, [], 'root');

		// expect(tree.subcategories.A.subcategories.B.subcategories).to.have.property('C');
		expect(tree).to.deep.equal({
			name: 'root',
			subcategories: {
				A: {
					name: 'A',
					subcategories: {
						B: {
							name: 'B',
							subcategories: {
								C: { name: 'C', subcategories: {}, spanSize: 1 }
							},
							spanSize: 1
						}
					},
					spanSize: 1
				}
			},
			spanSize: 1
		});
	});

	it('adds top-level categories with no relations', () => {
		const relations = [];
		const entryCategoryNames = ['X', 'Y', 'Z'];
		const tree = parseCategories(relations, entryCategoryNames, 'root');

		expect(tree.subcategories).to.have.keys(['X', 'Y', 'Z']);
		expect(tree.subcategories.X.subcategories).to.deep.equal({});
	});

	it('adds only missing top-level categories with no relations', () => {
		const relations = [
			{ super: 'X', sub: 'Y' },
		];
		const entryCategoryNames = ['X', 'Y', 'Z'];
		const tree = parseCategories(relations, entryCategoryNames, 'root');

		expect(tree.subcategories).to.have.keys(['X', 'Z']);
	});

	it('throws on duplicate relations', () => {
		const relations = [
			{ super: 'A', sub: 'B' },
			{ super: 'A', sub: 'B' }
		];
		const entryCategoryNames = ['A', 'B'];

		expect(() => parseCategories(relations, entryCategoryNames, 'root')).to.throw('duplicate');
	});

	it('throws on circular relations', () => {
		const relations = [
			{ super: 'A', sub: 'B' },
			{ super: 'B', sub: 'A' }
		];
		const entryCategoryNames = ['A', 'B'];

		expect(() => parseCategories(relations, entryCategoryNames, 'root')).to.throw('circular dependency detected: A -> B -> A');
	});
});
