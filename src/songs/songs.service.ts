import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { SongsModel } from './songs.interface';

@Injectable()
export class SongsService {
  constructor(private readonly httpService: HttpService) {}

  getSongs(token: string): Observable<AxiosResponse<SongsModel[]>> {
    const authHeader = {
      Authorization: `Bearer ${token}`,
    };

    const response = this.httpService
      .get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: authHeader,
      })
      .pipe(map((response) => response.data));
    return response;
  }
}
