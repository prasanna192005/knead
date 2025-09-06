"use client";

import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { InteractiveHoverButton } from "@/components/interactive-hover-button";
import MaskedDiv from "../components/ui/masked-div";
import Info from "@/components/Info";
import CountUp from "@/components/CountUp";
import Image from "next/image";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Variable.ttf", weight: "100 900", style: "normal" },
    { path: "../public/fonts/Satoshi-VariableItalic.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-satoshi",
});

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <main>
      {/* Lenis Smooth Scroll */}
      <SmoothScroll />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.div 
        className="bg-white mt-16 rounded-2xl mx-20 h-140 flex"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="flex-1 rounded-l-2xl p-4 ml-6">
          <motion.h1 className={`text-6xl mt-16 ${satoshi.className} font-[500]`} variants={fadeUp}>
            The Future of Mental Wellness is Here.
          </motion.h1>

          <motion.p className={`text-xl mt-6 ${satoshi.className}`} variants={fadeUp}>
            Meet knead., your personal AI companion for mental and emotional support. Compassionate, confidential, and available 24/7. We&apos;re preparing for launch.
          </motion.p>

          <motion.div variants={fadeUp}>
            <InteractiveHoverButton className="mt-6" />
          </motion.div>

          <motion.h1 className={`text-xl mt-6 ${satoshi.className}`} variants={fadeUp}>
            Whole-Person Health for a Balanced Life
          </motion.h1>

          <motion.div className="flex gap-4 mt-4" variants={fadeUp}>
            <button className={`text-white ${satoshi.className} bg-orange-200 rounded-2xl px-2 py-2`}>Physical</button>
            <button className={`text-white ${satoshi.className} bg-green-500 rounded-2xl px-2 py-2`}>Mental</button>
            <button className={`text-white ${satoshi.className} bg-blue-500 rounded-2xl px-2 py-2`}>Emotional</button>
          </motion.div>
        </div>

        <div className="flex-1 rounded-r-2xl p-4">
          <MaskedDiv maskType="type-1" size={0.60} className="my-4">
            <motion.video 
              autoPlay 
              loop 
              muted 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <source
                src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                type="video/mp4"
              />
            </motion.video>
          </MaskedDiv>
        </div>
      </motion.div>

      {/* Info Section */}
      <motion.div className="mt-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Info />
      </motion.div>

      {/* CountUp Section */}
      <motion.div className={`${satoshi.className} text-6xl text-center mt-20 flex justify-center gap-20`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex flex-col items-center">
          <CountUp from={0} to={100} separator="," direction="up" duration={1} className="count-up-text" />
          <p className="text-3xl mt-4">Users</p>
        </div>
        <div className="flex flex-col items-center">
          <CountUp from={0} to={100} separator="," direction="up" duration={1} className="count-up-text" />
          <p className="text-3xl mt-4">Projects</p>
        </div>
        <div className="flex flex-col items-center">
          <CountUp from={0} to={100} separator="," direction="up" duration={1} className="count-up-text" />
          <p className="text-3xl mt-4">Clients</p>
        </div>
      </motion.div>

      {/* Impact Section */}
      <motion.div className="mt-32" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h1 className={`${satoshi.className} text-2xl text-center text-yellow-900`}>Our Impact</h1>
        <h1 className={`${satoshi.className} text-6xl text-center mt-4`}>Simple Steps to get well</h1>

        {/* GIFs without map and without animation */}
        <div className="flex justify-center mt-16 mb-32 mx-20 gap-8">
          <MaskedDiv maskType="type-1" size={0.30} className="my-4">
            <Image width={1920} height={1080} src="/1.gif" alt="Step 1" />
          </MaskedDiv>
          <MaskedDiv maskType="type-1" size={0.30} className="my-4">
            <Image width={1920} height={1080} src="/2.gif" alt="Step 2" />
          </MaskedDiv>
          <MaskedDiv maskType="type-1" size={0.30} className="my-4">
            <Image width={1920} height={1080} src="/3.gif" alt="Step 3" />
          </MaskedDiv>
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Pricing />
      </motion.div>

      {/* FAQ */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <FAQ />
      </motion.div>

      <Footer />
    </main>
  );
}
