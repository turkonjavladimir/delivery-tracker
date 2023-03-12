import { z } from "zod";

const address = z.object({
  countryCode: z.string(),
  postalCode: z.string(),
  addressLocality: z.string(),
  streetAddress: z.string(),
});

const shipmentValidator = z.object({
  id: z.string(),
  origin: z.object({
    address,
  }),
  destination: z.object({
    address,
    servicePoint: z.object({
      label: z.string(),
      url: z.string().url(),
    }),
  }),
  service: z.string(),
  status: z.object({
    description: z.string(),
    location: z.object({
      address,
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
  events: z.array(
    z.object({
      timestamp: z.string(),
      description: z.string(),
      location: z.object({
        address: z.object({
          addressLocality: z.string(),
        }),
      }),
    })
  ),
});
export type Shipment = z.infer<typeof shipmentValidator>;

const shipmentsValidator = z.object({
  shipments: z.array(shipmentValidator),
});
export type Shipments = z.infer<typeof shipmentsValidator>;
