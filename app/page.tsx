'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MISSIONS, Mission } from '@/lib/missions';
import LoginScreen from '@/components/LoginScreen';
import MissionBoard from '@/components/MissionBoard';

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [missions, setMissions] = useState<Mission[]>(MISSIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('workshop_user');
    if (savedUser) {
      setUser(savedUser);
    }
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*');

      if (error) {
        console.error('Error loading missions:', error);
        // Use default missions if DB fails
        setMissions(MISSIONS);
      } else if (data && data.length > 0) {
        // Map DB data to Mission format, merge with default missions
        const dbMissionIds = new Set(data.map((m: any) => m.mission_id));
        
        const mappedMissions = MISSIONS.map((mission) => {
          const dbMission = data.find((m: any) => m.mission_id === mission.mission_id);
          if (dbMission) {
            return {
              ...mission,
              claimedBy: dbMission.claimed_by,
              claimedAt: dbMission.claimed_at,
              completedBy: dbMission.completed_by || []
            };
          }
          return mission;
        });
        
        setMissions(mappedMissions);
      } else {
        // No data in DB, use default missions
        setMissions(MISSIONS);
      }
    } catch (err) {
      console.error('Error:', err);
      setMissions(MISSIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username: string) => {
    try {
      // Save user to Supabase
      const { data, error } = await supabase
        .from('users')
        .insert([{ username }] as any)
        .select()
        .single();

      if (error && error.code !== '23505') { // Ignore duplicate username errors
        console.error('Error saving user:', error);
      }

      // Save to localStorage
      localStorage.setItem('workshop_user', username);
      setUser(username);
    } catch (err) {
      console.error('Login error:', err);
      // Still allow login even if DB fails
      localStorage.setItem('workshop_user', username);
      setUser(username);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('workshop_user');
    setUser(null);
  };

  const handleClaimMission = async (missionId: string) => {
    if (!user) return;

    try {
      // Update in Supabase
      const mission = missions.find(m => m.mission_id === missionId);
      
      const { error } = await supabase
        .from('missions')
        .upsert({
          mission_id: missionId,
          title: mission?.title || '',
          description: mission?.description || '',
          category: mission?.category || 'anytime',
          difficulty: mission?.difficulty || '',
          claimed_by: user,
          claimed_at: new Date().toISOString(),
          completed_by: mission?.completedBy || []
        } as any, {
          onConflict: 'mission_id'
        });

      if (error) {
        console.error('Error claiming mission:', error);
      }

      // Update local state
      setMissions(missions.map(m => 
        m.mission_id === missionId 
          ? { ...m, claimedBy: user, claimedAt: new Date().toISOString() }
          : m
      ));
    } catch (err) {
      console.error('Claim error:', err);
    }
  };

  const handleReleaseMission = async (missionId: string) => {
    if (!user) return;

    try {
      const mission = missions.find(m => m.mission_id === missionId);
      
      const { error } = await supabase
        .from('missions')
        .upsert({
          mission_id: missionId,
          title: mission?.title || '',
          description: mission?.description || '',
          category: mission?.category || 'anytime',
          difficulty: mission?.difficulty || '',
          claimed_by: null,
          claimed_at: null,
          completed_by: mission?.completedBy || []
        } as any, {
          onConflict: 'mission_id'
        });

      if (error) {
        console.error('Error releasing mission:', error);
      }

      setMissions(missions.map(m => 
        m.mission_id === missionId 
          ? { ...m, claimedBy: null, claimedAt: null }
          : m
      ));
    } catch (err) {
      console.error('Release error:', err);
    }
  };

  const handleCompleteMission = async (missionId: string) => {
    if (!user) return;

    try {
      const mission = missions.find(m => m.mission_id === missionId);
      const newCompletedBy = [...(mission?.completedBy || []), user];
      
      const { error } = await supabase
        .from('missions')
        .upsert({
          mission_id: missionId,
          title: mission?.title || '',
          description: mission?.description || '',
          category: mission?.category || 'anytime',
          difficulty: mission?.difficulty || '',
          claimed_by: null,
          claimed_at: null,
          completed_by: newCompletedBy
        } as any, {
          onConflict: 'mission_id'
        });

      if (error) {
        console.error('Error completing mission:', error);
      }

      setMissions(missions.map(m => 
        m.mission_id === missionId 
          ? { ...m, claimedBy: null, claimedAt: null, completedBy: newCompletedBy }
          : m
      ));
    } catch (err) {
      console.error('Complete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-2xl text-cyan-400 animate-pulse">Loading Mission Board...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <MissionBoard
      user={user}
      missions={missions}
      onLogout={handleLogout}
      onClaimMission={handleClaimMission}
      onReleaseMission={handleReleaseMission}
      onCompleteMission={handleCompleteMission}
    />
  );
}
