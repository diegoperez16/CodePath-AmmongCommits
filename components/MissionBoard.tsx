'use client';

import { useState } from 'react';
import { Mission } from '@/lib/missions';
import MissionCard from './MissionCard';
import StoryPanel from './StoryPanel';

interface MissionBoardProps {
  user: string;
  missions: Mission[];
  onLogout: () => void;
  onClaimMission: (missionId: string) => void;
  onReleaseMission: (missionId: string) => void;
  onCompleteMission: (missionId: string) => void;
}

export default function MissionBoard({
  user,
  missions,
  onLogout,
  onClaimMission,
  onReleaseMission,
  onCompleteMission,
}: MissionBoardProps) {
  const [selectedCategory, setSelectedCategory] = useState<'detective' | 'unlocked'>('detective');
  const [unlockedAccess, setUnlockedAccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const defaultMissions = missions.filter(m => m.category === 'default');
  const detectiveMissions = missions.filter(m => m.category === 'detective');
  const unlockedMissions = missions.filter(m => m.category === 'unlocked');

  const userMissions = missions.filter(m => m.claimedBy === user);
  const userCompletedMissions = missions.filter(m => m.completedBy.includes(user));

  const handleUnlockAttempt = () => {
    if (passwordInput === 'g1tIsAw3s0m3') {
      setUnlockedAccess(true);
      setShowPasswordPrompt(false);
      setPasswordInput('');
    } else {
      alert('Incorrect password! Fix all detective missions first.');
      setPasswordInput('');
    }
  };

  const handleUnlockedClick = () => {
    if (!unlockedAccess) {
      setShowPasswordPrompt(true);
    } else {
      setSelectedCategory('unlocked');
    }
  };

  // Filter by category, exclude missions claimed by the user (they appear in "Your Active Missions")
  const filteredMissions = (selectedCategory === 'detective' 
    ? detectiveMissions 
    : unlockedMissions
  ).filter(m => m.claimedBy !== user);

  return (
    <div className="board-container">
      {/* Header */}
      <div className="board-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1>MISSION BOARD</h1>
            <div className="user-info">
              <span>Agent: <strong>{user}</strong></span>
              <span>|</span>
              <span>Active: <strong>{userMissions.length}</strong></span>
              <span>|</span>
              <span>Completed: <strong>{userCompletedMissions.length}</strong></span>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a 
                href="https://github.com/diegoperezgandarillas/Neon-Runner-Artifact-Heist" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#4db8a8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>📁</span>
                <span>Game Repository</span>
                <span style={{ fontSize: '12px' }}>↗</span>
              </a>
              <a 
                href="https://education.github.com/git-cheat-sheet-education.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#5dd9c1', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>📋</span>
                <span>Git Cheat Sheet</span>
                <span style={{ fontSize: '12px' }}>↗</span>
              </a>
            </div>
          </div>
          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
      
      {/* Story Panel */}
      <StoryPanel missions={missions} currentUser={user} />

      {/* Default Missions - Required for Everyone */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>
          Required Missions (Complete These First)
        </h2>
        <p style={{ color: '#a0aec0', marginBottom: '20px', fontSize: '14px' }}>
          Everyone must complete these missions to learn Git basics
        </p>
        <div className="missions-grid">
          {defaultMissions.map(mission => (
            <MissionCard
              key={mission.id}
              mission={mission}
              currentUser={user}
              onClaim={onClaimMission}
              onRelease={onReleaseMission}
              onComplete={onCompleteMission}
            />
          ))}
        </div>
      </div>

      {/* Category Filters for Detective/Unlocked */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedCategory('detective')}
          className={selectedCategory === 'detective' ? 'btn btn-release' : 'btn'}
          style={selectedCategory !== 'detective' ? { background: '#4a5568', color: '#fff' } : {}}
        >
          Detective Missions ({detectiveMissions.length})
        </button>
        <button
          onClick={handleUnlockedClick}
          className={selectedCategory === 'unlocked' ? 'btn btn-complete' : 'btn'}
          style={selectedCategory !== 'unlocked' ? { background: '#4a5568', color: '#fff' } : {}}
        >
          {unlockedAccess ? 'Unlocked' : 'Locked'} ({unlockedMissions.length})
        </button>
      </div>

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#1a202c',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #4a5568',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '20px' }}>Unlock Bonus Missions</h3>
            <p style={{ color: '#a0aec0', marginBottom: '20px' }}>Complete all detective missions to get the password!</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlockAttempt()}
              placeholder="Enter password..."
              style={{
                width: '100%',
                padding: '10px',
                background: '#2d3748',
                border: '1px solid #4a5568',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '15px'
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleUnlockAttempt}
                className="btn btn-complete"
                style={{ flex: 1 }}
              >
                Unlock
              </button>
              <button
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPasswordInput('');
                }}
                className="btn"
                style={{ flex: 1, background: '#4a5568', color: '#fff' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User's Active Missions */}
      {userMissions.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#fff' }}>
            Your Active Missions
          </h2>
          <div className="missions-grid">
            {userMissions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                currentUser={user}
                onClaim={onClaimMission}
                onRelease={onReleaseMission}
                onComplete={onCompleteMission}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Missions */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#fff' }}>
          {selectedCategory === 'detective' ? 'Detective Missions - Investigate & Fix Bugs' : 'Unlocked Bonus Missions'}
        </h2>
        <div className="missions-grid">
          {filteredMissions.map(mission => (
            <MissionCard
              key={mission.id}
              mission={mission}
              currentUser={user}
              onClaim={onClaimMission}
              onRelease={onReleaseMission}
              onComplete={onCompleteMission}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
