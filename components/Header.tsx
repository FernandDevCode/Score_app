
import React from 'react';

const FootballIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54L15 13v-1c0-1.1-.9-2-2-2h-2V7h2c1.1 0 2-.9 2-2V4.07c3.95.49 7 3.85 7 7.93 0 .62-.08 1.21-.21 1.79z"/>
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="text-center py-4 border-b-2 border-yellow-400/50">
      <div className="flex items-center justify-center gap-4">
        <FootballIcon className="w-10 h-10 text-yellow-400" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-white font-display">
          GUESS SCORE
        </h1>
      </div>
      <p className="text-slate-300 mt-2 text-lg">AI Football Match Predictor</p>
    </header>
  );
};

export default Header;
