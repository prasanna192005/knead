'use client';

import React from "react";
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  Volume2,
  VolumeX,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import LightRays from '../components/LightRays';
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ibmPlexMono } from "@/lib/fonts";


interface InteractiveRoomProps {
  onShowHome: () => void;
}
const words = `Riha is your safe space to talk, reflect, and feel understood. Anytime you need it. Click on the light to turn it on and start your journey towards emotional well-being. Your path to healing begins here.`;

const InteractiveRoom = ({ onShowHome }: InteractiveRoomProps) => {
  const nightImageUrl = '/dark.png';
  const dayImageUrl = '/light.png';
  const audioUrl = '/bg.mp3'; // En
  // sure this file exists in /public

  const [isLightMode, setIsLightMode] = useState(false);
  const roomImageRef = useRef<HTMLImageElement | null>(null);
  const areaRef = useRef<HTMLAreaElement | null>(null);
  const [title, setTitle] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  // Audio-related state and ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false); // Start unmuted
  const [musicStarted, setMusicStarted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const hasInteractedRef = useRef(false); // Track user interaction

  const [coords, setCoords] = useState<{ x: number; y: number; r: number }>({
    x: 0,
    y: 0,
    r: 0,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error' | '';
  }>({
    text: '',
    type: '',
  });

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  // Preload images and audio
  useEffect(() => {
    [nightImageUrl, dayImageUrl].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Preload audio
    if (audioRef.current) {
      audioRef.current.preload = 'auto';
      audioRef.current.load();
      audioRef.current.muted = isMuted;
      audioRef.current.volume = 0.5; // Set reasonable volume
    }
  }, []);

  // Attempt to play audio
  const playAudio = () => {
    if (audioRef.current && !musicStarted) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setMusicStarted(true);
            setAudioError(null);
            audioRef.current!.muted = isMuted;
          })
          .catch((error) => {
            console.error('Audio play failed:', error);
            setAudioError('Click the ceiling light or mute button to play audio.');
          });
      }
    }
  };

  // Try to play audio on mount
  useEffect(() => {
    playAudio();
  }, []);

  // Handle light mode toggle and retry audio on first interaction
  const toggleLight = () => {
    const img = roomImageRef.current;
    if (!img) return;

    // Mark that a user interaction has occurred
    hasInteractedRef.current = true;

    img.style.opacity = '0';
    setTimeout(() => {
      if (isLightMode) {
        img.src = nightImageUrl;
        setFormVisible(false);
        setTitle('');
        setCurrentStep(1);
        setName('');
        setEmail('');
        setPhoneNumber('');
        setMessage({ text: '', type: '' });
        setIsLightMode(false);
      } else {
        img.src = dayImageUrl;
        setFormVisible(true);
        setTitle('');
        setIsLightMode(true);
      }
      img.style.opacity = '1';
      updateMapCoordinates();
      // Retry audio playback after user interaction
      if (!musicStarted) {
        playAudio();
      }
    }, 250);
  };

  // Update map coordinates
  const updateMapCoordinates = () => {
    const img = roomImageRef.current;
    const area = areaRef.current;
    if (!img || !area) return;

    const rect = img.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 6);
    const radius = Math.floor(Math.min(width, height) * 0.08);

    area.coords = `${centerX},${centerY},${radius}`;
    setCoords({ x: centerX, y: centerY, r: radius });
  };

  useEffect(() => {
    updateMapCoordinates();
    window.addEventListener('resize', updateMapCoordinates);
    return () => {
      window.removeEventListener('resize', updateMapCoordinates);
    };
  }, []);

  // Prevent scrolling in dark mode
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (!isLightMode) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener(
        'keydown',
        (e) => {
          if (
            ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(
              e.key,
            )
          ) {
            e.preventDefault();
          }
        },
        { passive: false },
      );
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isLightMode]);

  // Update audio mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (currentStep === 1) {
      if (!name.trim()) {
        setMessage({
          text: 'Please enter your name.',
          type: 'error',
        });
      } else {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessage({
          text: 'Please enter a valid email address.',
          type: 'error',
        });
      } else {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      const phoneRegex = /^\d{7,15}$/;
      if (!phoneRegex.test(phoneNumber)) {
        setMessage({
          text: 'Please enter a valid phone number (7-15 digits).',
          type: 'error',
        });
      } else {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/waitlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phoneNumber }),
          });

          const data = await response.json();

          if (!response.ok) {
            setMessage({
              text: data.error || 'Failed to add to waitlist.',
              type: 'error',
            });
            return;
          }

          triggerFireworks();

          setMessage({
            text: data.message || 'Thank you for joining the waitlist!',
            type: 'success',
          });

          setTimeout(() => {
            setCurrentStep(1);
            setName('');
            setEmail('');
            setPhoneNumber('');
            setMessage({ text: '', type: '' });
          }, 5000);
        } catch (error) {
          console.error('API Error:', error);
          setMessage({
            text: 'An error occurred while submitting the form.',
            type: 'error',
          });
        }
      }
    }
  };

  const showHome = () => {
    onShowHome();
    // Retry audio playback on user interaction
    if (!musicStarted) {
      playAudio();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    // Retry audio playback on user interaction
    if (!musicStarted) {
      playAudio();
    }
  };

  const getInputProps = () => {
    if (currentStep === 1) {
      return {
        type: 'text',
        value: name,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value),
        placeholder: 'Enter your name',
        ariaLabel: 'Name',
      };
    } else if (currentStep === 2) {
      return {
        type: 'email',
        value: email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value),
        placeholder: 'Enter your email address',
        ariaLabel: 'Email address',
      };
    } else {
      return {
        type: 'tel',
        value: phoneNumber,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setPhoneNumber(e.target.value),
        placeholder: 'Enter your phone number',
        ariaLabel: 'Phone number',
      };
    }
  };

  const inputProps = getInputProps();

  return (
    <div className="w-screen h-screen bg-[#2c3e50] flex flex-col justify-center items-center text-white relative">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onError={() => setAudioError('Failed to load audio file.')}
      />

      {/* Logo text */}
      <div className={`absolute top-8 left-8 z-40 text-3xl font-semibold ${ibmPlexMono.className}`}>
        <span className={`${isLightMode ? 'text-black' : 'text-[#f4f3f2]'} transition-colors duration-500`}>
          riha.
        </span>
      </div>

      {/* Conditional TextGenerateEffect */}
      {!isLightMode && (
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 max-w-[600px] text-center px-4 ${ibmPlexMono.className}`}>
          <TextGenerateEffect duration={2} filter={false} words={words} />
        </div>
      )}

      <h1 className="absolute top-5 text-center z-40 text-2xl font-semibold">
        {title}
      </h1>

      <img
        ref={roomImageRef}
        src={nightImageUrl}
        alt="Cozy Room"
        useMap="#lightmap"
        className="w-screen h-screen object-cover transition-opacity duration-500 z-10"
      />

      {!isLightMode && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100vh',
            zIndex: 15,
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
      )}

      <map name="lightmap">
        <area
          ref={areaRef}
          shape="circle"
          coords="0,0,0"
          alt="Ceiling Light"
          title="Toggle Ceiling Light"
          onClick={toggleLight}
          aria-label="Toggle Ceiling Light"
        />
      </map>

      {coords.r > 0 && (
        <div
          onClick={toggleLight}
          className="absolute border-2 border-transparent rounded-full animate-pulse cursor-pointer z-20"
          style={{
            left: coords.x - coords.r,
            top: coords.y - coords.r,
            width: coords.r * 2,
            height: coords.r * 2,
          }}
          aria-hidden="true"
        ></div>
      )}

      {formVisible && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 w-11/12 max-w-md text-left z-30 transition-all duration-500">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 w-full"
          >
            <h2 className="text-xl text-gray-900 w-full text-left ml-8 font-semibold">
              Join the waitlist
            </h2>
            <div className="relative w-full">
              <input
                type={inputProps.type}
                value={inputProps.value}
                onChange={inputProps.onChange}
                placeholder={inputProps.placeholder}
                required
                className="w-full p-5 pr-16 text-lg rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:bg-gray-200 outline-none shadow-md"
                aria-label={inputProps.ariaLabel}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition"
                aria-label="Next or submit"
              >
                <ArrowRightIcon className="w-6 h-6 text-white" />
              </button>
            </div>
            {message.text && (
              <div
                className={`mt-2 text-sm text-center w-full ${
                  message.type === 'success'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
                role="alert"
              >
                {message.text}
              </div>
            )}
            {audioError && (
              <div className="mt-2 text-sm text-center w-full text-red-600" role="alert">
                {audioError}
              </div>
            )}
          </form>
        </div>
      )}

      {isLightMode && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-40"
          onClick={showHome}
          role="button"
          aria-label="Show more content"
        >
          <p className="text-lg md:text-xl font-semibold text-white p-4">
            Click to Know More
          </p>
          <ChevronDownIcon className="w-8 h-8 text-white mt-2" />
        </div>
      )}

      <div className="absolute bottom-8 right-8 z-50">
        <button
          onClick={toggleMute}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </div>
    
  );
};

export default InteractiveRoom;