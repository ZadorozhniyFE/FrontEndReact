import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button 
      onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} 
      className="theme-toggle-btn" 
      title="Сменить тему"
    >
      <svg width="20" height="20" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.1249 0.548798C11.3387 0.917354 11.321 1.3762 11.0791 1.72705C10.3455 2.79152 9.91599 4.08062 9.91599 5.47334C9.91599 9.12428 12.8757 12.084 16.5266 12.084C17.9194 12.084 19.2085 11.6545 20.2729 10.9208C20.6238 10.6791 21.0826 10.6613 21.4512 10.8751C21.8197 11.089 22.0319 11.4962 21.9961 11.9208C21.5481 17.567 16.7867 22 11 22C4.93242 22 0 17.0676 0 11C0 5.21328 4.43301 0.451873 10.0792 0.00392422C10.5038 -0.0319387 10.911 0.180242 11.1249 0.548798Z"/>
      </svg>
    </button>
  );
}