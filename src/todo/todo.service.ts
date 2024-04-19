import { Injectable } from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoModel: Repository<TodoEntity>,
  ) {}

  async getAll() {
    const getPost = await this.todoModel.find();
    return getPost;
  }

  async getDetail(uuid: string) {
    const getDetailPost = await this.todoModel.findOne({
      where: {
        uuid,
      },
    });
  }

  async create(createTodoDto: CreateTodoDto) {
    const { title, description, is_done } = createTodoDto;
    const createTodo = await this.todoModel.create({
      title,
      description,
      is_done,
    });

    return createTodo;
  }
}
