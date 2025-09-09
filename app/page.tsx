'use client';

import { useState, useEffect } from 'react';
import localFont from 'next/font/local';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import TiltedCard from '@/components/TiltedCard';
import Preloader from '@/components/Preloader';
import InteractiveRoom from '@/components/InteractiveRoom';
import gsap from 'gsap';

const sfPro = localFont({
  src: [
    { path: '../public/fonts/SFPRODISPLAYREGULAR.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/SFPRODISPLAYMEDIUM.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/SFPRODISPLAYBOLD.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHomeContent, setShowHomeContent] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const projects = [
    { 
      title: "Your Person, Your Way", 
      color: "#FF0000",
      description: "We craft a companion that fits you — someone who talks and listens exactly the way you're most comfortable with."
    },
    { 
      title: "Vent Mode", 
      color: "#0000FF",
      description: "Sometimes you just need to let it all out. In vent mode, we're simply here to listen and give you a space where you feel truly heard."
    },
    { 
      title: "Journal", 
      color: "#00FF00",
      description: "Your own safe place to write down thoughts, feelings, or whatever's on your mind. No pressure, just you putting it into words."
    },
    { 
      title: "Session Reports", 
      color: "#FFFF00",
      description: "After your chats, you'll get small summaries — what you shared, what mattered, and a few gentle steps you can try moving forward."
    },
  ];

  
  const manageMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (expandedCard !== index) {
      gsap.to(e.currentTarget, {
        top: "-2vw",
        backgroundColor: projects[index].color,
        duration: 0.3,
      });
    }
  };

  const manageMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (expandedCard !== index) {
      gsap.to(e.currentTarget, {
        top: "0",
        backgroundColor: "white",
        duration: 0.3,
        delay: 0.1,
      });
    }
  };

  const handleCardClick = (index: number) => {
    if (expandedCard === index) {
     
      setExpandedCard(null);
    } else {
     
      setExpandedCard(index);
    }
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
    <main className={`${sfPro.variable} font-sf-pro`}>
     
      <div className="relative z-10">
        <SmoothScroll />
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        {!isLoading && (
          <div data-scroll-container>
            {!showHomeContent ? (
              <InteractiveRoom onShowHome={() => setShowHomeContent(true)} />
            ) : (
              <div id='home-content' className='relative'>
                <h1 className='text-center font-bold text-4xl mt-4'>riha</h1>
                <div className="flex items-center h-screen">
                  <div className="relative w-full">
                    {projects.map((project, index) => (
                      <div
                        key={index}
                        onClick={() => handleCardClick(index)}
                        onMouseEnter={(e) => manageMouseEnter(e, index)}
                        onMouseLeave={(e) => manageMouseLeave(e, index)}
                        className={`relative border-t border-black cursor-pointer mb-[-2vw] bg-white transition-all duration-500 ${
                          expandedCard === index 
                            ? 'h-[60vh] z-50' 
                            : 'h-[10vh]'
                        }`}
                        style={{
                          backgroundColor: expandedCard === index ? project.color : 'white'
                        }}
                      >
                        <div className="h-full flex flex-col justify-center pl-2">
                          <p className="m-0 text-[5vw] uppercase pointer-events-none text-black text-center">
                            {project.title}
                          </p>
                          
                          {expandedCard === index && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="mt-8 pr-8"
                            >
                              <p className="text-black text-4xl leading-relaxed text-center">
                                {project.description}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}