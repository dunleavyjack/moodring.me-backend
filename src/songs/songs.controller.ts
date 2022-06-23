import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SongsService } from './songs.service';
import { AxiosResponse } from 'axios';
import { SongsModel } from './songs.interface';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get(':token')
  public getSongs(
    @Param('token') token: string,
  ): Observable<AxiosResponse<SongsModel[]>> {
    return this.songsService.getSongs(token);
  }
}
