import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LanternHome = () => {
  const [verse, setVerse] = useState({ text: '', reference: '' });
  const [prayers, setPrayers] = useState(null);
  const [nextPrayer, setNextPrayer] = useState({ name: '', time: '' });
  const [acts, setActs] = useState({ dhikr: 0, quran: 0, sadaqah: false });

  useEffect(() => {
    setVerse(window.falahAPI.getTodayVerse());
    
    const loadData = async () => {
      const p = await window.falahAPI.getPrayerTimes();
      setPrayers(p);
      const a = await window.falahAPI.getSpiritualActs();
      setActs(a);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (prayers) {
      const interval = setInterval(() => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        let found = false;
        for (const name of prayerOrder) {
          const [h, m] = prayers[name].split(':').map(Number);
          const pTime = h * 60 + m;
          if (pTime > currentMinutes) {
            const diff = pTime - currentMinutes;
            const hours = Math.floor(diff / 60);
            const mins = diff % 60;
            const countdown = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
            setNextPrayer({ name, time: countdown });
            found = true;
            break;
          }
        }
        if (!found) {
          const [h, m] = prayers.Fajr.split(':').map(Number);
          const fajrTomorrow = (24 * 60 - currentMinutes) + h * 60 + m;
          const hours = Math.floor(fajrTomorrow / 60);
          const mins = fajrTomorrow % 60;
          setNextPrayer({ name: 'Fajr', time: `${hours}h ${mins}m` });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [prayers]);

  const updateAct = async (act, value) => {
    const updated = await window.falahAPI.updateSpiritualAct(act, value);
    setActs(updated);
  };

  return (
    <div className="min-h-screen bg-falah-indigo text-falah-parchment flex flex-col items-center justify-center p-8 overflow-y-auto">
      {/* Animated Lantern */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-falah-gold/20 blur-3xl rounded-full animate-pulse" />
        <img src="/lantern.png" className="w-48 h-48 relative animate-bounce-slow" alt="Lantern" />
      </div>

      {/* Prayer Countdown */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-serif text-falah-gold mb-2">
          {nextPrayer.name} in {nextPrayer.time}
        </h2>
        <p className="text-gray-400 italic">"Indeed, prayer at fixed times has been enjoined upon the believers."</p>
      </div>

      {/* Daily Verse */}
      <div className="max-w-2xl text-center mb-16 bg-gray-900/50 p-8 rounded-2xl border border-falah-gold/20 shadow-xl">
        <p className="text-xl font-serif leading-relaxed mb-4 italic">"{verse.text}"</p>
        <p className="text-falah-gold font-bold">{verse.reference}</p>
      </div>

      {/* Sunnah Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 text-center hover:border-falah-teal transition-colors">
          <span className="text-4xl mb-4 block">📿</span>
          <h3 className="font-bold mb-2 text-falah-teal">Dhikr</h3>
          <button 
            onClick={() => updateAct('dhikr', acts.dhikr + 1)}
            className="bg-falah-teal/20 text-falah-teal px-4 py-2 rounded-full border border-falah-teal/30 hover:bg-falah-teal hover:text-white transition-all"
          >
            SubhanAllah {acts.dhikr}/100
          </button>
        </div>

        <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 text-center hover:border-falah-gold transition-colors">
          <span className="text-4xl mb-4 block">📖</span>
          <h3 className="font-bold mb-2 text-falah-gold">Quran</h3>
          <div className="flex items-center justify-center space-x-4">
            <button onClick={() => updateAct('quran', Math.max(0, acts.quran - 1))} className="text-2xl">-</button>
            <span className="text-xl">{acts.quran} pages</span>
            <button onClick={() => updateAct('quran', acts.quran + 1)} className="text-2xl">+</button>
          </div>
        </div>

        <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 text-center hover:border-red-400 transition-colors">
          <span className="text-4xl mb-4 block">🤲</span>
          <h3 className="font-bold mb-2 text-red-400">Sadaqah</h3>
          <label className="flex items-center justify-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={acts.sadaqah} 
              onChange={(e) => updateAct('sadaqah', e.target.checked)}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-falah-gold focus:ring-falah-gold"
            />
            <span>I gave charity today</span>
          </label>
          {acts.sadaqah && <p className="text-sm text-green-400 mt-2">Masha'Allah!</p>}
        </div>
      </div>

      <div className="mt-12">
        <Link to="/reflection" className="text-falah-gold hover:underline flex items-center space-x-2">
          <span>Reflect with Falah</span>
          <span>→</span>
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default LanternHome;
