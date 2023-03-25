import Head from "next/head";
import { type NextPage } from "next";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import { Badge, Timeline } from "~/components/common";

import { api } from "~/utils/api";

const TrackingDetailsItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-neutral-500">{label}</span>
      <span className="text-sm  font-bold">{value}</span>
    </div>
  );
};

const Package: NextPage = () => {
  const router = useRouter();

  const shipmentId =
    typeof router.query.slug === "string" ? router.query.slug : undefined;

  const { data: shipment, isInitialLoading } = api.shipment.getOne.useQuery(
    {
      id: shipmentId ?? "",
    },
    {
      retry: false,
      enabled: !!shipmentId,
    }
  );
  const shipmentStatus =
    shipment?.status?.toLocaleLowerCase() === "delivered"
      ? "Delivered"
      : "In Transit";

  const deliveryDate = new Date(shipment?.deliveryDate as string);
  const estimatedDeliveryDate = new Date(
    shipment?.estimatedDeliveryDate as string
  );

  const badgeIntent = shipmentStatus === "Delivered" ? "success" : "primary";

  return (
    <>
      <Head>
        <title>Shipment</title>
      </Head>
      <div className="mx-4 mb-4 flex flex-col">
        {isInitialLoading && <div>Loading...</div>}

        {shipment && !isInitialLoading && (
          <div>
            <span className="mb-3 block text-gray-600 dark:text-[#979699]">
              Tracking Details
            </span>
            <motion.div
              initial={{ opacity: 0, translateX: "-20px" }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm"
            >
              <div className="grid grid-cols-1 items-baseline gap-3 sm:grid-cols-2 md:grid-cols-3">
                <TrackingDetailsItem
                  label="Tracking Number"
                  value={shipment?.trackingNumber}
                />

                <TrackingDetailsItem
                  label={
                    shipmentStatus === "Delivered"
                      ? "Delivered"
                      : "Estimated Delivery Date"
                  }
                  value={
                    shipmentStatus === "Delivered"
                      ? format(deliveryDate, "MMMM d, yyyy, h:mm aa")
                      : format(estimatedDeliveryDate, "MMMM d, yyyy, h:mm aa")
                  }
                />

                <TrackingDetailsItem
                  label="Service"
                  value={shipment?.service ?? ""}
                />

                <TrackingDetailsItem
                  label="Pieces"
                  value={shipment?.totalNumberOfPieces ?? ""}
                />
              </div>

              <hr />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-500">From</span>
                  <span className="text-sm  font-bold">{shipment?.origin}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-500">To</span>
                  <span className="text-sm  font-bold">
                    {shipment?.destination}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, translateX: "-20px" }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-lg bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex flex-row items-baseline justify-between gap-3">
                <h2 className="text-lg font-bold">History</h2>
                <Badge
                  size="lg"
                  variant="rounded"
                  className="uppercase"
                  intent={badgeIntent}
                >
                  {shipmentStatus}
                </Badge>
              </div>
              <Timeline events={shipment?.events || []} />
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default Package;
