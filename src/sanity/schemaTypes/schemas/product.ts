import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "category",
      title: "category",
      type: "reference",
      to: [{ type: "productCategory" }],
      
    }),
  ],
});
