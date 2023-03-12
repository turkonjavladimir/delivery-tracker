import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

function stringOrNull(str: unknown) {
  if (typeof str === "string") {
    return str;
  }
  return null;
}

const Home: NextPage = () => {
  const router = useRouter();

  const [trackingnumber, setTrackingnumber] = useState<string>("");
  const query = stringOrNull(router.query.trackingNumber)?.trim() || "";

  const isAutoFetchEnabled = Boolean(query) && query.length > 0;

  const {
    data: shipment,
    isLoading,
    isError,
  } = api.shipment.getShipmentByTrackingNumber.useQuery(
    {
      trackingNumber: query,
    },
    {
      enabled: isAutoFetchEnabled,
    }
  );

  const handleClick = async () => {
    if (!trackingnumber) {
      router.push("/");
    }

    router.push(
      {
        query: {
          ...router.query,
          trackingNumber: trackingnumber,
        },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  useEffect(() => {
    setTrackingnumber(query);
  }, [query]);

  console.log("isError", isError);

  return (
    <>
      <Head>
        <title>Delivery Tracker</title>
        <meta
          name="description"
          content="Track all your packages in one place"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1>hello world</h1>
        </div>
        <input
          type="text"
          value={trackingnumber}
          onChange={(e) => setTrackingnumber(e.target.value)}
        />
        <button onClick={handleClick}>Fetch</button>
        <div>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>
              {shipment?.events?.map((event) => (
                <span key={event?.timestamp} className="block">
                  {event?.description}
                </span>
              ))}
            </span>
          )}
        </div>

        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-gray-100 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
