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
export default function Footer() {
    return (
                <footer className={` text-black py-10 mt-32 ${satoshi.className}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo or Brand */}
            <div className="text-2xl font-bold">knead.</div>

            {/* Navigation Links */}
            <div className="flex gap-6 text-lg">
            <a href="#home" className="hover:text-yellow-900 transition">Home</a>
            <a href="#about" className="hover:text-yellow-900 transition">About</a>
            <a href="#faq" className="hover:text-yellow-900 transition">FAQs</a>
            <a href="#contact" className="hover:text-yellow-900 transition">Contact</a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 text-xl">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-900 transition">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-900 transition">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-900 transition">Instagram</a>
            </div>
        </div>

        <div className="text-center text-sm mt-6 text-gray-400">
            &copy; {new Date().getFullYear()} YAAO Gamerzz. All rights reserved.
        </div>
        </footer>
    )
}