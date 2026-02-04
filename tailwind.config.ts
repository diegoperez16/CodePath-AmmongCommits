import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Gradient backgrounds
    'from-emerald-500/10', 'to-emerald-600/5',
    'from-amber-500/10', 'to-amber-600/5', 
    'from-purple-500/10', 'to-purple-600/5',
    'from-slate-500/10', 'to-slate-600/5',
    'from-indigo-500/10', 'to-purple-500/10',
    'from-indigo-600', 'to-indigo-500', 'to-purple-600', 'via-indigo-500',
    'from-emerald-600', 'to-emerald-500', 'to-green-600', 'via-emerald-500',
    'from-amber-600', 'to-amber-500',
    'from-purple-600', 'to-purple-500',
    // Borders
    'border-emerald-400/30', 'border-emerald-400/40', 'border-emerald-500/30', 'border-emerald-500/40',
    'border-amber-400/30', 'border-amber-500/30',
    'border-purple-400/30', 'border-purple-500/30',
    'border-slate-400/30', 'border-slate-500/30', 'border-slate-700/50', 'border-slate-600',
    'border-indigo-400/30', 'border-indigo-400/50', 'border-indigo-500/30',
    'border-rose-400/30', 'border-rose-400/40', 'border-rose-500/30',
    // Text colors
    'text-emerald-400', 'text-emerald-300', 'text-emerald-200',
    'text-amber-400',
    'text-purple-400',
    'text-slate-400', 'text-slate-300', 'text-slate-200', 'text-slate-500',
    'text-indigo-400', 'text-indigo-300', 'text-indigo-200',
    'text-rose-400', 'text-rose-300', 'text-rose-200',
    // Backgrounds
    'bg-emerald-500/10', 'bg-emerald-500/20', 'bg-emerald-900/30',
    'bg-amber-500/10',
    'bg-purple-500/10',
    'bg-slate-500/10', 'bg-slate-700', 'bg-slate-800/40', 'bg-slate-900/40', 'bg-slate-900/60', 'bg-slate-900/80',
    'bg-indigo-500/10', 'bg-indigo-500/20', 'bg-indigo-500/30',
    'bg-rose-500/10', 'bg-rose-500/20',
    // Shadows
    'shadow-emerald-500/20', 'shadow-emerald-500/30', 'shadow-emerald-500/40', 'shadow-emerald-500/50',
    'shadow-amber-500/20', 'shadow-amber-500/40',
    'shadow-purple-500/20', 'shadow-purple-500/40',
    'shadow-slate-500/20',
    'shadow-indigo-500/20', 'shadow-indigo-500/30', 'shadow-indigo-500/40', 'shadow-indigo-500/50', 'shadow-indigo-500/60',
    'shadow-rose-500/30',
    // Rings
    'ring-2', 'ring-indigo-400/50',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
