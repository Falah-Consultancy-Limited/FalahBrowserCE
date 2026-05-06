import React from 'react';
import { COLORS } from '../utils/constants';

const GroupCard = ({ name, description, members, onJoin }) => {
  return (
    <div style={styles.container}>
      <h4 style={styles.name}>{name}</h4>
      <p style={styles.description}>{description}</p>
      <div style={styles.footer}>
        <span style={styles.memberCount}>{members.toLocaleString()} members</span>
        <button style={styles.joinButton} onClick={onJoin}>
          Join Group
        </button>
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
    transition: 'all 0.2s ease'
  },
  name: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 8px 0'
  },
  description: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: '14px',
    marginBottom: '12px',
    lineHeight: '1.5'
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
  joinButton: {
    backgroundColor: COLORS.GOLD,
    color: COLORS.BG,
    border: 'none',
    padding: '6px 16px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

export default GroupCard;