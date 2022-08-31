import { ApiProperty,  } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class CreateUserDto implements User {

  @ApiProperty({ readOnly: true })
  id: number;

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: number;

  @ApiProperty({ readOnly: true })
  createdAt: Date

  @ApiProperty({ readOnly: true})
  updatedAt: Date
}
