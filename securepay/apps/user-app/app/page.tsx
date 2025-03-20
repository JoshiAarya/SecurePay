"use client"

import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const onclickhandler = () => {
    router.push("/signup");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to <span className="text-blue-600">SecurePay</span>!</h1>
        <p className="mt-4 text-gray-600 text-lg">The most secure and reliable payment solution for your business.</p>
        <button onClick={onclickhandler} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Secure Transactions</h2>
          <p className="mt-2 text-gray-600">Our encryption ensures your payments are safe and secure.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Fast Processing</h2>
          <p className="mt-2 text-gray-600">Experience lightning-fast transactions with our optimized system.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Global Access</h2>
          <p className="mt-2 text-gray-600">Make payments anywhere in the world with ease.</p>
        </div>
      </div>
    </div>
  );
}