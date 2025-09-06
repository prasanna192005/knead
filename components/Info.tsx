import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { InteractiveHoverButton } from "@/components/interactive-hover-button";
import  MaskedDiv  from "./ui/masked-div";
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
export default function Info() {
    return(
       <div className="relative">
          {/* Your text */}
          <h1 className={`text-xl text-yellow-800 text-center mt-48 ${satoshi.className}`}>
            🌿 Your wellness, your journey.
          </h1>
          <h1 className={`text-4xl text-center text-yellow-900 mt-4 ${satoshi.className} mx-20`}>
            Your wellness, your unique journey.
          </h1>
          <h1 className={`text-4xl text-center mt-4 text-yellow-900 ${satoshi.className} mx-20`}>
            Our AI empowers you to take charge of your mental balance.
          </h1>
          <h1 className={`text-4xl text-center mt-4 text-yellow-900 ${satoshi.className} mx-20`}>
            Receive personalized, expert-designed support, 24/7.
          </h1>

          {/* MaskedDiv pushed down */}
          <div className="pt-20"> 
            <MaskedDiv maskType="type-3" size={0.50}>
              <video autoPlay loop muted>
                <source
                  src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                  type="video/mp4"
                />
              </video>
            </MaskedDiv>
          </div>
        </div>
    )
}