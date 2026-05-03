import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Juan de la Torre Eventos",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Configuración del Sitio")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("category").title("Categorías"),
            S.documentTypeListItem("rentalItem").title("Artículos de Renta"),
          ]),
    }),
  ],

  schema: { types: schemaTypes },
});
