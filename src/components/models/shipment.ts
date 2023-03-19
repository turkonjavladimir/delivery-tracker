import { z } from "zod";

const EventModel = z.object({
  timestamp: z.string(),
  description: z.string(),
  location: z.object({
    address: z.object({
      addressLocality: z.string(),
    }),
  }),
});

const shipmentValidator = z.object({
  id: z.string(),
  origin: z.object({
    address: z.object({
      addressLocality: z.string(),
    }),
  }),
  destination: z.object({
    address: z.object({
      addressLocality: z.string(),
    }),
  }),
  status: z.object({
    description: z.string(),
    location: z.object({
      address: z.object({
        addressLocality: z.string(),
      }),
    }),
    status: z.string(),
    statusCode: z.string(),
    timestamp: z.string(),
  }),
  service: z.string(),
  estimatedTimeOfDelivery: z.string(),
  details: z.object({
    carrier: z.object({
      organizationName: z.string(),
    }),
  }),
  events: z.array(EventModel),
});
export type Shipment = z.infer<typeof shipmentValidator>;

const shipmentsValidator = z.object({
  shipments: z.array(shipmentValidator),
});
export type Shipments = z.infer<typeof shipmentsValidator>;
