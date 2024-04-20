import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

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

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const result = await this.todoService.create(createTodoDto);

    return result;
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const result = await this.todoService.update(uuid, updateTodoDto);

    return result;
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    const result = await this.todoService.delete(uuid);

    return result;
  }
}
