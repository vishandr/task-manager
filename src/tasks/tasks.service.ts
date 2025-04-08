import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

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

  // Создание задачи
  async create(title: string, description: string): Promise<Task> {
    const task = this.tasksRepository.create({ title, description });
    return this.tasksRepository.save(task);
  }

  // Обновление задачи
  async update(
    id: number,
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
  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
