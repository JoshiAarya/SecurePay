"use client"
import { useSession, signOut } from "next-auth/react";

const Profile: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You are not logged in. Please sign in.</p>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Profile</h1>
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="Profile Picture"
          className="w-20 h-20 rounded-full mt-2"
        />
      )}
      <p>Name: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
