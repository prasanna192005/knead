'use client';
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import localFont from 'next/font/local';
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
const words: string[] = ["Pause", "Breathe", "Calm", "Focus", "Ease", "Soothe", "Rest", "riha."];

const opacity: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
};

const slideUp: Variants = {
    initial: { top: 0 },
    exit: { top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
};

const Preloader: React.FC = () => {
    const [index, setIndex] = useState<number>(0);
    const [dimension, setDimension] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        if (index === words.length - 1) return;
        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);
        return () => clearTimeout(timeout);
    }, [index]);

    const initialPath: string = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
    const targetPath: string = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

    const curve: Variants = {
        initial: { d: initialPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
        exit: { d: targetPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } },
    };
    
    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#F9F6F0] h-screen w-screen"
        >
            {dimension.width > 0 && (
                <>
                    <motion.p
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                        className={`${satoshi.className} flex items-center text-yellow-800 text-4xl md:text-5xl absolute z-10`}
                    >
                        <span className="block w-2.5 h-2.5 bg-yellow-900 rounded-full mr-2.5"></span>
                        {words[index]}
                    </motion.p>
                    <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
                        <motion.path
                            variants={curve}
                            initial="initial"
                            exit="exit"
                            className="fill-[#F9F6F0]"
                        />
                    </svg>
                </>
            )}
        </motion.div>
    );
};

export default Preloader;