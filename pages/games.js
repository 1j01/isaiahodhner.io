import {apps, games} from "../src/projects";
import ProjectsListing from "../src/projects-listing";
import log_divisibles from "../src/log-divisibles";
import Title from "../src/title";

function GamesAndExperimentsPage() {
	log_divisibles(Object.keys(games).length, `Games and Experiments project tiles`, "(before tiles are spanned)");
	return <>
		<Title pageName="Games and Experiments"/>
		<ProjectsListing projects={games}/>
	</>;
}

export default GamesAndExperimentsPage;
