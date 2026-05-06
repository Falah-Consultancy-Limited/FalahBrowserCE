import React, { useState } from 'react';
import ChatWidget from './ChatWidget';
import GroupCard from './GroupCard';
import SpiritualAnchor from './SpiritualAnchor';
import { MOCK_GROUPS, DISCOVER_GROUPS } from '../utils/mockData';
import { TABS, COLORS } from '../utils/constants';

const LanternCentral = () => {
  const [activeTab, setActiveTab] = useState(TABS.INBOX);
  const [groups] = useState(MOCK_GROUPS);
  const [streak] = useState(7);

  const handleOpenPlatform = (platform, url) => {
    window.open(url, '_blank');
  };

  const handlePreview = (groupId) => {
    console.log('Preview group:', groupId);
  };

  const handleJoin = (groupName) => {
    console.log('Join group:', groupName);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <span style={styles.logo}>🏮</span>
          <h1 style={styles.title}>Falah Browser</h1>
        </div>
        <div style={styles.userMenu}>
          <span style={styles.userName}>Guest User</span>
        </div>
      </header>

      <SpiritualAnchor streak={streak} />

      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === TABS.INBOX ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab(TABS.INBOX)}
        >
          Inbox
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === TABS.DISCOVER ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab(TABS.DISCOVER)}
        >
          Discover
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === TABS.INBOX ? (
          <div style={styles.inbox}>
            <h2 style={styles.sectionTitle}>Your Communities</h2>
            {groups.map((group) => (
              <ChatWidget
                key={group.id}
                group={group}
                onOpen={handleOpenPlatform}
                onPreview={handlePreview}
              />
            ))}
          </div>
        ) : (
          <div style={styles.discover}>
            <h2 style={styles.sectionTitle}>Discover Communities</h2>
            {DISCOVER_GROUPS.map((group, index) => (
              <GroupCard
                key={index}
                name={group.name}
                description={group.description}
                members={group.members}
                onJoin={() => handleJoin(group.name)}
              />
            ))}
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2026 Falah Browser - فَلَاح Success through community</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: COLORS.BG,
    color: COLORS.TEXT_PRIMARY,
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    marginBottom: '24px',
    borderBottom: `1px solid ${COLORS.BORDER}`
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logo: {
    fontSize: '32px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: COLORS.GOLD,
    margin: 0
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  userName: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: '14px'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '24px',
    backgroundColor: COLORS.SURFACE,
    borderRadius: '8px',
    padding: '4px'
  },
  tab: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: COLORS.TEXT_SECONDARY,
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  activeTab: {
    backgroundColor: COLORS.GOLD,
    color: COLORS.BG
  },
  content: {
    minHeight: '400px'
  },
  inbox: {
    display: 'flex',
    flexDirection: 'column'
  },
  discover: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: '16px'
  },
  footer: {
    marginTop: '48px',
    padding: '16px 0',
    borderTop: `1px solid ${COLORS.BORDER}`,
    textAlign: 'center'
  },
  footerText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: '12px',
    margin: 0
  }
};

export default LanternCentral;