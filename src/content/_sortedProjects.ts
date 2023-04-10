import { CollectionEntry, getCollection } from 'astro:content';

const projects = await getCollection('projects');

const codepenProjects: CollectionEntry<'projects'>[] = [];
const numberedProjects: CollectionEntry<'projects'>[] = [];
const otherProjects: CollectionEntry<'projects'>[] = [];

projects.forEach(project => {
  if (project.data.codepen) {
    codepenProjects.push(project);
  } else if (project.data.order) {
    numberedProjects.push(project);
  } else {
    otherProjects.push(project);
  }
});

numberedProjects.sort((a, b) => a.data.order! - b.data.order!);

const sortedProjects = [...numberedProjects, ...otherProjects, ...codepenProjects];

export default sortedProjects;
