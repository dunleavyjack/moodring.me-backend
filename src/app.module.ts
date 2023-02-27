import { Module } from '@nestjs/common';

import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';
import { MoodModule } from './mood/mood.module';
import { AuthModule } from './auth/auth.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SongsModule, UsersModule, MoodModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
