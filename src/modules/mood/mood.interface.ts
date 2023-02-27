export interface Mood {
  name: string;
  breakdown: MoodBreakdown;
}

export interface MoodBreakdown {
  emotionalFeatures: EmotionalFeature[];
  quantitativeFeatures: QuantitativeFeature[];
}

export interface GeneralFeature {
  featureName: string;
  averageValue: string | number;
}

export interface EmotionalFeature extends GeneralFeature {
  percentDifference: number;
  percentDifferenceString: string;
}

export interface QuantitativeFeature extends GeneralFeature {
  averageNotatedKey?: string;
}

export interface Songs {
  name: string;
  album: string;
  artist: string;
  imageURL: string;
  playedAt: string;
  id: string;
}

export interface AudioFeatures {
  danceability: number;
  acousticness: number;
  energy: number;
  valence: number;
  tempo: number;
  key: number;
}

export interface SongsAndAudioFeatures {
  songs: Songs[];
  audioFeatures: AudioFeatures[];
}
