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
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-center">Withdraw</h2>
            <div className="mb-4">
                <p className="text-gray-700 font-medium">Current Balance: 
                    <span className="font-semibold ml-2">
                        {balance !== null ? `$${balance}` : "Loading..."}
                    </span>
                </p>
            </div>
            <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
                    Amount:
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
            <button
                type="submit"
                className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
                Withdraw
            </button>
        </form>
    );
};

export default Withdraw;
