import { z } from "zod";

export const dataDogSchema = z.object({
  portfolioName: z.string({ message: "Portfolio Name is required" }).optional(),
  regions: z
    .array(z.string().min(1, "At least one region is required"))
    .min(1, { message: "At least one region is required" }),
  apiKey: z.string().min(1, "API Key is required"),
  appKey: z.string().min(1, "Application Key is required"),
  hostTag: z.string().min(1, "Host Tag is required"),
});

export const cloudWatchSchema = z.object({
  portfolioName: z.string({ message: "Portfolio Name is required" }).optional(),
  regions: z
    .array(z.string().min(1, "At least one region is required"))
    .min(1, { message: "At least one region is required" }),
  apiKey: z.string().min(1, "API Key is required"),
  appKey: z.string().min(1, "Application Key is required"),
});

export const gcpTelemetrySchema = z.object({
  portfolioName: z.string({ message: "Portfolio Name is required" }).optional(),
  regions: z
    .array(z.string().min(1, "At least one region is required"))
    .min(1, { message: "At least one region is required" }),
  clientEmail: z.string().email().min(1, "email is required"),
  projectId: z.string().min(1, "Project id is required"),
  privateKey: z.string().min(1, "Private Key is required"),
});
export const prometheusTelemetrySchema= z.object({
  portfolioName: z.string({ message: "Portfolio Name is required" }).optional(),
  regions: z
    .array(z.string().min(1, "At least one region is required"))
    .min(1, { message: "At least one region is required" }),
  url: z.string().min(1, "Private Key is required"),
});
