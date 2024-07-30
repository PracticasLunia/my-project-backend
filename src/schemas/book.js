import { z } from "zod";

const tagSchema = z.object({
    name: z.string(),
    description: z.string()
})

const bookSchema = z.object({
    title: z.string(),
    author: z.string(),
    isbn: z.string(),
    genre: z.string(),
    publicationDate: z.string(),
    publisher: z.string(),
    language: z.string(),
    description: z.string(),
    pageCount: z.number().int(),
    coverImage: z.string(),
    format: z.string(),
    availability: z.string(),
    category: z.number().int().nullable(),
    Tags: z.array(tagSchema),
    averageRating: z.number(),
    ratingCount: z.number().int(),
});

export default bookSchema