import { z } from "zod";

export const instanceRowSchema = z.object({
  instanceName: z.string().min(2, "Instance Name is required"),
  region: z.string().min(2, "Region is required"),
  size: z.string().min(1, "Size is required"),
  quantity: z.coerce.number().int().positive("Must be > 0"),
  hours: z.coerce.number().int().positive("Must be > 0"),
  pricing: z.string().min(1, "Pricing Model is required"),
});

export const portfolioSchema = z.object({
  serviceProvider: z.string().min(2, "Provider is required"),
  portfolioName: z.string().min(2, "Portfolio Name is required"),
  createdFor: z.string().min(2, "Required"),
  rows: z.array(instanceRowSchema).min(1, "Add at least one instance"),
});
