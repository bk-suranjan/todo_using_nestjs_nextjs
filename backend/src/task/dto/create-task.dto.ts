import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'title required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'description required' })
  description: string;

  status: string;
}
