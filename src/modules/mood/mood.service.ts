import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Mood } from './mood.interface';

@Injectable()
export class MoodService {
  constructor(private readonly httpService: HttpService) {}

  async getMood(token: string): Promise<Mood> {
    console.log(token);

    return {} as Mood;
  }
}
