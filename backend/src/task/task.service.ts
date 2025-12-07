import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const { title, description } = createTaskDto;
      if (!title || !description) {
        throw new BadRequestException('title and description are requried');
      }
      const task = await this.taskModel.create({ title, description });
      if (!task) {
        throw new BadRequestException('faild to create task');
      }
      return task;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        error.response || 'internal server error',
      );
    }
  }

  async findAll() {
    try {
      const tasks = await this.taskModel.find({});
      if (!tasks) {
        throw new BadRequestException('No tasks found');
      }
      return tasks;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        error.response || 'Internal server error',
      );
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('id required to find the task');
      }
      const task = await this.taskModel.findById(id);

      if (!task) {
        throw new BadRequestException('id is invalid');
      }
      return task;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        error.response || 'Interserver error',
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    try {
      if (!id) {
        throw new BadRequestException('Id is required');
      }
      const updatedTask = await this.taskModel.findByIdAndUpdate(
        id,
        {
          description: updateTaskDto.description,
        },
        { new: true },
      );

      if (!updatedTask) {
        throw new BadRequestException('faild to update task');
      }
      return { task: updatedTask };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        error.response || 'Internal server error',
      );
    }
  }

  async remove(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('id is required');
      }
      const deleteTask = await this.taskModel.findByIdAndDelete(id);

      if (!deleteTask) {
        throw new BadRequestException('fail to delete the task');
      }
      return deleteTask;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        error.response || 'Internal server error',
      );
    }
  }
}
