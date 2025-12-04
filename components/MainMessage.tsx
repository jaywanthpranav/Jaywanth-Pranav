import React, { useEffect, useState } from 'react';

const messageText = "I don't know how to express it perfectly, but you make things feel a little warmer, a little softer, a little better. Wishing you a very Happy Birthday ❤️";
const words = messageText.split(" ");

// Animation constants (in ms)
const WORD_FADE_DURATION = 1400;
const WORD_INTERVAL = 420;

interface MainMessageProps {
  onUnlockCake: () => void;
}

const MainMessage: React.FC<MainMessageProps> = ({ onUnlockCake }) => {
  const [showSignature, setShowSignature] = useState(false);
  const [showSecretButton, setShowSecretButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Calculate when the last word finishes appearing
    const totalTime = (words.length * WORD_INTERVAL) + WORD_FADE_DURATION + 1500; // +1500 for heading delay
    
    // Show signature
    const sigTimer = setTimeout(() => {
      setShowSignature(true);
      
      // Show secret button 1.2s AFTER signature
      setTimeout(() => {
          setShowSecretButton(true);
      }, 1200);

    }, totalTime - 500); 

    return () => clearTimeout(sigTimer);
  }, []);

  const handleSecretClick = () => {
      setIsFadingOut(true);
      // Wait for button fade out then trigger transition
      setTimeout(() => {
          onUnlockCake();
      }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 z-20">
      
      {/* Background ambient glow specific to main message */}
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Heading */}
        <h1 className="font-great-vibes text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-soft-pink to-pink-200 mb-16 opacity-0 translate-y-2 animate-fadeSlow drop-shadow-[0_2px_10px_rgba(255,105,180,0.3)]">
          Akshaya 💫
        </h1>

        {/* Message Container */}
        <div className="font-poppins text-lg md:text-2xl text-gray-100 leading-[1.8] md:leading-[2] tracking-wide font-light flex flex-wrap justify-center gap-[0.35em]">
          {words.map((word, index) => (
            <span
              key={index}
              className="inline-block opacity-0 will-change-opacity"
              style={{
                // We reference the global CSS keyframe 'wordReveal' defined in index.html
                animation: `wordReveal ${WORD_FADE_DURATION}ms ease-out forwards`,
                animationDelay: `${(index * WORD_INTERVAL) + 1500}ms`, // Staggered start after heading
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Signature */}
        <div 
          className={`mt-20 text-right pr-8 transition-all duration-[2000ms] ease-out transform ${
            showSignature ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-dancing text-4xl md:text-5xl text-warm-gold rotate-[-2deg]">
            — Jay
          </p>
        </div>
        
        {/* Secret Button (Pink Glow) */}
        <div className={`mt-24 transition-all duration-1000 ${showSecretButton ? 'opacity-100' : 'opacity-0'} ${isFadingOut ? 'opacity-0 scale-90' : ''}`}>
             <button
                onClick={handleSecretClick} 
                className="px-8 py-3 rounded-full bg-soft-pink/10 border border-soft-pink/40 text-soft-pink font-poppins text-sm tracking-widest shadow-[0_0_20px_rgba(255,154,158,0.3)] hover:shadow-[0_0_35px_rgba(255,154,158,0.6)] hover:bg-soft-pink/20 transition-all duration-500 animate-pulse-slow backdrop-blur-sm"
             >
                 Access Code: 18
             </button>
        </div>

      </div>
    </div>
  );
};

export default MainMessage;