import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="btn btn-ghost normal-case text-2xl font-bold">
            <span className="text-primary">SecurePay</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="btn btn-ghost">Home</Link>
          <Link href="/transactions/deposit" className="btn btn-ghost">Deposit</Link>
          <Link href="/transactions/transfer" className="btn btn-ghost">Transfer</Link>
          <Link href="/transactions/withdraw" className="btn btn-ghost">Withdraw</Link>
          <Link href="/transactions/history" className="btn btn-ghost">History</Link>
          <Link href="/profile" className="btn btn-ghost">Profile</Link>
          {/* DaisyUI theme toggle */}
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64 17.66A9 9 0 0 1 12 3v0a9 9 0 1 0 9 9h0a9 9 0 0 1-15.36 5.66z"></path></svg>
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64 13.66A9 9 0 0 1 12 21v0a9 9 0 1 1 9-9h0a9 9 0 0 0-15.36-5.66z"></path></svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;