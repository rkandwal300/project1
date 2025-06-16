import { z } from "zod";

export const dataDogSchema = z.object({
  portfolioName: z.string().min(1, "Portfolio Name is required"),
  regions: z.array(z.string().min(1, "At least one region is required")).min(1,{message:"At least one region is required"}),
  apiKey: z.string().min(1, "API Key is required"),
  appKey: z.string().min(1, "Application Key is required"),
  hostTag: z.string().min(1, "Host Tag is required"),
});

export const cloudWatchSchema = z.object({
   portfolioName: z.string().min(1, "Portfolio Name is required"),
  regions: z.array(z.string().min(1, "At least one region is required")).min(1,{message:"At least one region is required"}),
  apiKey: z.string().min(1, "API Key is required"),
  appKey: z.string().min(1, "Application Key is required"),
});