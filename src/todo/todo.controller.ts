import { Controller, Get, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './todo.dto';

@Crud({
  model: {
    type: TodoEntity,
  },
  dto: {
    create: CreateTodoDto,
  },
})
@Controller('todo')
export class TodoController {
  constructor(public todoService: TodoService) {}

  @Get()
  async findAll() {
    const result = await this.todoService.getAll();

    return result;
  }

  @Get(':uuid')
  async findDetail(@Param('uuid') uuid: string) {
    const result = await this.todoService.getDetail(uuid);

    return result;
  }
}
