import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
