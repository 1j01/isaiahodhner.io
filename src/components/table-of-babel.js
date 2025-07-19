// import { ArrowDownIcon, ArrowUpIcon, XIcon, FilterIcon, FilterRemoveIcon } from "@primer/octicons-react";
import * as React from "react";

class TableOfBabel extends React.Component {
	render() {
		return <div className="TableOfBabel">
			<div>
				Note: this is PLACEHOLDER content, generated with ChatGPT with the prompt "build an interdisciplinary reference chart, a table of structures/phenomena on one axis and fields of study/engineering (or media) on the other"
				and while some of the content may be meaningful, much of it may be nonsensical or inane.
				(I think "Networks / Graphs" makes more sense as as medium than as a phenomenon, for example, and that's just in the <i>structure</i> of the table.)
			</div>
			{/* TODO: extract table data into a separate file, marking everything as AI-generated with a contributor tag */}
			{/* TODO: dynamically build table from entries with a defined domain (field/medium) and pattern (structure/phenomenon), each of which could be hierarchical paths, or I guess IDs which could have external hierarchy relationships defined, or I guess maybe tags so an entry could show up multiple places */}
			<table>
				<thead>
					<tr>
						<th><strong>Structure / Phenomenon</strong></th>
						<th><strong>Physics</strong></th>
						<th><strong>Biology</strong></th>
						<th><strong>Computer Science</strong></th>
						<th><strong>Architecture</strong></th>
						<th><strong>Media/Art</strong></th>
						<th><strong>Sociology</strong></th>
						<th><strong>Psychology</strong></th>
						<th><strong>Mathematics</strong></th>
						<th><strong>Engineering</strong></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><strong>Waveforms / Oscillations</strong></td>
						<td>Quantum waves, EM spectrum</td>
						<td>Neural oscillations</td>
						<td>Signal processing</td>
						<td>Acoustics in design</td>
						<td>Sound design, rhythm</td>
						<td>Crowd dynamics</td>
						<td>Brain rhythms</td>
						<td>Fourier analysis</td>
						<td>Electrical, mechanical</td>
					</tr>
					<tr>
						<td><strong>Feedback Loops</strong></td>
						<td>Thermodynamic systems</td>
						<td>Homeostasis</td>
						<td>Control systems, AI</td>
						<td>Responsive environments</td>
						<td>Narrative recursion</td>
						<td>Social systems</td>
						<td>Behavioral conditioning</td>
						<td>Dynamical systems</td>
						<td>Systems, robotics</td>
					</tr>
					<tr>
						<td><strong>Networks / Graphs</strong></td>
						<td>Particle interactions</td>
						<td>Neural networks</td>
						<td>Graph theory, internet</td>
						<td>Circulation routes</td>
						<td>Network aesthetics</td>
						<td>Social networks</td>
						<td>Cognitive models</td>
						<td>Topology, combinatorics</td>
						<td>Information, civil</td>
					</tr>
					<tr>
						<td><strong>Fractals / Self-Similarity</strong></td>
						<td>Chaos theory</td>
						<td>Morphogenesis</td>
						<td>Recursive algorithms</td>
						<td>Parametric design</td>
						<td>Visual patterns</td>
						<td>Cultural memes</td>
						<td>Perceptual scaling</td>
						<td>Fractal geometry</td>
						<td>Signal compression</td>
					</tr>
					<tr>
						<td><strong>Resonance / Synchronization</strong></td>
						<td>Harmonic oscillators</td>
						<td>Circadian rhythms</td>
						<td>Clock synchronization</td>
						<td>Structural resonance</td>
						<td>Sound design</td>
						<td>Collective action</td>
						<td>Emotional entrainment</td>
						<td>Complex systems</td>
						<td>Mechanical, acoustical</td>
					</tr>
					<tr>
						<td><strong>Emergence</strong></td>
						<td>Phase transitions</td>
						<td>Swarm behavior</td>
						<td>Cellular automata</td>
						<td>Generative design</td>
						<td>Emergent narrative</td>
						<td>Group behavior</td>
						<td>Intuition, gestalt</td>
						<td>Complexity theory</td>
						<td>Adaptive systems</td>
					</tr>
					<tr>
						<td><strong>Entropy / Disorder</strong></td>
						<td>Thermodynamics</td>
						<td>Genetic drift</td>
						<td>Cryptography, data loss</td>
						<td>Material decay</td>
						<td>Abstract representation</td>
						<td>Social chaos</td>
						<td>Cognitive overload</td>
						<td>Information theory</td>
						<td>Thermodynamic systems</td>
					</tr>
					<tr>
						<td><strong>Tension / Compression</strong></td>
						<td>Forces, stress</td>
						<td>Musculoskeletal systems</td>
						<td>Data load balancing</td>
						<td>Structural loads</td>
						<td>Visual metaphor</td>
						<td>Social pressure</td>
						<td>Mental stress</td>
						<td>Vector mechanics</td>
						<td>Civil, mechanical</td>
					</tr>
					<tr>
						<td><strong>Flow / Fluidity</strong></td>
						<td>Fluid dynamics</td>
						<td>Blood flow</td>
						<td>Data streaming</td>
						<td>Airflow &amp; plumbing</td>
						<td>Cinematic motion</td>
						<td>Migration, mobility</td>
						<td>Stream of consciousness</td>
						<td>Navier-Stokes equations</td>
						<td>Chemical, aerospace</td>
					</tr>
					<tr>
						<td><strong>Boundary Conditions</strong></td>
						<td>Quantum barriers</td>
						<td>Skin, membranes</td>
						<td>Interface design</td>
						<td>Zoning, façade</td>
						<td>Framing in art</td>
						<td>Inclusion/exclusion</td>
						<td>Personal space</td>
						<td>Set theory</td>
						<td>Material sciences</td>
					</tr>
					<tr>
						<td><strong>Noise / Randomness</strong></td>
						<td>Brownian motion</td>
						<td>Genetic mutations</td>
						<td>Randomized algorithms</td>
						<td>Ambient soundscapes</td>
						<td>Glitch aesthetics</td>
						<td>Disruptive events</td>
						<td>Attention fluctuation</td>
						<td>Probability theory</td>
						<td>Communications, control</td>
					</tr>
					<tr>
						<td><strong>Phase Change / Transition</strong></td>
						<td>Solid-liquid-gas</td>
						<td>Metamorphosis</td>
						<td>Software versioning</td>
						<td>Material transitions</td>
						<td>Story arcs</td>
						<td>Social revolution</td>
						<td>Identity shifts</td>
						<td>State transitions</td>
						<td>Thermodynamics</td>
					</tr>
					<tr>
						<td><strong>Symmetry / Asymmetry</strong></td>
						<td>Particle physics</td>
						<td>Organism structure</td>
						<td>Symmetric encryption</td>
						<td>Aesthetic balance</td>
						<td>Composition rules</td>
						<td>Power relations</td>
						<td>Facial recognition</td>
						<td>Group theory</td>
						<td>Structural analysis</td>
					</tr>
				</tbody>
			</table>
		</div>;
	}
}

export default TableOfBabel;
