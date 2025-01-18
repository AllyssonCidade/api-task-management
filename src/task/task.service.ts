import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { findAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];
  create(task: TaskDto) {
    task.id = uuid();
    task.status = TaskStatusEnum.TO_DO;
    this.tasks.push(task);
  }
  findByID(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }
    throw new NotFoundException('Task não encontrada');
  }

  findAll(params: findAllParameters): TaskDto[] {
    return this.tasks.filter((task) => {
      let match = true;

      if (params.title != undefined && !task.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && !task.status.includes(params.status)) {
        match = false;
      }
      return match;
    });
  }

  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }
    throw new BadRequestException('Task não encontrada');
  }

  delete(id: string): TaskDto {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      console.log('Task deletada', id);
      return;
    }
    throw new BadRequestException('Task não encontrada');
  }
}
