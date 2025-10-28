
export interface TopScore {
  score: string;
  prob: number;
}

export interface PredictionData {
  winner_prediction: "H" | "D" | "A";
  home_prob: number;
  draw_prob: number;
  away_prob: number;
  predicted_score: string;
  top_5_scores: TopScore[];
  home_attack_index: number;
  away_defence_index: number;
}
