import { z } from "zod";

export const updateProfileValidator = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  image: z.string().optional(),
});
