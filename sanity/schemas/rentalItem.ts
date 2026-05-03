import { defineField, defineType } from "sanity";

export const rentalItem = defineType({
  name: "rentalItem",
  title: "Artículo de Renta",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "photos",
      title: "Fotos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Destacado (aparece en la página principal)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.name",
      media: "photos.0",
    },
  },
});
