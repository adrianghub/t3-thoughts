import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {session?.user?.name ? `Notes for ${session.user.name}` : "T3 App"}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          {session?.user ? (
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn"
              onClick={() => void signOut()}
            >
              <Image
                width={30}
                height={30}
                src={session.user.image!}
                alt={session.user.name!}
              />
            </label>
          ) : (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
