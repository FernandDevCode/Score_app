
import React from 'react';
import { PredictionData } from '../types';
import WinnerBarChart from './charts/WinnerBarChart';
import TopScoresPieChart from './charts/TopScoresPieChart';

interface PredictionResultProps {
  data: PredictionData;
  homeTeam: string;
  awayTeam: string;
}

const StatCard: React.FC<{ title: string; value: string | number; className?: string }> = ({ title, value, className }) => (
    <div className={`bg-slate-800 p-4 rounded-lg text-center shadow-lg border border-slate-700 ${className}`}>
        <p className="text-sm text-slate-400 uppercase font-display tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-yellow-400 mt-1 font-display">{value}</p>
    </div>
);

const PredictionResult: React.FC<PredictionResultProps> = ({ data, homeTeam, awayTeam }) => {
  const winnerMap = {
    H: `${homeTeam} Wins`,
    A: `${awayTeam} Wins`,
    D: 'Draw'
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 border border-slate-700 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-yellow-400 font-display tracking-wide mb-6">
            PREDICTION RESULTS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Predicted Winner" value={winnerMap[data.winner_prediction]} className="col-span-2" />
            <StatCard title="Predicted Score" value={data.predicted_score} className="col-span-2" />
            <StatCard title="Home Attack Index" value={data.home_attack_index} />
            <StatCard title="Away Defence Index" value={data.away_defence_index} />
             <StatCard title={`${homeTeam} Win %`} value={`${data.home_prob}%`} />
            <StatCard title={`${awayTeam} Win %`} value={`${data.away_prob}%`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-center mb-4 font-display">Match Outcome Probability</h3>
                <div className="w-full h-64">
                    <WinnerBarChart home={data.home_prob} draw={data.draw_prob} away={data.away_prob} homeTeam={homeTeam} awayTeam={awayTeam} />
                </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-center mb-4 font-display">Top 5 Score Probabilities</h3>
                 <div className="w-full h-64">
                    <TopScoresPieChart data={data.top_5_scores} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default PredictionResult;
