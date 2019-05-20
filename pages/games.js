import {apps, games} from "../projects";
import ProjectsListing from "../src/projects-listing";
import log_divisibles from "../src/log-divisibles";
import Title from "../src/title";

function GamesAndExperiments() {
	log_divisibles(Object.keys(games).length, `Games and Experiments project tiles`, "(before tiles are spanned)");
	return <>
		<Title pageName="Games and Experiments"/>
		<ProjectsListing projects={games}/>
	</>;
}

export default GamesAndExperiments;
