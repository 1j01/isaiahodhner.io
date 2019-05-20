// import React from "react";
import {games} from "../projects";
import ProjectsListing from "../src/projects-listing";

function GamesAndExperiments() {
	// log_divisibles(Object.keys(games).length, `Games and Experiments project tiles`, "(before tiles are spanned)");
	return <ProjectsListing projects={games}/>;
}

export default GamesAndExperiments;
