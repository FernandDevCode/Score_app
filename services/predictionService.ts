
import { PredictionData, TopScore } from '../types';

export const fetchPrediction = (homeTeam: string, awayTeam: string): Promise<PredictionData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API failure randomly
      if (Math.random() < 0.05) {
          reject(new Error("API Error: The server is currently unavailable."));
          return;
      }
      
      // Generate somewhat realistic-looking mock data
      const homeStrength = homeTeam.length + Math.random() * 5;
      const awayStrength = awayTeam.length + Math.random() * 5;
      const totalStrength = homeStrength + awayStrength;

      let home_prob = (homeStrength / totalStrength) * 80 + Math.random() * 10;
      let away_prob = (awayStrength / totalStrength) * 80 + Math.random() * 10;
      let draw_prob = 100 - home_prob - away_prob;
      
      if (draw_prob < 0) {
        const adjustment = -draw_prob / 2;
        home_prob -= adjustment;
        away_prob -= adjustment;
        draw_prob = 0;
      }

      const total = home_prob + draw_prob + away_prob;
      home_prob = parseFloat(((home_prob/total) * 100).toFixed(1));
      draw_prob = parseFloat(((draw_prob/total) * 100).toFixed(1));
      away_prob = parseFloat((100 - home_prob - draw_prob).toFixed(1));

      let winner_prediction: "H" | "D" | "A";
      if (home_prob > away_prob && home_prob > draw_prob) {
        winner_prediction = 'H';
      } else if (away_prob > home_prob && away_prob > draw_prob) {
        winner_prediction = 'A';
      } else {
        winner_prediction = 'D';
      }
      
      const homeGoals = Math.floor(Math.random() * 4);
      const awayGoals = Math.floor(Math.random() * 3);
      const predicted_score = `${homeGoals} - ${awayGoals}`;

      const top_5_scores: TopScore[] = Array.from({ length: 5 }, (_, i) => {
        const score = `${Math.floor(Math.random() * 4)}-${Math.floor(Math.random() * 3)}`;
        const prob = parseFloat((Math.random() * 10 + 5).toFixed(1));
        return { score, prob };
      }).sort((a, b) => b.prob - a.prob);

      const mockData: PredictionData = {
        winner_prediction,
        home_prob,
        draw_prob,
        away_prob,
        predicted_score,
        top_5_scores,
        home_attack_index: parseFloat((1 + Math.random()).toFixed(2)),
        away_defence_index: parseFloat((0.5 + Math.random()).toFixed(2)),
      };
      
      resolve(mockData);
    }, 1500); // Simulate network delay
  });
};
