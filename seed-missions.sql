-- First, clear existing missions
DELETE FROM missions;

-- Insert all default missions
INSERT INTO missions (mission_id, title, description, category, difficulty, badge, what_you_learn, steps, claimed_by, claimed_at, completed_by, story_part) VALUES
('default-1', 'Clone and Run', 'Clone the repository and get the game running', 'default', 'Beginner', 'SETUP', 'Clone a repo, run Python code', 
  ARRAY['Clone the repository', 'Create and activate virtual environment', 'Install dependencies with pip', 'Run the game and play for 30 seconds'], 
  NULL, NULL, ARRAY[]::text[], 'intro'),
  
('default-2', 'Make a Branch', 'Create your own branch and push it to remote', 'default', 'Beginner', 'BRANCH', 'Git branching workflow', 
  ARRAY['Create a new branch with your name', 'Make any small change', 'Commit the change', 'Push your branch to remote'], 
  NULL, NULL, ARRAY[]::text[], NULL),
  
('default-3', 'Git Status Check', 'Learn to check the status of your repository', 'default', 'Beginner', 'INFO', 'Using git status to track changes', 
  ARRAY['Run git status in your terminal', 'Make a small change to any file', 'Run git status again and observe the difference', 'Use git diff to see what changed'], 
  NULL, NULL, ARRAY[]::text[], NULL),
  
('default-4', 'Stage and Commit', 'Master the staging area and commit process', 'default', 'Beginner', 'STAGE', 'Git staging area workflow', 
  ARRAY['Create or modify a file', 'Use git add to stage the file', 'Check status to see staged changes', 'Commit with a descriptive message using git commit -m'], 
  NULL, NULL, ARRAY[]::text[], NULL),
  
('default-5', 'View File History', 'See all changes made to a specific file', 'default', 'Beginner', 'HIST', 'Using git log for files', 
  ARRAY['Use git log -- <filename> to see file history', 'Try git log -p -- <filename> to see actual changes', 'Use git blame <filename> to see who changed what', 'Explore different log formatting options'], 
  NULL, NULL, ARRAY[]::text[], 'team');

-- Insert detective missions
INSERT INTO missions (mission_id, title, description, category, difficulty, badge, what_you_learn, steps, claimed_by, claimed_at, completed_by, story_part) VALUES
('detective-1', 'List All Collaborators', 'Find all developers who worked on this project', 'detective', 'Easy', 'TEAM', 'Using git log to find contributors', 
  ARRAY['Use git log --format="%an" | sort | uniq to list all authors', 'Count how many commits each person made', 'Submit evidence: List all 5 collaborators names'], 
  NULL, NULL, ARRAY[]::text[], 'team'),
  
('detective-2', 'Count the Files', 'How many files compose the game?', 'detective', 'Easy', 'FILES', 'Exploring repository structure', 
  ARRAY['Use ls -R or find to list all files', 'Count Python files specifically', 'Look in game/ directory', 'Submit evidence: Total number of .py files'], 
  NULL, NULL, ARRAY[]::text[], NULL),
  
('detective-3', 'Find Suspicious Commits', 'Search for commits with suspicious messages', 'detective', 'Medium', 'SEARCH', 'Searching git history', 
  ARRAY['Use git log --all --grep="optimization" to find optimization commits', 'Check commits with words like "fix", "improve", "optimize"', 'Note the commit hashes and authors', 'Submit evidence: Who made the most "optimization" commits?'], 
  NULL, NULL, ARRAY[]::text[], 'tension'),
  
('detective-4', 'Why Can''t I See Coins?', 'Coins should be visible but they''re not. Find and fix the rendering bug!', 'detective', 'Easy', 'COIN', 'Using git log and git diff to find bugs', 
  ARRAY['Search for commits about rendering or optimization', 'Check suspicious commits with git show', 'Look at main.py around line 85', 'Replace "pass" with proper rendering code', 'Submit evidence: Commit hash that broke it and who made it'], 
  NULL, NULL, ARRAY[]::text[], 'sabotage'),
  
('detective-5', 'Enemies Are Too Fast!', 'Enemies move at lightning speed. Slow them down!', 'detective', 'Easy', 'SPEED', 'Finding value changes in config files', 
  ARRAY['Search for enemy or speed related commits', 'Check game/constants.py for ENEMY_SPEED', 'Find what the value was changed from/to', 'Change value from 20 back to 2', 'Submit evidence: Original value and who changed it'], 
  NULL, NULL, ARRAY[]::text[], 'sabotage'),
  
('detective-6', 'Score Goes Down!', 'Collecting coins decreases your score instead of increasing it', 'detective', 'Easy', 'SCORE', 'Finding logic bugs', 
  ARRAY['Search for scoring commits', 'Check game/player.py add_score method', 'Find the broken operator', 'Fix the operator from -= to +=', 'Submit evidence: Line number and culprit'], 
  NULL, NULL, ARRAY[]::text[], 'sabotage'),
  
('detective-7', 'Enemies Don''t Hurt Me', 'Player is invincible - enemies don''t cause damage', 'detective', 'Medium', 'DAMAGE', 'Finding boolean logic bugs', 
  ARRAY['Search for collision commits', 'Check game/level.py around line 63', 'Find the added condition that breaks collision', 'Remove "and False" from the condition', 'Submit evidence: Commit that added it'], 
  NULL, NULL, ARRAY[]::text[], 'evidence'),
  
('detective-8', 'Controls Are Backwards!', 'Left goes right, right goes left. Fix the controls!', 'detective', 'Medium', 'CONTROL', 'Finding swapped values', 
  ARRAY['Search for control or movement commits', 'Check main.py around lines 53-60', 'Identify the swapped values', 'Swap the dx values for left/right back', 'Submit evidence: Date of the breaking commit'], 
  NULL, NULL, ARRAY[]::text[], 'evidence'),
  
('detective-9', 'The Pattern Emerges', 'Analyze all the bugs you found - is there a pattern?', 'detective', 'Hard', 'PATTERN', 'Connecting the dots in git history', 
  ARRAY['Review all the commits you found that caused bugs', 'Check if they share the same author', 'Look at the commit messages - do they seem innocent?', 'Check the dates - when did the sabotage start?', 'Submit evidence: Name of the saboteur'], 
  NULL, NULL, ARRAY[]::text[], 'resolution');

-- Insert unlocked missions
INSERT INTO missions (mission_id, title, description, category, difficulty, badge, what_you_learn, steps, claimed_by, claimed_at, completed_by, story_part) VALUES
('unlocked-1', 'Collect 10 Coins', 'Play the game and collect exactly 10 coins', 'unlocked', 'Challenge', 'PLAY', 'Playing a working game!', 
  ARRAY['Make sure all detective missions are fixed', 'Play and collect 10 coins', 'Take a screenshot of your score', 'Bonus: Can you get 100 points?'], 
  NULL, NULL, ARRAY[]::text[], NULL),
  
('unlocked-2', 'Survive 30 Seconds', 'Stay alive for 30 seconds without dying', 'unlocked', 'Challenge', 'SURVIVE', 'Game balance and survival skills', 
  ARRAY['Fix all bugs first', 'Survive for 30 seconds', 'Note your final score', 'Bonus: Can you survive 60 seconds?'], 
  NULL, NULL, ARRAY[]::text[], NULL),
  
('unlocked-3', 'Add Power-Up System', 'Implement a new feature: collectible power-ups', 'unlocked', 'Advanced', 'POWERUP', 'Adding new features to existing code', 
  ARRAY['Create a new PowerUp class', 'Add power-up spawning logic', 'Implement power-up effects (speed boost, shield, etc.)', 'Test thoroughly and commit'], 
  NULL, NULL, ARRAY[]::text[], NULL);
