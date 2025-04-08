import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Получение всех задач
  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  // Создание новой задачи
  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Task> {
    return this.tasksService.create(title, description);
  }

  // Обновление задачи
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('completed') completed: boolean,
  ): Promise<Task> {
    return this.tasksService.update(id, title, description, completed);
  }

  // Удаление задачи
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
