import { z } from "zod";
import { instanceOptions, regionOptions } from "../constant";

export const instanceSchema = z.object({
  // portfolioName: z.string().min(3, "Portfolio Name is required"),
  region: z.string()    .nonempty("Region is required")
    .refine(val => regionOptions.includes(val), {
      message: "Invalid region selected",
    }),
  instanceType: z.string()
    .nonempty("Instance Type is required")
    .refine(val => instanceOptions.includes(val), {
      message: "Invalid instance type selected",
    }),
  uuid: z.string().optional(),
  pricingModel: z.string().optional(),
  maxCpuUtilization: z.number().min(0, "Required"),
  maxMemoryUsed: z.number().min(0, "Required"),
  maxNetworkBandwidth: z.number().min(0, "Required"),
  maxDiskBandwidth: z.number().min(0, "Required"),
  maxIOPS: z.number().min(0, "Required"),
});
