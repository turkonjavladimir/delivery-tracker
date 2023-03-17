import { signIn, signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";

import Avatar from "~/components/common/Avatar";
import { Button } from "./common";
import { Dropdown } from "./ui";
import { MenuItem } from "./ui/Dropdown/Dropdown";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();
  return (
    <div className="bg-neutral-100">
      <header className="sticky top-0 z-header flex bg-neutral-100 p-2">
        <nav className="m-2 flex w-full justify-end">
          {sessionData ? (
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
                <MenuItem text="Sign out" onClick={() => signOut()} />
              </div>
            </Dropdown>
          ) : (
            <Button onClick={() => signIn()}>Sign in</Button>
          )}
        </nav>
      </header>
      <main className="mt-5 flex min-h-screen flex-col items-center justify-start">
        {children}
      </main>
    </div>
  );
};

export default Layout;
