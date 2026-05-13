import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller({ path: 'health', version: ['1', VERSION_NEUTRAL] })
export class HealthController {
  @Get()
  check() {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
    };
  }
}
