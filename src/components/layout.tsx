import { ReactNode } from "react";

import Avatar from "~/components/common/Avatar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="sticky top-0 flex bg-[#F9F9F9] p-2">
        <nav className="m-2 flex w-full justify-end">
          <Avatar size="md" label="PSaas Asss" />
        </nav>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-start bg-neutral-50">
        {children}
      </main>
    </>
  );
};

export default Layout;