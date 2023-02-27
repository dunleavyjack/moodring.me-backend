import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, lastValueFrom } from 'rxjs';
import { UsersModel } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async getUser(token: string): Promise<UsersModel> {
    const authHeader = {
      Authorization: `Bearer ${token}`,
    };

    const spotifyUserResponse: UsersModel = await lastValueFrom(
      this.httpService
        .get<SpotifyApi.UserProfileResponse>('https://api.spotify.com/v1/me/', {
          headers: authHeader,
        })
        .pipe(
          map((response) => {
            const userProfile: UsersModel = {
              userName: response?.data?.display_name || '',
              imageURL: response?.data?.images[0]?.url || '',
            };
            return userProfile;
          }),
        ),
    );
    return spotifyUserResponse;
  }
}
