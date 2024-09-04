import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenExceptionDto {
  @ApiProperty({
    example: 'message',
  })
  message: string;
}
