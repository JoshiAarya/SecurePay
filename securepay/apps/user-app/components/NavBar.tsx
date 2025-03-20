import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold tracking-wide">
          SecurePay
        </Link>
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-200 hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link href="/transactions/deposit" className="text-gray-200 hover:text-white transition-colors duration-300">
            Deposit
          </Link>
          <Link href="/transactions/transfer" className="text-gray-200 hover:text-white transition-colors duration-300">
            Transfer
          </Link>
          <Link href="/transactions/withdraw" className="text-gray-200 hover:text-white transition-colors duration-300">
            Withdraw
          </Link>
          <Link href="/transactions/history" className="text-gray-200 hover:text-white transition-colors duration-300">
            History
          </Link>
          <Link href="/profile" className="text-gray-200 hover:text-white transition-colors duration-300">
            Profile
          </Link>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;