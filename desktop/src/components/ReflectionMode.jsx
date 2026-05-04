import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReflectionMode = () => {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setText(''); // We save nothing as per requirements
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full text-center">
        {!submitted ? (
          <>
            <h1 className="text-4xl font-serif text-falah-gold mb-8 animate-fade-in">
              Sacred Space
            </h1>
            <p className="text-gray-400 mb-12 italic">
              "In the privacy of your heart, you can write it here. Nothing is saved."
            </p>
            
            <textarea 
              className="w-full h-64 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-xl text-falah-parchment outline-none focus:border-falah-gold/50 transition-all resize-none mb-8 shadow-2xl"
              placeholder="Is there anything you wish you hadn't seen today?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button 
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="px-12 py-4 bg-falah-gold text-falah-indigo font-bold rounded-full hover:bg-falah-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              I'm okay
            </button>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="text-6xl mb-8">✨</div>
            <h2 className="text-3xl font-serif text-falah-parchment mb-8">
              May Allah purify our hearts and guide our eyes.
            </h2>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12">
              <p className="text-lg italic text-gray-300">
                "O Allah, I seek refuge in You from knowledge that does not benefit, from a heart that is not humble, from a soul that is not satisfied, and from a supplication that is not answered."
              </p>
            </div>
            <Link 
              to="/" 
              className="text-falah-gold hover:underline"
            >
              Return to Falah
            </Link>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default ReflectionMode;
