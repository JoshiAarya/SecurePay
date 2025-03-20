import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          SecurePay
        </Link>
        <div className="space-x-5">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/transactions/deposit" className="text-gray-300 hover:text-white">
            Deposit
          </Link>
          <Link href="/transactions/transfer" className="text-gray-300 hover:text-white">
            Transfer
          </Link>
          <Link href="/transactions/withdraw" className="text-gray-300 hover:text-white">
            Withdraw
          </Link>
          <Link href="/transactions/history" className="text-gray-300 hover:text-white">
            History
          </Link>
          <Link href="/profile" className="text-gray-300 hover:text-white">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
