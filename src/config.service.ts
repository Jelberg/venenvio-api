import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable({})
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get venenvio_url(): string {
    return this.configService.get('appConfig.venenvio.url');
  }
}
