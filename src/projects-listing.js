import Octicon, {Repo} from "@githubprimer/octicons-react";
import * as React from "react";

class ProjectsListing extends React.Component {
	render() {
		return <div className="tiles-container">{
			this.props.projects.map((project) => {
				let sizes;
				const image_url = project.image_url || `static/images/projects/${project.repo_name}.png`;
				const repo_url = project.repo_url || `https://github.com/1j01/${project.repo_name}`;
				const gh_pages_url = `https://1j01.github.io/${project.repo_name}/`;
				const url =
					project.url === 'repo'
						? repo_url
						: project.url || gh_pages_url;

				const bg = project.bg != null ? project.bg : "normal";
				if (project.image_url) {
					sizes = ["1x1"];
				} else {
					// TODO: get tile sizes working
					// if (typeof window === 'undefined') {
					// 	const fs = require("fs");
					// 	if (fs.existsSync(`images/projects/${project.repo_name}.png`)) { sizes = ["1x1"]; }
					// 	for (let img_path of glob.sync(`images/projects/${project.repo_name}-*.png`)) {
					// 		const m = img_path.match(/-(\d+x\d+)\./);
					// 		if (m) { sizes.push(m[1]); }
					// 	}
					// } else {
					sizes = ["1x1"];
					// }
				}

				return <article
					key={project.repo_name}
					itemScope
					itemType="http://schema.org/WebPage"
					data-bg={bg}
					data-sizes={sizes}
				>
					<a href={url} itemProp="url">
						<img itemProp="image" width="256" height="256" src={image_url}/>
					</a>
					<header itemProp="name">
						<a href={repo_url} className="repo" title="View repository on GitHub"><Octicon icon={Repo}/></a>
						<span>{project.title}</span>
					</header>
					<footer itemProp="description">{project.description}</footer>
				</article>;
			})
		}</div>;
	}
}

export default ProjectsListing;
