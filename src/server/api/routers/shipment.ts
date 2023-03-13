import { z } from "zod";

import { env } from "~/env.mjs";
import { httpGet } from "~/server/utils/http-utils";
import { Shipment, Shipments } from "~/components/models/shipment";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const shipmentRouter = createTRPCRouter({
  getShipmentByTrackingNumber: publicProcedure
    .input(z.object({ trackingNumber: z.string() }))
    .query(async ({ input }) => {
      try {
        const data = await httpGet<Shipments>(
          `${env.DHL_API_URL}/track/shipments?trackingNumber=${input.trackingNumber}`,
          {
            "DHL-Api-Key": env.DHL_API_KEY,
          }
        );

        console.log("data", data);

        if (!data?.shipments?.length) {
          throw new Error("No shipments found.");
        }
        console.log("DATA", data);
        return data?.shipments[0] as Shipment;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No shipments found.",
          // optional: pass the original error to retain stack trace
          cause: error,
        });
      }
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.shipment.findMany({
      orderBy: {
        estimatedDeliveryDate: "desc",
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        trackingNumber: z.string(),
        status: z.string(),
        estimatedDeliveryDate: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.shipment.create({
        data: {
          status: input.status,
          trackingNumber: input.trackingNumber,
          estimatedDeliveryDate: input.estimatedDeliveryDate,
          userId: ctx.session.user.id,
        },
      });
    }),
});
