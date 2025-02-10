"use client"

import { useSession } from "next-auth/react";

const MyComponent = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session && session.user?.admin ? (
        <p>Admin Panel</p>
      ) : (
        <p>No eres admin</p>
      )}
    </div>
  );
};

export default MyComponent;
