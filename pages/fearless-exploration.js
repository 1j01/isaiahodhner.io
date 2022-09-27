import React from "react";
import Title from "../src/title";

class ManifestoPage extends React.Component {
	render() {
		return <div className="Manifesto">
			<Title pageName="Fearless Exploration" />
			<style>{`
				.hide-on-manifesto-page {
					display: none;
				}
				.Manifesto {
					display: flex;
					height: 100%;
				}
				iframe {
					flex: 1;
					border: 0;
				}
			`}</style>
			<iframe src="manifesto.html"></iframe>
		</div>;
	}
}

export default ManifestoPage;
