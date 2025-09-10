'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import localFont from 'next/font/local';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import InteractiveRoom from '@/components/InteractiveRoom';
import GradientCard from '@/components/gradient-card';
import { motion as Motion, Transition, Easing } from 'motion/react';
import CurvedLoop from '@/components/CurvedLoop';
import ReferAFriend from '@/components/ReferFriend';
import Footer from '@/components/Footer';

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
              <div id="home-content" className="relative min-h-screen flex flex-col items-center justify-center bg-black">
                <h1 className="text-center font-bold text-4xl mt-8 mb-4 text-white">riha</h1>
                <BlurText
                  text="Riha is your safe space to talk, reflect, and feel understood."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-3xl mb-8 text-white font-semibold mt-8 italic text-center"
                />
                <BlurText
                  text="Anytime you need it"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-3xl mb-8 text-white font-semibold"
                />
                <div className="flex justify-center items-center gap-6 max-w-[1280px] w-full px-4 sm:gap-4 mt-[-120px]">
                  <GradientCard
                    title="Your Person, Your Way"
                    description="We craft a companion that fits you — someone who talks and listens exactly the way you’re most comfortable with."
                    icon={
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8ZM8 9C5.33 9 3 10.34 3 12V14H13V12C13 10.34 10.67 9 8 9Z"
                          fill="white"
                        />
                      </svg>
                    }
                    linkText="Learn More"
                    linkHref="#companion"
                    colorScheme="red"
                  />
                  <GradientCard
                    title="Vent Mode"
                    description="Sometimes you just need to let it all out. In vent mode, we’re simply here to listen and give you a space where you feel truly heard."
                    icon={
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V10C14 11.1046 13.1046 12 12 12H8L4 14V12H4C2.89543 12 2 11.1046 2 10V4Z"
                          fill="white"
                        />
                      </svg>
                    }
                    linkText="Explore Now"
                    linkHref="#vent"
                    colorScheme="blue"
                  />
                  <GradientCard
                    title="Journal"
                    description="Your own safe place to write down thoughts, feelings, or whatever’s on your mind. No pressure, just you putting it into words."
                    icon={
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 2H13C14.1046 2 15 2.89543 15 4V12C15 13.1046 14.1046 14 13 14H3C1.89543 14 1 13.1046 1 12V4C1 2.89543 1.89543 2 3 2ZM5 4V12H11V4H5Z"
                          fill="white"
                        />
                      </svg>
                    }
                    linkText="Start Writing"
                    linkHref="#journal"
                    colorScheme="green"
                  />
                  <GradientCard
                    title="Session Reports"
                    description="After your chats, you’ll get small summaries — what you shared, what mattered, and a few gentle steps you can try moving forward."
                    icon={
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 2H13C14.1046 2 15 2.89543 15 4V12C15 13.1046 14.1046 14 13 14H3C1.89543 14 1 13.1046 1 12V4C1 2.89543 1.89543 2 3 2ZM4 6H12V7H4V6ZM4 9H12V10H4V9Z"
                          fill="white"
                        />
                      </svg>
                    }
                    linkText="View Reports"
                    linkHref="#reports"
                    colorScheme="yellow"
                  />
                </div>
                <div>
                  <h1 className='text-white text-3xl text-center'>Refer a Friend?</h1>
                </div>
                <div className='relative w-full'>
                  <CurvedLoop
                    marqueeText="✦ Safe Space ✦ Non-judgmental ✦ 24/7 Support ✦"
                    speed={1}
                    curveAmount={500}
                    direction="right"
                    interactive={true}
                    className="text-white z-99 absolute"
                  />
                  <div className='w-full mt-[-200]'><Footer/></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}