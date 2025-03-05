"use client"
import { PrismaClient } from '@repo/db/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';

const client = new PrismaClient();

const Signup = () => {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user in the database
            await client.user.create({
                data: {
                    number: number,
                    email: email,
                    password: hashedPassword,
                },
            });

            // Redirect to the login page
            router.push('api/auth/login');
        } catch (error) {
            console.error('Failed to sign up', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="text">Password:</label>
                <input
                    type="text"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;