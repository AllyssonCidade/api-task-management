import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { findAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto) {
    this.taskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string): TaskDto {
    return this.taskService.findByID(id);
  }

  @Get()
  findAll(@Query() params: findAllParameters): TaskDto[] {
    return this.taskService.findAll(params);
  }

  @Put()
  update(@Body() task: TaskDto) {
    this.taskService.update(task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): TaskDto {
    return this.taskService.delete(id);
  }
}
