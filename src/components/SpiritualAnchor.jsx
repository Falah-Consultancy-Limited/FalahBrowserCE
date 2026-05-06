import React, { useState, useEffect } from 'react';
import { PRAYER_TIMES, MOCK_VERSES } from '../utils/mockData';
import { COLORS } from '../utils/constants';

const SpiritualAnchor = ({ prayerTime, dailyVerse, streak }) => {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [currentPrayer, setCurrentPrayer] = useState({ name: '', time: '' });

  useEffect(() => {
    const prayers = [
      { name: 'Fajr', time: PRAYER_TIMES.fajr },
      { name: 'Dhuhr', time: PRAYER_TIMES.dhuhr },
      { name: 'Asr', time: PRAYER_TIMES.asr },
      { name: 'Maghrib', time: PRAYER_TIMES.maghrib },
      { name: 'Isha', time: PRAYER_TIMES.isha }
    ];

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let nextPrayer = prayers[0];
    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      if (prayerTime > currentTime) {
        nextPrayer = prayer;
        break;
      }
    }
    setCurrentPrayer(nextPrayer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % MOCK_VERSES.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const verse = dailyVerse || MOCK_VERSES[currentVerseIndex];

  return (
    <div style={styles.container}>
      <div style={styles.prayerSection}>
        <h3 style={styles.sectionTitle}>Next Prayer</h3>
        <div style={styles.prayerTime}>
          <span style={styles.prayerName}>{currentPrayer.name || prayerTime?.name}</span>
          <span style={styles.prayerTimeValue}>{currentPrayer.time || prayerTime?.time}</span>
        </div>
      </div>

      <div style={styles.verseSection}>
        <h3 style={styles.sectionTitle}>Today's Verse</h3>
        <p style={styles.arabicText}>{verse.arabic}</p>
        <p style={styles.englishText}>{verse.english}</p>
        <span style={styles.surahText}>{verse.surah}</span>
      </div>

      <div style={styles.streakSection}>
        <h3 style={styles.sectionTitle}>Dua Streak</h3>
        <div style={styles.streakCount}>{streak || 0}</div>
        <p style={styles.streakLabel}>days</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    padding: '20px',
    backgroundColor: COLORS.SURFACE,
    borderRadius: '12px',
    marginBottom: '24px'
  },
  sectionTitle: {
    color: COLORS.GOLD,
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px'
  },
  prayerSection: {
    textAlign: 'center'
  },
  prayerTime: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  prayerName: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: '20px',
    fontWeight: '700'
  },
  prayerTimeValue: {
    color: COLORS.JADE,
    fontSize: '24px',
    fontWeight: '700'
  },
  verseSection: {
    textAlign: 'center',
    padding: '0 16px',
    borderLeft: `1px solid ${COLORS.BORDER}`,
    borderRight: `1px solid ${COLORS.BORDER}`
  },
  arabicText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: '18px',
    fontFamily: 'serif',
    lineHeight: '1.8',
    marginBottom: '8px',
    direction: 'rtl'
  },
  englishText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: '14px',
    marginBottom: '4px'
  },
  surahText: {
    color: COLORS.GOLD,
    fontSize: '12px',
    fontStyle: 'italic'
  },
  streakSection: {
    textAlign: 'center'
  },
  streakCount: {
    color: COLORS.JADE,
    fontSize: '36px',
    fontWeight: '700',
    lineHeight: '1'
  },
  streakLabel: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: '12px',
    marginTop: '4px'
  }
};

export default SpiritualAnchor;