import { ApiProperty } from '@nestjs/swagger';

export class NotfoundSwagger {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
