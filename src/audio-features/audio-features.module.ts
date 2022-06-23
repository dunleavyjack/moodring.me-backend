import { Module } from '@nestjs/common';
import { AudioFeaturesService } from './audio-features.service';
import { AudioFeaturesController } from './audio-features.controller';

@Module({
  providers: [AudioFeaturesService],
  controllers: [AudioFeaturesController],
})
export class AudioFeaturesModule {}
