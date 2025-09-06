import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { InteractiveHoverButton } from "@/components/interactive-hover-button";
import  MaskedDiv  from "../components/ui/masked-div";
import Info from "@/components/Info";
import CountUp from "@/components/CountUp";
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

export default function Home() {
  return (
    <main>
        <Navbar />
        <div className="bg-white mt-16 rounded-2xl mx-20 h-140 flex">
          
          <div className="flex-1  rounded-l-2xl p-4 ml-6">
            <h1 className={`text-6xl mt-16 ${satoshi.className} font-[500]`}>The Future of Mental Wellness is Here.</h1>
            <p className={`text-xl mt-6 ${satoshi.className}`}>Meet knead. , your personal AI companion for mental and emotional support. Compassionate, confidential, and available 24/7. We're preparing for launch.</p>
             
            <InteractiveHoverButton className="mt-6" />
            <h1 className={`text-xl mt-6 ${satoshi.className} `}>Whole-Person Health for a Balanced Life </h1>
            <div className="flex gap-4 mt-4">
              <button className={`text-white ${satoshi.className} bg-orange-200 rounded-2xl px-2 py-2`}>Physical</button>
              <button className={`text-white ${satoshi.className} bg-green-500 rounded-2xl px-2 py-2`}>Mental</button>
              <button className={`text-white ${satoshi.className} bg-blue-500 rounded-2xl px-2 py-2`}>Emotional</button>
            </div>
          </div>
              
          
          <div className="flex-1  rounded-r-2xl p-4">
            <MaskedDiv maskType="type-1" size={0.60} className="my-4">
              <video autoPlay loop muted>
                <source
                  src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                  type="video/mp4"
                />
              </video>
          </MaskedDiv>
          </div>
        </div>

        <Info />
        <div
  className={`${satoshi.className} text-6xl text-center mt-20 flex justify-center gap-20`}
>
    <div className="flex flex-col items-center">
          <CountUp
            from={0}
            to={100}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
          />
          <p className="text-3xl mt-4">Users</p>
        </div>

        <div className="flex flex-col items-center">
          <CountUp
            from={0}
            to={100}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
          />
          <p className="text-3xl mt-4">Projects</p>
        </div>

        <div className="flex flex-col items-center">
          <CountUp
            from={0}
            to={100}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
          />
          <p className="text-3xl mt-4">Clients</p>
        </div>
  </div>


   </main>
  );
}
