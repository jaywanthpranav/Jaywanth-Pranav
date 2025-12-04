import React, { useState } from 'react';
import { UserResponses } from '../types';

interface IntroScreenProps {
  onMusicStart: () => void;
  onGiftOpened: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onMusicStart, onGiftOpened }) => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [responses, setResponses] = useState<UserResponses>({
    name: "",
    heartCheck: "",
    feeling18: "",
    theme: ""
  });
  const [isGiftVisible, setIsGiftVisible] = useState(false);
  const [isGiftOpening, setIsGiftOpening] = useState(false);

  const nextStep = () => {
    onMusicStart(); // Ensure music starts on first interaction
    
    // Save response logic
    if (step === 1) setResponses(prev => ({ ...prev, name: inputValue }));
    if (step === 2) setResponses(prev => ({ ...prev, heartCheck: inputValue }));
    if (step === 3) setResponses(prev => ({ ...prev, feeling18: inputValue }));
    if (step === 4) setResponses(prev => ({ ...prev, theme: inputValue }));

    setInputValue("");
    setStep(prev => prev + 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() !== "") {
      nextStep();
    }
  };

  const showGift = () => {
    setStep(6); // Move to gift view
    setIsGiftVisible(true);
  };

  const handleGiftClick = () => {
    if (isGiftOpening) return;
    setIsGiftOpening(true);
    // Trigger parent transition
    onGiftOpened();
  };

  // Render Helpers
  const renderInputScreen = (question: React.ReactNode, placeholder: string) => (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto p-6 animate-fadeIn text-center">
      <div className="text-xl md:text-2xl font-light mb-8 leading-relaxed tracking-wide">
        {question}
      </div>
      <input
        autoFocus
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-gray-500 text-center text-xl p-2 focus:outline-none focus:border-soft-pink transition-colors mb-8 placeholder-gray-600"
      />
      <button
        onClick={nextStep}
        disabled={!inputValue.trim()}
        className={`px-6 py-2 rounded-full border border-gray-600 hover:border-soft-pink hover:text-soft-pink transition-all duration-300 ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
      >
        Next ➜
      </button>
    </div>
  );

  // STEP 0: Heeey...
  if (step === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-fadeIn text-center">
        <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-200 leading-normal">
          Heeey… wait, before anything… <br/>
          can I ask you something? 👀
        </h2>
        <button
          onClick={nextStep}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
        >
          Yeah?
        </button>
      </div>
    );
  }

  // STEP 1: Name
  if (step === 1) return renderInputScreen("What should I call you btw?", "Your name...");

  // STEP 2: Heart
  if (step === 2) return renderInputScreen("Okay… and how’s your heart today? Be honest 😌", "Happy? Tired? Full?");

  // STEP 3: 18
  if (step === 3) return renderInputScreen("And tell me something… does turning 18 make you feel like a grown-up or still a cute menace? 😭💗", "Grown up or menace...");

  // STEP 4: Theme
  if (step === 4) return renderInputScreen(<span>If today had a theme, what would it be?<br/>(happy / chaotic / magical / sleepy 😭)</span>, "The theme is...");

  // STEP 5: Summary
  if (step === 5) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-fadeIn w-full">
        <div className="bg-glass-dark backdrop-blur-md p-8 rounded-2xl border border-white/10 max-w-md w-full shadow-2xl">
          <h3 className="text-center font-great-vibes text-4xl mb-6 text-soft-pink">Here’s what you told me 💗</h3>
          
          <div className="space-y-4 font-poppins text-gray-300 text-sm md:text-base">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-60">Name</span>
              <span className="text-white font-medium">{responses.name}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-60">Heart</span>
              <span className="text-white font-medium">{responses.heartCheck}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-60">Feeling 18</span>
              <span className="text-white font-medium">{responses.feeling18}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="opacity-60">Theme</span>
              <span className="text-white font-medium">{responses.theme}</span>
            </div>
          </div>

          <button
            onClick={showGift}
            className="w-full mt-8 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 rounded-lg border border-white/20 transition-all duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // STEP 6: Gift
  if (step === 6) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-fadeIn cursor-pointer" onClick={handleGiftClick}>
        <div className={`transition-transform duration-700 ${isGiftOpening ? 'scale-125' : 'scale-100'}`}>
          <div className="text-[100px] md:text-[140px] animate-heartbeat filter drop-shadow-[0_0_25px_rgba(255,105,180,0.5)] select-none">
            🎁
          </div>
        </div>
        <p className={`mt-8 text-warm-gold text-lg tracking-widest animate-pulse font-light transition-opacity duration-500 ${isGiftOpening ? 'opacity-0' : 'opacity-100'}`}>
          Tap the gift…
        </p>
      </div>
    );
  }

  return null;
};

export default IntroScreen;
