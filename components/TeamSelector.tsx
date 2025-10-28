
import React from 'react';

interface TeamSelectorProps {
  label: string;
  teams: string[];
  selectedTeam: string;
  onTeamChange: (team: string) => void;
  otherTeam: string;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ label, teams, selectedTeam, onTeamChange, otherTeam }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label.replace(' ', '-')} className="text-lg font-semibold text-slate-300 font-display">
        {label}
      </label>
      <select
        id={label.replace(' ', '-')}
        value={selectedTeam}
        onChange={(e) => onTeamChange(e.target.value)}
        className="w-full bg-slate-700 border border-slate-600 text-white text-lg rounded-lg focus:ring-yellow-400 focus:border-yellow-400 p-3"
      >
        {teams.map((team) => (
          <option key={team} value={team} disabled={team === otherTeam}>
            {team}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelector;
