import React, { useState } from 'react';

interface CakeCuttingProps {
  onCakeServed?: () => void;
}

const CakeCutting: React.FC<CakeCuttingProps> = ({ onCakeServed }) => {
  const [step, setStep] = useState<'candles' | 'blowing' | 'blown' | 'cutting' | 'served'>('candles');
  
  const handleBlow = () => {
    setStep('blowing');
    // Transition to fully blown state after smoke rises
    setTimeout(() => {
        setStep('blown');
    }, 2000);
  };

  const handleCut = () => {
    setStep('cutting');
    // Transition to served state
    setTimeout(() => {
        setStep('served');
        if (onCakeServed) {
            // Trigger petal change after slice lands
            setTimeout(onCakeServed, 1000);
        }
    }, 1500);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-romantic-bg transition-colors duration-1000">
      
      {/* Background Soft Pink Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${step === 'served' ? 'opacity-30' : 'opacity-60'}`}></div>

      {/* --- SCENE CONTAINER --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] w-full max-w-2xl">
        
        {/* 1. CANDLE AREA */}
        <div id="candleArea" className="h-[60px] flex gap-4 items-end justify-center z-20 mb-[-30px] transition-all duration-1000">
            {step === 'candles' && (
                <>
                  <div className="text-[55px] animate-emoji-flicker">🕯️</div>
                  <div className="text-[55px] animate-emoji-flicker" style={{ animationDelay: '0.2s' }}>🕯️</div>
                  <div className="text-[55px] animate-emoji-flicker" style={{ animationDelay: '0.4s' }}>🕯️</div>
                </>
            )}
            
            {step === 'blowing' && (
                <>
                  <div className="text-[55px] animate-emoji-smoke">💨</div>
                  <div className="text-[55px] animate-emoji-smoke" style={{ animationDelay: '0.1s' }}>💨</div>
                  <div className="text-[55px] animate-emoji-smoke" style={{ animationDelay: '0.2s' }}>💨</div>
                </>
            )}

            {/* When blown, candles are gone (faded out), no black dots */}
        </div>

        {/* 2. CAKE AREA */}
        <div id="cakeArea" className="relative z-10 mt-[10px] text-center">
             {/* Main Whole Cake Emoji - HUGE */}
             <div className="text-[160px] md:text-[180px] leading-none filter drop-shadow-[0_0_30px_rgba(255,105,180,0.3)] select-none">
                 🎂
             </div>
             
             {/* Knife Overlay */}
             {step === 'cutting' && (
                 <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-30 pointer-events-none">
                     <div className="text-[80px] animate-knife-slide">🔪</div>
                 </div>
             )}
        </div>

        {/* 3. PLATE & SLICE AREA */}
        <div id="plateArea" className="relative mt-[40px] w-full h-[200px] flex items-center justify-center">
            
            {/* The Plate - HUGE */}
            <div className={`text-[150px] absolute transition-all duration-1000 ${
                step === 'served' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                🍽️
            </div>

            {/* The Slice - HUGE, Moving to Plate */}
            <div className={`text-[130px] absolute z-20 transition-all duration-[2000ms] cubic-bezier(0.22, 1, 0.36, 1) ${
                step === 'served' 
                ? 'opacity-100 translate-y-[-10px] scale-100' // Lands on plate
                : 'opacity-0 translate-y-[-120px] scale-90' // Starts hidden near cake
            }`}>
                🍰
            </div>
        </div>

      </div>

      {/* --- CONTROLS --- */}
      <div className={`absolute bottom-24 md:bottom-32 z-20 transition-all duration-1000 ${step === 'served' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {step === 'candles' && (
            <button 
                onClick={handleBlow}
                className="px-12 py-5 bg-white/5 backdrop-blur-md rounded-2xl border border-pink-200/30 text-pink-200 font-playfair text-2xl hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(255,183,178,0.2)]"
            >
                Blow 🎤
            </button>
          )}

          {(step === 'blown' || step === 'cutting') && (
             <button 
                onClick={handleCut}
                disabled={step === 'cutting'}
                className="px-12 py-5 bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-md rounded-2xl border border-pink-200/30 text-pink-100 font-playfair text-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,158,153,0.3)]"
            >
                Cut 🍴
            </button>
          )}
      </div>

      {/* --- FINAL MESSAGE --- */}
      {step === 'served' && (
          <div className="absolute bottom-16 w-full text-center z-30 opacity-0 animate-fadeSlow" style={{ animationDelay: '1.5s' }}>
              <h2 className="font-great-vibes text-5xl md:text-7xl text-rose-gold drop-shadow-lg mb-4">
                  Dessert is ready 🍰💗
              </h2>
              <p className="font-playfair text-xl md:text-2xl text-soft-pink tracking-widest uppercase opacity-90">
                  Happy Birthday, Akshaya ✨🎀
              </p>
          </div>
      )}

    </div>
  );
};

export default CakeCutting;