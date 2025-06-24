"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";

const Signup = () => {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    
    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (session) {
        return null; // Prevents rendering the signup form
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, number, password, name }),
            });

            if (response.ok) {
                signIn();
            } else {
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Failed to sign up", error);
        }
    };

    if(!session){
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-200">
                <form 
                    onSubmit={handleSubmit} 
                    className="card w-full max-w-md bg-base-100 shadow-xl p-8"
                >
                    <h2 className="card-title text-2xl text-center mb-6">Sign Up</h2>
                    <div className="form-control mb-4">
                        <label htmlFor="email" className="label">
                          <span className="label-text">Email:</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label htmlFor="password" className="label">
                          <span className="label-text">Password:</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label htmlFor="number" className="label">
                          <span className="label-text">Phone Number:</span>
                        </label>
                        <input
                            type="text"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control mb-6">
                        <label htmlFor="name" className="label">
                          <span className="label-text">Name:</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-full"
                    >
                        Sign Up
                    </button>
                    <Link href="/api/auth/signin" className="block text-center mt-4 text-primary hover:underline">
                        Already have an account? Sign in
                    </Link>
                </form>
            </div>
        );
    }
};

export default Signup;