"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const Transfer = () => {
    const [toEmail, setToEmail] = useState("");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { data: session } = useSession();
    const fromEmail = session?.user?.email;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!fromEmail) {
            setError("Please log in to make a transfer.");
            return;
        }

        try {
            const response = await fetch("/api/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fromEmail, toEmail, amount }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Transfer successful!");
                setToEmail("");
                setAmount(0);
            } else {
                setError(data.message || "Transfer failed.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Transfer Money</h2>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

            <div className="mb-4">
                <label htmlFor="toEmail" className="block text-gray-700 font-semibold mb-2">Recipient Email:</label>
                <input
                    type="email"
                    id="toEmail"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">Amount:</label>
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
                Transfer
            </button>
        </form>
    );
};

export default Transfer;
