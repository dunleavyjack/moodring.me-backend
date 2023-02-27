import { Controller, Get, Param } from '@nestjs/common';
import { MoodService } from './mood.service';
import { MOOD_ROUTE, TOKEN, TOKEN_PARAM } from '../../common/constants/routes';
import { Mood } from './mood.interface';

@Controller(MOOD_ROUTE)
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Get(TOKEN_PARAM)
  public getMood(@Param(TOKEN) token: string): Promise<Mood> {
    return this.moodService.getMood(token);
  }
}
