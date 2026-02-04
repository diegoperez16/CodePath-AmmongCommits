export interface Mission {
  id: string;
  mission_id: string;
  title: string;
  description: string;
  category: 'default' | 'detective' | 'unlocked';
  difficulty: string;
  badge: string;
  whatYouLearn: string;
  steps: string[];
  claimedBy: string | null;
  claimedAt: string | null;
  completedBy: string[];
  evidence?: string;
  storyPart?: string;
}

export const STORY_PARTS = {
  team: "The Neon Runner game was developed by a team of 5 talented developers: Vivi, Carlos, Pierre, Diego, and Alfredo. They worked together for months, building the game from scratch.",
  culprit: "After investigating the git history, a pattern emerges. All the breaking commits trace back to one developer: Alfredo. He's the one who introduced the bugs.",
  sabotage: "The bugs weren't accidents - they were deliberate. Someone sabotaged the coin rendering, enemy speeds, scoring system, and more. Each change broke something critical.",
  evidence: "By examining the commits in detail, you can see Alfredo's sabotage strategy: subtle changes to game mechanics that looked innocent but completely broke gameplay.",
  tension: "Why would Alfredo do this? Looking at the commit timeline and team communications, it becomes clear: he felt overlooked and undervalued by the team despite his contributions.",
  resolution: "Through Git investigation, you've uncovered the whole story. By reverting his sabotage commits, the game is fixed. The team now understands what happened and can address the real issue - making everyone feel valued."
};

export const MISSIONS: Mission[] = [
  // DEFAULT MISSIONS - Everyone must complete these
  {
    id: '1',
    mission_id: 'default-1',
    title: 'Clone and Run',
    description: 'Clone the repository and get the game running',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'SETUP',
    whatYouLearn: 'Clone a repo, run Python code',
    steps: [
      'Clone the repository',
      'Create and activate virtual environment',
      'Install dependencies with pip',
      'Run the game and play for 30 seconds'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '2',
    mission_id: 'default-2',
    title: 'Make a Branch',
    description: 'Create your own branch and push it to remote',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'BRANCH',
    whatYouLearn: 'Git branching workflow',
    steps: [
      'Create a new branch with your name',
      'Make any small change',
      'Commit the change',
      'Push your branch to remote'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '3',
    mission_id: 'default-3',
    title: 'Git Status Check',
    description: 'Learn to check the status of your repository',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'INFO',
    whatYouLearn: 'Using git status to track changes',
    steps: [
      'Run git status in your terminal',
      'Make a small change to any file',
      'Run git status again and observe the difference',
      'Use git diff to see what changed'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '4',
    mission_id: 'default-4',
    title: 'Stage and Commit',
    description: 'Master the staging area and commit process',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'STAGE',
    whatYouLearn: 'Git staging area workflow',
    steps: [
      'Create or modify a file',
      'Use git add to stage the file',
      'Check status to see staged changes',
      'Commit with a descriptive message using git commit -m'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '5',
    mission_id: 'default-5',
    title: 'View File History',
    description: 'See all changes made to a specific file',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'HIST',
    whatYouLearn: 'Using git log for files',
    steps: [
      'Use git log -- <filename> to see file history',
      'Try git log -p -- <filename> to see actual changes',
      'Use git blame <filename> to see who changed what',
      'Explore different log formatting options'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '27',
    mission_id: 'default-6',
    title: 'Experiment Safely',
    description: 'Create a feature branch to try changing the game without breaking main',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'MERGE',
    whatYouLearn: 'Safe experimentation with branches',
    steps: [
      'Create experiment branch: git checkout -b my-experiment',
      'Change PLAYER_CHAR in game/constants.py to something fun',
      'Commit your change: git commit -am "trying new player"',
      'Return to main: git checkout main',
      'See your change is gone! Merge it: git merge my-experiment'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '28',
    mission_id: 'default-7',
    title: 'Keep History Clean',
    description: 'Use rebase to organize your game modifications before sharing',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'REBASE',
    whatYouLearn: 'Organizing commits with rebase',
    steps: [
      'Create branch: git checkout -b feature-additions',
      'Make 2 small changes to the game (colors, speeds, etc)',
      'Meanwhile, main gets updated - simulate with git checkout main',
      'Return to feature: git checkout feature-additions',
      'Rebase onto main: git rebase main',
      'Your changes now appear after main updates!'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '29',
    mission_id: 'default-8',
    title: 'Time Travel Through Code',
    description: 'Create versions then jump between them using HEAD~',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'REFS',
    whatYouLearn: 'Navigating history with HEAD~',
    steps: [
      'Make 3 quick commits: change PLAYER_CHAR to X, then O, then @',
      'Check history: git log --oneline (see your 3 commits)',
      'Go back one: git checkout HEAD~1 (now player is O)',
      'Go back two: git checkout HEAD~2 (now player is X)',
      'Back to latest: git checkout main (player is @ again)',
      'Create branch at version 2: git branch old-version HEAD~2'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '30',
    mission_id: 'default-9',
    title: 'Borrow Good Ideas',
    description: 'Copy a specific commit from one branch to another',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'CHERRY',
    whatYouLearn: 'Cherry-picking specific changes',
    steps: [
      'Branch A: git checkout -b speed-test, change SPEED=5, commit',
      'Branch B: git checkout -b color-test, change BG_COLOR=blue, commit',
      'Back to main: git checkout main',
      'Get just the speed fix: git cherry-pick speed-test',
      'Check game/constants.py - speed changed but not color!'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '31',
    mission_id: 'default-10',
    title: 'Polish Your Changes',
    description: 'Clean up messy commits before sharing',
    category: 'default',
    difficulty: 'Advanced',
    badge: 'INTERACTIVE',
    whatYouLearn: 'Interactive rebase for commit cleanup',
    steps: [
      'Make 3 commits: "fix", "oops", "actually fix" (change SPEED each time)',
      'Messy history! Clean it: git rebase -i HEAD~3',
      'Try "reword" to rename "fix" to "Update game speed"',
      'Use "squash" to merge "oops" into previous commit',
      'Save and exit - now you have 2 clean commits!'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '32',
    mission_id: 'default-11',
    title: 'Undo Experiments',
    description: 'Create then undo commits using branch forcing',
    category: 'default',
    difficulty: 'Advanced',
    badge: 'FORCE',
    whatYouLearn: 'Moving branches and undoing changes',
    steps: [
      'Create test branch: git checkout -b experiment',
      'Make 2 "bad" commits (set SPEED=999, then SPEED=0)',
      'Oops! Force branch back: git branch -f experiment HEAD~2',
      'Or from main: git reset --hard HEAD~1 (if you committed there)',
      'Check git log - those commits are gone!'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '33',
    mission_id: 'default-12',
    title: 'Choose Your Undo',
    description: 'Learn three levels of undo: soft, mixed, hard',
    category: 'default',
    difficulty: 'Advanced',
    badge: 'RESET',
    whatYouLearn: 'Understanding reset options',
    steps: [
      'Make commit: change BG_COLOR and commit',
      'Soft undo: git reset --soft HEAD~1 (git status: still staged!)',
      'Commit again, then: git reset --mixed HEAD~1 (unstaged now)',
      'Stage and commit, then: git reset --hard HEAD~1 (totally gone!)',
      'Each reset level gives different control over your changes'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '34',
    mission_id: 'default-13',
    title: 'Mark Milestones',
    description: 'Create game versions and tag them for easy access',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'TAG',
    whatYouLearn: 'Creating version tags',
    steps: [
      'Make commit with SPEED=3, tag it: git tag v1.0-slow',
      'Make commit with SPEED=5, tag it: git tag v1.1-medium',
      'Make commit with SPEED=8, tag it: git tag v1.2-fast',
      'View tags: git tag (see all three!)',
      'Jump back: git checkout v1.0-slow (speed is 3 again!)'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '35',
    mission_id: 'default-14',
    title: 'Peek at History',
    description: 'Create history then safely explore it in detached HEAD',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'DETACHED',
    whatYouLearn: 'Working in detached HEAD state',
    steps: [
      'Make 3 commits changing PLAYER_CHAR: first "A", then "B", then "C"',
      'Get commit hash: git log --oneline (copy the "A" commit hash)',
      'Jump there: git checkout <hash> (detached HEAD warning - OK!)',
      'Check constants.py - it shows "A"! Make a test change',
      'Save it: git branch test-branch, then git checkout main',
      'Your main still has "C", test-branch has your experiment!'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '36',
    mission_id: 'default-15',
    title: 'Sync With Team',
    description: 'Download updates from your team without losing your work',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'FETCH',
    whatYouLearn: 'Fetch vs pull strategies',
    steps: [
      'Download updates without applying: git fetch',
      'See what\'s new: git log origin/main..main',
      'Decide: merge or rebase the updates?',
      'Quick sync: git pull (downloads + merges)',
      'Clean sync: git pull --rebase (downloads + rebases)'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  
  // DETECTIVE MISSIONS - Investigation missions
  {
    id: '6',
    mission_id: 'detective-1',
    title: 'List All Collaborators',
    description: 'Find all developers who worked on this project',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'TEAM',
    whatYouLearn: 'Using git log to find contributors',
    steps: [
      'Use git log --format="%an" | sort | uniq to list all authors',
      'Count how many commits each person made',
      'Submit evidence: List all 5 collaborators names'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'team'
  },
  {
    id: '7',
    mission_id: 'detective-2',
    title: 'Count the Files',
    description: 'How many files compose the game?',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'FILES',
    whatYouLearn: 'Exploring repository structure',
    steps: [
      'Use ls -R or find to list all files',
      'Count Python files specifically',
      'Look in game/ directory',
      'Submit evidence: Total number of .py files'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '8',
    mission_id: 'detective-3',
    title: 'Identify the Saboteur',
    description: 'Analyze commit history to find who made suspicious changes',
    category: 'detective',
    difficulty: 'Medium',
    badge: 'SEARCH',
    whatYouLearn: 'Using git log to track authors and patterns',
    steps: [
      'Use git log --all --oneline to see all commits',
      'Use git log --author="<name>" to filter by author',
      'Check each developer\'s commits for file changes',
      'Look for patterns in timing and files modified',
      'Submit evidence: Name of the developer who made the most suspicious commits'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'culprit'
  },
  {
    id: '9',
    mission_id: 'detective-4',
    title: 'Fix: Coins Not Visible',
    description: 'Find the commit that broke coin rendering and revert it',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'COIN',
    whatYouLearn: 'Using git log and git show to find bugs',
    steps: [
      'Use git log --all main.py to see main.py commit history',
      'Use git show <hash> to inspect each commit',
      'Find the commit that changed coin rendering code',
      'Revert the bad commit: git revert <hash>',
      'Submit evidence: Commit hash'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
  },
  {
    id: '10',
    mission_id: 'detective-5',
    title: 'Fix: Enemies Too Fast',
    description: 'Find and revert the commit that made enemies too fast',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'SPEED',
    whatYouLearn: 'Using git blame to track changes',
    steps: [
      'Use git log --all -S"ENEMY_SPEED" to find speed changes',
      'Use git show <hash> to see what changed',
      'Identify commit that changed speed from 2 to 20',
      'Revert it: git revert <hash>',
      'Submit evidence: Commit hash and author'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
  },
  {
    id: '11',
    mission_id: 'detective-6',
    title: 'Fix: Score Goes Down',
    description: 'Find and revert the commit that broke scoring',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'SCORE',
    whatYouLearn: 'Using git log with file paths',
    steps: [
      'Use git log -- game/player.py to see player.py history',
      'Look for commits about scoring or add_score',
      'Use git show to find commit that changed += to -=',
      'Revert the bad commit: git revert <hash>',
      'Submit evidence: Commit hash and culprit'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
  },
  {
    id: '12',
    mission_id: 'detective-7',
    title: 'Fix: Invincible Player',
    description: 'Find and revert the commit that made player invincible',
    category: 'detective',
    difficulty: 'Medium',
    badge: 'DAMAGE',
    whatYouLearn: 'Using git log with file paths',
    steps: [
      'Use git log --all game/level.py to see level.py history',
      'Use git show <hash> to inspect collision-related changes',
      'Find commit that modified collision detection',
      'Revert it: git revert <hash>',
      'Submit evidence: Commit hash'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
  },
  {
    id: '13',
    mission_id: 'detective-8',
    title: 'Fix: Backwards Controls',
    description: 'Find and revert the commit that reversed the controls',
    category: 'detective',
    difficulty: 'Medium',
    badge: 'CONTROL',
    whatYouLearn: 'Using git log with grep patterns',
    steps: [
      'Use git log --all -S"dx" to find control changes',
      'Check commits about controls or movement',
      'Find commit that swapped left/right dx values',
      'Revert it: git revert <hash>',
      'Submit evidence: Date and author of commit'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'tension'
  },
  {
    id: '14',
    mission_id: 'detective-9',
    title: 'The Pattern Emerges',
    description: 'Analyze all the breaking commits - what connects them?',
    category: 'detective',
    difficulty: 'Hard',
    badge: 'PATTERN',
    whatYouLearn: 'Connecting the dots in git history',
    steps: [
      'List all the commit hashes you reverted',
      'Use git show <hash> on each to see the author and date',
      'Do they all share the same author?',
      'Check when these commits were made - same timeframe?',
      'Submit evidence: Summary of the pattern you found'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'resolution'
  },
  
  // UNLOCKED MISSIONS
  {
    id: '15',
    mission_id: 'unlocked-1',
    title: 'Collect 10 Coins',
    description: 'Play the game and collect exactly 10 coins',
    category: 'unlocked',
    difficulty: 'Challenge',
    badge: 'PLAY',
    whatYouLearn: 'Playing a working game!',
    steps: [
      'Make sure all detective missions are fixed',
      'Play and collect 10 coins',
      'Take a screenshot of your score',
      'Bonus: Can you get 100 points?'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '16',
    mission_id: 'unlocked-2',
    title: 'Survive 30 Seconds',
    description: 'Stay alive for 30 seconds without dying',
    category: 'unlocked',
    difficulty: 'Challenge',
    badge: 'SURVIVE',
    whatYouLearn: 'Game balance and survival skills',
    steps: [
      'Fix all bugs first',
      'Survive for 30 seconds',
      'Note your final score',
      'Bonus: Can you survive 60 seconds?'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '17',
    mission_id: 'unlocked-3',
    title: 'Add Power-Up System',
    description: 'Implement a new feature: collectible power-ups',
    category: 'unlocked',
    difficulty: 'Advanced',
    badge: 'POWERUP',
    whatYouLearn: 'Adding new features to existing code',
    steps: [
      'Create a new PowerUp class',
      'Add power-up spawning logic',
      'Implement power-up effects (speed boost, shield, etc.)',
      'Test thoroughly and commit'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
];
