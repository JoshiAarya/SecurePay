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
        <form onSubmit={handleSubmit} className="card w-full max-w-sm mx-auto p-6 bg-base-100 shadow-xl rounded-2xl">
            <div className="form-control mb-6">
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
            <button
                type="submit"
                className="btn btn-primary w-full"
            >
                Deposit
            </button>
        </form>
    )
}

export default Deposit;