import { z } from "zod";

const preferencesSchema = z.object({
    preferences: z.string(),
})

export default preferencesSchema;