import { z } from "zod";
 
 export const azureAppSchema = z.object({
  portfolioName: z.string().min(1, "Portfolio Name is required"),
  regions: z.array(z.string().min(1, "At least one region is required")).min(1,{message:"At least one region is required"}),
  clientId: z.string().min(1, "Client ID is required"),
  clientSecret: z.string().min(1, "Client Secret is required"),
  tenantId: z.string().min(1, "Tenant ID is required"),
  subsId: z.string().min(1, "Subscription ID is required"),
 
});