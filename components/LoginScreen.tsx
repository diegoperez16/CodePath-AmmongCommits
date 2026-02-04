'use client';

import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Among Commits</h1>
        <p className="login-subtitle">Git Workshop</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Agent Codename
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="enter_your_codename"
              className="form-input"
              maxLength={30}
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim()}
            className="btn-primary"
          >
            Launch Mission Board
          </button>
        </form>
        
        <p className="text-center mb-20" style={{ marginTop: '20px', fontSize: '13px', color: '#718096' }}>
          Ready to master Git? Let's go!
        </p>
      </div>
    </div>
  );
}
