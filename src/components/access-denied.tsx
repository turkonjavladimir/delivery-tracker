import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <div className="grid h-96 place-items-center">
      <div>
        <h1 className="mb-5 text-3xl font-bold text-black">401</h1>
        <p className="text-2xl font-bold text-black">Access Denied</p>

        <p className="text-lg font-bold text-black">
          You must be signed in to view this page
        </p>
        <button
          className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
