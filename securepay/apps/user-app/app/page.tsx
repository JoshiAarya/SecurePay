"use client"

import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const onclickhandler = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-base-content">Welcome to <span className="text-primary">SecurePay</span>!</h1>
        <p className="mt-4 text-base-content text-lg">The most secure and reliable payment solution for your business.</p>
        <button onClick={onclickhandler} className="mt-6 btn btn-primary text-lg font-medium">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Secure Transactions</h2>
            <p>Our encryption ensures your payments are safe and secure.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Fast Processing</h2>
            <p>Experience lightning-fast transactions with our optimized system.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Global Access</h2>
            <p>Make payments anywhere in the world with ease.</p>
          </div>
        </div>
      </div>
    </div>
  );
}