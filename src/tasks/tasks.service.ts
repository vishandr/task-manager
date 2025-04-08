import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
// import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Получение всех задач
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  // Создание задачи
  async create(title: string, description: string): Promise<Task> {
    const task = this.tasksRepository.create({
      title,
      description,
      isCompleted: false,
    });
    return this.tasksRepository.save(task);
  }
  // async create(createTaskDto: CreateTaskDto): Promise<Task> {
  //   const task = this.tasksRepository.create({
  //     ...createTaskDto,
  //     isCompleted: false,
  //   });
  //   return this.tasksRepository.save(task);
  // }

  // Обновление задачи
  async update(
    id: string,
    title: string,
    description: string,
    completed: boolean,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    task.title = title;
    task.description = description;
    task.isCompleted = completed;
    return this.tasksRepository.save(task);
  }

  // Удаление задачи
  async delete(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }
}
