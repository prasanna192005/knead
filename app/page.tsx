'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import localFont from 'next/font/local';
import { motion, AnimatePresence, MotionValue } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import InteractiveRoom from '@/components/InteractiveRoom';
import GradientCard from '@/components/gradient-card';
import { motion as Motion, Transition, Easing } from 'motion/react';
import CurvedLoop from '@/components/CurvedLoop';
import ReferAFriend from '@/components/ReferFriend';
import Footer from '@/components/Footer';
import { useScroll } from 'framer-motion';
import { CrowdCanvas, Skiper39 } from "@/components/ui/skiper-ui/skiper39";
import { StickyCard_001 } from "@/components/ui/skiper-ui/skiper16";
import { LetterAnimation } from '@/components/LetterAnimation';
import Image from 'next/image';

const sfPro = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Variable.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Variable.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Satoshi-Variable.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
});

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <Motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity'
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </Motion.span>
        );
      })}
    </p>
  );
};

// Define projects array for DemoSkiper16
const projects = [
  {
    title: "Your Project 1",
    src: "/Frame 1.png",
  },
  {
    title: "Your Project 2",
    src: "/Frame 2.png",
  },
  { title: "Your Project 3", src: "/Frame 3.png" },
  { title: "Your Project 4", src: "/Frame 4.png" },
];

// Optimized CharacterV1 component for Skiper31Demo
const CharacterV1: React.FC<{
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}> = ({ char, index, centerIndex, scrollYProgress }) => {
  const y = scrollYProgress.get() * 50 * (index - centerIndex) * 0.5;
  const opacity = 1 - Math.abs(scrollYProgress.get() * (index - centerIndex) * 0.2);

  return (
    <motion.span
      style={{
        display: 'inline-block',
        transform: `translateY(${y}px)`,
        opacity,
        willChange: 'transform, opacity',
      }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
    >
      {char}
    </motion.span>
  );
};

// Optimized Skiper31Demo component with "RIHA"
const Skiper31Demo = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  });
  const centerIndex = 2;

  return (
    <div
      ref={targetRef}
      className="relative box-border flex h-[100vh] items-center justify-center gap-4 overflow-hidden"
    >
      <div
        className="font-sf-pro w-full max-w-4xl text-center text-4xl sm:text-6xl font-bold uppercase tracking-tighter text-black"
        style={{
          perspective: "500px",
        }}
      >
        {["R", "I", "H", "A"].map((char, index) => (
          <CharacterV1
            key={index}
            char={char}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

const DemoSkiper16 = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main
      ref={container}
      className="relative flex w-full flex-col items-center justify-center py-20"
    >
      {projects.map((project, i) => {
        const targetScale = Math.max(
          0.5,
          1 - (projects.length - i - 1) * 0.1,
        );
        return (
          <StickyCard_001
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHomeContent, setShowHomeContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <main className={`${sfPro.variable} font-sf-pro min-h-screen flex flex-col`}>
      <div className="relative z-10 flex-grow">
        <SmoothScroll />
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>

        {!isLoading && (
          <div data-scroll-container>
            {!showHomeContent ? (
              <InteractiveRoom
                onShowHome={() => {
                  console.log('InteractiveRoom triggered onShowHome');
                  setShowHomeContent(true);
                }}
              />
            ) : (
              <div id="home-content" className="relative min-h-screen flex flex-col items-center justify-between overflow-visible">
                {/* Main Content */}
                <Image src="/riha..png" alt="Riha Logo" width={150} height={150} className="mt-90" />
                <div className='mt-2'>
                <LetterAnimation />
                </div>
                <div className="flex flex-col items-center justify-center w-full mt-[-600px]">
                  <DemoSkiper16 />
                </div>
                
                {/* CurvedLoop Section */}
                <div className="w-full min-h-[200px] relative z-200">
                  <CurvedLoop
                    marqueeText="✦ Safe Space ✦ Non-judgmental ✦ 24/7 Support ✦"
                    speed={2}
                    curveAmount={500}
                    direction="right"
                    interactive={true}
                    className="text-orange fill-current font-bold"
                  />
                </div>

                <footer className="w-full mt-[-350px] bg-[#f5f4f3] h-screen relative ">
                  <CrowdCanvas src="/all-peeps.png" rows={15} cols={7} />
                </footer>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}