"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;

    const fetchBalance = async () => {
      try {
        const response = await fetch("/api/fetchBalance");
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch balance");
          setAmount(null);
        } else {
          setAmount(data.msg);
        }
      } catch (err) {
        setError("Error fetching balance");
        setAmount(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [session]);

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) {
    return <p>You are not logged in. Please sign in.</p>;
    
  }

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
      <p><strong>Name:</strong> {session.user?.name}</p>
      <p><strong>Email:</strong> {session.user?.email}</p>

      {/* Balance Section with Loading & Error Handling */}
      <p>
        <strong>Balance:</strong>{" "}
        {loading ? "Fetching..." : error ? <span className="text-red-500">{error}</span> : `$${amount}`}
      </p>

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
