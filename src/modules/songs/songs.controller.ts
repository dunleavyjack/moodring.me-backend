import { Controller, Get, Param } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsAndAudioFeaturesModel } from './songs.interface';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get(':token')
  public getSongsAndAudioFeatures(
    @Param('token') token: string,
  ): Promise<SongsAndAudioFeaturesModel> {
    return this.songsService.getSongsAndAudioFeatures(token);
  }
}
