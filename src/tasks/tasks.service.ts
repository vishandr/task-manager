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

  // async findAllByCompletion(isCompleted: boolean): Promise<Task[]> {
  //   return this.tasksRepository.find({
  //     where: { isCompleted },
  //     // order: { title: 'ASC' }, // опционально сортировка по заголовку
  //   });
  // }

  async findAllWithFilters(
    isCompleted?: boolean,
    search?: string,
  ): Promise<Task[]> {
    const query = this.tasksRepository.createQueryBuilder('task');

    if (isCompleted !== undefined) {
      query.andWhere('task.isCompleted = :isCompleted', { isCompleted });
    }

    if (search) {
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
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
