import { z } from "zod";

export const instanceSchema = z.object({
  region: z.string().nonempty("Region is required"),
  instanceType: z.string().nonempty("Instance Type is required"),
  uuid: z.string().optional(),
  pricingModel: z.string().optional(),
  maxCpuUtilization: z.number().min(0, "Required"),
  maxMemoryUsed: z.number().min(0, "Required"),
  maxNetworkBandwidth: z.number().min(0, "Required"),
  maxDiskBandwidth: z.number().min(0, "Required"),
  maxIOPS: z.number().min(0, "Required"),
  uavg: z.number().optional(),  
  u95: z.number().optional(), 
});

export const CCAInstanceSchema = instanceSchema
  .pick({
    pricingModel: true,
    uuid: true,
    region: true,
    instanceType: true,
  })
  .extend({
    quantity: z.string().min(1, "Required"),
    noOfHours: z.string().min(1, "Required"),
  });
