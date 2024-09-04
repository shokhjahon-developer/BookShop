import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDto {
  @ApiProperty({
    example: 'message',
  })
  message: string;
}
