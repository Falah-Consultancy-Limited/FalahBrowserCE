import React from 'react';
import { COLORS, PLATFORMS } from '../utils/constants';

const ChatWidget = ({ group, onOpen, onPreview }) => {
  const getPlatformColor = (platform) => {
    switch (platform) {
      case PLATFORMS.TELEGRAM: return '#0088cc';
      case PLATFORMS.DISCORD: return '#5865F2';
      case PLATFORMS.WHATSAPP: return '#25D366';
      default: return COLORS.TEXT_SECONDARY;
    }
  };

  const getPlatformLabel = (platform) => {
    switch (platform) {
      case PLATFORMS.TELEGRAM: return 'Telegram';
      case PLATFORMS.DISCORD: return 'Discord';
      case PLATFORMS.WHATSAPP: return 'WhatsApp';
      default: return platform;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.groupInfo}>
          <h4 style={styles.groupName}>{group.name}</h4>
          <span style={{...styles.platformBadge, backgroundColor: getPlatformColor(group.platform)}}>
            {getPlatformLabel(group.platform)}
          </span>
        </div>
        {group.unread > 0 && (
          <div style={styles.unreadBadge}>{group.unread}</div>
        )}
      </div>

      <p style={styles.lastMessage}>{group.lastMessage}</p>

      <div style={styles.footer}>
        <span style={styles.memberCount}>{group.members.toLocaleString()} members</span>
        <div style={styles.actions}>
          <button
            style={styles.openButton}
            onClick={() => onOpen && onOpen(group.platform, group.url)}
          >
            Open in {getPlatformLabel(group.platform)}
          </button>
          <button
            style={styles.previewButton}
            onClick={() => onPreview && onPreview(group.id)}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    border: `1px solid ${COLORS.BORDER}`,
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  groupInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  groupName: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: '16px',
    fontWeight: '600',
    margin: 0
  },
  platformBadge: {
    color: '#fff',
    fontSize: '11px',
    fontWeight: '600',
    padding: '2px 8px',
    borderRadius: '12px',
    textTransform: 'uppercase'
  },
  unreadBadge: {
    backgroundColor: COLORS.GOLD,
    color: COLORS.BG,
    fontSize: '12px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '10px',
    minWidth: '20px',
    textAlign: 'center'
  },
  lastMessage: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: '14px',
    marginBottom: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  memberCount: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: '12px'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  openButton: {
    backgroundColor: COLORS.JADE,
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  previewButton: {
    backgroundColor: 'transparent',
    color: COLORS.TEXT_SECONDARY,
    border: `1px solid ${COLORS.BORDER}`,
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

export default ChatWidget;