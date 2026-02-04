'use client';

import { useState } from 'react';
import { Mission } from '@/lib/missions';

interface MissionCardProps {
  mission: Mission;
  currentUser: string;
  onClaim: (missionId: string) => void;
  onRelease: (missionId: string) => void;
  onComplete: (missionId: string) => void;
}

export default function MissionCard({
  mission,
  currentUser,
  onClaim,
  onRelease,
  onComplete,
}: MissionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showEvidenceInput, setShowEvidenceInput] = useState(false);
  const [evidence, setEvidence] = useState('');

  const isClaimedByUser = mission.claimedBy === currentUser;
  const isClaimedByOther = mission.claimedBy && mission.claimedBy !== currentUser;
  const isAvailable = !mission.claimedBy;
  const isCompletedByUser = mission.completedBy.includes(currentUser);
  const isDetectiveMission = mission.category === 'detective';

  const handleComplete = () => {
    if (isDetectiveMission && !showEvidenceInput) {
      setShowEvidenceInput(true);
    } else {
      onComplete(mission.mission_id);
      setShowEvidenceInput(false);
      setEvidence('');
    }
  };

  const getCategoryIcon = () => {
    switch (mission.category) {
      case 'default': return 'DEFAULT';
      case 'detective': return 'DETECTIVE';
      case 'unlocked': return 'UNLOCKED';
      default: return 'MISSION';
    }
  };

  const getStatusBadge = () => {
    if (isCompletedByUser) {
      return <span className="status-badge status-completed">Completed</span>;
    }
    if (isClaimedByUser) {
      return <span className="status-badge status-claimed">Claimed by You</span>;
    }
    if (isClaimedByOther) {
      return <span className="status-badge status-claimed">Claimed by {mission.claimedBy}</span>;
    }
    return <span className="status-badge status-available">Available</span>;
  };

  return (
    <div className={`mission-card ${isAvailable ? 'available' : isClaimedByUser ? 'claimed' : 'completed'}`}>
      <div className="mission-header">
        <div>
          <div className="mission-id">{getCategoryIcon()} {mission.mission_id}</div>
          <h3 className="mission-title">{mission.title}</h3>
        </div>
        {getStatusBadge()}
      </div>

      <p className="mission-description">{mission.description}</p>

      <div className="mission-meta">
        <span>Difficulty: {mission.difficulty}</span>
        <span>Badge: {mission.badge}</span>
      </div>

      {expanded && mission.steps && (
        <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: '#cbd5e0' }}>Steps:</strong>
          <ul style={{ paddingLeft: '20px', color: '#a0aec0', fontSize: '13px', lineHeight: '1.8' }}>
            {mission.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Evidence Input for Detective Missions */}
      {showEvidenceInput && isClaimedByUser && isDetectiveMission && (
        <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '8px' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: '#cbd5e0' }}>Submit Evidence:</strong>
          <textarea
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder="Enter your evidence here (e.g., commit hash, author name, line number, etc.)"
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '10px',
              background: '#2d3748',
              border: '1px solid #4a5568',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '14px',
              resize: 'vertical',
              marginBottom: '10px'
            }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleComplete}
              className="btn btn-complete"
              style={{ flex: 1 }}
              disabled={!evidence.trim()}
            >
              Submit & Complete
            </button>
            <button
              onClick={() => {
                setShowEvidenceInput(false);
                setEvidence('');
              }}
              className="btn"
              style={{ flex: 1, background: '#4a5568', color: '#fff' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mission-actions">
        {mission.steps && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn"
            style={{ background: '#4a5568', color: '#fff' }}
          >
            {expanded ? 'Hide Details' : 'Show Details'}
          </button>
        )}
        
        {isAvailable && !isCompletedByUser && (
          <button onClick={() => onClaim(mission.mission_id)} className="btn btn-claim">
            Claim Mission
          </button>
        )}
        
        {isClaimedByUser && !isCompletedByUser && (
          <>
            <button onClick={handleComplete} className="btn btn-complete">
              {isDetectiveMission ? 'Submit Evidence' : 'Complete'}
            </button>
            <button onClick={() => onRelease(mission.mission_id)} className="btn btn-release">
              Release
            </button>
          </>
        )}
        
        {isCompletedByUser && (
          <button disabled className="btn btn-completed">
            Quest Completed!
          </button>
        )}
      </div>
    </div>
  );
}