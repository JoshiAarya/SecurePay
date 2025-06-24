"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Withdraw = () => {
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { data: session } = useSession();
    const email = session?.user?.email;

    // Fetch balance when email is available
    useEffect(() => {
        const fetchBalance = async () => {
            if (!email) return;

            try {
                const response = await fetch("/api/fetchBalance");

                const data = await response.json();

                if (response.ok) {
                    setBalance(data.msg);
                } else {
                    setError("Failed to fetch balance.");
                }
            } catch (err) {
                console.error("Error fetching balance:", err);
                setError("Something went wrong while fetching balance.");
            }
        };

        fetchBalance();
    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            if (amount <= 0) {
                setError("Amount should be a positive number!");
                return;
            }

            const response = await fetch("/api/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, amount }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Withdrawal successful!");
                // Update balance after withdrawal
                setBalance(prev => (prev !== null ? prev - amount : null));
            } else {
                setError(data.message || "Withdrawal failed!");
            }
        } catch (error) {
            console.error("Failed to withdraw", error);
            setError("Something went wrong. Try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card w-full max-w-sm mx-auto p-6 bg-base-100 shadow-xl rounded-2xl">
            <h2 className="card-title text-xl mb-4 text-center">Withdraw</h2>
            <div className="mb-4">
                <p className="text-base-content font-medium">Current Balance:
                    <span className="font-semibold ml-2">
                        {balance !== null ? `$${balance}` : <span className="loading loading-spinner loading-xs text-primary align-middle ml-2"></span>}
                    </span>
                </p>
            </div>
            <div className="form-control mb-4">
                <label htmlFor="amount" className="label">
                    <span className="label-text">Amount:</span>
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    className="input input-bordered w-full"
                />
            </div>
            {error && <div className="alert alert-error mb-4 py-2 text-sm">{error}</div>}
            {success && <div className="alert alert-success mb-4 py-2 text-sm">{success}</div>}
            <button
                type="submit"
                className="btn btn-error w-full"
            >
                Withdraw
            </button>
        </form>
    );
};

export default Withdraw;
