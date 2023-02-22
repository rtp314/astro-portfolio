import { getCollection } from 'astro:content';

const projects = await getCollection('projects');

const codepenProjects = projects.filter(el => el.data.codepen);
const nonCodepenProjects = projects.filter(el => el.data.codepen !== true);

const sortedProjects = [...nonCodepenProjects, ...codepenProjects];

export default sortedProjects;
