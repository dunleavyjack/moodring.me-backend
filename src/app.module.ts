import { Module } from '@nestjs/common';

import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SongsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
