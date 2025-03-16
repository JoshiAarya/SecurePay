"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const Withdraw = () => {
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();
    const email = session?.user?.email;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("/api/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, amount }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Withdrawal successful");
            } else {
                setError(data.message || "Withdrawal failed");
            }
        } catch (error) {
            console.error("Failed to withdraw", error);
            setError("Something went wrong. Try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-2xl">
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
