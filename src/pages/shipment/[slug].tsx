import Head from "next/head";
import { type NextPage } from "next";
import { format } from "date-fns";
import { useRouter } from "next/router";

import { Timeline } from "~/components/common";

import { api } from "~/utils/api";

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

  return (
    <>
      <Head>
        <title>Shipment</title>
      </Head>
      <div className="mx-4 mb-4 flex flex-col">
        {isInitialLoading && <div>Loading...</div>}

        {shipment && !isInitialLoading && (
          <>
            <span className="mb-3 text-gray-600 dark:text-[#979699]">
              Tracking Details
            </span>
            <div className="mb-4 flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm">
              <div className="grid grid-cols-1 items-baseline gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <span className="text-sm text-neutral-500">
                    Tracking Number
                  </span>

                  <span className="block text-sm font-bold">
                    {shipment?.trackingNumber}
                  </span>
                </div>

                <div>
                  <span className="block text-sm text-neutral-500">
                    {shipmentStatus === "Delivered"
                      ? "Delivered"
                      : "Estimated Delivery Date"}
                  </span>
                  <span className="text-sm  font-bold">
                    {shipmentStatus === "Delivered"
                      ? format(deliveryDate, "MMMM d, yyyy, h:mm aa")
                      : format(estimatedDeliveryDate, "MMMM d, yyyy, h:mm aa")}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-neutral-500">Service</span>
                  <span className="block text-sm font-bold">
                    {shipment?.service}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-neutral-500">
                    Number Of Pieces
                  </span>

                  <span className="block text-sm font-bold">
                    {shipment?.totalNumberOfPieces}
                  </span>
                </div>
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
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-3 flex flex-row items-baseline justify-between gap-3">
                <h2 className="text-lg font-bold">History</h2>
                <div
                  className={`truncate rounded-full px-2 py-1 text-xs font-bold uppercase ${
                    shipmentStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-indigo-100 text-indigo-500"
                  }`}
                >
                  {shipmentStatus}
                </div>
              </div>
              <Timeline events={shipment?.events || []} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Package;
