import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, lastValueFrom } from 'rxjs';
import {
  SongsModel,
  AudioFeaturesModel,
  SongsAndAudioFeaturesModel,
} from './songs.interface';

@Injectable()
export class SongsService {
  constructor(private readonly httpService: HttpService) {}

  async getSongsAndAudioFeatures(
    token: string,
  ): Promise<SongsAndAudioFeaturesModel> {
    const authHeader = {
      Authorization: `Bearer ${token}`,
    };

    const spotifySongsResponse: SongsModel[] = await lastValueFrom(
      this.httpService
        .get<SpotifyApi.UsersRecentlyPlayedTracksResponse>(
          'https://api.spotify.com/v1/me/player/recently-played',
          {
            headers: authHeader,
          },
        )
        .pipe(
          map((response) => {
            const recentSongs = response.data.items.map((item) => {
              const individualSong: SongsModel = {
                name: item.track.name,
                album: item.track.album.name,
                artist: item.track.artists[0].name,
                imageURL: item.track.album.images[0].url,
                playedAt: item.played_at,
                id: item.track.id,
              };
              return individualSong;
            });

            return recentSongs;
          }),
        ),
    );

    const songIds = spotifySongsResponse.map((song: SongsModel) => song.id);
    const audioFeaturesResponse: AudioFeaturesModel[] = await lastValueFrom(
      this.httpService
        .get(`https://api.spotify.com/v1/audio-features/?ids=${songIds}`, {
          headers: authHeader,
        })
        .pipe(
          map((response) => {
            const recentSongAudioFeatures = response.data.audio_features.map(
              (features) => {
                const songAudioFeature: AudioFeaturesModel = {
                  danceability: features?.danceability || 0,
                  acousticness: features?.acousticness || 0,
                  energy: features?.energy || 0,
                  valence: features?.valence || 0,
                  tempo: features?.tempo || 0,
                  key: features?.key || 0,
                };
                return songAudioFeature;
              },
            );

            return recentSongAudioFeatures;
          }),
        ),
    );

    return {
      songs: spotifySongsResponse,
      audioFeatures: audioFeaturesResponse,
    };
  }
}
