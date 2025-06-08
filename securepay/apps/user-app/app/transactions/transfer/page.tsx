"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { useSession } from "next-auth/react";

interface User {
  name: string;
  email: string;
}

const Transfer: React.FC = () => {
  const [toEmail, setToEmail] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { data: session } = useSession();
  const fromEmail = session?.user?.email;

  // New state for users and dropdown
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const containerRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Fetch users when component mounts
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/fetchUsers');
        const json = await res.json();
        if (res.ok && Array.isArray(json.users)) {
          setUsers(json.users as User[]);
        }
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();

    // Click outside to close dropdown
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (email: string) => {
    setToEmail(email);
    setQuery('');
    setShowDropdown(false);
  };

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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl relative"
      ref={containerRef as RefObject<HTMLFormElement>}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Transfer Money
      </h2>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

      <div className="mb-4 relative">
        <label
          htmlFor="toEmail"
          className="block text-gray-700 font-semibold mb-2"
        >
          Recipient:
        </label>
        <input
          type="text"
          id="toEmail"
          placeholder="Search by name or email"
          value={toEmail || query}
          onChange={(e) => {
            setQuery(e.target.value);
            setToEmail("");
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showDropdown && filtered.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-48 overflow-auto shadow-md">
            {filtered.map((user) => (
              <li
                key={user.email}
                onClick={() => handleSelect(user.email)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
              >
                <span>{user.name}</span>
                <span className="text-gray-500 text-sm">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="amount"
          className="block text-gray-700 font-semibold mb-2"
        >
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
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-300"
      >
        Transfer
      </button>
    </form>
  );
};

export default Transfer;
