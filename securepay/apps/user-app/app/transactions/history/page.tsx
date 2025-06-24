"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Transfer = () => {
    const { data: session } = useSession();
    interface Transaction {
        id: string;
        type: string;
        amount: number;
        status: string;
        createdAt: string;
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("/api/transactionhistory");
                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }
                const data = await response.json();
                setTransactions(data);
            } catch (err) {
                console.error("Error fetching transactions:", err);
            }
        };

        if (session) {
            fetchTransactions();
        }
    }, [session]);

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-6">
                <h2 className="card-title text-2xl mb-6">Transaction History</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((txn) => (
                                    <tr key={txn.id}>
                                        <td>{txn.id}</td>
                                        <td className={txn.type === "credit" ? "text-success" : "text-error"}>{txn.type}</td>
                                        <td>{txn.amount}</td>
                                        <td>{txn.status}</td>
                                        <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
