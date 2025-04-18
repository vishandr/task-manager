// import { CreateTaskDto } from './dto/create-task.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Получение всех задач
  // @Get()
  // async getAllTasks(): Promise<Task[]> {
  //   return this.tasksService.findAll();
  // }

  @Get()
  async getAllTasks(
    @Query('isCompleted') isCompleted?: string,
    @Query('search') search?: string,
  ): Promise<Task[]> {
    const completed =
      isCompleted === undefined ? undefined : isCompleted === 'true';
    return this.tasksService.findAllWithFilters(completed, search);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
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
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('isCompleted') isCompleted: boolean,
  ): Promise<Task> {
    return this.tasksService.update(id, title, description, isCompleted);
  }

  // Удаление задачи
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id);
  }
}
