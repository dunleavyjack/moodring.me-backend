import { Module } from '@nestjs/common';

import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';
import { AudioFeaturesModule } from './audio-features/audio-features.module';

@Module({
  imports: [SongsModule, UsersModule, AudioFeaturesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
