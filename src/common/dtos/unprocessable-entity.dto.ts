import { ApiProperty } from '@nestjs/swagger';

export class UnprocessableEntityExceptionDto {
  @ApiProperty({
    example: 'message',
  })
  message: string;

  @ApiProperty({
    example: {},
  })
  details: any;
}
