"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";

const Deposit = () => {
    const [amount, setAmount] = useState(0);
    const { data: session, status } = useSession();
    const email = session?.user?.email;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/deposit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, amount }),
            });

            if (response.ok) {
                console.log("Deposit successful");
            } else {
                console.error("Deposit failed");
            }
        } catch (error) {
            console.error("Failed to sign up", error);
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Deposit
            </button>
        </form>

    )
}

export default Deposit;