import {apps} from "../projects";
import ProjectsListing from "../src/projects-listing";
import log_divisibles from "../src/log-divisibles";

function Apps() {
	log_divisibles(Object.keys(apps).length, `Apps project tiles`, "(before tiles are spanned)");
	return <ProjectsListing projects={apps}/>;
}

export default Apps;
