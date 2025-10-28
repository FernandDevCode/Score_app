
import React, { useState, useCallback } from 'react';
import { LA_LIGA_TEAMS } from './constants';
import { PredictionData } from './types';
import { fetchPrediction } from './services/predictionService';
import Header from './components/Header';
import TeamSelector from './components/TeamSelector';
import PredictionResult from './components/PredictionResult';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [homeTeam, setHomeTeam] = useState<string>(LA_LIGA_TEAMS[0]);
  const [awayTeam, setAwayTeam] = useState<string>(LA_LIGA_TEAMS[1]);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = useCallback(async () => {
    if (homeTeam === awayTeam) {
      setError("Please select two different teams.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await fetchPrediction(homeTeam, awayTeam);
      setPrediction(result);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [homeTeam, awayTeam]);

  const teamsAreSame = homeTeam === awayTeam;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-yellow-400 font-display tracking-wide">
              SELECT TEAMS
            </h2>
            <p className="text-center text-slate-400 mt-2">
              Choose two teams from La Liga to get an AI-powered prediction.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <TeamSelector
                label="Home Team"
                teams={LA_LIGA_TEAMS}
                selectedTeam={homeTeam}
                onTeamChange={setHomeTeam}
                otherTeam={awayTeam}
              />
              <TeamSelector
                label="Away Team"
                teams={LA_LIGA_TEAMS}
                selectedTeam={awayTeam}
                onTeamChange={setAwayTeam}
                otherTeam={homeTeam}
              />
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={handlePredict}
                disabled={isLoading || teamsAreSame}
                className="font-display text-xl font-bold bg-yellow-400 text-slate-900 px-10 py-4 rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'ANALYSING...' : 'ANALYSER & PRÉDIRE'}
              </button>
            </div>
            {teamsAreSame && (
              <p className="text-center text-red-400 mt-4">
                Home and Away teams cannot be the same.
              </p>
            )}
          </div>
          
          <div className="mt-8 min-h-[300px]">
            {isLoading && <Loader />}
            {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
            {prediction && !isLoading && <PredictionResult data={prediction} homeTeam={homeTeam} awayTeam={awayTeam} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
