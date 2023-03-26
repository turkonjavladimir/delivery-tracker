import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";

import Avatar from "~/components/common/Avatar";
import { Button } from "./common";
import { Dropdown } from "./ui";
import { MenuItem } from "./ui/Dropdown/Dropdown";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: sessionData, status } = useSession();
  const loading = status === "loading";
  console.log("loading: ", loading, sessionData);
  return (
    <div className="flex justify-center bg-neutral-100">
      <div className="w-full max-w-3xl">
        <header className="sticky top-0 z-header flex bg-neutral-100 p-2">
          <nav className="m-2 flex h-10 w-full justify-end">
            {sessionData && (
              <motion.div
                initial={{ opacity: 0, translateY: "-5px" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Dropdown
                  customMenuButton={
                    <Avatar
                      size="md"
                      imageUrl={sessionData?.user?.image ?? ""}
                      label={sessionData?.user?.name ?? ""}
                    />
                  }
                >
                  <div className="mx-1 py-1">
                    <MenuItem text="Profile" />
                    <MenuItem text="Settings" />
                    <MenuItem text="Sign out" onClick={() => void signOut()} />
                  </div>
                </Dropdown>
              </motion.div>
            )}

            {!sessionData && !loading && (
              <motion.div
                initial={{ opacity: 0, translateY: "-5px" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button onClick={() => void signIn()}>Sign in</Button>
              </motion.div>
            )}
          </nav>
        </header>
        <main className="mt-5 flex min-h-screen flex-col justify-start">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
