import { z } from "zod";

export const taskSchema = z.object({
  name: z.string().min(1, "Name is required.").max(255),
  details: z.string().min(1, "Details is required.").max(65535),
  status: z.string().min(1, "Status is required").max(255),
});
