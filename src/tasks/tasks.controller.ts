// import { CreateTaskDto } from './dto/create-task.dto';
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
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.findAll();
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
  // @Post()
  // async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
  //   return this.tasksService.create(createTaskDto);
  // }

  // Обновление задачи
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('completed') completed: boolean,
  ): Promise<Task> {
    return this.tasksService.update(id, title, description, completed);
  }

  // Удаление задачи
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id);
  }
}
