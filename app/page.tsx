'use client';

import { useState, useEffect } from 'react';
import localFont from 'next/font/local';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { InteractiveHoverButton } from '@/components/interactive-hover-button';
import MaskedDiv from '@/components/ui/masked-div';
import Info from '@/components/Info';
import CountUp from '@/components/CountUp';
import Image from 'next/image';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import InteractiveRoom from '@/components/InteractiveRoom';
import SmoothScroll from '@/components/SmoothScroll';

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Variable.ttf', weight: '100 900', style: 'normal' },
    { path: '../public/fonts/Satoshi-VariableItalic.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-satoshi',
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHomeContent, setShowHomeContent] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`${satoshi.variable}`}>
      <SmoothScroll />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && (
        <div data-scroll-container>
          {!showHomeContent ? (
            <InteractiveRoom onShowHome={() => setShowHomeContent(true)} />
          ) : (
            <div id="home-content" className="relative">
              <Navbar />
              <motion.div
                className="bg-white mt-16 rounded-2xl mx-4 md:mx-20 h-[560px] flex flex-col md:flex-row"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <div className="flex-1 rounded-l-2xl p-4 md:ml-6">
                  <motion.h1
                    className={`text-4xl md:text-6xl mt-8 md:mt-16 ${satoshi.className} font-[500]`}
                    variants={fadeUp}
                  >
                    The Future of Mental Wellness is Here.
                  </motion.h1>
                  <motion.p className={`text-lg md:text-xl mt-6 ${satoshi.className}`} variants={fadeUp}>
                    Meet knead., your personal AI companion for mental and emotional support. Compassionate,
                    confidential, and available 24/7. We&apos;re preparing for launch.
                  </motion.p>
                  <motion.div variants={fadeUp}>
                    <InteractiveHoverButton className="mt-6" />
                  </motion.div>
                  <motion.h1 className={`text-lg md:text-xl mt-6 ${satoshi.className}`} variants={fadeUp}>
                    Whole-Person Health for a Balanced Life
                  </motion.h1>
                  <motion.div className="flex gap-4 mt-4" variants={fadeUp}>
                    <button className={`text-white ${satoshi.className} bg-orange-200 rounded-2xl px-2 py-2`}>
                      Physical
                    </button>
                    <button className={`text-white ${satoshi.className} bg-green-500 rounded-2xl px-2 py-2`}>
                      Mental
                    </button>
                    <button className={`text-white ${satoshi.className} bg-blue-500 rounded-2xl px-2 py-2`}>
                      Emotional
                    </button>
                  </motion.div>
                </div>
                <div className="flex-1 rounded-r-2xl p-4">
                  <MaskedDiv maskType="type-1" size={0.6} className="my-4">
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

              <motion.div
                className="mt-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Info />
              </motion.div>

              <motion.div
                className={`${satoshi.className} text-4xl md:text-6xl text-center mt-20 flex justify-center gap-8 md:gap-20`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="flex flex-col items-center">
                  <CountUp from={0} to={100} separator="," direction="up" duration={1} className="count-up-text" />
                  <p className="text-2xl md:text-3xl mt-4">Users</p>
                </div>
                <div className="flex flex-col items-center">
                  <CountUp from={0} to={100} separator="," direction="up" duration={1} className="count-up-text" />
                  <p className="text-2xl md:text-3xl mt-4">Projects</p>
                </div>
                <div className="flex flex-col items-center">
                  <CountUp from={0} to={100} separator="," direction="up" duration={1} className="count-up-text" />
                  <p className="text-2xl md:text-3xl mt-4">Clients</p>
                </div>
              </motion.div>

              <motion.div
                className="mt-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h1 className={`${satoshi.className} text-xl md:text-2xl text-center text-yellow-900`}>
                  Our Impact
                </h1>
                <h1 className={`${satoshi.className} text-4xl md:text-6xl text-center mt-4`}>
                  Simple Steps to Get Well
                </h1>
                <div className="flex flex-col md:flex-row justify-center mt-16 mb-32 mx-4 md:mx-20 gap-8">
                  <MaskedDiv maskType="type-1" size={0.3} className="my-4">
                    <Image width={1920} height={1080} src="/1.gif" alt="Step 1" loading="lazy" />
                  </MaskedDiv>
                  <MaskedDiv maskType="type-1" size={0.3} className="my-4">
                    <Image width={1920} height={1080} src="/2.gif" alt="Step 2" loading="lazy" />
                  </MaskedDiv>
                  <MaskedDiv maskType="type-1" size={0.3} className="my-4">
                    <Image width={1920} height={1080} src="/3.gif" alt="Step 3" loading="lazy" />
                  </MaskedDiv>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Pricing />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <FAQ />
              </motion.div>

              <Footer />
            </div>
          )}
        </div>
      )}
    </main>
  );
}