import { z, defineCollection } from 'astro:content';
const projectCollection = defineCollection({
  schema: z.object({
    id: z.string(),
    iconSrc: z.string(),
    title: z.string(),
    codepen: z.boolean().optional(),
    codepenUrl: z.string().optional(),
    order: z.number().optional(),
  }),
});
export const collections = {
  projects: projectCollection,
};
