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
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h1 className="card-title text-2xl mb-4">Profile</h1>
        {session.user?.image && (
          <div className="flex justify-center mb-4">
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={session.user.image} alt="Profile Picture" />
              </div>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {session.user?.name}</p>
          <p><span className="font-semibold">Email:</span> {session.user?.email}</p>
          <p>
            <span className="font-semibold">Balance:</span>{' '}
            {loading ? (
              <span className="loading loading-spinner loading-xs text-primary align-middle ml-2"></span>
            ) : error ? (
              <span className="text-error">{error}</span>
            ) : (
              <span className="text-success">${amount}</span>
            )}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="btn btn-error mt-6 w-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
