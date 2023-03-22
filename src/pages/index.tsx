import Head from "next/head";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import {
  SearchInput,
  Card,
  Timeline,
  Button,
  TrackingCardSkeleton,
} from "~/components/common";
import { CardSkeleton } from "~/components/common/Card/CardSkeleton";

function stringOrNull(str: unknown) {
  if (typeof str === "string") {
    return str;
  }
  return null;
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [isRefetchComplete, setIsRefetchComplete] = useState(false);

  const [trackingNumber, setTrackingnumber] = useState<string>("");
  const query = stringOrNull(router.query.trackingNumber)?.trim() || "";

  const isAutoFetchEnabled = Boolean(query) && query.length > 0;

  const {
    data: shipment,
    isInitialLoading,
    isError,
    error,
  } = api.shipment.getShipmentByTrackingNumber.useQuery(
    {
      trackingNumber: query,
    },
    {
      enabled: isAutoFetchEnabled,
    }
  );

  const {
    data: allShipments,
    refetch,
    isInitialLoading: isLoadingShipments,
  } = api.shipment.getAll.useQuery(undefined, {
    onSuccess: () => {
      setIsRefetchComplete(true);
    },
  });

  const createShipment = api.shipment.create.useMutation({
    onSuccess: () => {
      setIsRefetchComplete(false);
      void refetch();
    },
  });

  const handleSaveShipment = () => {
    createShipment.mutate({
      trackingNumber: shipment?.id ?? "",
      status: shipment?.status?.description ?? "",
      estimatedDeliveryDate: shipment?.status?.timestamp ?? "",
      deliveryDate: shipment?.status?.timestamp ?? "",
      events: shipment?.events ?? [],
      service: shipment?.service ?? "",
      totalNumberOfPieces: shipment?.details?.totalNumberOfPieces ?? 0,
      destination: shipment?.destination?.address?.addressLocality ?? "",
      origin: shipment?.origin?.address?.addressLocality ?? "",
    });
  };

  const handleSearchClick = () => {
    if (!trackingNumber) {
      void router.push("/");
    }

    void router.push(
      {
        query: {
          ...router.query,
          trackingNumber: trackingNumber,
        },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  const isSaveDisabled =
    allShipments?.some((shipment) => shipment.trackingNumber === query) ||
    createShipment?.isLoading ||
    !isRefetchComplete;

  useEffect(() => {
    setTrackingnumber(query);
  }, [query]);

  const shipmentsList = allShipments?.map((shipment) => {
    const status =
      shipment.status.toLocaleLowerCase() === "delivered"
        ? "Delivered"
        : "In Transit";
    return (
      <Card
        id={shipment.id}
        key={shipment.id}
        trackingNumber={shipment.trackingNumber}
        status={status}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Delivery Tracker</title>
        <meta
          name="description"
          content="Track all your packages in one place"
        />
      </Head>

      <div className="flex w-full flex-col justify-center gap-5 px-4">
        <SearchInput
          disabled={isInitialLoading}
          defaultValue={query}
          isDisabled={isInitialLoading}
          onClick={handleSearchClick}
          onChange={(e) => setTrackingnumber(e.target.value)}
        />

        {isInitialLoading && <TrackingCardSkeleton />}

        {isError && (
          <div className="rounded-md bg-white p-4 shadow-sm">
            <span className="text-red-500">{error?.message}</span>
          </div>
        )}

        {shipment && (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="block text-sm text-gray-600">
                  Tracking Number
                </span>
                <span className="font-bold">{query}</span>
              </div>

              <Button
                disabled={isSaveDisabled}
                size="sm"
                variant="subtle"
                onClick={handleSaveShipment}
              >
                <span>{createShipment?.isLoading ? "Loading" : "Save"}</span>
              </Button>
            </div>
            <div className="mt-3 max-h-96 overflow-y-scroll px-1">
              <Timeline events={shipment?.events || []} />
            </div>
          </div>
        )}

        <section className="mb-5">
          {sessionData && (
            <span className="text-gray-600 dark:text-[#979699]">
              Tracking History
            </span>
          )}

          {isLoadingShipments && sessionData && (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="mt-2">
                  {<CardSkeleton />}
                </div>
              ))}
            </>
          )}

          {allShipments?.length === 0 ||
          (!sessionData && !isLoadingShipments) ? (
            <div className="flex h-44 items-center justify-center">
              <span className="text-gray-500">No shipments found</span>
            </div>
          ) : (
            shipmentsList
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
