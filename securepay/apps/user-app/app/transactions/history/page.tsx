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
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Type</th>
                        <th className="py-2 px-4 border">Amount</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((txn) => (
                            <tr key={txn.id} className="border-t">
                                <td className="py-2 px-4 border">{txn.id}</td>
                                <td className={`py-2 px-4 border ${txn.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                                    {txn.type}
                                </td>
                                <td className="py-2 px-4 border">{txn.amount}</td>
                                <td className="py-2 px-4 border">{txn.status}</td>
                                <td className="py-2 px-4 border">{new Date(txn.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td  className="text-center py-4">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Transfer;
