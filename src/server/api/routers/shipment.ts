import { z } from "zod";

import { env } from "~/env.mjs";
import { httpGet } from "~/server/utils/http-utils";

import { type Shipments } from "~/components/models/shipment";
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

        if (!data) return;

        return (
          (data?.shipments[0] && {
            ...data.shipments[0],
            events: data.shipments[0].events.map((event) => ({
              ...event,
              location: event.location.address.addressLocality,
            })),
          }) ||
          undefined
        );
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No shipments found.",
          cause: error,
        });
      }
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.shipment.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        estimatedDeliveryDate: "desc",
      },
      include: {
        events: {
          orderBy: {
            timestamp: "asc",
          },
        },
      },
    });
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.shipment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          events: {
            orderBy: {
              timestamp: "desc",
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        trackingNumber: z.string(),
        status: z.string(),
        estimatedDeliveryDate: z.string(),
        origin: z.string(),
        destination: z.string(),
        deliveryDate: z.string(),
        service: z.string(),
        totalNumberOfPieces: z.number(),
        events: z.array(
          z.object({
            timestamp: z.string(),
            description: z.string(),
            location: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const events = input?.events?.map((event) => ({
        description: event.description,
        timestamp: event.timestamp,
        location: event?.location,
      }));

      await ctx.prisma.shipment.create({
        data: {
          status: input.status,
          trackingNumber: input.trackingNumber,
          estimatedDeliveryDate: input.estimatedDeliveryDate,
          deliveryDate: input.deliveryDate,
          userId: ctx.session.user.id,
          destination: input.destination,
          service: input.service,
          totalNumberOfPieces: input.totalNumberOfPieces,
          origin: input.origin,
          events: {
            create: events,
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.shipment.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
