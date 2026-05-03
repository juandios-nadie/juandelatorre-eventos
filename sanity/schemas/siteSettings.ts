import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del Sitio",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Frase que aparece en el hero de la página principal",
      initialValue:
        "Renta de mobiliario y escenarios para eventos en Guadalajara",
    }),
    defineField({
      name: "phone",
      title: "Teléfono (para mostrar)",
      type: "string",
      description: 'Ej: "333-446-90-44"',
      initialValue: "333-446-90-44",
    }),
    defineField({
      name: "whatsapp",
      title: "Número de WhatsApp (con código de país, sin +)",
      type: "string",
      description: 'Ej: "523334469044"',
      initialValue: "523334469044",
    }),
    defineField({
      name: "facebookUrl",
      title: "URL de Facebook",
      type: "url",
      initialValue:
        "https://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/",
    }),
    defineField({
      name: "heroImage",
      title: "Imagen de fondo del Hero",
      type: "image",
      options: { hotspot: true },
      description: "Foto principal que aparece en la portada",
    }),
  ],
  preview: {
    select: { title: "tagline" },
    prepare: () => ({ title: "Configuración del Sitio" }),
  },
});
