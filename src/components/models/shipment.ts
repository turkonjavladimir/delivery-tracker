import { z } from "zod";

const AddressModel = z.object({
  countryCode: z.string(),
  postalCode: z.string(),
  addressLocality: z.string(),
  streetAddress: z.string(),
});

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
    AddressModel,
  }),
  destination: z.object({
    AddressModel,
    servicePoint: z.object({
      label: z.string(),
      url: z.string().url(),
    }),
  }),
  service: z.string(),
  status: z.object({
    description: z.string(),
    location: z.object({
      AddressModel,
    }),
    status: z.string(),
    statusCode: z.string(),
    remark: z.string(),
    timestamp: z.string(),
  }),
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
