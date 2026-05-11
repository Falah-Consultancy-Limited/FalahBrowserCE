import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [settings, setSettings] = useState({
    guidanceLevel: 'Advisory',
    voiceStyle: 'Gentle',
    reminders: { prayer: true, sunnah: true, mosque: true },
    location: { city: 'London', country: 'UK' },
    charityLink: 'https://www.islamic-relief.org.uk/',
    darkMode: true
  });

  useEffect(() => {
    const loadSettings = async () => {
      const s = await window.falahAPI.getSettings();
      if (s) setSettings(s);
    };
    loadSettings();
  }, []);

  const save = async (newSettings) => {
    setSettings(newSettings);
    await window.falahAPI.setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-falah-indigo text-falah-parchment p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif text-falah-gold">Preferences</h1>
          <Link to="/" className="text-gray-400 hover:text-white">✕ Close</Link>
        </div>

        <div className="space-y-12">
          {/* Guidance Level */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Guidance Level</h2>
            <div className="flex bg-gray-900 rounded-xl p-1">
              {['Advisory', 'Caution', 'Strict'].map(level => (
                <button
                  key={level}
                  onClick={() => save({ ...settings, guidanceLevel: level })}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    settings.guidanceLevel === level ? 'bg-falah-gold text-falah-indigo font-bold' : 'hover:bg-gray-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </section>

          {/* Voice Style */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Falah's Voice</h2>
            <div className="flex bg-gray-900 rounded-xl p-1">
              {['Gentle', 'Scholarly', 'Parental'].map(style => (
                <button
                  key={style}
                  onClick={() => save({ ...settings, voiceStyle: style })}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    settings.voiceStyle === style ? 'bg-falah-teal text-white font-bold' : 'hover:bg-gray-800'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </section>

          {/* Reminders */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Spiritual Reminders</h2>
            <div className="space-y-4">
              {Object.entries(settings.reminders).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <span className="capitalize">{key} Notifications</span>
                  <input 
                    type="checkbox" 
                    checked={val} 
                    onChange={(e) => save({ ...settings, reminders: { ...settings.reminders, [key]: e.target.checked } })}
                    className="w-6 h-6 rounded border-gray-700 bg-gray-800 text-falah-gold focus:ring-falah-gold"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Location</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={settings.location.city}
                onChange={(e) => save({ ...settings, location: { ...settings.location, city: e.target.value } })}
                className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 outline-none focus:border-falah-gold"
              />
              <input
                type="text"
                placeholder="Country"
                value={settings.location.country}
                onChange={(e) => save({ ...settings, location: { ...settings.location, country: e.target.value } })}
                className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 outline-none focus:border-falah-gold"
              />
            </div>
          </section>

          {/* Charity Link */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Charity Link</h2>
            <input
              type="url"
              placeholder="https://www.islamic-relief.org.uk/"
              value={settings.charityLink}
              onChange={(e) => save({ ...settings, charityLink: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 outline-none focus:border-falah-gold"
            />
          </section>

          {/* Appearance */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Appearance</h2>
            <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-800">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => save({ ...settings, darkMode: e.target.checked })}
                className="w-6 h-6 rounded border-gray-700 bg-gray-800 text-falah-gold focus:ring-falah-gold"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
