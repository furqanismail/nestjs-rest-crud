import { Injectable } from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateTodoDto, UpdateTodoDto} from './todo.dto';
import { v4 as uuidv4 } from 'uuid';

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

    return getDetailPost;
  }

  async create(createTodoDto: CreateTodoDto) {
    const { title, description, is_done } = createTodoDto;
    const createTodo = await this.todoModel.save({
      uuid: uuidv4(),
      title,
      description,
      is_done,
    });

    return createTodo;
  }

  async update(uuid: string, updateTodoDto: UpdateTodoDto) {
    const { title, description, is_done } = updateTodoDto;
    const updateTodo = await this.todoModel.save({
      uuid,
      title,
      description,
      is_done,
    });

    return updateTodo;
  }

  async delete(uuid: string) {
    const getDetailPost = await this.todoModel.findOne({
      where: {
        uuid,
      },
    });

    await this.todoModel.delete({
      uuid,
    });

    return getDetailPost;
  }
}
