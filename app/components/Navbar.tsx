import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth()

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="YC-logo" width={144} height={10}/>
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
            <Link href="/startup/create">
              <span className="hover:cursor-pointer text-orange-700 font-bold">Create</span>
            </Link>
            <form action={async ()=>{
              'use server';
              await signOut({redirectTo:"/"})
            }}>
              <button type="submit" className="hover:cursor-pointer text-orange-700 font-bold">Logout</button>
            </form>
            <Link className="font-bold text-blue-600" href={`/user/${session?.id}`}>
              <span>{session?.user?.name}</span>
            </Link>
            </>
          ):(
          
            <form action={async () => {
              'use server';
              await signIn("github");
            }}>
              <button type="submit" className="hover:cursor-pointer text-orange-700 font-bold">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
