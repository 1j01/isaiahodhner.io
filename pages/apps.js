// import React from "react";
import {apps} from "../projects";
import ProjectsListing from "../src/projects-listing";

function Apps() {
	// log_divisibles(Object.keys(apps).length, `Apps project tiles`, "(before tiles are spanned)");
	return <ProjectsListing projects={apps}/>;
}

export default Apps;
