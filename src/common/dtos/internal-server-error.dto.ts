import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorExceptionDto {
  @ApiProperty({
    example: 'message',
  })
  message: string;
}
