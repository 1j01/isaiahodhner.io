import { apps } from "../src/projects";
import ProjectsListing from "../src/projects-listing";
import log_divisibles from "../src/log-divisibles";
import Title from "../src/title";
import React from "react";

function AppsPage() {
	log_divisibles(Object.keys(apps).length, `Apps project tiles`, "(before tiles are spanned)");
	return <>
		<Title pageName="Apps" />
		<ProjectsListing projects={apps} />
	</>;
}

export default AppsPage;
