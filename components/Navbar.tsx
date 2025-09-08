
import Link from "next/link";
import localFont from "next/font/local";   

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});
export default function Navbar() {
    return(
    <nav
      className={`${satoshi.className} flex items-center justify-between px-8 py-4 mt-4 mx-20 `}
    >
     
      <div className="flex items-center">
        <h1 className="text-2xl text-yellow-900 font-bold">riha.</h1>
      </div>

      
      <div className="flex space-x-8">
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div>
        <button className="px-4 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-950">
          Join Waitlist
        </button>
      </div>
    </nav>
    )
}