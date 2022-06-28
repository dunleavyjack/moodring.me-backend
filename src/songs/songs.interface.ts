export interface SongsModel {
  name: string;
  album: string;
  artist: string;
  imageURL: string;
  playedAt: string;
  id: string;
}

export interface AudioFeaturesModel {
  danceability: number;
  acousticness: number;
  energy: number;
  valence: number;
  tempo: number;
  key: number;
}

export interface SongsAndAudioFeaturesModel {
  songs: SongsModel[];
  audioFeatures: AudioFeaturesModel[];
}
